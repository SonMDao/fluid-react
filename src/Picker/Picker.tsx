import type { CSSProperties } from 'react'
import { cx, size, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A dropdown for selecting one value from a list.
 *
 * | native | here |
 * | --- | --- |
 * | `ItemsSource` | `ItemsSource` |
 * | `ItemDisplayBinding` | `ItemDisplay` — `(item) => string` |
 * | `SelectedItem` | `SelectedItem` |
 * | `SelectedIndex` | `SelectedIndex` |
 * | `SelectedIndexChanged` | `onSelectedIndexChanged(index, item)` |
 * | `Title` | `Title` (rendered as a disabled leading option) |
 * | `TextColor` / `TitleColor` / `FontSize` | same |
 */
export interface PickerProps<T = unknown> extends ViewProps {
  ItemsSource: readonly T[]
  ItemDisplay?: (item: T) => string
  SelectedItem?: T
  SelectedIndex?: number
  onSelectedIndexChanged?: (index: number, item: T | undefined) => void
  Title?: string
  TextColor?: string
  FontSize?: number | string
}

export default function Picker<T>(props: PickerProps<T>) {
  const {
    ItemsSource,
    ItemDisplay = (item: T) => String(item),
    SelectedItem,
    SelectedIndex,
    onSelectedIndexChanged,
    Title,
    TextColor,
    FontSize,
    IsEnabled = true,
    className,
    ...view
  } = props

  const index =
    SelectedIndex ??
    (SelectedItem !== undefined ? ItemsSource.findIndex((candidate) => candidate === SelectedItem) : -1)

  const style: CSSProperties = { color: TextColor, fontSize: size(FontSize), ...viewStyle(view as ViewProps) }

  return (
    <select
      className={cx('fluid-picker', className)}
      style={style}
      disabled={!IsEnabled}
      value={index}
      onChange={(event) => {
        const next = Number(event.target.value)
        onSelectedIndexChanged?.(next, ItemsSource[next])
      }}
      {...xNameAttr(view)}
    >
      {Title && (
        <option value={-1} disabled>
          {Title}
        </option>
      )}
      {ItemsSource.map((item, itemIndex) => (
        <option key={itemIndex} value={itemIndex}>
          {ItemDisplay(item)}
        </option>
      ))}
    </select>
  )
}
