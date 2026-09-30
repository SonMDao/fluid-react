import type { Ref } from 'react'
import { cx, interactionAttrs, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A single-child container, the base for custom controls.
 *
 * | native | here |
 * | --- | --- |
 * | `Content` | `Content` or `children` |
 * | `Padding` | `Padding` (via `ViewProps`) |
 *
 * Also accepts `ViewProps`' optional interaction pass-throughs (`onDoubleClick`/`onContextMenu`/
 * `onKeyDown`/drag events/`draggable`/`tabIndex`) for controls that need a custom-drawn interactive
 * row/container (e.g. a tree row or menu item) beyond the base `onClick` tap.
 */
export interface ContentViewProps extends ViewProps {
  Content?: React.ReactNode
  /** Forwarded to the rendered `<div>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLDivElement>
}

export default function ContentView(props: ContentViewProps) {
  const { Content, className, children, ref, ...view } = props
  return (
    <div
      ref={ref}
      className={cx('fluid-contentview', className)}
      style={viewStyle(view as ViewProps)}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {Content ?? children}
    </div>
  )
}
