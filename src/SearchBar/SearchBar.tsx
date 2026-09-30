import type { CSSProperties } from 'react'
import { cx, interactionAttrs, size, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A text input styled for search, with a search affordance.
 *
 * | native | here |
 * | --- | --- |
 * | `Text` / `TextChanged` | `Text` + `onTextChanged` |
 * | `Placeholder` | `Placeholder` |
 * | `SearchCommand` / `SearchButtonPressed` | `SearchCommand` (fires on Enter / the search key) |
 * | `CancelButtonColor` | `CancelButtonColor` |
 * | `TextColor` / `PlaceholderColor` / `FontSize` | same |
 */
export interface SearchBarProps extends ViewProps {
  Text?: string
  onTextChanged?: (value: string) => void
  Placeholder?: string
  SearchCommand?: (text?: string) => void
  CancelButtonColor?: string
  TextColor?: string
  PlaceholderColor?: string
  FontSize?: number | string
}

export default function SearchBar(props: SearchBarProps) {
  const {
    Text,
    onTextChanged,
    Placeholder = 'Search',
    SearchCommand,
    CancelButtonColor,
    TextColor,
    PlaceholderColor,
    FontSize,
    IsEnabled = true,
    className,
    ...view
  } = props

  const style: CSSProperties = {
    color: TextColor,
    fontSize: size(FontSize),
    ...(PlaceholderColor ? ({ ['--fluid-placeholder']: PlaceholderColor } as CSSProperties) : null),
    ...(CancelButtonColor ? ({ ['--fluid-cancel']: CancelButtonColor } as CSSProperties) : null),
  }

  return (
    <div
      className={cx('fluid-searchbar', className)}
      style={viewStyle(view as ViewProps)}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      <span className="fluid-searchbar-icon" aria-hidden>
        {'⌕'}
      </span>
      <input
        className="fluid-searchbar-input"
        style={style}
        type="search"
        value={Text ?? ''}
        placeholder={Placeholder}
        disabled={!IsEnabled}
        enterKeyHint="search"
        onChange={(event) => onTextChanged?.(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') SearchCommand?.(Text)
        }}
      />
    </div>
  )
}
