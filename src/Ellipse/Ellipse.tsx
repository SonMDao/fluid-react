import { cx } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import './style.css'

/**
 * Fills its layout box with an ellipse.
 *
 * | native | here |
 * | --- | --- |
 * | `Fill` / `Stroke` / `StrokeThickness` / `StrokeDashArray` | via `ShapeProps` |
 * | `WidthRequest` / `HeightRequest` | size the box (default 100×100) |
 */
export type EllipseProps = ShapeProps

export default function Ellipse(props: EllipseProps) {
  const { className, ...shape } = props
  const w = Number(shape.WidthRequest) || 100
  const h = Number(shape.HeightRequest) || 100
  const sw = shape.StrokeThickness ?? (shape.Stroke ? 1 : 0)

  return (
    <ShapeSvg view={shape} viewBox={`0 0 ${w} ${h}`} className={cx('fluid-ellipse', className)}>
      <ellipse
        cx={w / 2}
        cy={h / 2}
        rx={Math.max(0, w / 2 - sw / 2)}
        ry={Math.max(0, h / 2 - sw / 2)}
        vectorEffect="non-scaling-stroke"
        {...shapeAttrs({ Fill: '#000', ...shape })}
      />
    </ShapeSvg>
  )
}
