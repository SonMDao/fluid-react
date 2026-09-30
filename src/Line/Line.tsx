import { cx } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import './style.css'

/**
 * A straight line segment between two points.
 *
 * | native | here |
 * | --- | --- |
 * | `X1` / `Y1` / `X2` / `Y2` | same |
 * | `Stroke` / `StrokeThickness` / `StrokeDashArray` / `StrokeLineCap` | via `ShapeProps` |
 */
export interface LineProps extends ShapeProps {
  X1?: number
  Y1?: number
  X2?: number
  Y2?: number
}

export default function Line(props: LineProps) {
  const { X1 = 0, Y1 = 0, X2 = 0, Y2 = 0, className, ...shape } = props
  const pad = (shape.StrokeThickness ?? 1) / 2 + 1
  const minX = Math.min(X1, X2) - pad
  const minY = Math.min(Y1, Y2) - pad
  const w = Math.abs(X2 - X1) + pad * 2
  const h = Math.abs(Y2 - Y1) + pad * 2

  return (
    <ShapeSvg view={shape} viewBox={`${minX} ${minY} ${w} ${h}`} className={cx('fluid-line', className)}>
      <line
        x1={X1}
        y1={Y1}
        x2={X2}
        y2={Y2}
        vectorEffect="non-scaling-stroke"
        {...shapeAttrs({ Stroke: '#000', ...shape })}
      />
    </ShapeSvg>
  )
}
