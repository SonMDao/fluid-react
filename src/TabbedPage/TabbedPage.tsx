import type { CSSProperties, ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A page with a tab bar switching child pages.
 *
 * | native | here |
 * | --- | --- |
 * | `Children` (each a `ContentPage` with `Title` / `IconImageSource`) | `Pages` — `{ Title, IconImageSource, content }[]` |
 * | `SelectedItem` / `CurrentPage` | `SelectedIndex` (controlled) |
 * | `CurrentPageChanged` | `onSelectedIndexChanged(index)` |
 * | `BarBackgroundColor` / `BarTextColor` | same |
 * | `SelectedTabColor` / `UnselectedTabColor` | same |
 * | tab bar position | `TabPlacement` — `Bottom` (default) or `Top` |
 */
export interface TabbedPageTab {
  Title: string
  IconImageSource?: string
  content: ReactNode
}

export interface TabbedPageProps extends ViewProps {
  Pages: TabbedPageTab[]
  SelectedIndex?: number
  onSelectedIndexChanged?: (index: number) => void
  BarBackgroundColor?: string
  BarTextColor?: string
  SelectedTabColor?: string
  UnselectedTabColor?: string
  TabPlacement?: 'Bottom' | 'Top'
}

export default function TabbedPage(props: TabbedPageProps) {
  const {
    Pages,
    SelectedIndex = 0,
    onSelectedIndexChanged,
    BarBackgroundColor,
    BarTextColor,
    SelectedTabColor,
    UnselectedTabColor,
    TabPlacement = 'Bottom',
    className,
    ...view
  } = props

  const barStyle: CSSProperties = { background: BarBackgroundColor, color: BarTextColor }

  const bar = (
    <div className="fluid-tabbedpage-bar" style={barStyle} role="tablist">
      {Pages.map((tab, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === SelectedIndex}
          className={cx('fluid-tabbedpage-tab', index === SelectedIndex && 'fluid-tabbedpage-tab-selected')}
          style={{ color: index === SelectedIndex ? SelectedTabColor : UnselectedTabColor }}
          onClick={() => onSelectedIndexChanged?.(index)}
        >
          {tab.IconImageSource && <img src={tab.IconImageSource} alt="" />}
          <span>{tab.Title}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div
      className={cx('fluid-tabbedpage', `fluid-tabbedpage-${TabPlacement.toLowerCase()}`, className)}
      style={viewStyle(view as ViewProps)}
      {...xNameAttr(view)}
    >
      {TabPlacement === 'Top' && bar}
      <div className="fluid-tabbedpage-body" role="tabpanel">
        {Pages[SelectedIndex]?.content}
      </div>
      {TabPlacement === 'Bottom' && bar}
    </div>
  )
}
