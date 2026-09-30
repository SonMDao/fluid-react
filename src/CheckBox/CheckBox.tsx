import type { CSSProperties } from 'react'
import { cx, interactionAttrs, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A boolean check control.
 *
 * | native | here |
 * | --- | --- |
 * | `IsChecked` | `IsChecked` |
 * | `CheckedChanged` | `onCheckedChanged(value)` |
 * | `Color` | `Color` (the tick / fill colour) |
 */
export interface CheckBoxProps extends ViewProps {
  IsChecked?: boolean
  onCheckedChanged?: (value: boolean) => void
  Color?: string
}

export default function CheckBox(props: CheckBoxProps) {
  const { IsChecked = false, onCheckedChanged, Color, IsEnabled = true, className, ...view } = props

  const style: CSSProperties = { accentColor: Color, ...viewStyle(view as ViewProps) }

  return (
    <input
      type="checkbox"
      className={cx('fluid-checkbox', className)}
      style={style}
      checked={IsChecked}
      disabled={!IsEnabled}
      {...interactionAttrs(view)}
      onChange={(event) => onCheckedChanged?.(event.target.checked)}
      {...xNameAttr(view)}
    />
  )
}
