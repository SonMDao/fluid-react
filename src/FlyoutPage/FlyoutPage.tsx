import type { ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A master/detail page with a slide-out flyout menu.
 *
 * | native | here |
 * | --- | --- |
 * | `Flyout` | `Flyout` |
 * | `Detail` | `Detail` or `children` |
 * | `IsPresented` | `IsPresented` (controlled) |
 * | `IsPresentedChanged` | `onIsPresentedChanged(value)` |
 * | `FlyoutLayoutBehavior` (`Popover`/`Split`/`SplitOnLandscape`…) | `FlyoutLayoutBehavior` — `Popover` (overlay) or `Split` (side by side) |
 * | `FlyoutWidth` | `FlyoutWidth` (default 300) |
 */
export interface FlyoutPageProps extends ViewProps {
  Flyout: ReactNode
  Detail?: ReactNode
  IsPresented?: boolean
  onIsPresentedChanged?: (value: boolean) => void
  FlyoutLayoutBehavior?: 'Popover' | 'Split'
  FlyoutWidth?: number
}

export default function FlyoutPage(props: FlyoutPageProps) {
  const {
    Flyout,
    Detail,
    IsPresented = false,
    onIsPresentedChanged,
    FlyoutLayoutBehavior = 'Popover',
    FlyoutWidth = 300,
    className,
    children,
    ...view
  } = props

  const split = FlyoutLayoutBehavior === 'Split'

  return (
    <div
      className={cx('fluid-flyoutpage', split ? 'fluid-flyoutpage-split' : 'fluid-flyoutpage-popover', className)}
      style={viewStyle(view as ViewProps)}
      {...xNameAttr(view)}
    >
      <aside
        className={cx('fluid-flyoutpage-flyout', (IsPresented || split) && 'fluid-flyoutpage-flyout-open')}
        style={{ width: `${FlyoutWidth}px` }}
      >
        {Flyout}
      </aside>

      {!split && IsPresented && (
        <div className="fluid-flyoutpage-scrim" onClick={() => onIsPresentedChanged?.(false)} />
      )}

      <section className="fluid-flyoutpage-detail">{Detail ?? children}</section>
    </div>
  )
}
