import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cx, type ViewProps } from '../Shared/fluid-shared'
import ContentView from '../ContentView/ContentView'
import BoxView from '../BoxView/BoxView'
import ScrollView from '../ScrollView/ScrollView'
import './style.css'

const DEFAULT_HANDLE_THICKNESS = 3
const HANDLE_COLOR = 'var(--card-border)'
const HANDLE_COLOR_ACTIVE = 'var(--navbar-btn-border)'

/**
 * A draggable, resizable divider between two panes — no native "Splitter" to mirror (this is
 * a new UI primitive, the one exception to every other @Fluid folder mirroring a real
 * control 1:1).
 */
export interface SplitterProps extends ViewProps {
  /** "horizontal" = panes side by side, drag a vertical bar left/right. "vertical" = panes
   * stacked, drag a horizontal bar up/down. */
  orientation: 'horizontal' | 'vertical'
  firstPane: ReactNode
  secondPane: ReactNode
  /** Starting size (px) of `firstPane` along the drag axis. Defaults to half the container. */
  initialSize?: number
  /** Starting size of `firstPane` as a fraction (0-1) of the container's own measured size along
   * the drag axis, applied once on mount — unlike `initialSize`'s fixed pixel value, this scales
   * with whatever width/height the Splitter actually renders at, so callers wanting a specific
   * split other than 50/50 (e.g. 30/70) don't have to hardcode pixels. Ignored if `initialSize` is
   * also given. Still just a starting point — the user can drag away from it like any other size,
   * and it's clamped by `minFirstSize`/`maxFirstSize`/`minSecondSize`/`maxSecondSize` same as a drag. */
  initialRatio?: number
  /** Clamp bounds (px) for `firstPane` along the drag axis. */
  minFirstSize?: number
  maxFirstSize?: number
  /** Clamp bounds (px) for `secondPane` along the drag axis — enforced by further limiting how
   * far `firstPane` can grow/shrink. */
  minSecondSize?: number
  maxSecondSize?: number
  /** Thickness (px) of the draggable handle bar. Defaults to 3. */
  handleThickness?: number
  /** Fires on every drag move with the new `firstPane` size (px). */
  onResize?: (firstSize: number) => void
}

/**
 * Horizontal (side-by-side, drag left/right) or vertical (stacked, drag up/down). The outer
 * container is ContentView; each pane is a ScrollView (the scrollable single-child container —
 * the exact concept `overflow: auto` in .splitter-pane was standing in for, and a real
 * ref-forwarding component unlike ContentView); the handle is BoxView — the plain solid-colour
 * rectangle, the better match for a leaf divider bar with no content of its own. Every element is
 * a Fluid control, even though none of them expose pointer events and only ScrollView forwards a
 * ref: the container and handle are each given a unique per-instance marker class (via useId(),
 * collision-free across multiple splitters on one page), located in the DOM after render, and
 * driven with native addEventListener/setPointerCapture instead of React props — the same DOM the
 * caller's `xName` (rendered as `data-x-name`, kept free for that use) would otherwise be found by
 * from outside React. Listeners read state through a ref (`latest`) so they're attached exactly
 * once rather than torn down and reattached on every drag frame. BoxView sets its background as an
 * inline style (from its `Color` prop), which would always beat a CSS `:hover`/`:active` rule, so
 * the handle's highlight-on-hover/drag is tracked as state (`isHovering`, `isDragging`) and passed
 * to `Color` directly instead of being pure CSS.
 */
