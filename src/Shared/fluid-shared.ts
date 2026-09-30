import type { CSSProperties, ReactNode, Ref, RefCallback } from 'react'

/**
 * Shared primitives for the control set.
 *
 * Every control folder under `src/` re-implements exactly one mobile native control as a React
 * component whose props mirror the native layout properties 1:1 (PascalCase, same names). This
 * module holds the pieces they all need:
 * the `VisualElement`/`View` base props, enums, and the converters that turn values
 * (`Thickness`, `GridLength`, `LayoutOptions`, `Color`) into inline style.
 *
 * Pages compose these controls and pass properties — they do not write CSS. Each control owns
 * its own `style.css` for the parts that are static; anything driven by a property becomes an
 * inline style computed here.
 */

/** `LayoutOptions` (the `*AndExpand` variants map to the same alignment, plus flex-grow). */
export type LayoutOptions =
  | 'Start'
  | 'Center'
  | 'End'
  | 'Fill'
  | 'StartAndExpand'
  | 'CenterAndExpand'
  | 'EndAndExpand'
  | 'FillAndExpand'

/** `TextAlignment`. */
export type TextAlignment = 'Start' | 'Center' | 'End'

/** `FontAttributes`. */
export type FontAttributes = 'None' | 'Bold' | 'Italic'

/** `Aspect` for Image/ImageButton. */
export type Aspect = 'AspectFit' | 'AspectFill' | 'Fill' | 'Center'

/** `StackOrientation` / `ScrollOrientation`. */
export type Orientation = 'Vertical' | 'Horizontal'

/**
 * `Thickness`: a uniform number, `"l,t,r,b"` / `"h,v"` string, `[h, v]`, `[l, t, r, b]`, or
 * an object. Matches how `Padding`/`Margin` are written in native layout markup.
 */
export type Thickness =
  | number
  | string
  | [number, number]
  | [number, number, number, number]
  | { left?: number; top?: number; right?: number; bottom?: number }

/** `GridLength` list: `"Auto,*,2*,120"`, or an array of the same tokens. */
export type GridLengths = string | Array<string | number>

/** Converts a `Thickness` to a CSS `margin`/`padding` shorthand (`top right bottom left`). */
export function thickness(value: Thickness | undefined): string | undefined {
  if (value == null) return undefined
  if (typeof value === 'number') return `${value}px`
  if (typeof value === 'string') {
    const parts = value.split(',').map((p) => p.trim())
    if (parts.length === 1) return `${num(parts[0])}px`
    if (parts.length === 2) return `${num(parts[1])}px ${num(parts[0])}px`
    if (parts.length === 4) return `${num(parts[1])}px ${num(parts[2])}px ${num(parts[3])}px ${num(parts[0])}px`
    return value
  }
  if (Array.isArray(value)) {
    if (value.length === 2) return `${value[1]}px ${value[0]}px`
    return `${value[1]}px ${value[2]}px ${value[3]}px ${value[0]}px`
  }
  const { left = 0, top = 0, right = 0, bottom = 0 } = value
  return `${top}px ${right}px ${bottom}px ${left}px`
}

function num(token: string): number {
  const parsed = Number.parseFloat(token)
  return Number.isFinite(parsed) ? parsed : 0
}

/** Maps a single `GridLength` token to a CSS grid track size. */
export function gridTrack(token: string | number): string {
  const raw = String(token).trim()
  if (/^auto$/i.test(raw)) return 'auto'
  if (raw === '*') return 'minmax(0, 1fr)'
  if (/^\d*\.?\d+\*$/.test(raw)) return `minmax(0, ${Number.parseFloat(raw)}fr)`
  if (/^\d*\.?\d+$/.test(raw)) return `${Number.parseFloat(raw)}px`
  return raw
}

/** Converts a `RowDefinitions`/`ColumnDefinitions` value to a CSS `grid-template-*` string. */
export function gridTemplate(defs: GridLengths | undefined): string | undefined {
  if (defs == null) return undefined
  const tokens = Array.isArray(defs) ? defs : defs.split(',')
  return tokens.map(gridTrack).join(' ')
}

/** Maps `HorizontalOptions`/`VerticalOptions` to a fl/grid alignment keyword. */
export function alignment(option: LayoutOptions | undefined): string | undefined {
  if (!option) return undefined
  if (option.startsWith('Start')) return 'flex-start'
  if (option.startsWith('Center')) return 'center'
  if (option.startsWith('End')) return 'flex-end'
  return 'stretch'
}

/** Whether a `LayoutOptions` value carries the legacy `AndExpand` flag (→ flex-grow). */
export function expands(option: LayoutOptions | undefined): boolean {
  return !!option && option.endsWith('AndExpand')
}

