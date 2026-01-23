import type { IComputedGraphLayout } from '.';
import type { INodePlacement } from '..';
import type {
  GraphNodeId,
  IProcessedGraphNode,
  LogicalArcGraph,
} from '@adam-sv/arc';

/* FLAT LAYOUT */
export function flatLayout<NodeType, EdgeType, NodeIdType extends GraphNodeId>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>
): Pick<
  IComputedGraphLayout<NodeType, NodeIdType>,
  'placements' | 'topLevelNodes'
> {
  const topLevelNodes = graph.nodes;
  const placements = new Map<
    NodeIdType,
    INodePlacement<NodeType, NodeIdType>
  >();
  topLevelNodes.forEach((node) =>
    placements.set(node.id, flatProcessNode(node))
  );
  return {
    placements,
    topLevelNodes,
  };
}

function flatProcessNode<NodeType, NodeIdType extends GraphNodeId>(
  node: IProcessedGraphNode<NodeType, NodeIdType>
): INodePlacement<NodeType, NodeIdType> {
  const relativePosition = node.position ?? { x: -100, y: -100 };
  return {
    node,
    absolutePosition: relativePosition,
    relativePosition,
    size: node.size ?? { width: 180, height: 80 },
  };
}
