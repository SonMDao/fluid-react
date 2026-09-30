import type { CSSProperties, Ref } from 'react'
import {
  alignment,
  cx,
  interactionAttrs,
  viewStyle,
  xNameAttr,
  type LayoutOptions,
  type Orientation,
  type ViewProps,
} from '../Shared/fluid-shared'
import './style.css'

/**
 * Stacks children in a single direction.
 *
 * | native | here |
 * | --- | --- |
 * | `Orientation` (`Vertical` default) | `Orientation` |
 * | `Spacing` (6 default) | `Spacing` |
 *
 * Children stretch on the cross axis unless they set `HorizontalOptions`/`VerticalOptions`.
 * `VerticalStackLayout` / `HorizontalStackLayout` are the orientation-locked variants (Spacing 0).
 */
export interface StackLayoutProps extends ViewProps {
  Orientation?: Orientation
  Spacing?: number
  /** Forwarded to the rendered `<div>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLDivElement>
}

export function stackStyle(
  orientation: Orientation,
  spacing: number,
  view: ViewProps,
  crossFill = true,
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: orientation === 'Horizontal' ? 'row' : 'column',
    gap: `${spacing}px`,
    alignItems:
      alignment(orientation === 'Horizontal' ? view.VerticalOptions : view.HorizontalOptions) ??
      (crossFill ? 'stretch' : 'flex-start'),
    justifyContent: alignment(orientation === 'Horizontal' ? view.HorizontalOptions : view.VerticalOptions),
    ...viewStyle(view),
  }
}

export default function StackLayout(props: StackLayoutProps) {
  const { Orientation: orientation = 'Vertical', Spacing = 6, className, children, ref, ...view } = props
  // HorizontalOptions/VerticalOptions on a layout describe how *it* sits in its own parent, but
  // they also drive child alignment here; keep the self-alignment behaviour from viewStyle and
  // let stackStyle read the same values for align-items.
  const selfView = { ...view } as ViewProps
  return (
    <div
      ref={ref}
      className={cx('fluid-stacklayout', className)}
      style={stackStyle(orientation, Spacing, selfView)}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {children}
    </div>
  )
}

export type { LayoutOptions }
