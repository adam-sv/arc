// dependencies
import type { RefObject, MouseEvent, SyntheticEvent } from 'react';
// types
import type {
  IARCProps,
  IBoxDimensionsByEdge,
  IBoxSize,
  ICoords,
  IEdgeRouterMode,
  IProcessedGraphNode,
  LogicalArcGraph,
  RenderableContent,
} from '@adam-sv/arc';
import type { IGraphEdge, IGraphNode } from '@adam-sv/arc';

export interface IDescribedBox extends IBoxDimensionsByEdge {
  verticalSize: number;
  horizontalSize: number;
}

export type GraphNodeContentRenderer<NodeType = any, EdgeType = any> = (
  node: IProcessedGraphNode<NodeType>,
  contentSize: IBoxSize,
  graph: LogicalArcGraph<NodeType, EdgeType>
) => RenderableContent;

export interface IGraphProps<NodeType = any, EdgeType = any> extends IARCProps {
  graph: LogicalArcGraph<NodeType, EdgeType>;
  // rendering config
  gridSize?: number;
  gridFillsAvailableSpace?: boolean;
  portSize?: number;
  padding?: IBoxDimensionsByEdge;
  edgeMode?: IEdgeRouterMode;
  edgeSpacing?: number;
  zoomProperties?: IZoomProperties;
  // graph actions
  onBackgroundClick?: (e: MouseEvent) => void;
  onDrop?: (
    e: SyntheticEvent,
    offset: { x: number; y: number },
    boundingRect: DOMRect,
    zoom: number
  ) => void;
  onContextMenu?: (e: MouseEvent) => void;
  // actions
  connectionActions?: IGraphConnectionActions;
  nodeActions?: IGraphNodeActions;
  selectionActions?: IGraphSelectionActions;
  // faceplates
  customSVGNodeContent?: GraphNodeContentRenderer<NodeType, EdgeType>;
  customHTMLNodeContent?: GraphNodeContentRenderer<NodeType, EdgeType>;
}

declare interface IZoomBase {
  minZoom?: number;
  maxZoom?: number;
  initialZoomLevel?: number;
}
export interface IAutomaticZoom extends IZoomBase {
  disableZoomControls: false;
}

export interface IManualZoom extends IZoomBase {
  zoom: number;
  disableZoomControls: true;
}

export type IZoomProperties = IAutomaticZoom | IManualZoom;

export interface IGraphConnectionActions<NodeType = any, EdgeType = any> {
  onClick?: (e: SyntheticEvent, edge: IGraphEdge<EdgeType>) => void;
  onHover?: (e: SyntheticEvent, edge: IGraphEdge<EdgeType>) => void;
  onUnhover?: (e: SyntheticEvent, edge: IGraphEdge<EdgeType>) => void;
  canBeConnectionSource?: (
    e: SyntheticEvent,
    node: IGraphNode<NodeType>
  ) => void; // not implemented
  canBeConnectionTarget?: (
    e: SyntheticEvent,
    node: IGraphNode<NodeType>
  ) => void; // not implemented
  hideTargets?: (e: SyntheticEvent, node: IGraphNode<NodeType>) => void; // not implemented
  showTargets?: (e: SyntheticEvent, node: IGraphNode<NodeType>) => void; // not implemented
  createConnection?: (
    e: SyntheticEvent,
    nodes: [IGraphNode<NodeType>, IGraphNode<NodeType>]
  ) => void; // not implemented
}

export interface IGraphNodeActions<NodeType = any> {
  domRef?: RefObject<SVGGElement>;
  onClick?: (e: SyntheticEvent, node: IGraphNode<NodeType>) => void;
  onDoubleClick?: (e: SyntheticEvent, node: IGraphNode<NodeType>) => void;
  onContextMenu?: (e: MouseEvent, node: IGraphNode<NodeType>) => void;
  onMove?: (
    e: SyntheticEvent,
    node: IGraphNode<NodeType>,
    delta: ICoords
  ) => void; // not implemeneted
  onMouseDown?: (e: SyntheticEvent, node: IGraphNode<NodeType>) => void;
  onMouseUp?: (e: SyntheticEvent, node: IGraphNode<NodeType>) => void;
}

export interface IGraphSelectionActions<NodeType = any> {
  onContextMenu?: (e: MouseEvent, selection: IGraphNode<NodeType>[]) => void;
  onSelectionCancelled?: (
    e: SyntheticEvent,
    selection: IGraphNode<NodeType>[]
  ) => void;
  onSelectionMoved?: (
    e: SyntheticEvent,
    selection: IGraphNode<NodeType>[]
  ) => void;
  onSelectionUpdated?: (
    e: SyntheticEvent | undefined,
    selection: IGraphNode<NodeType>[]
  ) => void;
}

export interface INodeChildren {
  inputs: IProcessedGraphNode[];
  outputs: IProcessedGraphNode[];
  other: IProcessedGraphNode[];
}
