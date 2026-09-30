import { useCallback, useEffect, useLayoutEffect, useRef, type CSSProperties, type Ref } from 'react'
import {
  cx,
  fontAttributes,
  interactionAttrs,
  mergeRefs,
  size,
  viewStyle,
  xNameAttr,
  type FontAttributes,
  type ViewProps,
} from '../Shared/fluid-shared'
import './style.css'

/**
 * Multi-line text input.
 *
 * | native | here |
 * | --- | --- |
 * | `Text` / `TextChanged` | `Text` + `onTextChanged` (controlled) |
 * | `Placeholder` / `PlaceholderColor` | `Placeholder` / `PlaceholderColor` |
 * | `AutoSize` (`Disabled`/`TextChanges`) | `AutoSize` — `TextChanges` grows the box to fit |
 * | `MaxLength` | `MaxLength` |
 * | `IsReadOnly` | `IsReadOnly` |
 * | `TextColor` / `FontSize` / `FontAttributes` | same |
 *
 * `AutoSizeMin` / `AutoSizeMax` bound the grow range (defaults 40 / 200).
 *
 * `CursorPosition`/`SelectionLength` (the original names) make the caret/selection controlled when
 * given; `onSelectionChanged` reports the DOM `select`/`selectionchange` while focused, so a
 * caller (e.g. a floating format toolbar) can react to a text selection without polling. Stays
 * plain-text (no rich text) — see `@Fluid`'s own docs for the out-of-scope rich-text gap.
 */
export interface EditorProps extends ViewProps {
  Text?: string
  onTextChanged?: (value: string) => void
  Placeholder?: string
  PlaceholderColor?: string
  AutoSize?: 'Disabled' | 'TextChanges'
  AutoSizeMin?: number
  AutoSizeMax?: number
  MaxLength?: number
  IsReadOnly?: boolean
  TextColor?: string
  FontSize?: number | string
  FontAttributes?: FontAttributes
  AutoFocus?: boolean
  /** `Editor.CursorPosition` — caret index. Controlled (applied to the DOM) only when given. */
  CursorPosition?: number
  /** `Editor.SelectionLength` — length of the current selection. Controlled only when given. */
  SelectionLength?: number
  /** Fires on the DOM `select`/`selectionchange` event while this control is focused. */
  onSelectionChanged?: (start: number, length: number) => void
  /** Forwarded to the rendered `<textarea>` (React 19: `ref` is a plain prop, no `forwardRef`
   * needed) — merged with this control's own internal ref (used for the auto-size calculation). */
  ref?: Ref<HTMLTextAreaElement>
}

export default function Editor(props: EditorProps) {
  const {
    Text,
    onTextChanged,
    Placeholder,
    PlaceholderColor,
    AutoSize = 'Disabled',
    AutoSizeMin = 40,
    AutoSizeMax = 200,
    MaxLength,
    IsReadOnly,
    TextColor,
    FontSize,
    FontAttributes: attrs,
    IsEnabled = true,
    AutoFocus,
    CursorPosition,
    SelectionLength,
    onSelectionChanged,
    className,
    ref,
    ...view
  } = props

  const internalRef = useRef<HTMLTextAreaElement>(null)

  const grow = useCallback(() => {
    const el = internalRef.current
    if (!el || AutoSize !== 'TextChanges') return
    el.style.height = 'auto'
    el.style.height = `${Math.min(AutoSizeMax, Math.max(AutoSizeMin, el.scrollHeight))}px`
  }, [AutoSize, AutoSizeMin, AutoSizeMax])

  useLayoutEffect(grow, [grow, Text])

  // Controlled caret/selection: only touches the DOM when the caller actually passes
  // CursorPosition/SelectionLength, so an uncontrolled Editor (the common case) is untouched.
  useEffect(() => {
    if (CursorPosition == null) return
    const el = internalRef.current
    if (!el) return
    const start = CursorPosition
    const end = CursorPosition + (SelectionLength ?? 0)
    if (el.selectionStart !== start || el.selectionEnd !== end) el.setSelectionRange(start, end)
  }, [CursorPosition, SelectionLength])

  const reportSelection = onSelectionChanged
    ? (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const el = event.currentTarget
        onSelectionChanged(el.selectionStart ?? 0, (el.selectionEnd ?? 0) - (el.selectionStart ?? 0))
      }
    : undefined

  const style: CSSProperties = {
    color: TextColor,
    fontSize: size(FontSize),
    minHeight: `${AutoSizeMin}px`,
    maxHeight: AutoSize === 'TextChanges' ? `${AutoSizeMax}px` : undefined,
    resize: AutoSize === 'TextChanges' ? 'none' : 'vertical',
    ...(PlaceholderColor ? ({ ['--fluid-placeholder']: PlaceholderColor } as CSSProperties) : null),
    ...fontAttributes(attrs),
    ...viewStyle(view as ViewProps),
  }

  return (
    <textarea
      ref={mergeRefs(internalRef, ref)}
      className={cx('fluid-editor', className)}
      style={style}
      value={Text ?? ''}
      placeholder={Placeholder}
      maxLength={MaxLength}
      readOnly={IsReadOnly}
      disabled={!IsEnabled}
      autoFocus={AutoFocus}
      rows={1}
      {...interactionAttrs(view)}
      onChange={(event) => {
        onTextChanged?.(event.target.value)
        grow()
      }}
      onSelect={reportSelection}
      {...xNameAttr(view)}
    />
  )
}
