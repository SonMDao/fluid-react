import type { CSSProperties } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A single-choice selector within a group.
 *
 * | native | here |
 * | --- | --- |
 * | `IsChecked` | `IsChecked` |
 * | `CheckedChanged` | `onCheckedChanged(value)` |
 * | `GroupName` | `GroupName` (`name` on the native input) |
 * | `Value` | `Value` |
 * | `Content` | `Content` or `children` (label text beside the control) |
 */
export interface RadioButtonProps extends ViewProps {
  IsChecked?: boolean
  onCheckedChanged?: (value: boolean) => void
  GroupName?: string
  Value?: string
  Content?: React.ReactNode
}

export default function RadioButton(props: RadioButtonProps) {
  const {
    IsChecked = false,
    onCheckedChanged,
    GroupName,
    Value,
    Content,
    IsEnabled = true,
    className,
    children,
    ...view
  } = props

  const style: CSSProperties = viewStyle(view as ViewProps)
  const label = Content ?? children

  return (
    <label className={cx('fluid-radiobutton', className)} style={style} {...xNameAttr(view)}>
      <input
        type="radio"
        name={GroupName}
        value={Value}
        checked={IsChecked}
        disabled={!IsEnabled}
        onChange={(event) => onCheckedChanged?.(event.target.checked)}
      />
      {label != null && <span className="fluid-radiobutton-label">{label}</span>}
    </label>
  )
}
