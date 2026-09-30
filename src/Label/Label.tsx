import type { CSSProperties, Ref } from 'react'
import {
  cx,
  fontAttributes,
  interactionAttrs,
  size,
  textAlign,
  viewStyle,
  xNameAttr,
  type FontAttributes,
  type TextAlignment,
  type ViewProps,
} from '../Shared/fluid-shared'
import './style.css'

/**
 * Displays read-only text.
 *
 * | native | here |
 * | --- | --- |
 * | `Text` | `Text` or `children` |
 * | `TextColor` | `TextColor` |
 * | `FontSize` | `FontSize` (number px or a named size string) |
 * | `FontAttributes` (`None`/`Bold`/`Italic`) | `FontAttributes` |
 * | `FontFamily` | `FontFamily` |
 * | `HorizontalTextAlignment` | `HorizontalTextAlignment` |
 * | `LineBreakMode` (`WordWrap`/`NoWrap`/`TailTruncation`/`HeadTruncation`/`MiddleTruncation`) | `LineBreakMode` |
 * | `MaxLines` | `MaxLines` |
 * | `LineHeight` | `LineHeight` |
 */
export interface LabelProps extends ViewProps {
  Text?: string
  TextColor?: string
  FontSize?: number | string
  FontAttributes?: FontAttributes
  FontFamily?: string
  HorizontalTextAlignment?: TextAlignment
  LineBreakMode?: 'WordWrap' | 'NoWrap' | 'TailTruncation' | 'HeadTruncation' | 'MiddleTruncation' | 'CharacterWrap'
  MaxLines?: number
  LineHeight?: number
  /** Forwarded to the rendered `<span>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLSpanElement>
}

export default function Label(props: LabelProps) {
  const {
    Text,
    TextColor,
    FontSize,
    FontAttributes: attrs,
    FontFamily,
    HorizontalTextAlignment,
    LineBreakMode = 'WordWrap',
    MaxLines,
    LineHeight,
    className,
    children,
    ref,
    ...view
  } = props

  const truncating = LineBreakMode === 'TailTruncation'
  const style: CSSProperties = {
    color: TextColor,
    fontSize: size(FontSize),
    fontFamily: FontFamily,
    textAlign: textAlign(HorizontalTextAlignment),
    lineHeight: LineHeight,
    whiteSpace: LineBreakMode === 'NoWrap' || (truncating && !MaxLines) ? 'nowrap' : 'pre-wrap',
    overflow: truncating || MaxLines ? 'hidden' : undefined,
    textOverflow: truncating ? 'ellipsis' : undefined,
    ...(MaxLines
      ? { display: '-webkit-box', WebkitLineClamp: MaxLines, WebkitBoxOrient: 'vertical' as const }
      : null),
    ...fontAttributes(attrs),
    ...viewStyle(view as ViewProps),
  }

  return (
    <span
      ref={ref}
      className={cx('fluid-label', className)}
      style={style}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {Text ?? children}
    </span>
  )
}
