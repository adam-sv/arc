// BARREL MODULE
// Nolan's notes:
// * Purpose of the file: a single access point for all functionality
// * Also orders the loading so you can control who access what

// ORDERING
// Key notes:
// * We put the "Components" last in this list of outputs because Components might depend on Hooks, Logic, CSS, Icons, and so on; the inverse is not true.
// * "Logic" comes first because Hooks might depend on Logic
// * Otherwise, things are just done alphabetically

// css
import "./styles/index";

// logic
export { LogicalArcGraph } from "./graphs";
export type {
  GraphNodeId,
  IGraphNode,
  IGraphNodeAccessors,
  IGraphEdge,
  IProcessedGraphNode,
  IWebcolaDefinition,
  IWebcolaEdge,
  IWebcolaNode,
} from "./graphs";

export { geometry } from "./geometry";
export type { IGeometry } from "./geometry";
export * from "./geometry";

// hooks
export { useModal } from "./hooks/useModal";
export type { ModalHookAPI } from "./hooks/useModal";

export { useClickOutsideDetector } from "./hooks/useClickOutsideDetector";
export { useForceRender } from "./hooks/useForceRender";
export { useScrollDetector } from "./hooks/useScrollDetector";
export { useStateIterator } from "./hooks/useStateIterator";
export { useEffectWithPreviousValue } from "./hooks/useEffectWithPreviousValue";
export { useStateThatRespondsToPropChanges } from "./hooks/useStateThatRespondsToPropChanges";
export { useWindowDimensions } from "./hooks/useWindowDimensions";

// icons
export { AdamIcon } from "./components/svg/AdamIcon";
export {
  AdamLogo,
  AdamLogoWhite,
  AdamLogoWhiteText,
} from "./components/svg/AdamLogo";

// WebCola extensions
// We no longer export WCGridRouter - they are entirely contained to the web workers
// However WCRectangle is used in some questionable places
// export { WCGridRouter, WCRectangle } from './graphs/webcola';
export { WCRectangle } from "./graphs/webcola";

// utils
export * from "./utils";
export { LogicalGraphUtils } from "./graphs/methods";

// components
export { Accordion } from "./components/Accordion";
export type { IAccordionItem, IAccordionProps } from "./components/Accordion";

export { AlertModal } from "./components/AlertModal";
export type { IArcAlertModalProps } from "./components/AlertModal";

export { ApplicationBanner } from "./components/ApplicationBanner";
export type { IApplicationBannerProps } from "./components/ApplicationBanner";

export { AutocompleteInput } from "./components/AutocompleteInput";
export type {
  AutocompleteSearch,
  IAutocompleteInputProps,
} from "./components/AutocompleteInput";

export { ColorInput } from "./components/ColorInput";
export type { IColorInputProps } from "./components/ColorInput";

export { Background } from "./components/Background";

export { Button } from "./components/Button";
export type { ButtonType, IButtonProps } from "./components/Button";

export { Carousel } from "./components/Carousel";
export type {
  ICarouselProps,
  IEntryInput,
  ISectionInput,
  IEntry,
  IEntryEventParams,
  ISection,
} from "./components/Carousel";

export { CheckboxGroup } from "./components/CheckboxGroup";
export type {
  ICheckBoxGroupItem,
  ICheckboxGroupProps,
} from "./components/CheckboxGroup";

// NEW
export {
  ChartContext,
  ChartComponentContext,
} from "./components/Charts/Base/Providers";
export {
  ChartBase,
  ChartComponents,
  ChartSyncedScrollBar,
  useChartState,
  useScrollBridge,
  useZoomBridge,
  getClipPathPolygon,
} from "./components/Charts/Base";
export type {
  ChartComponent,
  ChartSide,
  IChartBaseProps,
  IChartConfiguration,
  IChartContentSizeProps,
  IChartResponsiveSizing,
  IChartFitsOneDimensionSizing,
  IChartComponentProps,
  IChartSideProps,
  IChartState,
  IChartSyncedScrollBarProps,
  IChartAxisSizing,
  ClipTypes,
  ClipType,
  ClipPlace,
  IChartAxisClipPathProps,
} from "./components/Charts/Base";
export { ResizeBar } from "./components/Charts/Base/ResizeBar";
export type { IResizeBarProps } from "./components/Charts/Base/ResizeBar";

export { ChartLegend } from "./components/Charts/Base/components";
export type { IChartLegendProps } from "./components/Charts/Base/components";

export { ConfirmModal } from "./components/ConfirmModal";
export type { IConfirmModalProps } from "./components/ConfirmModal";

export { ContextMenu } from "./components/ContextMenu";
export type { IContextMenuProps } from "./components/ContextMenu";

export { Draggable } from "./components/Draggable";
export type { IDraggableProps } from "./components/Draggable";

export { Dropdown } from "./components/Dropdown";
export type {
  DropdownValue,
  IDropdownItem,
  IDropdownProps,
} from "./components/Dropdown/types";

export { Droppable } from "./components/Droppable";
export type { IDroppableProps } from "./components/Droppable";

export { EdgeRouter } from "./components/Charts/EdgeRouter";
export type {
  IEdgeRouterProps,
  IEdgeRouterMode,
} from "./components/Charts/EdgeRouter";

export { FileInput } from "./components/FileInput";
export type { IFileInputProps } from "./components/FileInput";

export { Form } from "./components/Form";
export type {
  IFormCustomComponentProps,
  FormResourceState,
  FormRow,
  FormRows,
  IFormAccordionSection,
  IFormAccordionProps,
  IFormHooks,
  IFormObjectListProps,
  IFormListProps,
  IFormProps,
  IFormRenderOptions,
  IFormSectionTitle,
  FormValues,
  FormFieldValue,
  FormField,
  FormFieldId,
  FormLayoutItem,
  FormFieldType,
  IFormFieldCustom,
} from "./components/Form";

