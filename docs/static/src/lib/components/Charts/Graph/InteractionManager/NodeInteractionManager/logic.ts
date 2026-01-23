import type { IConnectionCreationLogic, INodeInteractionMode } from '.';
import type { IBoxPlacement } from '../../types';
import type { GraphNodeId, IProcessedGraphNode } from '@adam-sv/arc';

export interface INodeInteractionDescription<
  NodeType,
  NodeIdType extends GraphNodeId
> {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  canSpawnConnections: boolean;
  displayMode: 'target' | 'default';
  placement: IBoxPlacement;
}

function getSortedNodes<NodeType, NodeIdType extends GraphNodeId>(
  nodes: Array<IProcessedGraphNode<NodeType, NodeIdType>>
) {
  const sortedNodes: Array<IProcessedGraphNode<NodeType, NodeIdType>> = [];

  // Find root nodes with children
  for (const node of nodes)
    if (node.children.length && node.parentId === null) sortedNodes.push(node);

  // Then nodes with children
  for (const node of nodes)
    if (node.children.length && node.parentId !== null) sortedNodes.push(node);

  // Stragglers last
  for (const node of nodes) if (!node.children.length) sortedNodes.push(node);

  return sortedNodes;
}

export function getVisibleNodes<NodeType, NodeIdType extends GraphNodeId>(
  nodes: Array<IProcessedGraphNode<NodeType, NodeIdType>>,
  getLayout: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => IBoxPlacement | undefined,
  mode: INodeInteractionMode,
  creationLogic?: IConnectionCreationLogic<NodeType, NodeIdType>,
  startingNodeId?: NodeIdType
): INodeInteractionDescription<NodeType, NodeIdType>[] {
  const visibleNodes: Array<INodeInteractionDescription<NodeType, NodeIdType>> =
    [];

  let validConnectionTargets: Set<NodeIdType> | true = true;
  if (startingNodeId !== undefined) {
    const startingNode = nodes.find((n) => n.id === startingNodeId);
    if (startingNode)
      validConnectionTargets =
        creationLogic?.getValidConnectionTargets?.(startingNode) ?? true;
  }

  // We need to be cognizant of render order
  const sortedNodes = getSortedNodes(nodes);
  sortedNodes.forEach((node) => {
    const placement = getLayout(node);
    if (!placement) return;

    let canSpawnConnections = false;
    let displayMode: 'target' | 'default' = 'default';

    if (mode === 'show-interactable-nodes') {
      visibleNodes.push({
        node,
        canSpawnConnections:
          creationLogic?.canSpawnConnections?.(node) ?? false,
        displayMode,
        placement,
      });
    }
    if (mode === 'show-connection-targets') {
      if (
        validConnectionTargets === true ||
        validConnectionTargets.has(node.id)
      )
        displayMode = 'target';

      if (startingNodeId === undefined)
        canSpawnConnections =
          creationLogic?.canSpawnConnections?.(node) ?? false;
      else if (node.id === startingNodeId) canSpawnConnections = true;

      visibleNodes.push({ node, canSpawnConnections, displayMode, placement });
    }
    if (mode === 'show-connection-sources') {
      canSpawnConnections = creationLogic
        ? creationLogic.canSpawnConnections?.(node) ?? true
        : false;
      visibleNodes.push({
        node,
        placement,
        canSpawnConnections,
        displayMode,
      });
    }
  });
  return visibleNodes;
}

declare type IMouseEventName =
  | 'mousemove'
  | 'mouseenter'
  | 'mouseleave'
  | 'mouseover'
  | 'mouseout';

const eventsToSuppress: ReadonlyArray<IMouseEventName> = [
  'mousemove',
  'mouseenter',
  'mouseleave',
  'mouseover',
  'mouseout',
] as const;

export function captureMouseEvents(
  allEventsListener: (e: MouseEvent) => unknown,
  onMouseUp?: (e: MouseEvent) => unknown
) {
  const preventAndSuppress = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    allEventsListener(e);
  };

  eventsToSuppress.forEach((eventType) => {
    document.addEventListener(eventType, preventAndSuppress);
  });

  const mouseUpHandler = (e: MouseEvent) => {
    eventsToSuppress.forEach((eventType) => {
      document.removeEventListener(eventType, preventAndSuppress);
    });
    document.removeEventListener('mouseup', mouseUpHandler);
    onMouseUp?.(e);
  };
  document.addEventListener('mouseup', mouseUpHandler);
}
