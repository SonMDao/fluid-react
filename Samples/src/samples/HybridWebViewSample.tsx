import { Label, StackLayout, HybridWebView } from '@Fluid'

/**
 * A tiny inline page for the frame to display in the sample (the real hybrid app would ship
 * `wwwroot/index.html`; here `Source` supplies the frame content directly so the control renders
 * self-contained). Passed as `Source` content data (not app JSX).
 */
const FRAME_PAGE =
  '<!doctype html><html><head><meta charset="utf-8"><style>' +
  'body{margin:0;font-family:system-ui,sans-serif;color:#737373;background:#fafafa}' +
  '.card{margin:24px auto;max-width:280px;padding:20px;border:1px solid #e9e9e7;border-radius:12px;background:#fff}' +
  'h1{font-size:16px;margin:0 0 8px}p{font-size:13px;margin:0;line-height:1.5}' +
  '</style></head><body><div class="card">' +
  '<h1>HybridWebView</h1><p>This is the hybrid frame. A native app here would post raw messages to it and invoke its JavaScript.</p>' +
  '</div></body></html>'

/**
 * `HybridWebView` sample — an embedded hybrid (web + native bridge) view, showing `HybridRoot`/
 * `DefaultFile` (the frame location in a real app), `Source` (frame content), `onRawMessageReceived`
 * (the postMessage bridge callback), and `HeightRequest`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function HybridWebViewSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label
        Text="HybridWebView — HybridRoot=&quot;wwwroot&quot;, DefaultFile=&quot;index.html&quot;, Source, onRawMessageReceived"
        FontSize="var(--text-sm)"
        TextColor="var(--text-muted)"
      />
      <HybridWebView
        HybridRoot="wwwroot"
        DefaultFile="index.html"
        Source={FRAME_PAGE}
        onRawMessageReceived={() => undefined}
        HeightRequest={220}
        Title="HybridWebView sample frame"
      />
    </StackLayout>
  )
}
