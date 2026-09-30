import { GraphicsView, Label, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `GraphicsView` sample — an immediate-mode drawing surface. The `Drawable` callback receives the
 * 2D context and the current rect and paints a sine wave plus its axis, using the design tokens
 * (resolved through `tokenColor`, since canvas paint values are not CSS and can't reference
 * `var(--token)` directly). Shows `HeightRequest` sizing.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function GraphicsViewSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="GraphicsView — Drawable(ctx, rect) paints a sine wave" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <GraphicsView
        HeightRequest={160}
        BackgroundColor="var(--card-border)"
        Drawable={(ctx, { width, height }) => {
          const axis = tokenColor('--navbar-btn-border')
          const wave = tokenColor('--accent-blue')
          const mid = height / 2
          const amp = height / 2 - 12

          ctx.strokeStyle = axis
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, mid)
          ctx.lineTo(width, mid)
          ctx.stroke()

          ctx.strokeStyle = wave
          ctx.lineWidth = 2
          ctx.beginPath()
          for (let x = 0; x <= width; x += 2) {
            const y = mid - Math.sin((x / width) * Math.PI * 4) * amp
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }}
      />
    </StackLayout>
  )
}
