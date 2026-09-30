import { useState, type ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * The app's overall navigation shell (flyout + content).
 *
 * | native | here |
 * | --- | --- |
 * | `Shell.Items` / `FlyoutItem` / `ShellContent` | `Items` — `{ Title, Icon, Route, content }[]` |
 * | `CurrentItem` / `Shell.Current.GoToAsync` | `CurrentRoute` (controlled) + `onRouteChanged(route)` |
 * | `FlyoutBehavior` (`Flyout`/`Locked`/`Disabled`) | `FlyoutBehavior` |
 * | `FlyoutHeader` / `FlyoutFooter` | `FlyoutHeader` / `FlyoutFooter` |
 * | `FlyoutBackgroundColor` | `FlyoutBackgroundColor` |
 *
 * A thin, presentational app shell — for anything beyond a flyout + routed content, compose the
 * app's real router with `FlyoutPage` / `TabbedPage`.
 */
export interface ShellItem {
  Title: string
  Icon?: string
  Route: string
  content: ReactNode
}

export interface ShellProps extends ViewProps {
  Items: ShellItem[]
  CurrentRoute?: string
  onRouteChanged?: (route: string) => void
  FlyoutBehavior?: 'Flyout' | 'Locked' | 'Disabled'
  FlyoutHeader?: ReactNode
  FlyoutFooter?: ReactNode
  FlyoutBackgroundColor?: string
  FlyoutWidth?: number
}

export default function Shell(props: ShellProps) {
  const {
    Items,
    CurrentRoute,
    onRouteChanged,
    FlyoutBehavior = 'Flyout',
    FlyoutHeader,
    FlyoutFooter,
    FlyoutBackgroundColor,
    FlyoutWidth = 280,
    className,
    ...view
  } = props

  const [open, setOpen] = useState(false)
  const locked = FlyoutBehavior === 'Locked'
  const disabled = FlyoutBehavior === 'Disabled'
  const current = Items.find((item) => item.Route === CurrentRoute) ?? Items[0]

  return (
    <div
      className={cx('fluid-shell', locked && 'fluid-shell-locked', className)}
      style={viewStyle(view as ViewProps)}
      {...xNameAttr(view)}
    >
      {!disabled && (
        <aside
          className={cx('fluid-shell-flyout', (open || locked) && 'fluid-shell-flyout-open')}
          style={{ width: `${FlyoutWidth}px`, background: FlyoutBackgroundColor }}
        >
          {FlyoutHeader && <div className="fluid-shell-flyout-header">{FlyoutHeader}</div>}
          <nav className="fluid-shell-flyout-items">
            {Items.map((item) => (
              <button
                key={item.Route}
                type="button"
                className={cx('fluid-shell-flyout-item', item.Route === current?.Route && 'fluid-shell-flyout-item-active')}
                onClick={() => {
                  onRouteChanged?.(item.Route)
                  setOpen(false)
                }}
              >
                {item.Icon && <img src={item.Icon} alt="" />}
                <span>{item.Title}</span>
              </button>
            ))}
          </nav>
          {FlyoutFooter && <div className="fluid-shell-flyout-footer">{FlyoutFooter}</div>}
        </aside>
      )}

      {!disabled && !locked && open && <div className="fluid-shell-scrim" onClick={() => setOpen(false)} />}

      <section className="fluid-shell-content">
        {!disabled && !locked && (
          <button type="button" className="fluid-shell-flyout-toggle" onClick={() => setOpen(true)} aria-label="Menu">
            &#9776;
          </button>
        )}
        {current?.content}
      </section>
    </div>
  )
}
