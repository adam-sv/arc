// types
import type {
  GraphNodeId,
  IBoxSize,
  IProcessedGraphNode,
  LogicalArcGraph,
} from '@adam-sv/arc';
import type { INodePlacement } from '..';
// layouts
import { computeBoundingRect, IComputedGraphLayout } from '.';
import { IGraphLayoutOptions, INodePortionPlacement } from '../types';
// import { ICoords } from '@adam-sv/arc';

declare interface IHierarchicalContext<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>;
  map: IComputedGraphLayout<NodeType, NodeIdType>['placements'];
  childPadding: number;
  contentHeight: number;
  defaultNodeSize: IBoxSize;
}

const origin = { x: 0, y: 0 };

export function hierarchicalLayout<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  layoutOptions: IGraphLayoutOptions
): Pick<
  IComputedGraphLayout<NodeType, NodeIdType>,
  'placements' | 'topLevelNodes'
> {
  const { childPadding, contentHeight = 20, defaultNodeSize } = layoutOptions;
  const placements = new Map<
    NodeIdType,
    INodePlacement<NodeType, NodeIdType>
  >();
  const topLevelNodes = graph.rootNodes.sort((a, b) => {
    return b.children.length - a.children.length;
  });

  const context: IHierarchicalContext<NodeType, EdgeType, NodeIdType> = {
    graph,
    map: placements,
    childPadding,
    contentHeight,
    defaultNodeSize,
  };

  topLevelNodes.forEach((node) => hierarchicalProcessNode(node, context));
  return {
    placements,
    topLevelNodes,
  };
}
function hierarchicalProcessNode<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  node: IProcessedGraphNode<NodeType, NodeIdType>,
  context: IHierarchicalContext<NodeType, EdgeType, NodeIdType>
) {
  const { graph, map, childPadding, contentHeight, defaultNodeSize } = context;
  const isLeafNode = graph.nodeIsLeaf(node);
  // If we have node 1 parent of node 1/1 parent of node 1/1/1 (current node)
  // then getParentChain().reverse() returns [node:1, node:1/1, node:1/1/1]
  // so we have [position(node:1), position(node:1/1), position(node:1/1/1)]
  const positionsFromRootToSelf = graph
    .getParentChain(node.id)
    .map((parentNode) => parentNode.position || origin)
    .reverse();

  const relativePosition = { ...(node.position || origin) };
  const absolutePosition =
    positionsFromRootToSelf.length > 1
      ? positionsFromRootToSelf.reduce(
          (pos, { x, y }) => ({
            x: pos.x + (x ?? 0) + childPadding,
            y: pos.y + (y ?? 0) + childPadding,
          }),
          { x: -1 * childPadding, y: -1 * childPadding }
        )
      : relativePosition;

  let size = node.size || defaultNodeSize;
  if (!isLeafNode) size = computeChildrenRequiredSpace(node, context);

  let contentPlacement: INodePortionPlacement | undefined;
  if (!isLeafNode)
    contentPlacement = {
      role: 'content-container',
      position: { x: 0, y: size.height - contentHeight },
      size: { height: contentHeight, width: size.width },
    };

  const nodePlacement: INodePlacement<NodeType, NodeIdType> = {
    node,
    absolutePosition,
    relativePosition,
    size,
    contentPlacement,
  };
  map.set(node.id, nodePlacement);

  return nodePlacement;
}

function computeChildrenRequiredSpace<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  node: IProcessedGraphNode<NodeType, NodeIdType>,
  context: IHierarchicalContext<NodeType, EdgeType, NodeIdType>
) {
  const { graph, childPadding, contentHeight } = context;
  const children = graph.getChildren(node.id);
  const childPlacements = children.map((childNode) =>
    hierarchicalProcessNode(childNode, context)
  );
  const boundingRect = computeBoundingRect(childPlacements);
  const offset = {
    x: -1 * boundingRect.left,
    y: -1 * boundingRect.top,
  };
  const size = {
    width: boundingRect.width + childPadding * 2,
    height: boundingRect.height + contentHeight + childPadding * 2,
  };

  childPlacements.forEach((placement) => {
    placement.relativePosition.x += offset.x;
    placement.relativePosition.y += offset.y;
    placement.absolutePosition.x += offset.x;
    placement.absolutePosition.y += offset.y;
  });
  return size;
}
