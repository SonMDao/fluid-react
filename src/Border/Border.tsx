import type { CSSProperties, Ref } from 'react'
import { cx, interactionAttrs, thickness, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A bordered, optionally rounded wrapper around one child.
 *
 * | native | here |
 * | --- | --- |
 * | `Stroke` | `Stroke` (CSS color) |
 * | `StrokeThickness` | `StrokeThickness` |
 * | `StrokeShape` (`RoundRectangle 12`, `Rectangle`, `Ellipse`) | `StrokeShape` — a corner radius number, `"RoundRectangle 12"`, or `"Ellipse"` |
 * | `StrokeDashArray` | `StrokeDashArray` (→ dashed border) |
 * | `Padding` | `Padding` |
 * | `Content` | `Content` or `children` |
 */
export interface BorderProps extends ViewProps {
  Stroke?: string
  StrokeThickness?: number
  StrokeShape?: number | string
  StrokeDashArray?: string | number[]
  Content?: React.ReactNode
  /** Forwarded to the rendered `<div>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLDivElement>
}

function radiusFor(shape: number | string | undefined): string | undefined {
  if (shape == null) return undefined
  if (typeof shape === 'number') return `${shape}px`
  if (/ellipse/i.test(shape)) return '50%'
  const match = shape.match(/[\d.]+/g)
  if (!match) return undefined
  return match.map((n) => `${n}px`).join(' ')
}

export default function Border(props: BorderProps) {
  const {
    Stroke = '#000',
    StrokeThickness = 1,
    StrokeShape,
    StrokeDashArray,
    Padding,
    Content,
    className,
    children,
    ref,
    ...view
  } = props

  const style: CSSProperties = {
    borderStyle: StrokeDashArray ? 'dashed' : 'solid',
    borderWidth: `${StrokeThickness}px`,
    borderColor: Stroke,
    borderRadius: radiusFor(StrokeShape),
    padding: thickness(Padding),
    ...viewStyle(view as ViewProps),
  }

  return (
    <div
      ref={ref}
      className={cx('fluid-border', className)}
      style={style}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {Content ?? children}
    </div>
  )
}
