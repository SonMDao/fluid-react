import { cx } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import './style.css'

/**
 * A closed shape from a list of connected points.
 *
 * | native | here |
 * | --- | --- |
 * | `Points` (`"0,0 10,0 5,10"`) | `Points` — a string or `[x, y][]` |
 * | `FillRule` (`EvenOdd`/`Nonzero`) | `FillRule` |
 * | `Fill` / `Stroke` / `StrokeThickness` / `StrokeDashArray` / `StrokeLineJoin` | via `ShapeProps` |
 */
export interface PolygonProps extends ShapeProps {
  Points: string | Array<[number, number]>
  FillRule?: 'EvenOdd' | 'Nonzero'
}

export function normalizePoints(points: string | Array<[number, number]>): Array<[number, number]> {
  if (Array.isArray(points)) return points
  return points
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(',').map(Number) as [number, number])
}

export function boundsViewBox(pts: Array<[number, number]>, pad = 0): string {
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  return `${minX} ${minY} ${Math.max(...xs) - minX + pad} ${Math.max(...ys) - minY + pad}`
}

export default function Polygon(props: PolygonProps) {
  const { Points, FillRule, className, ...shape } = props
  const pts = normalizePoints(Points)
  const pad = (shape.StrokeThickness ?? 0) / 2

  return (
    <ShapeSvg view={shape} viewBox={boundsViewBox(pts, pad)} className={cx('fluid-polygon', className)}>
      <polygon
        points={pts.map((p) => p.join(',')).join(' ')}
        fillRule={FillRule === 'EvenOdd' ? 'evenodd' : 'nonzero'}
        vectorEffect="non-scaling-stroke"
        {...shapeAttrs(shape)}
      />
    </ShapeSvg>
  )
}
