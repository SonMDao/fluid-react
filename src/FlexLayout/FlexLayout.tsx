import type { CSSProperties } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * CSS-flexbox-style layout.
 *
 * | native | here |
 * | --- | --- |
 * | `Direction` (`Row`/`Column`/`RowReverse`/`ColumnReverse`) | same |
 * | `Wrap` (`NoWrap`/`Wrap`/`Reverse`) | same |
 * | `JustifyContent` (`Start`/`Center`/`End`/`SpaceBetween`/`SpaceAround`/`SpaceEvenly`) | same |
 * | `AlignItems` (`Start`/`Center`/`End`/`Stretch`) | same |
 * | `AlignContent` | same |
 * | `FlexLayout.Grow` / `Basis` / `AlignSelf` (attached) | `Grow` / `Basis` / `AlignSelf` on `FlexLayout.Item` |
 */
export type FlexDirection = 'Row' | 'Column' | 'RowReverse' | 'ColumnReverse'
export type FlexWrap = 'NoWrap' | 'Wrap' | 'Reverse'
export type FlexJustify = 'Start' | 'Center' | 'End' | 'SpaceBetween' | 'SpaceAround' | 'SpaceEvenly'
export type FlexAlign = 'Start' | 'Center' | 'End' | 'Stretch'

export interface FlexLayoutProps extends ViewProps {
  Direction?: FlexDirection
  Wrap?: FlexWrap
  JustifyContent?: FlexJustify
  AlignItems?: FlexAlign
  AlignContent?: FlexJustify | FlexAlign
}

const DIRECTION: Record<FlexDirection, CSSProperties['flexDirection']> = {
  Row: 'row',
  Column: 'column',
  RowReverse: 'row-reverse',
  ColumnReverse: 'column-reverse',
}
const WRAP: Record<FlexWrap, CSSProperties['flexWrap']> = { NoWrap: 'nowrap', Wrap: 'wrap', Reverse: 'wrap-reverse' }
const JUSTIFY: Record<string, string> = {
  Start: 'flex-start',
  Center: 'center',
  End: 'flex-end',
  Stretch: 'stretch',
  SpaceBetween: 'space-between',
  SpaceAround: 'space-around',
  SpaceEvenly: 'space-evenly',
}

export default function FlexLayout(props: FlexLayoutProps) {
  const { Direction = 'Row', Wrap = 'NoWrap', JustifyContent, AlignItems, AlignContent, className, children, ...view } =
    props

  const style: CSSProperties = {
    display: 'flex',
    flexDirection: DIRECTION[Direction],
    flexWrap: WRAP[Wrap],
    justifyContent: JustifyContent ? JUSTIFY[JustifyContent] : undefined,
    alignItems: AlignItems ? JUSTIFY[AlignItems] : undefined,
    alignContent: AlignContent ? JUSTIFY[AlignContent] : undefined,
    ...viewStyle(view as ViewProps),
  }

  return (
    <div className={cx('fluid-flexlayout', className)} style={style} onClick={view.onClick} {...xNameAttr(view)}>
      {children}
    </div>
  )
}

/** Carries `FlexLayout`'s attached properties for a plain child. */
export function FlexItem(props: {
  Grow?: number
  Shrink?: number
  Basis?: number | string
  AlignSelf?: FlexAlign
  Order?: number
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}) {
  const { Grow, Shrink, Basis, AlignSelf, Order, className, style, children } = props
  return (
    <div
      className={className}
      style={{
        flexGrow: Grow,
        flexShrink: Shrink,
        flexBasis: typeof Basis === 'number' ? `${Basis}px` : Basis,
        alignSelf: AlignSelf ? JUSTIFY[AlignSelf] : undefined,
        order: Order,
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

FlexLayout.Item = FlexItem
