import type {
  IBoxSize,
  ICoords,
  IProcessedGraphNode,
  LogicalArcGraph,
  RenderableContent,
  IARCProps,
  IEdgeRouterMode,
  IGraphEdge,
  GraphNodeId,
  IChartState,
} from '@adam-sv/arc';

import type { IConnectionCreationLogic } from './InteractionManager/NodeInteractionManager';
import type { IComputedGraphLayout } from './layouts';

// PROPS
export interface IGraphProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId = GraphNodeId
> extends IARCProps {
  className?: string;
  // Graph
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>;
  // Edge Options
  edgeMode?: IEdgeRouterMode;
  forceEdgesOnTop?: boolean; // disables situations where edges are rendered behind nodes (non-smart routing)
  edgeSpacing?: number; // only for edgeMode="smart"
  edgeCreation?: IConnectionCreationLogic<NodeType, NodeIdType>;
  // Display Options - grid, size, content of each node
  gridSize?: number; // default 10
  gridLineOrDotThickness?: number; // default 1
  gridStyle?: 'grid' | 'dot-grid' | 'none';
  hideScrollBars?: boolean; // For instance, Nolan as a trackpad user doesn't want to see them, but it's a better default to show them
  minHeight?: number; // Default 140
  svgNodeContentRenderer?: IGraphNodeContentRenderer<
    NodeType,
    EdgeType,
    NodeIdType
  >;
  htmlNodeContentRenderer?: IGraphNodeContentRenderer<
    NodeType,
    EdgeType,
    NodeIdType
  >;
  scrollControls?: {
    left: number;
    top: number;
    onScrollUpdate?: (scrollLeft: number, scrollTop: number) => unknown;
  };
  zoomControls?: {
    value?: number;
    min?: number;
    max?: number;
    onZoomUpdate?: (zoom: number) => unknown;
  };
  // Layout Options
  // Let us do the math
  mode?: IGraphStrategy; // we offer "basic", "hierarchical", "functional", "custom"
  layoutOptions?: Partial<IGraphLayoutOptions>; // Omitting this means everything falls back to defaults, which is fine
  // OR do the math yourself
  renderedLayout?: IComputedGraphLayout<NodeType, NodeIdType>;
  // Scroll sync
  onScrollUpdate?: (scrollLeft: number, scrollTop: number) => unknown;

  // Selection Options
  selectionActions?: IGraphSelectionActions<EdgeType, NodeIdType>; // Hooks for interactivity
  selectedNodeIds?: Set<NodeIdType>;
  selectedEdges?: Set<IGraphEdge<EdgeType, NodeIdType>>;

  // Actions/interactions
  connectionActions?: IGraphConnectionActions<EdgeType, NodeIdType>; // Connection = Edge
  nodeActions?: IGraphNodeActions<NodeType, NodeIdType>;
  backgroundDragMode?: IGraphDragMode;

  // Graph level controls
  onContextMenu?: (
    ev: React.MouseEvent,
    coordinateSpacePosition: ICoords
  ) => unknown;
  onDrop?: (
    ev: React.DragEvent<HTMLDivElement>,
    coordinateSpacePosition: ICoords,
    data: string,
    chartState: IChartState
  ) => unknown;
  invertDragControls?: boolean; // background drag
  /** `debug` mode results in EdgeRouter showing the nodes
   * in the WebCola coordinate space and writing additional logs.*/
  debug?: boolean;
}

// RENDER OPTIONS
export interface IGraphRenderContext<
  NodeType = any,
  EdgeType = any,
  NodeIdType extends GraphNodeId = GraphNodeId
> {
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>;
  // Required methods for positioning & EdgeRouter
  getPosition: (
    node: IProcessedGraphNode<NodeType, NodeIdType>,
    flag?: boolean
  ) => ICoords | undefined;
  getSize: (node: IProcessedGraphNode<NodeType, NodeIdType>) => IBoxSize;
  getNodeConnectionLayout: (
    node: IProcessedGraphNode<NodeType, NodeIdType>,
    useRelativePosition?: boolean
  ) => IChildBoxPlacement | undefined;
  getNodeContentLayout: (
    node: IProcessedGraphNode<NodeType, NodeIdType>,
    useAbsolutePosition?: boolean
  ) => IChildBoxPlacement | undefined;
  // Layout options
  layoutOptions: IGraphLayoutOptions;
  scaledPadding: {
    topLevel: ICoords;
    child: ICoords;
  };
  zoom: number;
}

export interface IBoxPlacement {
  position: ICoords;
  size: IBoxSize;
}

export interface IChildBoxPlacement extends IBoxPlacement {
  isStrictSubset?: boolean;
}

export interface IGraphNodeContentRendererProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  position: ICoords;
  size: IBoxSize;
  showContentBox?: boolean;
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
}
export type IGraphNodeContentRenderer<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> = (
  props: IGraphNodeContentRendererProps<NodeType, EdgeType, NodeIdType>
) => RenderableContent;

export type IGraphChildNodeRenderer<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> = (props: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
  childNodeRenderer?: IGraphChildNodeRenderer<NodeType, EdgeType, NodeIdType>;
  contentRenderer?: IGraphNodeContentRenderer<NodeType, EdgeType, NodeIdType>;
}) => RenderableContent;

