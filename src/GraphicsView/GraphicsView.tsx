import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A canvas for custom immediate-mode drawing via `IDrawable`.
 *
 * | native | here |
 * | --- | --- |
 * | `Drawable` (`IDrawable.Draw(canvas, dirtyRect)`) | `Drawable` — `(ctx: CanvasRenderingContext2D, rect: { width, height }) => void` |
 * | `Invalidate()` | `ref.current.Invalidate()` |
 * | `StartInteraction` / `DragInteraction` / `EndInteraction` | `onStartInteraction` / `onDragInteraction` / `onEndInteraction` — `(x, y) => void` |
 *
 * The canvas auto-sizes to its box (devicePixelRatio-aware) and redraws on resize.
 */
export interface GraphicsViewHandle {
  Invalidate: () => void
}

export interface GraphicsViewProps extends ViewProps {
  Drawable?: (ctx: CanvasRenderingContext2D, rect: { width: number; height: number }) => void
  onStartInteraction?: (x: number, y: number) => void
  onDragInteraction?: (x: number, y: number) => void
  onEndInteraction?: (x: number, y: number) => void
}

const GraphicsView = forwardRef<GraphicsViewHandle, GraphicsViewProps>(function GraphicsView(props, ref) {
  const { Drawable, onStartInteraction, onDragInteraction, onEndInteraction, className, ...view } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !Drawable) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)
    Drawable(ctx, { width: rect.width, height: rect.height })
  }, [Drawable])

  useImperativeHandle(ref, () => ({ Invalidate: draw }), [draw])

  useEffect(() => {
    draw()
    const canvas = canvasRef.current
    if (!canvas || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [draw])

  const at = (event: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return [event.clientX - rect.left, event.clientY - rect.top] as const
  }

  return (
    <canvas
      ref={canvasRef}
      className={cx('fluid-graphicsview', className)}
      style={viewStyle(view as ViewProps)}
      onPointerDown={onStartInteraction ? (event) => onStartInteraction(...at(event)) : undefined}
      onPointerMove={onDragInteraction ? (event) => event.buttons > 0 && onDragInteraction(...at(event)) : undefined}
      onPointerUp={onEndInteraction ? (event) => onEndInteraction(...at(event)) : undefined}
      {...xNameAttr(view)}
    />
  )
})

export default GraphicsView
