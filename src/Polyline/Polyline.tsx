import { cx } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import { boundsViewBox, normalizePoints } from '../Polygon/Polygon'
import './style.css'

/**
 * An open (unclosed) run of connected line segments.
 *
 * | native | here |
 * | --- | --- |
 * | `Points` | `Points` — a string or `[x, y][]` |
 * | `FillRule` | `FillRule` |
 * | `Fill` / `Stroke` / `StrokeThickness` / `StrokeDashArray` / `StrokeLineCap` / `StrokeLineJoin` | via `ShapeProps` |
 */
export interface PolylineProps extends ShapeProps {
  Points: string | Array<[number, number]>
  FillRule?: 'EvenOdd' | 'Nonzero'
}

export default function Polyline(props: PolylineProps) {
  const { Points, FillRule, className, ...shape } = props
  const pts = normalizePoints(Points)
  const pad = (shape.StrokeThickness ?? 0) / 2

  return (
    <ShapeSvg view={shape} viewBox={boundsViewBox(pts, pad)} className={cx('fluid-polyline', className)}>
      <polyline
        points={pts.map((p) => p.join(',')).join(' ')}
        fillRule={FillRule === 'EvenOdd' ? 'evenodd' : 'nonzero'}
        vectorEffect="non-scaling-stroke"
        {...shapeAttrs({ Stroke: '#000', ...shape })}
      />
    </ShapeSvg>
  )
}
