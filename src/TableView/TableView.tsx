import type { ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Grouped, form-style rows for settings screens (legacy).
 *
 * | native | here |
 * | --- | --- |
 * | `Intent` (`Menu`/`Settings`/`Form`/`Data`) | `Intent` |
 * | `HasUnevenRows` | `HasUnevenRows` |
 * | `Root` → `TableSection` → cells | `<TableView><TableSection Title="…"><TextCell …/><ViewCell>…</ViewCell></TableSection></TableView>` |
 *
 * Cells: `TextCell` (`Text` / `Detail` / `onTapped`), `ViewCell` (arbitrary content), `SwitchCell`
 * (`Text` / `On` / `onChanged`).
 */
export interface TableViewProps extends ViewProps {
  Intent?: 'Menu' | 'Settings' | 'Form' | 'Data'
  HasUnevenRows?: boolean
  children?: ReactNode
}

function TableView(props: TableViewProps) {
  const { Intent = 'Settings', HasUnevenRows, className, children, ...view } = props
  return (
    <div
      className={cx('fluid-tableview', `fluid-tableview-${Intent.toLowerCase()}`, HasUnevenRows && 'fluid-tableview-uneven', className)}
      style={viewStyle(view as ViewProps)}
      {...xNameAttr(view)}
    >
      {children}
    </div>
  )
}

export function TableSection(props: { Title?: string; children?: ReactNode }) {
  return (
    <div className="fluid-tableview-section">
      {props.Title && <div className="fluid-tableview-section-title">{props.Title}</div>}
      <div className="fluid-tableview-section-body">{props.children}</div>
    </div>
  )
}

export function TextCell(props: { Text?: string; Detail?: string; onTapped?: () => void; children?: ReactNode }) {
  return (
    <div className={cx('fluid-tableview-cell', props.onTapped && 'fluid-tableview-cell-tappable')} onClick={props.onTapped}>
      <span className="fluid-tableview-cell-text">{props.Text ?? props.children}</span>
      {props.Detail && <span className="fluid-tableview-cell-detail">{props.Detail}</span>}
    </div>
  )
}

export function ViewCell(props: { onTapped?: () => void; children?: ReactNode }) {
  return (
    <div className={cx('fluid-tableview-cell', props.onTapped && 'fluid-tableview-cell-tappable')} onClick={props.onTapped}>
      {props.children}
    </div>
  )
}

export function SwitchCell(props: { Text?: string; On?: boolean; onChanged?: (value: boolean) => void }) {
  return (
    <div className="fluid-tableview-cell">
      <span className="fluid-tableview-cell-text">{props.Text}</span>
      <button
        type="button"
        role="switch"
        aria-checked={!!props.On}
        className={cx('fluid-tableview-switch', props.On && 'fluid-tableview-switch-on')}
        onClick={() => props.onChanged?.(!props.On)}
      >
        <span />
      </button>
    </div>
  )
}

/**
 * Attached via `Object.assign` rather than `TableView.TextCell = TextCell`: the cell statics share
 * their names with the standalone exports above, and the namespace `tsc` infers from the assignment
 * form (`var TextCell: typeof TextCell`) resolves to itself once the declarations are bundled into a
 * single file, which consumers see as TS2502. An intersection type introduces no such shadowing.
 */
const TableViewWithCells = Object.assign(TableView, {
  Section: TableSection,
  TextCell,
  ViewCell,
  SwitchCell,
})

export default TableViewWithCells
