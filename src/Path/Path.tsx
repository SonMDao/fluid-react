import { cx } from '../Shared/fluid-shared'
import { ShapeSvg, shapeAttrs, type ShapeProps } from '../Shared/shape'
import './style.css'

/**
 * A vector path drawn from path data.
 *
 * | native | here |
 * | --- | --- |
 * | `Data` (path mini-language — a superset of SVG's `d`) | `Data` (pass SVG path syntax) |
 * | `ViewBox` | `ViewBox` — `"minX minY width height"` (defaults to `WidthRequest`/`HeightRequest` or `0 0 100 100`) |
 * | `FillRule` | `FillRule` |
 * | `Fill` / `Stroke` / `StrokeThickness` / `StrokeDashArray` / `StrokeLineCap` / `StrokeLineJoin` | via `ShapeProps` |
 */
export interface PathProps extends ShapeProps {
  Data: string
  ViewBox?: string
  FillRule?: 'EvenOdd' | 'Nonzero'
}

export default function Path(props: PathProps) {
  const { Data, ViewBox, FillRule, className, ...shape } = props
  const viewBox =
    ViewBox ?? `0 0 ${Number(shape.WidthRequest) || 100} ${Number(shape.HeightRequest) || 100}`

  return (
    <ShapeSvg view={shape} viewBox={viewBox} className={cx('fluid-path', className)}>
      <path
        d={Data}
        fillRule={FillRule === 'EvenOdd' ? 'evenodd' : 'nonzero'}
        vectorEffect="non-scaling-stroke"
        {...shapeAttrs({ Fill: '#000', ...shape })}
      />
    </ShapeSvg>
  )
}
