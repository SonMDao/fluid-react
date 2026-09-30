import { BoxView, Grid, Label, VerticalStackLayout } from '@Fluid'

/**
 * `Grid` sample — a 2-column × 3-row grid where children self-place via the `Row`/`Column`/
 * `ColumnSpan` props and a plain child is placed with `<Grid.Item>`. Demonstrates
 * `RowDefinitions="Auto,*,Auto"` (the middle row expands) and `ColumnDefinitions="*,2*"`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function GridSample() {
  return (
    <VerticalStackLayout Spacing={10} Padding={12}>
      <Label Text="Grid — cells placed by Row / Column, a Grid.Item spans both columns" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Grid
        RowDefinitions="Auto,*,Auto"
        ColumnDefinitions="*,2*"
        RowSpacing={8}
        ColumnSpacing={8}
        HeightRequest={180}
        Padding={8}
        BackgroundColor="var(--card-border)"
      >
        <Label Text="Header (ColumnSpan 2)" Row={0} Column={0} ColumnSpan={2} FontSize="var(--text-base)" TextColor="var(--text)" />
        <BoxView Row={1} Column={0} Color="var(--accent-blue)" CornerRadius={6} />
        <BoxView Row={1} Column={1} Color="var(--primary-action-bg)" CornerRadius={6} />
        <Grid.Item Row={2} Column={0} ColumnSpan={2}>
          <Label Text="Footer row, placed by a Grid.Item" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
        </Grid.Item>
      </Grid>
    </VerticalStackLayout>
  )
}
