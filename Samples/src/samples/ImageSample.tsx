import { Image, Label, StackLayout } from '@Fluid'

/** A self-contained image resource (an inline SVG data URI) so the sample needs no asset files. */
const DEMO_IMAGE =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20120%2080'%3E%3Crect%20width='120'%20height='80'%20rx='10'%20fill='%232563eb'/%3E%3Ccircle%20cx='40'%20cy='28'%20r='9'%20fill='%23fff'/%3E%3Cpath%20d='M16%2062%20L48%2038%20L74%2058%20L92%2046%20L104%2062%20Z'%20fill='%23fff'/%3E%3C/svg%3E"

/**
 * `Image` sample — a static image control, showing `Source`, `Aspect="AspectFit"`, and
 * `WidthRequest`/`HeightRequest` sizing. `AutomationName` supplies the accessible `alt`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ImageSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="Image — Source, Aspect=&quot;AspectFit&quot;, Width/HeightRequest" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Image Source={DEMO_IMAGE} Aspect="AspectFit" WidthRequest={180} HeightRequest={120} AutomationName="A blue picture with a sun and hills" />
    </StackLayout>
  )
}
