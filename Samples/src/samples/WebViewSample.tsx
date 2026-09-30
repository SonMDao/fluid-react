import { Label, StackLayout, WebView } from '@Fluid'

/** The page the `WebView` displays — passed as `Source={{Html}}` content data (not app JSX). */
const PAGE_HTML =
  '<!doctype html><html><head><meta charset="utf-8"><style>' +
  'body{margin:0;font-family:system-ui,sans-serif;color:#737373;background:#fafafa}' +
  '.card{margin:24px auto;max-width:280px;padding:20px;border:1px solid #e9e9e7;border-radius:12px;background:#fff}' +
  'h1{font-size:16px;margin:0 0 8px}p{font-size:13px;margin:0;line-height:1.5}' +
  '</style></head><body><div class="card">' +
  '<h1>WebView</h1><p>This page is HTML content supplied to the WebView through its Source property, displayed inside the control.</p>' +
  '</div></body></html>'

/**
 * `WebView` sample — an embedded web view, showing `Source={{Html}}` (inline page content),
 * `HeightRequest`, and `onNavigated`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function WebViewSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="WebView — Source={{Html}}, HeightRequest" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <WebView Source={{ Html: PAGE_HTML }} HeightRequest={220} Title="WebView sample page" />
    </StackLayout>
  )
}
