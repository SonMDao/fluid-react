import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A pair of increment / decrement buttons for a numeric value.
 *
 * | native | here |
 * | --- | --- |
 * | `Value` | `Value` |
 * | `Minimum` / `Maximum` | `Minimum` / `Maximum` |
 * | `Increment` | `Increment` (default 1) |
 * | `ValueChanged` | `onValueChanged(value)` |
 */
export interface StepperProps extends ViewProps {
  Value?: number
  Minimum?: number
  Maximum?: number
  Increment?: number
  onValueChanged?: (value: number) => void
}

export default function Stepper(props: StepperProps) {
  const {
    Value = 0,
    Minimum = 0,
    Maximum = 100,
    Increment = 1,
    onValueChanged,
    IsEnabled = true,
    className,
    ...view
  } = props

  const clamp = (next: number) => Math.min(Maximum, Math.max(Minimum, next))

  return (
    <div className={cx('fluid-stepper', className)} style={viewStyle(view as ViewProps)} {...xNameAttr(view)}>
      <button
        type="button"
        className="fluid-stepper-button"
        disabled={!IsEnabled || Value <= Minimum}
        onClick={() => onValueChanged?.(clamp(Value - Increment))}
        aria-label="Decrease"
      >
        &minus;
      </button>
      <span className="fluid-stepper-divider" />
      <button
        type="button"
        className="fluid-stepper-button"
        disabled={!IsEnabled || Value >= Maximum}
        onClick={() => onValueChanged?.(clamp(Value + Increment))}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  )
}
