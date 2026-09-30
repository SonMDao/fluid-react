import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { cx, thickness, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A single screen hosting one root view.
 *
 * | native | here |
 * | --- | --- |
 * | `Title` | `Title` (also sets `document.title` when `SetsDocumentTitle`) |
 * | `Content` | `Content` or `children` |
 * | `ToolbarItems` | `ToolbarItems` — rendered in a top bar only when provided |
 * | `BackgroundColor` | `BackgroundColor` |
 * | `Padding` | `Padding` |
 *
 * Fills its host: a full-height flex column, so a child with `VerticalOptions="FillAndExpand"`
 * (or `flex: 1`) takes the remaining space and scrolls within itself.
 */
export interface ToolbarItem {
  Text?: string
  IconImageSource?: string
  Command?: () => void
  Order?: 'Primary' | 'Secondary'
}

export interface ContentPageProps extends ViewProps {
  Title?: string
  Content?: ReactNode
  ToolbarItems?: ToolbarItem[]
  SetsDocumentTitle?: boolean
}

export default function ContentPage(props: ContentPageProps) {
  const { Title, Content, ToolbarItems, SetsDocumentTitle, Padding, className, children, ...view } = props

  useEffect(() => {
    if (SetsDocumentTitle && Title && typeof document !== 'undefined') document.title = Title
  }, [SetsDocumentTitle, Title])

  const style: CSSProperties = {
    padding: thickness(Padding),
    ...viewStyle({ ...view, Padding: undefined } as ViewProps),
  }

  return (
    <main className={cx('fluid-contentpage', className)} style={style} {...xNameAttr(view)}>
      {(Title || ToolbarItems?.length) && (
        <header className="fluid-contentpage-bar">
          <span className="fluid-contentpage-title">{Title}</span>
          {ToolbarItems && ToolbarItems.length > 0 && (
            <div className="fluid-contentpage-toolbar">
              {ToolbarItems.map((item, index) => (
                <button key={index} type="button" className="fluid-contentpage-toolbar-item" onClick={item.Command}>
                  {item.IconImageSource ? <img src={item.IconImageSource} alt={item.Text ?? ''} /> : item.Text}
                </button>
              ))}
            </div>
          )}
        </header>
      )}
      <div className="fluid-contentpage-content">{Content ?? children}</div>
    </main>
  )
}
