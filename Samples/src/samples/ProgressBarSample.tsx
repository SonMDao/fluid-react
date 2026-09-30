import { useState } from 'react'
import { Button, HorizontalStackLayout, Label, ProgressBar, StackLayout } from '@Fluid'

/**
 * `ProgressBar` sample — a determinate progress bar, showing `Progress` (0..1, driven by `Button`s)
 * and `ProgressColor`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ProgressBarSample() {
  const [progress, setProgress] = useState(0.5)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="ProgressBar — Progress (0..1), ProgressColor" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <ProgressBar Progress={progress} ProgressColor="var(--fluid-progress-color)" HeightRequest={10} />
      <HorizontalStackLayout Spacing={10}>
        <Button Text="0%" Command={() => setProgress(0)} Padding={8} />
        <Button Text="50%" Command={() => setProgress(0.5)} Padding={8} />
        <Button Text="100%" Command={() => setProgress(1)} Padding={8} />
      </HorizontalStackLayout>
      <Label Text={`Progress: ${Math.round(progress * 100)}%`} FontSize="var(--text-md)" TextColor="var(--text)" />
    </StackLayout>
  )
}
