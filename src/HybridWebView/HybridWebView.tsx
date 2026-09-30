import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A WebView with a bidirectional JS↔host bridge.
 *
 * | native | here |
 * | --- | --- |
 * | `HybridRoot` (default `"wwwroot"`) | `HybridRoot` — the folder the iframe is served from |
 * | `DefaultFile` (default `"index.html"`) | `DefaultFile` |
 * | `RawMessageReceived` | `onRawMessageReceived(message)` — receives `window.parent.postMessage` payloads |
 * | `SendRawMessage(msg)` | `ref.current.SendRawMessage(msg)` |
 * | `InvokeJavaScriptAsync(name, ...args)` | `ref.current.InvokeJavaScriptAsync(name, ...args)` — calls `window.<name>` in the frame |
 */
export interface HybridWebViewHandle {
  SendRawMessage: (message: string) => void
  InvokeJavaScriptAsync: (methodName: string, ...args: unknown[]) => unknown
}

export interface HybridWebViewProps extends ViewProps {
  HybridRoot?: string
  DefaultFile?: string
  Source?: string
  onRawMessageReceived?: (message: unknown) => void
  Title?: string
}

const HybridWebView = forwardRef<HybridWebViewHandle, HybridWebViewProps>(function HybridWebView(props, ref) {
  const {
    HybridRoot = 'wwwroot',
    DefaultFile = 'index.html',
    Source,
    onRawMessageReceived,
    Title,
    className,
    ...view
  } = props

  const frameRef = useRef<HTMLIFrameElement>(null)
  const src = Source ?? `${HybridRoot.replace(/\/$/, '')}/${DefaultFile}`

  useImperativeHandle(ref, () => ({
    SendRawMessage(message) {
      frameRef.current?.contentWindow?.postMessage(message, '*')
    },
    InvokeJavaScriptAsync(methodName, ...args) {
      const win = frameRef.current?.contentWindow as (Window & Record<string, unknown>) | null
      const fn = win?.[methodName]
      return typeof fn === 'function' ? (fn as (...a: unknown[]) => unknown)(...args) : undefined
    },
  }))

  useEffect(() => {
    if (!onRawMessageReceived) return
    const handler = (event: MessageEvent) => {
      if (event.source === frameRef.current?.contentWindow) onRawMessageReceived(event.data)
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [onRawMessageReceived])

  return (
    <iframe
      ref={frameRef}
      className={cx('fluid-hybridwebview', className)}
      style={viewStyle(view as ViewProps)}
      src={src}
      title={Title ?? 'HybridWebView'}
      {...xNameAttr(view)}
    />
  )
})

export default HybridWebView
