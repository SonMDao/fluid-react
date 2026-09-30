import { forwardRef, type CSSProperties, type ReactNode, type UIEventHandler } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A virtualized list/grid of items with selection and grouping.
 *
 * | native | here |
 * | --- | --- |
 * | `ItemsSource` | `ItemsSource` |
 * | `ItemTemplate` | `ItemTemplate` — `(item, index) => ReactNode` |
 * | `SelectionMode` (`None`/`Single`/`Multiple`) | `SelectionMode` |
 * | `SelectedItem` / `SelectedItems` | `SelectedItem` / `SelectedItems` |
 * | `SelectionChanged` | `onSelectionChanged(item | items)` |
 * | `ItemsLayout` (`VerticalList`/`HorizontalList`/`VerticalGrid,n`/`HorizontalGrid,n`) | `ItemsLayout` — a string, or `{ Orientation, Span }` |
 * | `ItemSpacing` | `ItemSpacing` |
 * | `EmptyView` / `Header` / `Footer` | same |
 * | `Scrolled` / `RemainingItemsThreshold` + `RemainingItemsThresholdReached` | `onScroll` / `RemainingItemsThreshold` + `onRemainingItemsThresholdReached` |
 */
export interface ItemsLayoutSpec {
  Orientation?: 'Vertical' | 'Horizontal'
  Span?: number
}

export interface CollectionViewProps<T = unknown> extends ViewProps {
  ItemsSource: readonly T[]
  ItemTemplate: (item: T, index: number) => ReactNode
  KeySelector?: (item: T, index: number) => React.Key
  SelectionMode?: 'None' | 'Single' | 'Multiple'
  SelectedItem?: T
  SelectedItems?: readonly T[]
  onSelectionChanged?: (selection: T | T[] | undefined) => void
  ItemsLayout?: string | ItemsLayoutSpec
  ItemSpacing?: number
  EmptyView?: ReactNode
  Header?: ReactNode
  Footer?: ReactNode
  RemainingItemsThreshold?: number
  onRemainingItemsThresholdReached?: () => void
  onScroll?: UIEventHandler<HTMLDivElement>
}

function parseLayout(spec: string | ItemsLayoutSpec | undefined): { horizontal: boolean; span: number } {
  if (!spec) return { horizontal: false, span: 1 }
  if (typeof spec === 'object') {
    return { horizontal: spec.Orientation === 'Horizontal', span: spec.Span ?? 1 }
  }
  const horizontal = /horizontal/i.test(spec)
  const span = Number(spec.match(/\d+/)?.[0] ?? 1)
  return { horizontal, span }
}

function CollectionViewInner<T>(props: CollectionViewProps<T>, ref: React.Ref<HTMLDivElement>) {
  const {
    ItemsSource,
    ItemTemplate,
    KeySelector,
    SelectionMode = 'None',
    SelectedItem,
    SelectedItems,
    onSelectionChanged,
    ItemsLayout,
    ItemSpacing = 0,
    EmptyView,
    Header,
    Footer,
    RemainingItemsThreshold,
    onRemainingItemsThresholdReached,
    onScroll,
    className,
    ...view
  } = props

  const { horizontal, span } = parseLayout(ItemsLayout)

  const listStyle: CSSProperties = {
    display: 'grid',
    gap: `${ItemSpacing}px`,
    gridAutoFlow: horizontal ? 'column' : 'row',
    ...(horizontal
      ? { gridTemplateRows: `repeat(${span}, auto)`, gridAutoColumns: 'max-content' }
      : { gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))` }),
  }

  const isSelected = (item: T) =>
    SelectionMode !== 'None' && (item === SelectedItem || (SelectedItems?.includes(item) ?? false))

  const select = (item: T) => {
    if (SelectionMode === 'None') return
    if (SelectionMode === 'Single') {
      onSelectionChanged?.(item === SelectedItem ? undefined : item)
      return
    }
    const current = new Set(SelectedItems ?? [])
    if (current.has(item)) current.delete(item)
    else current.add(item)
    onSelectionChanged?.([...current])
  }

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    onScroll?.(event)
    if (RemainingItemsThreshold == null || !onRemainingItemsThresholdReached) return
    const el = event.currentTarget
    const remaining = horizontal
      ? el.scrollWidth - el.scrollLeft - el.clientWidth
      : el.scrollHeight - el.scrollTop - el.clientHeight
    if (remaining <= RemainingItemsThreshold) onRemainingItemsThresholdReached()
  }

  return (
    <div
      ref={ref}
      className={cx('fluid-collectionview', horizontal && 'fluid-collectionview-horizontal', className)}
      style={viewStyle(view as ViewProps)}
      onScroll={handleScroll}
      {...xNameAttr(view)}
    >
      {Header}
      {ItemsSource.length === 0
        ? EmptyView
        : (
            <div className="fluid-collectionview-list" style={listStyle}>
              {ItemsSource.map((item, index) => (
                <div
                  key={KeySelector ? KeySelector(item, index) : index}
                  className={cx('fluid-collectionview-item', isSelected(item) && 'fluid-collectionview-item-selected')}
                  onClick={() => select(item)}
                >
                  {ItemTemplate(item, index)}
                </div>
              ))}
            </div>
          )}
      {Footer}
    </div>
  )
}

const CollectionView = forwardRef(CollectionViewInner) as <T>(
  props: CollectionViewProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement

export default CollectionView
