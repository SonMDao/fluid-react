import type { CSSProperties, ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Positions children at explicit coordinates and sizes.
 *
 * | native | here |
 * | --- | --- |
 * | `AbsoluteLayout.LayoutBounds="x,y,w,h"` (attached) | `<AbsoluteLayout.Child LayoutBounds={[x,y,w,h]}>` |
 * | `AbsoluteLayout.LayoutFlags` (attached) | `LayoutFlags` on the child — `"None"`, `"All"`, or any of `"XProportional,YProportional,WidthProportional,HeightProportional,PositionProportional,SizeProportional"` |
 *
 * Proportional values are `0..1` of the layout's size (rendered as `%`); absolute values are px.
 */
export type LayoutFlag =
  | 'None'
  | 'All'
  | 'XProportional'
  | 'YProportional'
  | 'WidthProportional'
  | 'HeightProportional'
  | 'PositionProportional'
  | 'SizeProportional'

export default function AbsoluteLayout(props: ViewProps) {
  const { className, children, ...view } = props
  return (
    <div
      className={cx('fluid-absolutelayout', className)}
      style={{ position: 'relative', ...viewStyle(view as ViewProps) }}
      onClick={view.onClick}
      {...xNameAttr(view)}
    >
      {children}
    </div>
  )
}

export interface AbsoluteChildProps {
  /** `[x, y, width, height]` — `AutoSize` (`-1`) for w/h means "size to content". */
  LayoutBounds: [number, number, number?, number?]
  LayoutFlags?: LayoutFlag | LayoutFlag[]
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function has(flags: LayoutFlag[], ...names: LayoutFlag[]): boolean {
  if (flags.includes('All')) return true
  if (flags.includes('PositionProportional') && (names.includes('XProportional') || names.includes('YProportional')))
    return true
  if (flags.includes('SizeProportional') && (names.includes('WidthProportional') || names.includes('HeightProportional')))
    return true
  return names.some((n) => flags.includes(n))
}

export function AbsoluteChild({ LayoutBounds, LayoutFlags = 'None', className, style, children }: AbsoluteChildProps) {
  const flags = Array.isArray(LayoutFlags) ? LayoutFlags : [LayoutFlags]
  const [x, y, w, h] = LayoutBounds

  const px = (v: number, proportional: boolean) => (proportional ? `${v * 100}%` : `${v}px`)

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: px(x, has(flags, 'XProportional')),
        top: px(y, has(flags, 'YProportional')),
        width: w == null || w < 0 ? 'auto' : px(w, has(flags, 'WidthProportional')),
        height: h == null || h < 0 ? 'auto' : px(h, has(flags, 'HeightProportional')),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

AbsoluteLayout.Child = AbsoluteChild
