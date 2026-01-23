// dependencies
import { useCallback, useMemo } from 'react';
import { serializeFunctions } from '@adam-sv/arc';
// types
import type { IInteractionManagerProps } from '.';
import type {
  GraphNodeId,
  IGraphNodeActions,
  IProcessedGraphNode,
} from '@adam-sv/arc';
import { eventHasContinuationKeyPressed } from '../logic';
import { IGraphSelection } from '../types';

// TODO: connect the NodeInteractionManager boxes to nodeActions and SelectionManager
// Both these functions should be integrated above, really
export function useInteractionManagerLogic<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId,
>({ graphProps }: IInteractionManagerProps<NodeType, EdgeType, NodeIdType>) {
  const { nodeActions, selectionActions, selectedEdges, selectedNodeIds } =
    graphProps;

  const handleNodeSelection = useCallback(
    (e: React.MouseEvent, node: IProcessedGraphNode<NodeType, NodeIdType>) => {
      if (!selectionActions) return;
      const nodeId = node.id;
      const multiEvent = eventHasContinuationKeyPressed(e);
      const nodeIsSelected = selectedNodeIds?.has(nodeId);
      const position: 'added' | 'deleted' = nodeIsSelected
        ? 'deleted'
        : 'added';
      selectionActions.onSelectionChanged?.({
        [position]: { nodes: new Set([nodeId]), multiEvent },
      });

      const finalSelection: IGraphSelection<EdgeType, NodeIdType> = {
        nodeIds: multiEvent ? new Set(selectedNodeIds) : new Set(),
        edges: multiEvent ? new Set(selectedEdges) : new Set(),
      };
      finalSelection.nodeIds[nodeIsSelected ? 'delete' : 'add'](nodeId);
      selectionActions.onSelectionUpdated?.(finalSelection);
    },
    [selectedNodeIds, selectionActions]
  );

  const formattedNodeActions: IGraphNodeActions<NodeType, NodeIdType> = useMemo(
    () =>
      selectionActions
        ? {
            ...nodeActions,
            onClick: serializeFunctions(
              nodeActions?.onClick,
              handleNodeSelection
            ),
          }
        : nodeActions || {},
    [nodeActions, ...Object.values(nodeActions || {}), handleNodeSelection]
  );

  const formattedSelectionActions = selectionActions;

  const graphSelection: IGraphSelection<EdgeType, NodeIdType> = useMemo(
    () => ({
      nodeIds: selectedNodeIds || new Set(),
      edges: selectedEdges || new Set(),
    }),
    [selectedNodeIds, selectedEdges]
  );

  return {
    graphSelection,
    nodeActions: formattedNodeActions,
    selectionActions: formattedSelectionActions,
    selectedNodeIds,
    selectedEdges,
  };
}

export type IInteractionLogic<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId,
> = ReturnType<
  typeof useInteractionManagerLogic<NodeType, EdgeType, NodeIdType>
>;
