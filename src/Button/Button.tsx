import type { CSSProperties, Ref } from 'react'
import {
  cx,
  fontAttributes,
  interactionAttrs,
  size,
  thickness,
  viewStyle,
  xNameAttr,
  type FontAttributes,
  type ViewProps,
} from '../Shared/fluid-shared'
import './style.css'

/**
 * A tappable command button with text or icon.
 *
 * | native | here |
 * | --- | --- |
 * | `Text` | `Text` or `children` |
 * | `Command` / `Clicked` | `Command` (also `onClick`) |
 * | `CommandParameter` | `CommandParameter` (passed to `Command`) |
 * | `ImageSource` | `ImageSource` (rendered before the text) |
 * | `BackgroundColor` / `TextColor` | `BackgroundColor` / `TextColor` |
 * | `FontSize` / `FontAttributes` | `FontSize` / `FontAttributes` |
 * | `CornerRadius` | `CornerRadius` |
 * | `BorderColor` / `BorderWidth` | `BorderColor` / `BorderWidth` |
 * | `Padding` | `Padding` |
 * | `IsEnabled` | `IsEnabled` |
 */
export interface ButtonProps extends ViewProps {
  Text?: string
  Command?: (parameter?: unknown) => void
  CommandParameter?: unknown
  ImageSource?: string
  TextColor?: string
  FontSize?: number | string
  FontAttributes?: FontAttributes
  CornerRadius?: number
  BorderColor?: string
  BorderWidth?: number
  /** Forwarded to the rendered `<button>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLButtonElement>
}

export default function Button(props: ButtonProps) {
  const {
    Text,
    Command,
    CommandParameter,
    ImageSource,
    TextColor,
    FontSize,
    FontAttributes: attrs,
    CornerRadius = 8,
    BorderColor,
    BorderWidth,
    IsEnabled = true,
    Padding,
    className,
    children,
    ref,
    ...view
  } = props

  const style: CSSProperties = {
    color: TextColor,
    fontSize: size(FontSize),
    borderRadius: `${CornerRadius}px`,
    border: BorderWidth ? `${BorderWidth}px solid ${BorderColor ?? 'transparent'}` : 'none',
    padding: thickness(Padding) ?? '0 16px',
    ...fontAttributes(attrs),
    ...viewStyle({ ...view, Padding: undefined } as ViewProps),
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cx('fluid-button', className)}
      style={style}
      disabled={!IsEnabled}
      onClick={(event) => {
        view.onClick?.(event)
        Command?.(CommandParameter)
      }}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {ImageSource && <img className="fluid-button-image" src={ImageSource} alt="" />}
      {Text ?? children}
    </button>
  )
}
