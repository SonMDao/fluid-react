import type { CSSProperties, ReactNode, Ref } from 'react'
import { cx, gridTemplate, interactionAttrs, viewStyle, xNameAttr, type GridLengths, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Arranges children in rows and columns.
 *
 * | native | here |
 * | --- | --- |
 * | `RowDefinitions="Auto,*,2*,120"` | `RowDefinitions="Auto,*,2*,120"` (string or array) |
 * | `ColumnDefinitions` | `ColumnDefinitions` |
 * | `RowSpacing` / `ColumnSpacing` | `RowSpacing` / `ColumnSpacing` |
 * | `Grid.Row` / `Grid.Column` / `Grid.RowSpan` / `Grid.ColumnSpan` (attached) | `Row` / `Column` / `RowSpan` / `ColumnSpan` props on child controls (see `ViewProps`) |
 *
 * Renders `display: grid`. Child controls in this set self-place from their `Row`/`Column` props;
 * wrap any non-control child in `<Grid.Item>`.
 */
export interface GridProps extends ViewProps {
  RowDefinitions?: GridLengths
  ColumnDefinitions?: GridLengths
  RowSpacing?: number
  ColumnSpacing?: number
  /** Forwarded to the rendered `<div>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLDivElement>
}

export default function Grid(props: GridProps) {
  const { RowDefinitions, ColumnDefinitions, RowSpacing, ColumnSpacing, className, children, ref, ...view } = props

  const style: CSSProperties = {
    gridTemplateRows: gridTemplate(RowDefinitions),
    gridTemplateColumns: gridTemplate(ColumnDefinitions) ?? 'minmax(0, 1fr)',
    rowGap: RowSpacing != null ? `${RowSpacing}px` : undefined,
    columnGap: ColumnSpacing != null ? `${ColumnSpacing}px` : undefined,
    ...viewStyle(view as ViewProps),
  }

  return (
    <div
      ref={ref}
      className={cx('fluid-grid', className)}
      style={style}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {children}
    </div>
  )
}

/** Positions a plain (non-control) child inside a `Grid` cell. */
export function GridItem(props: {
  Row?: number
  Column?: number
  RowSpan?: number
  ColumnSpan?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  const { Row, Column, RowSpan, ColumnSpan, className, style, children } = props
  return (
    <div
      className={className}
      style={{
        gridRow: Row != null || RowSpan != null ? `${(Row ?? 0) + 1}${RowSpan ? ` / span ${RowSpan}` : ''}` : undefined,
        gridColumn:
          Column != null || ColumnSpan != null
            ? `${(Column ?? 0) + 1}${ColumnSpan ? ` / span ${ColumnSpan}` : ''}`
            : undefined,
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

Grid.Item = GridItem
