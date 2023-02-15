// css
import './styles/index';

// utils
export * from './utils';

// components
export { Accordion } from './components/Accordion';
export type { IAccordionItem, IAccordionProps } from './components/Accordion';

export { AlertModal } from './components/AlertModal';
export type { IArcAlertModalProps } from './components/AlertModal';

export { ApplicationBanner } from './components/ApplicationBanner';
export type { IApplicationBannerProps } from './components/ApplicationBanner';

export { AutocompleteInput } from './components/AutocompleteInput';
export type {
  AutocompleteSearch,
  IAutocompleteInputProps,
} from './components/AutocompleteInput';

export { ColorInput } from './components/ColorInput';
export type { IColorInputProps } from './components/ColorInput';

export { Background } from './components/Background';

export { Button } from './components/Button';
export type { ButtonType, IButtonProps } from './components/Button';

export * from './components/CabinView/types';
export {
  CabinView,
  CABIN_VIEW_AIRCRAFT_DIMENSIONS,
} from './components/CabinView';

export { Carousel } from './components/Carousel';
export type {
  ICarouselProps,
  IEntryInput,
  ISectionInput,
  IEntry,
  IEntryEventParams,
  ISection,
} from './components/Carousel';

export { CheckboxGroup } from './components/CheckboxGroup';
export type {
  ICheckBoxGroupItem,
  ICheckboxGroupProps,
} from './components/CheckboxGroup';

export { ChartContainer } from './components/Charts/ChartContainer';
export type {
  ICCFitsOneDimensionSizing,
  ICCResponsiveSizing,
  ICCSizing,
  IChartContainerProps,
  IChartContainerSizeProps,
} from './components/Charts/ChartContainer';
export type { ChartComponentRenderer } from './components/Charts/types';

export { ConfirmModal } from './components/ConfirmModal';
export type { IConfirmModalProps } from './components/ConfirmModal';

export { ContextMenu } from './components/ContextMenu';
export type { IContextMenuProps } from './components/ContextMenu';

export { Draggable } from './components/Draggable';
export type { IDraggableProps } from './components/Draggable';

export { Dropdown } from './components/Dropdown';
export type {
  DropdownValue,
  IDropdownItem,
  IDropdownProps,
} from './components/Dropdown/types';

export { Droppable } from './components/Droppable';
export type { IDroppableProps } from './components/Droppable';

export { EdgeRouter } from './components/EdgeRouter';
export type {
  IEdgeRouterMode,
  IEdgeRouterProps,
} from './components/EdgeRouter';

export { FileInput } from './components/FileInput';
export type { IFileInputProps } from './components/FileInput';

export { Form } from './components/Form';
export type {
  IFormCustomComponentProps,
  FormResourceState,
  FormRow,
  FormRows,
  IFormAccordionSection,
  IFormAccordionProps,
  IFormHooks,
  IFormObjectListProps,
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
} from './components/Form';

export { Gantt } from './components/Charts/Gantt';
export type { IGanttDatum, IGanttProps } from './components/Charts/Gantt';

export { Graph } from './components/Graph';
export type {
  IDescribedBox,
  IGraphProps,
  IGraphConnectionActions,
  IGraphNodeActions,
  IGraphSelectionActions,
} from './components/Graph';

export { BarChart } from './components/Charts/Bar';
export type {
  IBarChartDatum,
  ISecondaryLineDatum,
  ISecondaryLineData,
  IContinuousLinesData,
  IContinuousLinesDatum,
  IBarChartProps,
} from './components/Charts/Bar/types';
export { BarChartOrientation } from './components/Charts/Bar/types';

export { Grid } from './components/Charts/Grid';
export type { IGridProps } from './components/Charts/Grid';

export { InfoIcon } from './components/InfoIcon';
export type { IInfoIconProps } from './components/InfoIcon';

export { TextInput } from './components/TextInput';
export type { ITextInputProps, TextInputType } from './components/TextInput';

export { TemporalInput } from './components/TemporalInput';
export type {
  ITemporalInputProps,
  TemporalInputType,
} from './components/TemporalInput/types';

export {
  InputSkeleton,
  extractSkeletonProps,
} from './components/InputSkeleton';
export type {
  IInputSkeletonProps,
  IInputPropsBase,
  InputValue,
} from './components/InputSkeleton/types';

export { LeftNavigation, ArcNavLink } from './components/LeftNavigation';
export type {
  ILeftNavigationProps,
  INavigationItem,
} from './components/LeftNavigation';

export { LineChart } from './components/Charts/Line';
export type { ILineChartProps } from './components/Charts/Line/types';

export { MenuList, MenuItem } from './components/MenuList';
export type { IMenuProps, IMenuListItem } from './components/MenuList';

export { Modal } from './components/Modal'; // TODO consider deprecating
export type { IModalProps } from './components/Modal'; // TODO consider deprecating

export { MouseOver } from './components/MouseOver';
export type { IMouseOver } from './components/MouseOver';

