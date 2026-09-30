import { useEffect, useRef, type CSSProperties, type Ref } from 'react'
import {
  cx,
  fontAttributes,
  interactionAttrs,
  mergeRefs,
  size,
  textAlign,
  viewStyle,
  xNameAttr,
  type FontAttributes,
  type TextAlignment,
  type ViewProps,
} from '../Shared/fluid-shared'
import './style.css'

/**
 * Single-line text input.
 *
 * | native | here |
 * | --- | --- |
 * | `Text` / `TextChanged` | `Text` + `onTextChanged` (controlled) |
 * | `Placeholder` / `PlaceholderColor` | `Placeholder` / `PlaceholderColor` |
 * | `Keyboard` (`Default`/`Email`/`Numeric`/`Telephone`/`Url`/`Text`/`Chat`) | `Keyboard` |
 * | `IsPassword` | `IsPassword` |
 * | `MaxLength` | `MaxLength` |
 * | `IsReadOnly` | `IsReadOnly` |
 * | `ReturnType` / `Completed` | `ReturnType` / `onCompleted` (fires on Enter) |
 * | `TextColor` / `FontSize` / `FontAttributes` | same |
 * | `HorizontalTextAlignment` | `HorizontalTextAlignment` |
 *
 * Also accepts `ViewProps.onKeyDown` (e.g. for an inline-rename field to cancel on Escape) — it
 * runs alongside, not instead of, this control's own Enter → `onCompleted` handling below.
 *
 * `CursorPosition`/`SelectionLength` (the original names) make the caret/selection controlled when
 * given; `onSelectionChanged` reports the DOM `select`/`selectionchange` while focused, so a
 * caller (e.g. a floating format toolbar) can react to a text selection without polling.
 */
export type Keyboard = 'Default' | 'Email' | 'Numeric' | 'Telephone' | 'Url' | 'Text' | 'Chat'

export interface EntryProps extends ViewProps {
  Text?: string
  onTextChanged?: (value: string) => void
  Placeholder?: string
  PlaceholderColor?: string
  Keyboard?: Keyboard
  IsPassword?: boolean
  MaxLength?: number
  IsReadOnly?: boolean
  ReturnType?: 'Default' | 'Done' | 'Go' | 'Next' | 'Search' | 'Send'
  onCompleted?: () => void
  TextColor?: string
  FontSize?: number | string
  FontAttributes?: FontAttributes
  HorizontalTextAlignment?: TextAlignment
  AutoFocus?: boolean
  /** `Entry.CursorPosition` — caret index. Controlled (applied to the DOM) only when given. */
  CursorPosition?: number
  /** `Entry.SelectionLength` — length of the current selection. Controlled only when given. */
  SelectionLength?: number
  /** Fires on the DOM `select`/`selectionchange` event while this control is focused. */
  onSelectionChanged?: (start: number, length: number) => void
  /** Forwarded to the rendered `<input>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLInputElement>
}

const INPUT_MODE: Record<Keyboard, React.HTMLAttributes<HTMLInputElement>['inputMode']> = {
  Default: 'text',
  Text: 'text',
  Chat: 'text',
  Email: 'email',
  Numeric: 'numeric',
  Telephone: 'tel',
  Url: 'url',
}

export default function Entry(props: EntryProps) {
  const {
    Text,
    onTextChanged,
    Placeholder,
    PlaceholderColor,
    Keyboard: keyboard = 'Default',
    IsPassword,
    MaxLength,
    IsReadOnly,
    ReturnType,
    onCompleted,
    TextColor,
    FontSize,
    FontAttributes: attrs,
    HorizontalTextAlignment,
    IsEnabled = true,
    AutoFocus,
    CursorPosition,
    SelectionLength,
    onSelectionChanged,
    className,
    ref,
    ...view
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  // Controlled caret/selection: only touches the DOM when the caller actually passes
  // CursorPosition/SelectionLength, so an uncontrolled Entry (the common case) is untouched.
  useEffect(() => {
    if (CursorPosition == null) return
    const el = inputRef.current
    if (!el) return
    const start = CursorPosition
    const end = CursorPosition + (SelectionLength ?? 0)
    if (el.selectionStart !== start || el.selectionEnd !== end) el.setSelectionRange(start, end)
  }, [CursorPosition, SelectionLength])

  const reportSelection = onSelectionChanged
    ? (event: React.SyntheticEvent<HTMLInputElement>) => {
        const el = event.currentTarget
        onSelectionChanged(el.selectionStart ?? 0, (el.selectionEnd ?? 0) - (el.selectionStart ?? 0))
      }
    : undefined

  const style: CSSProperties = {
    color: TextColor,
    fontSize: size(FontSize),
    textAlign: textAlign(HorizontalTextAlignment),
    ...(PlaceholderColor ? ({ ['--fluid-placeholder']: PlaceholderColor } as CSSProperties) : null),
    ...fontAttributes(attrs),
    ...viewStyle(view as ViewProps),
  }

  return (
    <input
      ref={mergeRefs(inputRef, ref)}
      className={cx('fluid-entry', className)}
      style={style}
      type={IsPassword ? 'password' : keyboard === 'Email' ? 'email' : keyboard === 'Url' ? 'url' : 'text'}
      inputMode={INPUT_MODE[keyboard]}
      value={Text ?? ''}
      placeholder={Placeholder}
      maxLength={MaxLength}
      readOnly={IsReadOnly}
      disabled={!IsEnabled}
      autoFocus={AutoFocus}
      enterKeyHint={ReturnType ? (ReturnType.toLowerCase() as 'done' | 'go' | 'next' | 'search' | 'send') : undefined}
      {...interactionAttrs(view)}
      onChange={(event) => onTextChanged?.(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onCompleted?.()
        view.onKeyDown?.(event)
      }}
      onSelect={reportSelection}
      {...xNameAttr(view)}
    />
  )
}