// LAYOUT
export interface IGraphLayoutOptions {
  // default overrides
  defaultNodeSize: IBoxSize;
  // used across any graph
  padding: number;

  // used across any nested graph
  childPadding: number;
  // functional
  inputOutputHeight: number;
  inputOutputWidth: number | 'auto';
  // functional, hierarchical
  contentHeight: number;
  // TODO: real content placement options
  // for instance, I think the user should be able to place content along any of the 4 sides (top/right/bottom/left)
  // Therefore the user should be able to pass "contentSide" and "contentSize" or something
  connectionTargetSize: number;
}

// TODO - incomplete
export type IGraphStrategy = 'flat' | 'hierarchical' | 'functional' | 'custom';

// TODO - incomplete
export type FlatGraphLayoutStrategy = {
  mode: 'flat';
  padding: number;
  defaultNodeSize?: IBoxSize;
};
// TODO - incomplete
export type HierarchicalGraphLayoutStrategy = {
  mode: 'hierarchical';
  padding: number;
  defaultNodeSize?: IBoxSize;
  childPadding: number;
  inputOutputHeight?: number;
  inputOutputWidth?: number;
  contentHeight?: number;
};

// TODO - incomplete
export type FunctionalLayoutOptions = {
  mode: 'functional';
  connectionTargetSize?: number;
  childPadding?: number;
};
// We use this as the basis of our layout
// absolutePosition is what we tell the EdgeRouter is the node's position
// relativePosition is how we render the nodes (using a hierarchical approach)
// size is the size the node is drawn at
// contentPlacement
export interface INodePlacement<NodeType, NodeIdType extends GraphNodeId> {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  absolutePosition: ICoords;
  relativePosition: ICoords; // soon to be deprecated
  size: IBoxSize;
  contentPlacement?: INodePortionPlacement; // If not used, content area is the whole node (great for basic, bad for functional / nested)
  connectionTargetPlacement?: INodePortionPlacement; // If not used, connection area is the whole node (great for basic and nested, bad for functional)
}

// Use this when you have only a portion of the displayed node for a certain role
// For instance, in a Functional graph, we'll separate "content" and "connection" areas
export interface INodePortionPlacement {
  role: 'content-container' | 'connection-target'; // We could implement more later, for now this is more to track how it's used
  position: ICoords; // this position is relative to the node!
  size: IBoxSize;
}

export type IGraphDragMode = 'move' | 'multi-select';

export interface IGraphDefaults {
  GRID_SIZE: number;
  GRID_LINE_OR_DOT_THICKNESS: number;
  MIN_HEIGHT: number;
  ZOOM_DEFAULTS: { value: number; min: number; max: number };
  LAYOUT_OPTIONS: {
    PADDING: number;
    CHILD_PADDING: number;
    DEFAULT_NODE_SIZE: IBoxSize;
    INPUT_OUTPUT_HEIGHT: number;
    INPUT_OUTPUT_WIDTH: number;
    CONTENT_HEIGHT: number;
    CONNECTION_TARGET_SIZE: number;
  };
}

export interface IGraphConnectionActions<
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  onClick?: (
    e: React.MouseEvent,
    edge: IGraphEdge<EdgeType, NodeIdType>
  ) => unknown;
  onContextMenu?: (
    e: React.MouseEvent,
    edge: IGraphEdge<EdgeType, NodeIdType>
  ) => unknown;
  onHover?: (
    e: React.MouseEvent,
    edge: IGraphEdge<EdgeType, NodeIdType>
  ) => unknown;
  onUnhover?: (
    e: React.MouseEvent,
    edge: IGraphEdge<EdgeType, NodeIdType>
  ) => unknown;
}

export interface IGraphNodeActions<NodeType, NodeIdType extends GraphNodeId> {
  onClick?: (
    e: React.MouseEvent,
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => unknown;
  onDoubleClick?: (
    e: React.MouseEvent,
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => unknown;
  onContextMenu?: (
    e: React.MouseEvent,
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => unknown;
  onMove?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>,
    delta: ICoords
  ) => unknown; // not implemeneted
}

export interface IGraphSelectionActions<
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  onContextMenu?: (
    e: React.MouseEvent,
    selection: IGraphSelection<EdgeType, NodeIdType>
  ) => unknown;
  onSelectionMoved?: (
    selection: IGraphSelection<EdgeType, NodeIdType>,
    delta: ICoords
  ) => unknown;
  onSelectionUpdated?: (
    selection: IGraphSelection<EdgeType, NodeIdType>
  ) => unknown; // Tells you what the graph thinks is now selected
  // Alternate API, unsure
  onSelectionChanged?: (selectionDifference: {
    added?: Partial<IGraphSelection<EdgeType, NodeIdType>>;
    deleted?: Partial<IGraphSelection<EdgeType, NodeIdType>>;
    multiEvent?: boolean;
  }) => unknown;
}

export interface IGraphSelection<EdgeType, NodeIdType extends GraphNodeId> {
  nodeIds: Set<NodeIdType>;
  edges: Set<IGraphEdge<EdgeType, NodeIdType>>;
}
