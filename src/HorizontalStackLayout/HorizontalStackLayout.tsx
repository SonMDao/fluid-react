import type { Ref } from 'react'
import { cx, interactionAttrs, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import { stackStyle } from '../StackLayout/StackLayout'
import './style.css'

/**
 * A `StackLayout` locked to horizontal, default `Spacing` 0.
 *
 * | native | here |
 * | --- | --- |
 * | `Spacing` (0 default) | `Spacing` |
 */
export interface HorizontalStackLayoutProps extends ViewProps {
  Spacing?: number
  /** Forwarded to the rendered `<div>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLDivElement>
}

export default function HorizontalStackLayout(props: HorizontalStackLayoutProps) {
  const { Spacing = 0, className, children, ref, ...view } = props
  return (
    <div
      ref={ref}
      className={cx('fluid-hstack', className)}
      style={stackStyle('Horizontal', Spacing, view as ViewProps)}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {children}
    </div>
  )
}
