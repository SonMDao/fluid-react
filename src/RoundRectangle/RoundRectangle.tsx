import { cx, thickness, type Thickness } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import './style.css'

/**
 * A rectangle with independently roundable corners, most often used as a `Border.StrokeShape`.
 *
 * | native | here |
 * | --- | --- |
 * | `CornerRadius` (uniform, or `"tl,tr,br,bl"`) | `CornerRadius` — a number or `[tl, tr, br, bl]` / `"tl,tr,br,bl"` |
 * | `Fill` / `Stroke` / `StrokeThickness` / `StrokeDashArray` | via `ShapeProps` |
 * | `WidthRequest` / `HeightRequest` | size the box (default 100×100) |
 */
export interface RoundRectangleProps extends ShapeProps {
  CornerRadius?: number | Thickness
}

function corners(radius: number | Thickness | undefined): [number, number, number, number] {
  if (radius == null) return [0, 0, 0, 0]
  if (typeof radius === 'number') return [radius, radius, radius, radius]
  if (Array.isArray(radius) && radius.length === 4) return radius as [number, number, number, number]
  const parts = String(thickness(radius) ?? '0')
    .replace(/px/g, '')
    .split(/\s+/)
    .map(Number)
  const [a = 0, b = a, c = a, d = b] = parts
  return [a, b, c, d]
}

export default function RoundRectangle(props: RoundRectangleProps) {
  const { CornerRadius, className, ...shape } = props
  const w = Number(shape.WidthRequest) || 100
  const h = Number(shape.HeightRequest) || 100
  const sw = shape.StrokeThickness ?? (shape.Stroke ? 1 : 0)
  const [tl, tr, br, bl] = corners(CornerRadius)
  const i = sw / 2
  const x0 = i
  const y0 = i
  const x1 = w - i
  const y1 = h - i

  const d = [
    `M ${x0 + tl} ${y0}`,
    `L ${x1 - tr} ${y0}`,
    tr ? `A ${tr} ${tr} 0 0 1 ${x1} ${y0 + tr}` : '',
    `L ${x1} ${y1 - br}`,
    br ? `A ${br} ${br} 0 0 1 ${x1 - br} ${y1}` : '',
    `L ${x0 + bl} ${y1}`,
    bl ? `A ${bl} ${bl} 0 0 1 ${x0} ${y1 - bl}` : '',
    `L ${x0} ${y0 + tl}`,
    tl ? `A ${tl} ${tl} 0 0 1 ${x0 + tl} ${y0}` : '',
    'Z',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <ShapeSvg view={shape} viewBox={`0 0 ${w} ${h}`} className={cx('fluid-roundrectangle', className)}>
      <path d={d} vectorEffect="non-scaling-stroke" {...shapeAttrs({ Fill: '#000', ...shape })} />
    </ShapeSvg>
  )
}
