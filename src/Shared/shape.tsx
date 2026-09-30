import type { CSSProperties, ReactNode } from 'react'
import { viewStyle, xNameAttr, type ViewProps } from './fluid-shared'

/**
 * Shared plumbing for the native `Shapes` controls (`Polygon`, `Polyline`, `Path`, `Ellipse`,
 * `Rectangle`, `Line`, `RoundRectangle`). Each shape control is a self-contained `<svg>` wrapper —
 * usable standalone — around one SVG primitive.
 */
export type ShapeAspect = 'None' | 'Fill' | 'Uniform' | 'UniformToFill'

/** The `Shape` base properties every shape control shares (names match the native layout). */
export interface ShapeProps extends ViewProps {
  Fill?: string
  Stroke?: string
  StrokeThickness?: number
  StrokeDashArray?: string | number[]
  StrokeLineCap?: 'Flat' | 'Round' | 'Square'
  StrokeLineJoin?: 'Miter' | 'Bevel' | 'Round'
  Aspect?: ShapeAspect
}

const LINE_CAP: Record<string, string> = { Flat: 'butt', Round: 'round', Square: 'square' }
const PRESERVE: Record<ShapeAspect, string> = {
  None: 'none',
  Fill: 'none',
  Uniform: 'xMidYMid meet',
  UniformToFill: 'xMidYMid slice',
}

/** The SVG presentation attributes shared by every shape primitive. */
export interface ShapePresentation {
  fill: string
  stroke?: string
  strokeWidth: number
  strokeDasharray?: string
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeLinejoin?: 'miter' | 'bevel' | 'round'
}

/** SVG presentation attributes derived from the `Shape` base props. */
export function shapeAttrs(p: ShapeProps): ShapePresentation {
  const dash = Array.isArray(p.StrokeDashArray) ? p.StrokeDashArray.join(' ') : p.StrokeDashArray
  return {
    fill: p.Fill ?? 'none',
    stroke: p.Stroke,
    strokeWidth: p.StrokeThickness ?? (p.Stroke ? 1 : 0),
    strokeDasharray: dash,
    strokeLinecap: p.StrokeLineCap ? (LINE_CAP[p.StrokeLineCap] as 'butt' | 'round' | 'square') : undefined,
    strokeLinejoin: p.StrokeLineJoin
      ? (p.StrokeLineJoin.toLowerCase() as 'miter' | 'bevel' | 'round')
      : undefined,
  }
}

/** The `<svg>` host: applies `ViewProps` sizing + `Aspect` and a `viewBox`. */
export function ShapeSvg(props: {
  view: ShapeProps
  viewBox: string
  className: string
  children: ReactNode
}) {
  const { view, viewBox, className, children } = props
  const style: CSSProperties = { overflow: 'visible', ...viewStyle(view as ViewProps) }
  return (
    <svg
      className={className}
      style={style}
      viewBox={viewBox}
      preserveAspectRatio={PRESERVE[view.Aspect ?? 'None']}
      xmlns="http://www.w3.org/2000/svg"
      onClick={view.onClick}
      {...xNameAttr(view)}
    >
      {children}
    </svg>
  )
}