/** Turns a dimension request into a CSS length. */
export function size(value: number | string | undefined): string | undefined {
  if (value == null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

/** Maps a `FontAttributes` to `{ fontWeight, fontStyle }`. */
export function fontAttributes(attr: FontAttributes | undefined): CSSProperties {
  if (attr === 'Bold') return { fontWeight: 700 }
  if (attr === 'Italic') return { fontStyle: 'italic' }
  return {}
}

/** Maps a `TextAlignment` to a CSS `text-align`. */
export function textAlign(value: TextAlignment | undefined): CSSProperties['textAlign'] | undefined {
  if (value === 'Start') return 'left'
  if (value === 'Center') return 'center'
  if (value === 'End') return 'right'
  return undefined
}

/** Maps a `Aspect` to a CSS `object-fit` (+ `object-position` for `Center`). */
export function objectFit(aspect: Aspect | undefined): CSSProperties {
  switch (aspect) {
    case 'AspectFill':
      return { objectFit: 'cover' }
    case 'Fill':
      return { objectFit: 'fill' }
    case 'Center':
      return { objectFit: 'none', objectPosition: 'center' }
    case 'AspectFit':
    default:
      return { objectFit: 'contain' }
  }
}

/**
 * The properties every `VisualElement`/`View` exposes, shared by all controls in this set.
 * Names match the native layout properties. `Command` is the tap binding; `onClick` is the
 * React-native escape hatch.
 */
export interface ViewProps extends React.AriaAttributes {
  /** `IsVisible` (default `true`). `false` removes the element from layout. */
  IsVisible?: boolean
  /** `IsEnabled` (default `true`). */
  IsEnabled?: boolean
  /** `Opacity` 0..1. */
  Opacity?: number
  /** `BackgroundColor` — any CSS color. */
  BackgroundColor?: string
  /** `Margin`. */
  Margin?: Thickness
  /** `Padding` (on the controls that have it). */
  Padding?: Thickness
  /** `HorizontalOptions`. */
  HorizontalOptions?: LayoutOptions
  /** `VerticalOptions`. */
  VerticalOptions?: LayoutOptions
  /** `WidthRequest`. */
  WidthRequest?: number | string
  /** `HeightRequest`. */
  HeightRequest?: number | string
  /** `MinimumWidthRequest`. */
  MinimumWidthRequest?: number
  /** `MinimumHeightRequest`. */
  MinimumHeightRequest?: number
  /** `MaximumWidthRequest`. */
  MaximumWidthRequest?: number
  /** `MaximumHeightRequest`. */
  MaximumHeightRequest?: number
  /** Grid attached property `Grid.Row`. */
  Row?: number
  /** Grid attached property `Grid.Column`. */
  Column?: number
  /** Grid attached property `Grid.RowSpan`. */
  RowSpan?: number
  /** Grid attached property `Grid.ColumnSpan`. */
  ColumnSpan?: number
  /** Element name — a design-time identifier, not a layout property. Rendered as the
   * `data-x-name` attribute on the control's root element so it can be located from outside React,
   * the web analogue of native code-behind's `FindByName`. */
  xName?: string
  /** `GestureRecognizers` tap → here, a plain click handler. */
  onClick?: React.MouseEventHandler
  /** `TapGestureRecognizer` with `NumberOfTapsRequired="2"` → here, a plain double-click handler. */
  onDoubleClick?: React.MouseEventHandler
  /** `PointerGestureRecognizer`'s right-click/long-press-menu equivalent → here, the browser's
   * native `contextmenu` event (right-click, or a touch long-press on most platforms). */
  onContextMenu?: React.MouseEventHandler
  /** `KeyboardAccelerator` → here, a plain keydown handler. Requires `tabIndex` (below) for the
   * element to be focusable and therefore receive keyboard events. */
  onKeyDown?: React.KeyboardEventHandler
  /** `DragGestureRecognizer.DragStarting` → here, the browser's native HTML5 `dragstart`. */
  onDragStart?: React.DragEventHandler
  /** `DropGestureRecognizer.DragOver` → here, the browser's native `dragover` (must call
   * `event.preventDefault()` to permit a drop). */
  onDragOver?: React.DragEventHandler
  /** `DropGestureRecognizer`'s drag-exit equivalent → here, the browser's native `dragleave`. */
  onDragLeave?: React.DragEventHandler
  /** `DropGestureRecognizer.Drop` → here, the browser's native `drop`. */
  onDrop?: React.DragEventHandler
  /** Whether this element can be picked up by `onDragStart` — the web equivalent of attaching a
   * `DragGestureRecognizer` at all (there is no separate boolean; a view is draggable exactly
   * when it has one). Defaults to `false`/unset. */
  draggable?: boolean
  /** Makes the element focusable and part of tab order, so it can receive `onKeyDown`/be the target
   * of a `KeyboardAccelerator` — pass `-1` for programmatic-focus-only (skipped by Tab). */
  tabIndex?: number
  /** `PointerGestureRecognizer`'s press/move/release → here, the browser's native Pointer
   * Events. Fires for mouse, touch and pen alike; the basis for long-press and touch drag (unlike
   * HTML5 drag-and-drop, Pointer Events work reliably on touch WebKit/Android WebViews). */
  onPointerDown?: React.PointerEventHandler
  onPointerMove?: React.PointerEventHandler
  onPointerUp?: React.PointerEventHandler
  onPointerCancel?: React.PointerEventHandler
  /** `VisualElement.Focused`/`Unfocused` → here, the browser's native focus/blur. */
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
  /** Native tooltip text (the analogue of a native control's tooltip properties). */
  title?: string
  /** ARIA role — landmarks (`banner`, `navigation`, `main`, `complementary`), or a widget role
   * (`dialog`, `tree`, `treeitem`, `status`, …). No native equivalent; assistive-tech only. */
  role?: React.AriaRole
  /** Element id, so another element's `aria-labelledby`/`aria-controls`/`aria-describedby` can
   * target this one. No native equivalent. */
  id?: string
  /** Extra class, for composition inside this control set. */
  className?: string
  /** Inline-style escape hatch (control internals / one-offs). */
  style?: CSSProperties
  children?: ReactNode
}

/** Computes the inline style shared by every control from its `ViewProps`. */
export function viewStyle(p: ViewProps): CSSProperties {
  const s: CSSProperties = {}

  if (p.IsVisible === false) s.display = 'none'
  if (p.Opacity != null) s.opacity = p.Opacity
  if (p.BackgroundColor) s.background = p.BackgroundColor
  if (p.Margin != null) s.margin = thickness(p.Margin)
  if (p.Padding != null) s.padding = thickness(p.Padding)

  const width = size(p.WidthRequest)
  const height = size(p.HeightRequest)
  if (width) s.width = width
  if (height) s.height = height
  if (p.MinimumWidthRequest != null) s.minWidth = `${p.MinimumWidthRequest}px`
  if (p.MinimumHeightRequest != null) s.minHeight = `${p.MinimumHeightRequest}px`
  if (p.MaximumWidthRequest != null) s.maxWidth = `${p.MaximumWidthRequest}px`
  if (p.MaximumHeightRequest != null) s.maxHeight = `${p.MaximumHeightRequest}px`

  // HorizontalOptions/VerticalOptions position the element within its parent. In a flex parent
  // that is `align-self` on the cross axis; `FillAndExpand` etc. also grow on the main axis.
  const alignSelf = alignment(p.HorizontalOptions)
  if (alignSelf && alignSelf !== 'stretch') s.alignSelf = alignSelf
  if (expands(p.HorizontalOptions) || expands(p.VerticalOptions)) s.flexGrow = 1

  if (p.onClick) s.cursor = 'pointer'

  if (p.Row != null || p.RowSpan != null) {
    s.gridRow = `${(p.Row ?? 0) + 1}${p.RowSpan ? ` / span ${p.RowSpan}` : ''}`
  }
  if (p.Column != null || p.ColumnSpan != null) {
    s.gridColumn = `${(p.Column ?? 0) + 1}${p.ColumnSpan ? ` / span ${p.ColumnSpan}` : ''}`
  }

  return { ...s, ...p.style }
}

/** Spreads onto a control's root element to render its `xName` as `data-x-name`. */
export function xNameAttr(p: ViewProps): { 'data-x-name'?: string } {
  return p.xName ? { 'data-x-name': p.xName } : {}
}

/** Picks every `aria-*` key off `p` at runtime — `ViewProps` extends `React.AriaAttributes`, whose
 * members are individually named (not a TS index signature), so a static destructure can't forward
 * "whichever ones were passed" the way `Padding`/`onClick` can; this does it generically instead.
 *
 * @remarks Referenced by: `interactionAttrs`.
 */
function ariaAttrs(p: ViewProps): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(p)) {
    if (key.startsWith('aria-')) out[key] = (p as Record<string, unknown>)[key]
  }
  return out
}

