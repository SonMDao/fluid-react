import type { CSSProperties, Ref } from 'react'
import { cx, interactionAttrs, objectFit, thickness, viewStyle, xNameAttr, type Aspect, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A tappable button whose content is an image.
 *
 * | native | here |
 * | --- | --- |
 * | `Source` | `Source` |
 * | `Command` / `Clicked` | `Command` (also `onClick`) |
 * | `CommandParameter` | `CommandParameter` |
 * | `Aspect` | `Aspect` |
 * | `Padding` | `Padding` |
 * | `CornerRadius` | `CornerRadius` |
 * | `BackgroundColor` | `BackgroundColor` |
 * | `BorderColor` / `BorderWidth` | `BorderColor` / `BorderWidth` |
 */
export interface ImageButtonProps extends ViewProps {
  Source?: string
  Command?: (parameter?: unknown) => void
  CommandParameter?: unknown
  Aspect?: Aspect
  CornerRadius?: number
  BorderColor?: string
  BorderWidth?: number
  /** Accessible label — the native control reads `AutomationProperties.Name`. */
  AutomationName?: string
  /** Forwarded to the rendered `<button>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLButtonElement>
}

export default function ImageButton(props: ImageButtonProps) {
  const {
    Source,
    Command,
    CommandParameter,
    Aspect: aspect = 'AspectFit',
    CornerRadius = 0,
    BorderColor,
    BorderWidth,
    IsEnabled = true,
    Padding,
    AutomationName,
    className,
    ref,
    ...view
  } = props

  const style: CSSProperties = {
    borderRadius: `${CornerRadius}px`,
    border: BorderWidth ? `${BorderWidth}px solid ${BorderColor ?? 'transparent'}` : 'none',
    padding: thickness(Padding) ?? '0',
    ...viewStyle({ ...view, Padding: undefined } as ViewProps),
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cx('fluid-imagebutton', className)}
      style={style}
      disabled={!IsEnabled}
      {...interactionAttrs(view)}
      aria-label={AutomationName ?? view['aria-label']}
      onClick={(event) => {
        view.onClick?.(event)
        Command?.(CommandParameter)
      }}
      {...xNameAttr(view)}
    >
      {Source && <img className="fluid-imagebutton-image" src={Source} alt="" style={objectFit(aspect)} />}
    </button>
  )
}
