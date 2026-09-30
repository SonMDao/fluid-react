import { cx } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import './style.css'

/**
 * Fills its layout box with a rectangle.
 *
 * | native | here |
 * | --- | --- |
 * | `RadiusX` / `RadiusY` | `RadiusX` / `RadiusY` |
 * | `Fill` / `Stroke` / `StrokeThickness` / `StrokeDashArray` / `StrokeLineJoin` | via `ShapeProps` |
 * | `WidthRequest` / `HeightRequest` | size the box (default 100×100) |
 */
export interface RectangleProps extends ShapeProps {
  RadiusX?: number
  RadiusY?: number
}

export default function Rectangle(props: RectangleProps) {
  const { RadiusX, RadiusY, className, ...shape } = props
  const w = Number(shape.WidthRequest) || 100
  const h = Number(shape.HeightRequest) || 100
  const sw = shape.StrokeThickness ?? (shape.Stroke ? 1 : 0)

  return (
    <ShapeSvg view={shape} viewBox={`0 0 ${w} ${h}`} className={cx('fluid-rectangle', className)}>
      <rect
        x={sw / 2}
        y={sw / 2}
        width={Math.max(0, w - sw)}
        height={Math.max(0, h - sw)}
        rx={RadiusX}
        ry={RadiusY ?? RadiusX}
        vectorEffect="non-scaling-stroke"
        {...shapeAttrs({ Fill: '#000', ...shape })}
      />
    </ShapeSvg>
  )
}
