import type { CSSProperties, ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * The legacy virtualized list, superseded by `CollectionView`.
 *
 * | native | here |
 * | --- | --- |
 * | `ItemsSource` | `ItemsSource` |
 * | `ItemTemplate` | `ItemTemplate` — `(item, index) => ReactNode` |
 * | `HasUnevenRows` | `HasUnevenRows` |
 * | `RowHeight` | `RowHeight` (used when `HasUnevenRows` is false) |
 * | `SeparatorVisibility` (`Default`/`None`) / `SeparatorColor` | `SeparatorVisibility` / `SeparatorColor` |
 * | `SelectedItem` / `ItemTapped` / `ItemSelected` | `SelectedItem` + `onItemTapped(item)` |
 * | `Header` / `Footer` | same |
 */
export interface ListViewProps<T = unknown> extends ViewProps {
  ItemsSource: readonly T[]
  ItemTemplate: (item: T, index: number) => ReactNode
  KeySelector?: (item: T, index: number) => React.Key
  HasUnevenRows?: boolean
  RowHeight?: number
  SeparatorVisibility?: 'Default' | 'None'
  SeparatorColor?: string
  SelectedItem?: T
  onItemTapped?: (item: T) => void
  Header?: ReactNode
  Footer?: ReactNode
}

export default function ListView<T>(props: ListViewProps<T>) {
  const {
    ItemsSource,
    ItemTemplate,
    KeySelector,
    HasUnevenRows = false,
    RowHeight = 44,
    SeparatorVisibility = 'Default',
    SeparatorColor,
    SelectedItem,
    onItemTapped,
    Header,
    Footer,
    className,
    ...view
  } = props

  const rowStyle: CSSProperties = HasUnevenRows ? {} : { height: `${RowHeight}px` }
  const showSeparator = SeparatorVisibility !== 'None'

  return (
    <ul
      className={cx('fluid-listview', className)}
      style={{ ['--fluid-separator' as string]: SeparatorColor ?? 'var(--card-border, #e9e9e7)', ...viewStyle(view as ViewProps) }}
      {...xNameAttr(view)}
    >
      {Header && <li className="fluid-listview-accessory">{Header}</li>}
      {ItemsSource.map((item, index) => (
        <li
          key={KeySelector ? KeySelector(item, index) : index}
          className={cx(
            'fluid-listview-row',
            showSeparator && 'fluid-listview-row-separated',
            item === SelectedItem && 'fluid-listview-row-selected',
          )}
          style={rowStyle}
          onClick={() => onItemTapped?.(item)}
        >
          {ItemTemplate(item, index)}
        </li>
      ))}
      {Footer && <li className="fluid-listview-accessory">{Footer}</li>}
    </ul>
  )
}
