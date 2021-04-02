// dependencies
/*
NOTE: we would like to do away with mobx; component state seems fairly well
covered by React state & hooks. However, BoxGraph needs a rewrite before we 
can do this, so we'll keep it for now and configure mobx so downstream users have good behaviors
*/
import { configure } from 'mobx';
configure({ isolateGlobalState: true });

// css
import './css/animation.css';
import './css/base.css';
import './css/colors.css';
import './css/shared.css';

// components
export { Accordion } from './components/Accordion';
export type { IAccordionItem, IAccordionProps } from './components/Accordion';

export { ApplicationBanner } from './components/ApplicationBanner';
export type { IApplicationBannerProps } from './components/ApplicationBanner';

export { BoxGraph } from './components/BoxGraph';
export type {
  IBoxGraphProps,
  IBoxGraphHereditaryGroup,
  IBoxGraphEdge,
  IBoxGraphNode,
} from './components/BoxGraph';

export { Button } from './components/Button';
export type { ButtonType, IButtonProps } from './components/Button';

export { Carousel } from './components/Carousel';
export type {
  ICarouselProps,
  IEntryInput,
  ISectionInput,
  IEntry,
  ISection,
} from './components/Carousel';

export { ChartContainer } from './components/Charts/ChartContainer';
export type { IChartContainerProps } from './components/Charts/ChartContainer';

export { Dropdown } from './components/Dropdown';
export type { IDropdownItem, IDropdownProps } from './components/Dropdown';

export { EdgeRouter } from './components/EdgeRouter';
export type {
  IEdgeRouterMode,
  IEdgeRouterProps,
} from './components/EdgeRouter';

export { FileInput } from './components/FileInput';
export type { IFileInputProps } from './components/FileInput';

export { Form } from './components/Form';
export type {
  FormFields,
  FormFieldType,
  FormResourceState,
  FormRow,
  FormRows,
  IFormAccordionSection,
  IFormAccordionProps,
  IFormCustomComponentProps,
  IFormField,
  IFormHooks,
  IFormObjectListProps,
  IFormProps,
  IFormRenderOptions,
  IFormSectionTitle,
  IFormState,
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
  IGraphStores,
} from './components/Graph';

export { Grid } from './components/Charts/Grid';
export type { IGridProps } from './components/Charts/Grid';

export { InfoIcon } from './components/InfoIcon';
export type { IInfoIconProps } from './components/InfoIcon';

export { Input } from './components/Input';
export type { IInputProps, InputType } from './components/Input';

export { InputSkeleton } from './components/InputSkeleton';
export type { IInputSkeletonProps } from './components/InputSkeleton';

export { LeftNavigation } from './components/LeftNavigation';
export type {
  ILeftNavigationProps,
  INavigationItem,
} from './components/LeftNavigation';

export { Modal } from './components/Modal'; // TODO consider deprecating
export type { IModalProps } from './components/Modal'; // TODO consider deprecating

export { ModalManager } from './components/ModalManager';
export type { IModalStateInterface } from './components/ModalManager';

export { MonoIcon } from './components/svg/MonoIcon';
export type { IMonoIcon } from './components/svg/MonoIcon';

export { PositioningPixel } from './components/PositioningPixel';
export type { IPositioningPixelProps } from './components/PositioningPixel';

export { SegmentedImage } from './components/SegmentedImage';
export type {
  ISegment,
  ISegmentedImageProps,
  ISegmentInput,
} from './components/SegmentedImage';

export { StretchyPointer } from './components/StretchyPointer';
export type { IStretchyPointerProps } from './components/StretchyPointer';

export { SVGContainer } from './components/SVGContainer';
export type {
  ISVGContainerProps,
  ISVGContentProps,
} from './components/SVGContainer';

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

export { buildGraph, LogicalArcGraph } from './graphs';
export type {
  GraphNodeDecorationRenderProp,
  GraphNodeId,
  IGraphNode,
  IGraphNodeAccessors,
  IGraphEdge,
  LogicalGraph,
  IProcessedGraphNode,
  IProcessableArcGraph,
  IProcessableCustomGraph,
  IGraph,
  IWebcolaDefinition,
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
export type { StateIteratorAPI } from './hooks/useStateIterator';

export { useExtensionManager } from './hooks/useExtensionManager';

// icons
export { AdamIcon } from './components/svg/AdamIcon';
export { AirbusLogo } from './components/svg/AirbusLogo';
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
export {
  GridRouter as WCGridRouter,
  Rectangle as WCRectangle,
} from './graphs/webcola/GridRouter';

// utils
export * from './utils';

// public types
export type {
  ArcComponentSize,
  ArcHorizontalPosition,
  ArcVerticalPositon,
  IARCProps,
  IBoxSize,
  IBoxDimensions,
  ICoords,
  Optionalize,
  RenderableContent,
  RenderResults,
} from './types';
