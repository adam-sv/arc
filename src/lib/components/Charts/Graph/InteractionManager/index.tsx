// dependencies
import { IChartState } from '@adam-sv/arc';
// self
import { GraphControlProvider, IGraphNodeState } from './Provider';
import {
  NodeInteractionManager,
  IConnectionCreationLogic,
} from './NodeInteractionManager';
import { SelectionManager } from './SelectionManager';
import { useInteractionManagerLogic } from './logic';
// types
import type { IGraphControlPlane } from './Provider';
import type { IGraphDragMode, IGraphRenderContext } from '../types';
import type { RenderableContent, IGraphProps } from '@adam-sv/arc';
import { useCallback, useState } from 'react';
import { GraphNodeId } from '@adam-sv/arc';

export type IPartialGraphPropsForInteraction<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> = Pick<
  IGraphProps<NodeType, EdgeType, NodeIdType>,
  | 'nodeActions'
  | 'selectionActions'
  | 'selectedEdges'
  | 'selectedNodeIds'
  | 'invertDragControls'
>;

export interface IInteractionManagerProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  backgroundDragMode?: IGraphDragMode;
  chartState: IChartState;
  backLayer?: RenderableContent;
  frontLayer?: RenderableContent;
  edgeCreation?: IConnectionCreationLogic<NodeType, NodeIdType>;
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
  graphProps: IPartialGraphPropsForInteraction<NodeType, EdgeType, NodeIdType>;
}

// By managing interactions here, we don't have to rerender the whole graph. much cheaper when the graph is large
// However, we do draw above and below the whole graph, so it is usually passed thru as "children" (nodes & edges are there)
export function InteractionManager<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(props: IInteractionManagerProps<NodeType, EdgeType, NodeIdType>) {
  const {
    backgroundDragMode,
    chartState,
    backLayer,
    frontLayer,
    edgeCreation,
    graphContext,
    graphProps,
  } = props;
  const interactionLogic = useInteractionManagerLogic(props);
  const { nodeActions, selectionActions } = interactionLogic;
  const logic = useGraphControlLogic(graphProps);
  return (
    // eslint-disable-next-line
    // @ts-ignore // sorry, contexts suck in typescript
    <GraphControlProvider value={logic}>
      {(selectionActions || backgroundDragMode) && (
        <SelectionManager
          backgroundDragMode={backgroundDragMode}
          invertDragControls={props.graphProps.invertDragControls}
          chartState={chartState}
          graphContext={graphContext}
          interactionLogic={interactionLogic}
        />
      )}
      {backLayer}
      {(edgeCreation || nodeActions) && (
        <NodeInteractionManager<NodeType, EdgeType, NodeIdType>
          creationLogic={edgeCreation}
          graphContext={graphContext}
          nodeActions={nodeActions}
        />
      )}
      {frontLayer}
    </GraphControlProvider>
  );
}

function useGraphControlLogic<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  graphProps: IPartialGraphPropsForInteraction<NodeType, EdgeType, NodeIdType>
): IGraphControlPlane<NodeIdType> {
  const { selectedNodeIds } = graphProps;
  const [nodeControlMap, setNodeControlMap] = useState<
    Map<NodeIdType, IGraphNodeState>
  >(new Map());
  return {
    nodeControlMap,
    registerNodeControls: useCallback(
      (id: NodeIdType, state: IGraphNodeState) => {
        setNodeControlMap(new Map(nodeControlMap.set(id, state)));
      },
      []
    ),
    unregisterNodeControls: useCallback((id: NodeIdType) => {
      setNodeControlMap(
        nodeControlMap.delete(id) ? new Map(nodeControlMap) : nodeControlMap
      );
    }, []),
    getNodeState: useCallback(
      (id: NodeIdType) => ({ isSelected: Boolean(selectedNodeIds?.has(id)) }),
      [selectedNodeIds]
    ),
  };
}
