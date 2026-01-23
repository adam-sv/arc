// dependencies
import React, { useCallback, useState } from 'react';
import { cn } from '@adam-sv/arc';
// self
import { INodeInteractionDescription, captureMouseEvents } from './logic';
import { useGraphControlPlane } from '../Provider';
import './style.scss';
// types
import type { INodeInteractionMode } from '.';
import type { IConnectionCreationLogic, ILineInfo } from './types';
import type {
  GraphNodeId,
  ICoords,
  IGraphNodeActions,
  IProcessedGraphNode,
} from '@adam-sv/arc';
import { useGraphContext } from '../../GraphContext';

export interface INodeInteractionManagerTargetProps<
  NodeType,
  NodeIdType extends GraphNodeId
> {
  // configuration
  className?: string;
  mode: INodeInteractionMode;
  nodeActions?: IGraphNodeActions<NodeType, NodeIdType>;
  // info about the node
  interactionDescription: INodeInteractionDescription<NodeType, NodeIdType>;
  // this is how we would know they "created" an edge
  onMouseUp: (node: IProcessedGraphNode<NodeType, NodeIdType>) => unknown;
  onUpdatedLine: (line?: ILineInfo<NodeIdType>) => unknown;
  getConnectionStartPosition: IConnectionCreationLogic<
    NodeType,
    NodeIdType
  >['getConnectionStartPosition'];
}
export function NodeInteractionTarget<
  NodeType,
  NodeIdType extends GraphNodeId
>({
  className,
  interactionDescription,
  mode,
  nodeActions,
  getConnectionStartPosition,
  onMouseUp,
  onUpdatedLine,
}: INodeInteractionManagerTargetProps<NodeType, NodeIdType>) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const highlight = useCallback(() => {
    setIsHighlighted(true);
  }, []);
  const unhighlight = useCallback(() => {
    setIsHighlighted(false);
  }, []);
  const [selfClassName, setClassName] = useState('');
  const focusButton = useCallback(() => {
    setClassName('focused-button');
  }, []);
  const focusDiv = useCallback(() => {
    setClassName('focused-div');
  }, []);
  const unfocusDiv = useCallback(() => {
    setClassName('');
  }, []);
  const { zoom } = useGraphContext();

  const { node, placement, displayMode } = interactionDescription;
  const { x, y } = placement.position;
  const { width, height } = placement.size;

  // we need controls for movement
  const nodeId = node.id;
  const nodeControls = useGraphControlPlane().nodeControlMap.get(node.id);

  // if we're making edges
  const startingNodeId = nodeId;
  const connectionStart = getConnectionStartPosition?.(node);
  const isConnectionTarget = interactionDescription.displayMode === 'target';

  const handleConnectionDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const connectionTargetCenter =
        connectionStart?.position === 'right'
          ? { x: x + width, y: y + height / 2 }
          : {
              x: x + width / 2,
              y: y + height / 2,
            };
      const start = connectionTargetCenter;
      const end = connectionTargetCenter;

      const originalMousePosition = { x: e.pageX, y: e.pageY };

      const handleMouseEvents = <T extends MouseEvent>(e: T) => {
        if (e.type === 'mousemove') {
          const newMousePosition = { x: e.pageX, y: e.pageY };
          const delta = {
            x: newMousePosition.x - originalMousePosition.x,
            y: newMousePosition.y - originalMousePosition.y,
          };

          onUpdatedLine({
            startingNodeId,
            start,
            end: {
              x: connectionTargetCenter.x + delta.x,
              y: connectionTargetCenter.y + delta.y,
            },
          });
        }
      };

      onUpdatedLine({ startingNodeId, start, end });
      captureMouseEvents(handleMouseEvents, () => onUpdatedLine());
    },
    [onUpdatedLine, connectionStart]
  );

  const handleNodeDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!nodeControls?.setOffset || !nodeActions?.onMove) return;
      const originalMousePosition = { x: e.pageX, y: e.pageY };
      let delta: ICoords | undefined = undefined;

      const handleMouseEvents = <T extends MouseEvent>(e: T) => {
        const newMousePosition = { x: e.pageX, y: e.pageY };
        delta = {
          x: newMousePosition.x - originalMousePosition.x,
          y: newMousePosition.y - originalMousePosition.y,
        };
        nodeControls.setOffset(delta);
      };

      captureMouseEvents(handleMouseEvents, (e: MouseEvent) => {
        const newMousePosition = { x: e.pageX, y: e.pageY };
        delta = {
          x: (newMousePosition.x - originalMousePosition.x) / zoom,
          y: (newMousePosition.y - originalMousePosition.y) / zoom,
        };
        nodeActions.onMove?.(node, delta ?? { x: 0, y: 0 });
        nodeControls.setOffset({ x: 0, y: 0 });
        delta = undefined;
      });
    },
    [node, nodeControls?.setOffset, nodeActions?.onMove, zoom]
  );

  return (
    // The g tag handles the click actions via "bubbling"
    <g
      className='ArcGraph-NodeInteractionManager-NodeTargetGroup'
      transform={`translate(${x + (nodeControls?.offset.x ?? 0)}, ${
        y + (nodeControls?.offset.y ?? 0)
      })`}
      onMouseEnter={highlight}
      onMouseLeave={unhighlight}
      onMouseUp={useCallback(
        () => (isConnectionTarget ? onMouseUp(node) : null),
        [onMouseUp, node, isConnectionTarget]
      )}
      onMouseDown={handleNodeDrag}
      onClick={useCallback(
        (e: React.MouseEvent) => nodeActions?.onClick?.(e, node),
        [nodeActions?.onClick]
      )}
      onDoubleClick={useCallback(
        (e: React.MouseEvent) => nodeActions?.onDoubleClick?.(e, node),
        [nodeActions?.onDoubleClick]
      )}
      onContextMenu={(e) => nodeActions?.onContextMenu?.(e, node)}
      id={`interaction-manager-node-${nodeId}`}
      data-cy={`node-label-${node.label}`}
    >
      {isConnectionTarget && (
        <rect
          className={cn(
            'ConnectionPort',
            mode === 'show-connection-targets' && 'ConnectionPort-target',
            className
          )}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      )}
      {/* This bad boy is being overloaded. The foreign object is responsible for starting connection creation.
      Somehow it's always on, we need to do better! */}
      {foreignObjectCases.has(mode) && (
        <foreignObject width={width} height={height} style={fowStyle}>
          <div
            className={cn(
              'ArcGraph-NodeInteractionManager-NodeContent',
              displayMode,
              selfClassName
            )}
            onMouseOver={focusDiv}
            onMouseOut={unfocusDiv}
          >
            {buttonCases.has(mode) &&
              interactionDescription.canSpawnConnections && (
                <button
                  className={cn(
                    'ConnectionPort-CreateButton',
                    !isHighlighted && 'ConnectionPort-CreateButton-hiddenState',
                    connectionStart &&
                      `ConnectionPort-CreateButton-${connectionStart.position}Position`,
                    connectionStart?.className
                  )}
                  onMouseOver={focusButton}
                  onMouseOut={unfocusDiv}
                  onMouseDown={handleConnectionDrag}
                >
                  &#43;
                </button>
              )}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

const foreignObjectCases: Set<INodeInteractionMode> = new Set([
  'show-connection-sources',
  'show-interactable-nodes',
]);
const buttonCases: Set<INodeInteractionMode> = new Set([
  'show-connection-sources',
]);
const fowStyle = { overflow: 'auto' };
