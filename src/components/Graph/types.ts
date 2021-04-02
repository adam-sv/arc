// dependencies
import type { RefObject, MouseEvent, SyntheticEvent } from "react";
// internals
import type { NodesStore } from './Nodes/Nodes.store';
import type { VisualStore } from './Visual.store';
// types
import type { IARCProps, IBoxDimensions, ICoords, IEdgeRouterMode, LogicalArcGraph } from "@adam-sv/arc";

export interface IDescribedBox extends IBoxDimensions {
  verticalSize: number;
  horizontalSize: number;
}

export interface IGraphProps extends IARCProps {
  // graph can be IProcessableArcGraph or IProcessableCustomGraph
  graph?: LogicalArcGraph;
  // graph?: logicalGraphTypes.IProcessableArcGraph;
  // customGraph?: logicalGraphTypes.IProcessableCustomGraph;
  // rendering config
  gridSize?: number;
  gridFillsAvailableSpace?: boolean;
  portSize?: number;
  padding?: IBoxDimensions;
  margin?: IBoxDimensions;
  edgeMode?: IEdgeRouterMode;
  edgeSpacing?: number;
  // graph actions
  onBackgroundClick?: (e: MouseEvent) => void;
  onDrop?: (e: SyntheticEvent) => void;
  onContextMenu?: (e: MouseEvent) => void;
  // actions
  connectionActions?: IGraphConnectionActions;
  nodeActions?: IGraphNodeActions;
  selectionActions?: IGraphSelectionActions;
}

export interface IGraphConnectionActions {
  onClick?: (e: SyntheticEvent, edge: any) => void;
  onHover?: (e: SyntheticEvent, edge: any) => void;
  onUnhover?: (e: SyntheticEvent, edge: any) => void;
  canBeConnectionSource?: (e: SyntheticEvent, node: any) => void; // not implemented
  canBeConnectionTarget?: (e: SyntheticEvent, node: any) => void; // not implemented
  hideTargets?: (e: SyntheticEvent, node: any) => void; // not implemented
  showTargets?: (e: SyntheticEvent, node: any) => void; // not implemented
  createConnection?: (e: SyntheticEvent, nodes: [any, any]) => void; // not implemented
}

export interface IGraphNodeActions {
  domRef?: RefObject<SVGGElement>;
  onClick?: (e: SyntheticEvent, node: any) => void;
  onDoubleClick?: (e: SyntheticEvent, node: any) => void;
  onContextMenu?: (e: MouseEvent, node: any) => void;
  onMove?: (e: SyntheticEvent, node: any, delta: ICoords) => void; // not implemeneted
}

export interface IGraphSelectionActions {
  onContextMenu?: (e: MouseEvent, nodes: any[]) => void;
  onSelectionCancelled?: (e: SyntheticEvent, nodes: any[]) => void;
  onSelectionMoved?: (e: SyntheticEvent, nodes: any[]) => void;
  onSelectionUpdated?: (e: SyntheticEvent, nodes: any[]) => void;
}

export interface IGraphStores {
  nodes: NodesStore;
  visual: VisualStore;
}
