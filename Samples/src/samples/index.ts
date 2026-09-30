import type { ComponentType } from 'react'
import type { CatalogId } from '../catalog'

import AbsoluteLayoutSample from './AbsoluteLayoutSample'
import ActivityIndicatorSample from './ActivityIndicatorSample'
import BorderSample from './BorderSample'
import BoxViewSample from './BoxViewSample'
import ButtonSample from './ButtonSample'
import CarouselViewSample from './CarouselViewSample'
import CheckBoxSample from './CheckBoxSample'
import CollectionViewSample from './CollectionViewSample'
import ContentViewSample from './ContentViewSample'
import ContentPageSample from './ContentPageSample'
import DatePickerSample from './DatePickerSample'
import EditorSample from './EditorSample'
import EllipseSample from './EllipseSample'
import EntrySample from './EntrySample'
import FlexLayoutSample from './FlexLayoutSample'
import FlyoutPageSample from './FlyoutPageSample'
import GraphicsViewSample from './GraphicsViewSample'
import GridSample from './GridSample'
import HorizontalStackLayoutSample from './HorizontalStackLayoutSample'
import HybridWebViewSample from './HybridWebViewSample'
import ImageButtonSample from './ImageButtonSample'
import ImageSample from './ImageSample'
import IndicatorViewSample from './IndicatorViewSample'
import LabelSample from './LabelSample'
import LineSample from './LineSample'
import ListViewSample from './ListViewSample'
import NavigationPageSample from './NavigationPageSample'
import PathSample from './PathSample'
import PickerSample from './PickerSample'
import PolygonSample from './PolygonSample'
import PolylineSample from './PolylineSample'
import ProgressBarSample from './ProgressBarSample'
import RadioButtonSample from './RadioButtonSample'
import RefreshViewSample from './RefreshViewSample'
import RectangleSample from './RectangleSample'
import RoundRectangleSample from './RoundRectangleSample'
import ScrollViewSample from './ScrollViewSample'
import SearchBarSample from './SearchBarSample'
import ShellSample from './ShellSample'
import SliderSample from './SliderSample'
import SplitterSample from './SplitterSample'
import StackLayoutSample from './StackLayoutSample'
import StepperSample from './StepperSample'
import SwitchSample from './SwitchSample'
import SwipeViewSample from './SwipeViewSample'
import TabbedPageSample from './TabbedPageSample'
import TableViewSample from './TableViewSample'
import TimePickerSample from './TimePickerSample'
import VerticalStackLayoutSample from './VerticalStackLayoutSample'
import WebViewSample from './WebViewSample'

/**
 * The sample registry: one sample component per catalogued control, keyed by `CatalogId`.
 *
 * The type is `Record<CatalogId, ComponentType>`, so `tsc` proves the bijection (SC-001): a missing
 * sample (an uncovered key) or an extra one (a key that is not a catalogued control) is a compile
 * error. The catalog's 50 `id`s and this registry's 50 keys are the same set of names — both equal
 * to the `@Fluid` barrel's export names.
 *
 * @remarks Referenced by: `SamplePane` (the right pane), via `samples[selectedId]`.
 */
export const samples: Record<CatalogId, ComponentType> = {
  AbsoluteLayout: AbsoluteLayoutSample,
  ActivityIndicator: ActivityIndicatorSample,
  Border: BorderSample,
  BoxView: BoxViewSample,
  Button: ButtonSample,
  CarouselView: CarouselViewSample,
  CheckBox: CheckBoxSample,
  CollectionView: CollectionViewSample,
  ContentView: ContentViewSample,
  ContentPage: ContentPageSample,
  DatePicker: DatePickerSample,
  Editor: EditorSample,
  Ellipse: EllipseSample,
  Entry: EntrySample,
  FlexLayout: FlexLayoutSample,
  FlyoutPage: FlyoutPageSample,
  GraphicsView: GraphicsViewSample,
  Grid: GridSample,
  HorizontalStackLayout: HorizontalStackLayoutSample,
  HybridWebView: HybridWebViewSample,
  ImageButton: ImageButtonSample,
  Image: ImageSample,
  IndicatorView: IndicatorViewSample,
  Label: LabelSample,
  Line: LineSample,
  ListView: ListViewSample,
  NavigationPage: NavigationPageSample,
  Path: PathSample,
  Picker: PickerSample,
  Polygon: PolygonSample,
  Polyline: PolylineSample,
  ProgressBar: ProgressBarSample,
  RadioButton: RadioButtonSample,
  RefreshView: RefreshViewSample,
  Rectangle: RectangleSample,
  RoundRectangle: RoundRectangleSample,
  ScrollView: ScrollViewSample,
  SearchBar: SearchBarSample,
  Shell: ShellSample,
  Slider: SliderSample,
  Splitter: SplitterSample,
  StackLayout: StackLayoutSample,
  Stepper: StepperSample,
  Switch: SwitchSample,
  SwipeView: SwipeViewSample,
  TabbedPage: TabbedPageSample,
  TableView: TableViewSample,
  TimePicker: TimePickerSample,
  VerticalStackLayout: VerticalStackLayoutSample,
  WebView: WebViewSample,
}
