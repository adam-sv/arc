// dependencies
import { cn } from '@adam-sv/arc';
import { useCallback, useMemo, useState } from 'react';
// self
import { getVisibleNodes } from './logic';
import { NodeInteractionTarget } from './Target';
import './style.scss';
// types
import type { IGraphRenderContext } from '../../types';
import type { IConnectionCreationLogic, ILineInfo } from './types';
import type {
  IProcessedGraphNode,
  IGraphNodeActions,
  GraphNodeId,
} from '@adam-sv/arc';
export type { IConnectionCreationLogic, ILineInfo };

export interface INodeInteractionManagerProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  className?: string;
  // passing the object implies edges can be created
  creationLogic?: IConnectionCreationLogic<NodeType, NodeIdType>;
  // dangerous because smart edge routing crashes on self edges :)
  dangerouslyEnableSelfConnections?: boolean;
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
  nodeActions?: IGraphNodeActions<NodeType, NodeIdType>;
}

export type INodeInteractionMode =
  | 'show-interactable-nodes'
  | 'show-connection-sources'
  | 'show-connection-targets';

// The goal is to do a few things here:
// - display all "connection targets" which can be connected to in the graph
// - when mousing over a "connection target", give the user a cue
//   - we should also enable some kind of "canSpawnConnections" logic for not implying all "connection targets" can support "spawning connections"
// - when starting a connection, we should hide the "connection targets" and instead provide "valid connection end targets"
//   - this needs a method like "getEligibleEndpointsFor(node.id)"
// However, this logic is a little bit awkward, it could use one more cleanup pass
export function NodeInteractionManager<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  className,
  creationLogic,
  dangerouslyEnableSelfConnections = false,
  graphContext,
  nodeActions = {},
}: INodeInteractionManagerProps<NodeType, EdgeType, NodeIdType>) {
  const { graph, getNodeConnectionLayout } = graphContext;
  const { nodes } = graph;
  const [lineInfo, setLine] = useState<ILineInfo<NodeIdType>>();
  const { startingNodeId } = lineInfo || {};

  let showing: INodeInteractionMode = 'show-connection-sources';
  if (!creationLogic) showing = 'show-interactable-nodes';
  if (lineInfo) showing = 'show-connection-targets';

  // What are we showing
  const visibleNodesArgs = [
    nodes,
    getNodeConnectionLayout,
    showing,
    creationLogic,
    lineInfo?.startingNodeId,
  ] as const;
  const visibleNodes = useMemo(
    () => getVisibleNodes(...visibleNodesArgs),
    visibleNodesArgs
  );

  const getConnectionStartPosition =
    creationLogic?.getConnectionStartPosition ||
    (() => ({ position: 'center' }));

  const onMouseUpInTarget = useCallback(
    (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
      if (!creationLogic) return;
      if (showing === 'show-connection-sources') return;
      if (startingNodeId === undefined)
        throw new Error(
          'ADAMError: Edge creation manager state error - startingNodeId was lost?'
        );
      if (startingNodeId !== node.id || dangerouslyEnableSelfConnections)
        creationLogic.onEdgeCreated(startingNodeId, node.id);
    },
    [showing, creationLogic, startingNodeId, dangerouslyEnableSelfConnections]
  );

  return (
    <g className={cn('ArcGraph-NodeInteractionManager', className)}>
      {visibleNodes.map((interactionDescription) => (
        <NodeInteractionTarget
          key={interactionDescription.node.id}
          getConnectionStartPosition={getConnectionStartPosition}
          interactionDescription={interactionDescription}
          mode={
            startingNodeId === interactionDescription.node.id &&
            (creationLogic?.canSpawnConnections?.(
              interactionDescription.node
            ) ??
              true)
              ? 'show-connection-sources'
              : showing
          }
          nodeActions={nodeActions}
          onMouseUp={onMouseUpInTarget}
          onUpdatedLine={setLine}
        />
      ))}
      {lineInfo && (
        <line
          className='connection-under-construction'
          x1={lineInfo.start.x}
          x2={lineInfo.end.x}
          y1={lineInfo.start.y}
          y2={lineInfo.end.y}
          rx={4}
          ry={4}
        />
      )}
    </g>
  );
}
