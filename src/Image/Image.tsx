import type { CSSProperties, Ref } from 'react'
import { cx, interactionAttrs, objectFit, viewStyle, xNameAttr, type Aspect, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Displays a bitmap or vector image.
 *
 * | native | here |
 * | --- | --- |
 * | `Source` | `Source` |
 * | `Aspect` (`AspectFit` default) | `Aspect` |
 * | `IsOpaque` | `IsOpaque` |
 * | `IsAnimationPlaying` | `IsAnimationPlaying` (pauses GIF via a frozen fallback is out of scope; kept for parity) |
 */
export interface ImageProps extends ViewProps {
  Source?: string
  Aspect?: Aspect
  IsOpaque?: boolean
  IsAnimationPlaying?: boolean
  /** the native control reads `AutomationProperties.Name`; also used as `alt`. */
  AutomationName?: string
  /** Forwarded to the rendered `<img>` (React 19: `ref` is a plain prop, no `forwardRef` needed). */
  ref?: Ref<HTMLImageElement>
}

export default function Image(props: ImageProps) {
  const { Source, Aspect: aspect = 'AspectFit', IsOpaque, AutomationName, className, ref, ...view } = props

  const style: CSSProperties = {
    background: IsOpaque ? '#000' : undefined,
    ...objectFit(aspect),
    ...viewStyle(view as ViewProps),
  }

  return (
    <img
      ref={ref}
      className={cx('fluid-image', className)}
      src={Source}
      alt={AutomationName ?? ''}
      style={style}
      onClick={view.onClick}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    />
  )
}