export { GanttChart } from "./components/Charts/GanttChart";
export type {
  IGanttChart,
  IGanttChartEdge,
  IGanttChartDatum,
  IGanttDevBarProps,
} from "./components/Charts/GanttChart/types";

export { BarChart } from "./components/Charts/BarChart";
export type {
  IBarChartDatum,
  IBarChartProps,
  IBarOpts,
  IBarChartSecondaryLineData,
} from "./components/Charts/BarChart/types";

export { Graph, GraphUtils } from "./components/Charts/Graph";
export type {
  IGraphProps,
  IGraphConnectionActions,
  IGraphDragMode,
  IGraphNodeActions,
  IGraphSelectionActions,
} from "./components/Charts/Graph";

export { ScatterPlot } from "./components/Charts/ScatterPlot";
export type {
  IScatterPlotProps,
  IScatterPlotDatum,
} from "./components/Charts/ScatterPlot";

export { InfoIcon } from "./components/InfoIcon";
export type { IInfoIconProps } from "./components/InfoIcon";

export { TextInput } from "./components/TextInput";
export type { ITextInputProps, TextInputType } from "./components/TextInput";

export { TextAreaInput } from "./components/TextAreaInput";
export type { ITextAreaInputProps } from "./components/TextAreaInput";

export { TemporalInput } from "./components/TemporalInput";
export type {
  ITemporalInputProps,
  TemporalInputType,
} from "./components/TemporalInput";

export {
  InputSkeleton,
  extractSkeletonProps,
} from "./components/InputSkeleton";
export type {
  IInputSkeletonProps,
  IInputPropsBase,
  InputValue,
} from "./components/InputSkeleton/types";

export { LeftNavigation, ArcNavLink } from "./components/LeftNavigation";
export type {
  ILeftNavigationProps,
  INavigationItem,
} from "./components/LeftNavigation";

export { Loader } from "./components/Loader";
export type { ILoaderProps } from "./components/Loader";

export { LineChart } from "./components/Charts/LineChart";
export type {
  ILineChartProps,
  ILineChartDatum,
  ILineChartLineProps,
  ILineChartAxisProps,
} from "./components/Charts/LineChart/types";

export { MenuList, MenuItem } from "./components/MenuList";
export type { IMenuProps, IMenuListItem } from "./components/MenuList";

export { Modal } from "./components/Modal";
export type { IModalProps } from "./components/Modal";

export { MouseOver } from "./components/MouseOver";
export type { IMouseOver } from "./components/MouseOver";

export { MultitextInput } from "./components/MultitextInput";

export type {
  MultitextItem,
  IMultitextInputProps,
} from "./components/MultitextInput";

export { MatIcon, MIcon } from "./components/MatIcon";
export type { IMatIcon, IMatIconKey } from "./components/MatIcon";

export { Nav } from "./components/Nav";
export type { INavProps, INavItem } from "./components/Nav";

export { Grid } from "./components/Charts/Axes/Grid";
export type { IGridProps } from "./components/Charts/Axes/Grid";

export { Protected } from "./components/Protected";

export { PositioningPixel } from "./components/PositioningPixel";
export type { IPositioningPixelProps } from "./components/PositioningPixel";

export { NumberSlider } from "./components/Slider/NumberSlider";
export type { INumberSliderProps } from "./components/Slider/NumberSlider";
export { RangeSlider } from "./components/Slider/RangeSlider";
export type { IRangeSliderProps } from "./components/Slider/RangeSlider";
export { ObjectSlider } from "./components/Slider/ObjectSlider";
export type {
  IObjectSliderProps,
  ObjectSliderOption,
} from "./components/Slider/ObjectSlider";

export { Spinner } from "./components/Spinner";

export { StretchyPointer } from "./components/StretchyPointer";
export type { IStretchyPointerProps } from "./components/StretchyPointer";

export { Surface } from "./components/Surface";

export { SwimLanes } from "./components/Charts/Axes/SwimLanes";
export type { ISwimLaneAxisProps } from "./components/Charts/Axes/SwimLanes";

export { Panel } from "./components/Panel";

export { ParallelAxisChart } from "./components/ParallelAxisChart";
export * from "./components/ParallelAxisChart/types";

export { FloatingPanel } from "./components/FloatingPanel";
export type { FloatingPanelAnchorDirection } from "./components/FloatingPanel";

// PinnedPanel
export { PinnedPanel } from "./components/PinnedPanel";
export type { IPinnedPanelProps } from "./components/PinnedPanel";

export { Table } from "./components/Table";
export type {
  ITableProps,
  ICell,
  ICellEventParams,
  IColumnDefinition,
  IHeaderEventParams,
  IRow,
  IRowEventParams,
} from "./components/Table";

export { Title } from "./components/Title";
export type { ITitleProps, TitleType } from "./components/Title";

export { TickAxis } from "./components/Charts/Axes/TickAxis";
export type { ITickAxisProps } from "./components/Charts/Axes/TickAxis";

export { Toggle } from "./components/Toggle";
export type { IToggleProps } from "./components/Toggle";

export { Tree } from "./components/Tree";
export type {
  ITreeNode,
  IProcessedTreeNode,
  ITreeProps,
  ITreeGraph,
} from "./components/Tree";

export { TreeBrowser } from "./components/TreeBrowser";
export type { ITreeBrowserProps } from "./components/TreeBrowser/types";

// public types
export type {
  ArcComponentSize,
  ArcHorizontalPosition,
  ArcVerticalPositon,
  IARCProps,
  IBoxSize,
  IBoxDimensionsByEdge,
  ICoords,
  JSObject,
  Optionalize,
  RenderableContent,
} from "./types";