export default function Splitter({
  orientation,
  firstPane,
  secondPane,
  initialSize,
  initialRatio,
  minFirstSize = 0,
  maxFirstSize = Infinity,
  minSecondSize = 0,
  maxSecondSize = Infinity,
  handleThickness = DEFAULT_HANDLE_THICKNESS,
  onResize,
  className,
  xName,
}: SplitterProps) {
  const isHorizontal = orientation === 'horizontal'

  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const containerMarker = `splitter-instance-${instanceId}`
  const handleMarker = `splitter-handle-instance-${instanceId}`
  const containerRef = useRef<HTMLElement | null>(null)
  const handleRef = useRef<HTMLElement | null>(null)

  const dragStart = useRef<{ pointerStart: number; sizeStart: number } | null>(null)
  const [firstSize, setFirstSize] = useState<number | null>(initialSize ?? null)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Kept current every render so the listeners below (attached once) always see fresh values.
  const latest = useRef({
    isHorizontal,
    firstSize,
    minFirstSize,
    maxFirstSize,
    minSecondSize,
    maxSecondSize,
    handleThickness,
    onResize,
  })
  latest.current = {
    isHorizontal,
    firstSize,
    minFirstSize,
    maxFirstSize,
    minSecondSize,
    maxSecondSize,
    handleThickness,
    onResize,
  }

  // Locates the container/handle DOM nodes ContentView rendered, by marker class, before paint —
  // the ref-forwarding ContentView doesn't provide.
  useLayoutEffect(() => {
    containerRef.current = document.querySelector<HTMLElement>(`.${containerMarker}`)
    handleRef.current = document.querySelector<HTMLElement>(`.${handleMarker}`)
  })

  /** Clamps a candidate first-pane size against both panes' min/max props and the container's
   * current size (so the second pane can never be squeezed past its own bounds). */
  const clamp = (size: number): number => {
    const { isHorizontal, minFirstSize, maxFirstSize, minSecondSize, maxSecondSize, handleThickness } =
      latest.current
    const containerSize = isHorizontal
      ? (containerRef.current?.clientWidth ?? Infinity)
      : (containerRef.current?.clientHeight ?? Infinity)
    const maxAgainstSecond = containerSize - handleThickness - minSecondSize
    const minAgainstSecond = containerSize - handleThickness - maxSecondSize
    const lo = Math.max(minFirstSize, minAgainstSecond)
    const hi = Math.min(maxFirstSize, maxAgainstSecond)
    return Math.min(Math.max(size, lo), hi)
  }

  // Applies `initialRatio` exactly once, from the container's real measured size — runs after the
  // effect above (same `useLayoutEffect` queue, declaration order), so `containerRef.current` is
  // already set by the time this reads it.
  useLayoutEffect(() => {
    if (initialSize != null || initialRatio == null) return
    const container = containerRef.current
    if (!container) return
    const containerSize = isHorizontal ? container.clientWidth : container.clientHeight
    if (containerSize > 0) setFirstSize(clamp(containerSize * initialRatio))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-time initial sizing, not a live binding
  }, [])

  // Attaches the drag handlers natively, once, to the handle's DOM node. Attached via
  // addEventListener rather than React props (ContentView doesn't expose onPointerDown/Move/Up),
  // and via setPointerCapture on the handle so a fast drag can't outrun its thin hit area.
  useEffect(() => {
    const handle = handleRef.current
    if (!handle) return

    const onPointerDown = (event: PointerEvent) => {
      handle.setPointerCapture(event.pointerId)
      setIsDragging(true)
      const { isHorizontal, firstSize, handleThickness } = latest.current
      const containerSize = isHorizontal
        ? (containerRef.current?.clientWidth ?? 0)
        : (containerRef.current?.clientHeight ?? 0)
      // `firstSize` is already the exact rendered size once the user has dragged before; before
      // that, the pane is still at its unmeasured CSS default, so that default is computed from
      // the container instead. Both panes render `flex: 1 1 50%` before any drag (see JSX below)
      // specifically so this estimate exactly matches the real rendered size — a mismatch here
      // would make the first drag jump instead of continuing smoothly from the current layout.
      dragStart.current = {
        pointerStart: isHorizontal ? event.clientX : event.clientY,
        sizeStart: firstSize ?? (containerSize - handleThickness) / 2,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragStart.current) return
      const { isHorizontal, onResize } = latest.current
      const pointerNow = isHorizontal ? event.clientX : event.clientY
      const delta = pointerNow - dragStart.current.pointerStart
      const next = clamp(dragStart.current.sizeStart + delta)
      setFirstSize(next)
      onResize?.(next)
    }

    const onPointerUp = () => {
      dragStart.current = null
      setIsDragging(false)
    }

    // Hover/drag highlight: BoxView sets its background inline (from `Color`), which a CSS
    // `:hover` rule can't win against, so it's tracked as state and fed back into `Color` below.
    const onPointerEnter = () => setIsHovering(true)
    const onPointerLeave = () => setIsHovering(false)

    handle.addEventListener('pointerdown', onPointerDown)
    handle.addEventListener('pointermove', onPointerMove)
    handle.addEventListener('pointerup', onPointerUp)
    handle.addEventListener('pointercancel', onPointerUp)
    handle.addEventListener('pointerenter', onPointerEnter)
    handle.addEventListener('pointerleave', onPointerLeave)
    return () => {
      handle.removeEventListener('pointerdown', onPointerDown)
      handle.removeEventListener('pointermove', onPointerMove)
      handle.removeEventListener('pointerup', onPointerUp)
      handle.removeEventListener('pointercancel', onPointerUp)
      handle.removeEventListener('pointerenter', onPointerEnter)
      handle.removeEventListener('pointerleave', onPointerLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reads fresh values via `latest`
  }, [])

  const rootClassName = cx('splitter', isHorizontal ? 'splitter-horizontal' : 'splitter-vertical', containerMarker, className)

  return (
    <ContentView className={rootClassName} xName={xName}>
      <ScrollView
        Orientation="Both"
        className="splitter-pane"
        style={firstSize != null ? { flex: `0 0 ${firstSize}px` } : { flex: '1 1 50%' }}
      >
        {firstPane}
      </ScrollView>

      <BoxView
        className={`splitter-handle ${handleMarker}`}
        style={isHorizontal ? { width: handleThickness } : { height: handleThickness }}
        Color={isHovering || isDragging ? HANDLE_COLOR_ACTIVE : HANDLE_COLOR}
      />

      <ScrollView Orientation="Both" className="splitter-pane" style={{ flex: '1 1 50%' }}>
        {secondPane}
      </ScrollView>
    </ContentView>
  )
}