/** Spreads onto a control's root element to wire the optional interaction props (double-click,
 * context menu, keyboard, drag-and-drop, pointer, focus, `title`/`role`/`id`/`aria-*`) declared on
 * `ViewProps` — a control opts in simply by including this alongside `xNameAttr`; omitted
 * handlers/attributes are left `undefined` and have no effect (e.g. an element with no
 * `onDragStart` stays undraggable regardless of `draggable`). */
export function interactionAttrs(p: ViewProps) {
  return {
    onDoubleClick: p.onDoubleClick,
    onContextMenu: p.onContextMenu,
    onKeyDown: p.onKeyDown,
    onDragStart: p.onDragStart,
    onDragOver: p.onDragOver,
    onDragLeave: p.onDragLeave,
    onDrop: p.onDrop,
    draggable: p.draggable,
    tabIndex: p.tabIndex,
    onPointerDown: p.onPointerDown,
    onPointerMove: p.onPointerMove,
    onPointerUp: p.onPointerUp,
    onPointerCancel: p.onPointerCancel,
    onFocus: p.onFocus,
    onBlur: p.onBlur,
    title: p.title,
    role: p.role,
    id: p.id,
    ...ariaAttrs(p),
  }
}

/** Joins class names, dropping falsy entries. */
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(' ')
}

/** Combines several refs (a caller-forwarded `ref` prop plus a control's own internal `useRef`)
 * into one callback ref, so both receive the same DOM node — needed by `Entry`/`Editor`, which
 * keep an internal ref for selection tracking (and, for `Editor`, auto-size) alongside the
 * `ref` prop a caller may also pass. Falsy entries are skipped. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === 'function') ref(node)
      else (ref as { current: T | null }).current = node
    }
  }
}
