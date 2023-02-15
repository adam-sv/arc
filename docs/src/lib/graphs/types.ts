import type { RenderableContent, WCRectangle } from '@adam-sv/arc';
import type { IBoxSize, ICoords } from '@adam-sv/arc';
import type { TransitionStatus } from 'react-transition-group/Transition';

export type GraphNodeId = number | string;
export type GraphEdgeId = GraphNodeId;

export type GraphNodeDecorationRenderProp = (
  size: IBoxSize,
  animState: TransitionStatus
) => RenderableContent;

// our graph models tree-style hierarchy on the nodes via parentId,
// so edges should NOT model tree hierarchies
// I mean, you can go wild I suppose, but just be aware there's another mechanism
export interface IGraphEdge<T = any> {
  id?: GraphEdgeId;
  from: GraphNodeId;
  to: GraphNodeId;
  datum?: T;
  className?: string;
}

export interface IProcessedGraphNode<T = any> extends IGraphNode<T> {
  parent: IProcessedGraphNode<T> | null;
  children: IProcessedGraphNode<T>[];
  childrenIds: GraphNodeId[];
}

export interface IGraphNodeAccessors {
  getBounds(node: IGraphNode): WCRectangle;
  getChildren(node: IGraphNode): GraphNodeId[];
}

export interface IGraphNode<T = any> {
  id: GraphNodeId;
  className?: string;
  label: string;
  parentId: GraphNodeId | null;
  position?: ICoords;
  role?: 'input' | 'output' | 'child'; // no role == 'child' role
  size?: IBoxSize;
  datum?: T;
}

export interface IWebcolaAccessors {
  getBounds(node: IWebcolaNode): WCRectangle;
  getChildren(node: IWebcolaNode): number[];
}

export interface IWebcolaNode {
  id: number;
  label: string;
  parent: IWebcolaNode | undefined;
  parentId: number | undefined;
  leaf: boolean;
  rectangle: WCRectangle;
  children: number[];
  trueId?: GraphNodeId;
}

export interface IWebcolaEdge {
  id: string;
  from: number;
  to: number;
}

export interface IWebcolaDefinition<EdgeType = any> {
  nodes: IWebcolaNode[];
  edges: IWebcolaEdge[];
  accessors: IWebcolaAccessors;
  // we only offer getOriginalEdge as it is imoprtant to note the Webcola only factors in with the edge geometry
  // this is to say: webcola interacts with EdgeRouter, so EdgeRouter has to be able to recover the non-webcola edge
  // the Graph, on the other hand, deals with IProcessedGraphNodes directly
  getOriginalEdge: (node: IWebcolaEdge) => IGraphEdge<EdgeType>;
}
