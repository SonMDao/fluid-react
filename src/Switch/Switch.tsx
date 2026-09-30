import type { CSSProperties } from 'react'
import { cx, interactionAttrs, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * An on/off toggle.
 *
 * | native | here |
 * | --- | --- |
 * | `IsToggled` | `IsToggled` |
 * | `Toggled` | `onToggled(value)` |
 * | `OnColor` | `OnColor` (track colour when on) |
 * | `ThumbColor` | `ThumbColor` |
 */
export interface SwitchProps extends ViewProps {
  IsToggled?: boolean
  onToggled?: (value: boolean) => void
  OnColor?: string
  ThumbColor?: string
}

export default function Switch(props: SwitchProps) {
  const { IsToggled = false, onToggled, OnColor, ThumbColor, IsEnabled = true, className, ...view } = props

  const style: CSSProperties = {
    ...(OnColor ? ({ ['--fluid-switch-on']: OnColor } as CSSProperties) : null),
    ...(ThumbColor ? ({ ['--fluid-switch-thumb']: ThumbColor } as CSSProperties) : null),
    ...viewStyle(view as ViewProps),
  }

  return (
    <button
      type="button"
      disabled={!IsEnabled}
      className={cx('fluid-switch', IsToggled && 'fluid-switch-on', className)}
      style={style}
      {...interactionAttrs(view)}
      role="switch"
      aria-checked={IsToggled}
      onClick={(event) => {
        view.onClick?.(event)
        onToggled?.(!IsToggled)
      }}
      {...xNameAttr(view)}
    >
      <span className="fluid-switch-thumb" />
    </button>
  )
}
