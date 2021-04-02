import type { RenderableContent, WCRectangle } from '@adam-sv/arc';
import type { IBoxSize, ICoords } from '@adam-sv/arc';
import type { TransitionStatus } from 'react-transition-group/Transition';

export type GraphNodeId = number | string;

export type GraphNodeDecorationRenderProp = (size: IBoxSize, animState: TransitionStatus) => RenderableContent;

export interface IGraphNode {
  id: GraphNodeId;
  label: string;
  role?: 'input' | 'output' | 'child'; // no role == 'child' role
  parentId: GraphNodeId | null;
  position?: ICoords;
  className?: string;
  size?: IBoxSize;
  Icon?: RenderableContent;
  hooks?: {
    decoration?: GraphNodeDecorationRenderProp;
  }
}

export interface IGraphNodeAccessors {
  getBounds(node: IGraphNode): WCRectangle;
  getChildren(node: IGraphNode): GraphNodeId[];
}

// our graph models hierarchy on the nodes,
// so edges should not model tree hierarchies
export interface IGraphEdge {
  from: GraphNodeId;
  to: GraphNodeId;
}

export interface LogicalGraph {
  nodes: IProcessedGraphNode[];
  edges: IGraphEdge[];
  getNode: (id: GraphNodeId) => IProcessedGraphNode;
  boundingRect: DOMRect;
  accessors: IGraphNodeAccessors;
  webcolaDefinition: IWebcolaDefinition;
}

export interface IProcessedGraphNode extends IGraphNode {
  parent: IProcessedGraphNode | null;
  children: IProcessedGraphNode[];
  childrenIds: GraphNodeId[];
}

export interface IProcessableArcGraph {
  nodes: IGraphNode[];
  edges: IGraphEdge[];
}

export interface IProcessableCustomGraph {
  nodes: any[];
  edges: IGraphEdge[];
  accessors: IGraphNodeAccessors;
}

export interface IGraph {
  accessors: IGraphNodeAccessors;
  boundingRect: DOMRect;
  edges: IGraphEdge[];
  nodes: IProcessedGraphNode[];
  rootNodes: IProcessedGraphNode[];
  getChildren: (id: GraphNodeId) => IProcessedGraphNode[];
  getNode: (id: GraphNodeId) => IGraphNode | undefined;
  getWebcolaDefinition(): IWebcolaDefinition;
}

export interface IWebcolaDefinition {
  nodes: any[];
  edges: IGraphEdge[];
  accessors: IGraphNodeAccessors;
}
