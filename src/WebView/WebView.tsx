import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Renders HTML/web content.
 *
 * | native | here |
 * | --- | --- |
 * | `Source` (`UrlWebViewSource` / `HtmlWebViewSource`) | `Source` — a URL string, or `{ Html }` |
 * | `Navigated` | `onNavigated` (iframe load) |
 */
export interface WebViewProps extends ViewProps {
  Source?: string | { Html: string; BaseUrl?: string }
  onNavigated?: () => void
  Title?: string
}

export default function WebView(props: WebViewProps) {
  const { Source, onNavigated, Title, className, ...view } = props
  const html = Source && typeof Source === 'object' ? Source.Html : undefined
  const src = typeof Source === 'string' ? Source : undefined

  return (
    <iframe
      className={cx('fluid-webview', className)}
      style={viewStyle(view as ViewProps)}
      src={src}
      srcDoc={html}
      title={Title ?? 'WebView'}
      onLoad={onNavigated}
      {...xNameAttr(view)}
    />
  )
}
