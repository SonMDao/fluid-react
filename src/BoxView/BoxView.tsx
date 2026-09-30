import type { CSSProperties, Ref } from 'react'
import { cx, interactionAttrs, thickness, viewStyle, xNameAttr, type Thickness, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A solid-colour rectangle.
 *
 * | native | here |
 * | --- | --- |
 * | `Color` | `Color` |
 * | `CornerRadius` (uniform or `"tl,tr,bl,br"`) | `CornerRadius` |
 */
export interface BoxViewProps extends ViewProps {
  Color?: string
  CornerRadius?: number | Thickness
  /** Forwarded to the rendered `<div>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLDivElement>
}

export default function BoxView(props: BoxViewProps) {
  const { Color = '#000', CornerRadius, className, ref, ...view } = props

  const style: CSSProperties = {
    background: Color,
    borderRadius: typeof CornerRadius === 'number' ? `${CornerRadius}px` : thickness(CornerRadius),
    ...viewStyle(view as ViewProps),
  }

  return (
    <div
      ref={ref}
      className={cx('fluid-boxview', className)}
      style={style}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    />
  )
}
