import type { WCRectangle } from '@adam-sv/arc';
import type { IBoxSize, ICoords } from '@adam-sv/arc';

export type GraphNodeId<T = number | string> = T;
export type GraphEdgeId<T = number | string> = GraphNodeId<T>;

// our graph models tree-style hierarchy on the nodes via parentId,
// so edges should NOT model tree hierarchies
// I mean, you can go wild I suppose, but just be aware there's another mechanism
export interface IGraphEdge<EdgeType, NodeIdType extends GraphNodeId> {
  id?: NodeIdType;
  from: NodeIdType;
  to: NodeIdType;
  datum?: EdgeType;
  className?: string;
}

export interface IProcessedGraphNode<NodeType, NodeIdType extends GraphNodeId>
  extends IGraphNode<NodeType, NodeIdType> {
  parent: IProcessedGraphNode<NodeType, NodeIdType> | undefined;
  children: IProcessedGraphNode<NodeType, NodeIdType>[];
  childrenIds: NodeIdType[];
}

export interface IGraphNodeAccessors<NodeType, NodeIdType extends GraphNodeId> {
  getBounds(node: IGraphNode<NodeType, NodeIdType>): WCRectangle;
  getChildren(node: IGraphNode<NodeType, NodeIdType>): NodeIdType[];
}

export interface IGraphNode<NodeType, NodeIdType extends GraphNodeId> {
  id: NodeIdType;
  className?: string;
  label: string;
  parentId?: NodeIdType;
  position?: ICoords;
  role?: 'input' | 'output'; // | 'standard'; // no role == 'standard' role
  size?: IBoxSize;
  datum?: NodeType;
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
}

export interface IWebcolaEdge {
  id: string;
  from: number;
  to: number;
}

export interface IWebcolaDefinition<EdgeType, NodeIdType extends GraphNodeId> {
  nodes: IWebcolaNode[];
  edges: IWebcolaEdge[];
  accessors: IWebcolaAccessors;
  // we only offer getOriginalEdge as it is imoprtant to note the Webcola only factors in with the edge geometry
  // this is to say: webcola interacts with EdgeRouter, so EdgeRouter has to be able to recover the non-webcola edge
  // the Graph, on the other hand, deals with IProcessedGraphNodes directly
  getOriginalEdge: (node: IWebcolaEdge) => IGraphEdge<EdgeType, NodeIdType>;
}