export { MultitextInput } from './components/MultitextInput';

export type {
  MultitextItem,
  IMultitextInputProps,
} from './components/MultitextInput';

export { MonoIcon } from './components/svg/MonoIcon';
export type { IMonoIcon, MonoIconKey } from './components/svg/MonoIcon';

export { Nav } from './components/Nav';
export type { INavProps, INavItem } from './components/Nav';

export { Protected } from './components/Protected';

export { PositioningPixel } from './components/PositioningPixel';
export type { IPositioningPixelProps } from './components/PositioningPixel';

export { NumberSlider } from './components/Slider/NumberSlider';
export type { INumberSliderProps } from './components/Slider/NumberSlider';
export { RangeSlider } from './components/Slider/RangeSlider';
export type { IRangeSliderProps } from './components/Slider/RangeSlider';
export { ObjectSlider } from './components/Slider/ObjectSlider';
export type {
  IObjectSliderProps,
  ObjectSliderOption,
} from './components/Slider/ObjectSlider';

export * from './components/SegmentCanvas/types';
export { SegmentCanvas } from './components/SegmentCanvas';

export { StretchyPointer } from './components/StretchyPointer';
export type { IStretchyPointerProps } from './components/StretchyPointer';

export { Surface } from './components/Surface';

export { Panel } from './components/Panel';

export { ParallelAxisChart } from './components/ParallelAxisChart';
export * from './components/ParallelAxisChart/types';

export { FloatingPanel } from './components/FloatingPanel';
export type { FloatingPanelAnchorDirection } from './components/FloatingPanel';
export { PinnedPanel } from './components/PinnedPanel';

export { Table } from './components/Table';
export type {
  ITableProps,
  ICell,
  ICellEventParams,
  IColumnDefinition,
  IHeaderEventParams,
  IRow,
  IRowEventParams,
} from './components/Table';

export { Title } from './components/Title';
export type { ITitleProps, TitleType } from './components/Title';

export { Toggle } from './components/Toggle';
export type { IToggleProps } from './components/Toggle';

export { Tree } from './components/Tree';
export type {
  TreeNodeId,
  ITreeNode,
  IProcessedTreeNode,
  ITreeProps,
  ITreeGraph,
} from './components/Tree';

export { TreeBrowser } from './components/TreeBrowser';
export type { ITreeBrowserProps } from './components/TreeBrowser';

// logic
export { RenderSwitch, Case } from './utils/RenderSwitch';
export type { IRenderSwitchProps } from './utils/RenderSwitch';

export { LogicalArcGraph } from './graphs';
export type {
  GraphNodeDecorationRenderProp,
  GraphNodeId,
  IGraphNode,
  IGraphNodeAccessors,
  IGraphEdge,
  IProcessedGraphNode,
  IWebcolaDefinition,
  IWebcolaEdge,
  IWebcolaNode,
} from './graphs';

export { geometry } from './geometry';
export type { IGeometry } from './geometry';
export * from './geometry';

// hooks
export { useMemoizedState } from './hooks/useMemoizedState';
export type { IMemoizeOptions } from './hooks/useMemoizedState';

export { useModal } from './hooks/useModal';
export type { ModalHookAPI } from './hooks/useModal';

export { useStateIterator } from './hooks/useStateIterator';
export { useWindowDimensions } from './hooks/useWindowDimensions';

export { useStateThatRespondsToPropChanges } from './hooks/useStateThatRespondsToPropChanges';

// icons
export { AdamIcon } from './components/svg/AdamIcon';
export {
  AdamLogo,
  AdamLogoWhite,
  AdamLogoWhiteText,
} from './components/svg/AdamLogo';
export { BriefcaseIcon } from './components/svg/BriefcaseIcon';
export { CalendarIcon } from './components/svg/CalendarIcon';
export { ChartIcon } from './components/svg/ChartIcon';
export {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from './components/svg/Chevrons';
export { CompleteIcon } from './components/svg/CompleteIcon';
export { LightbulbIcon } from './components/svg/LightbulbIcon';
export { MenuIcon } from './components/svg/MenuIcon';
export { NotificationIcon } from './components/svg/NotificationIcon';
export { PauseIcon } from './components/svg/PauseIcon';
export { PersonTagIcon } from './components/svg/PersonTagIcon';
export { SearchIcon } from './components/svg/SearchIcon';
export { StartIcon } from './components/svg/StartIcon';
export { StopIcon } from './components/svg/StopIcon';
export { TaskCompleteIcon } from './components/svg/TaskCompleteIcon';
export { TaskIcon } from './components/svg/TaskIcon';
export { TaskOverdueIcon } from './components/svg/TaskOverdueIcon';
export { WalletIcon } from './components/svg/WalletIcon';
export { WorkerIcon } from './components/svg/WorkerIcon';

// WebCola extensions
export { WCGridRouter, WCRectangle } from './graphs/webcola';

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
} from './types';
