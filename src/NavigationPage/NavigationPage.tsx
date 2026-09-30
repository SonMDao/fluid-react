import type { CSSProperties, ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A stack-based push/pop navigation container.
 *
 * | native | here |
 * | --- | --- |
 * | `RootPage` / current page | `children` (route your own stack via the app router) |
 * | `BarBackgroundColor` | `BarBackgroundColor` |
 * | `BarTextColor` | `BarTextColor` |
 * | `Title` (of the current page) | `Title` |
 * | `HasNavigationBar` | `HasNavigationBar` (default `true`) |
 * | back button | `onBack` (rendered when provided) |
 *
 * This is a presentational shell — the actual page stack is the browser history
 * (`history.pushState`), owned by the app's router.
 */
export interface NavigationPageProps extends ViewProps {
  Title?: string
  BarBackgroundColor?: string
  BarTextColor?: string
  HasNavigationBar?: boolean
  onBack?: () => void
  ToolbarItems?: ReactNode
}

export default function NavigationPage(props: NavigationPageProps) {
  const {
    Title,
    BarBackgroundColor,
    BarTextColor,
    HasNavigationBar = true,
    onBack,
    ToolbarItems,
    className,
    children,
    ...view
  } = props

  const barStyle: CSSProperties = { background: BarBackgroundColor, color: BarTextColor }

  return (
    <div className={cx('fluid-navigationpage', className)} style={viewStyle(view as ViewProps)} {...xNameAttr(view)}>
      {HasNavigationBar && (
        <div className="fluid-navigationpage-bar" style={barStyle}>
          {onBack && (
            <button type="button" className="fluid-navigationpage-back" onClick={onBack} aria-label="Back">
              &#8249;
            </button>
          )}
          <span className="fluid-navigationpage-title">{Title}</span>
          <div className="fluid-navigationpage-toolbar">{ToolbarItems}</div>
        </div>
      )}
      <div className="fluid-navigationpage-body">{children}</div>
    </div>
  )
}
