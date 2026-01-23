import type { GraphNodeId, ICoords, IProcessedGraphNode } from '@adam-sv/arc';

// TODO: should these all pass the graph reference too?
export interface IConnectionCreationLogic<
  NodeType,
  NodeIdType extends GraphNodeId
> {
  // Required: an edge creation listener. The user might pick the "end" of the edge "first", so you should handle that
  onEdgeCreated: (firstId: NodeIdType, secondId: NodeIdType) => unknown;
  // omitting ==> all nodes can spawn connections
  canSpawnConnections?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => boolean;
  // omitting ==> all nodes can be connected to by nodes spawning connections
  getValidConnectionTargets?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => Set<NodeIdType>;
  // omitting ==> all connection targets get the button in the middle
  getConnectionStartPosition?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) =>
    | { position: 'center'; offset?: undefined; className?: string }
    | { position: 'right'; offset?: number; className?: string }
    | undefined;
}

export interface ILineInfo<NodeIdType extends GraphNodeId> {
  startingNodeId: NodeIdType;
  start: ICoords;
  end: ICoords;
}
