import { useCallback } from 'react';
import { cn } from '@adam-sv/arc';
// internals
import { useSelectionManagerLogic } from './logic';
// types
import type { IGraphDragMode, IGraphRenderContext } from '../../types';
import type { GraphNodeId, IChartState } from '@adam-sv/arc';
import { IInteractionLogic } from '../logic';

export interface ISelectionManagerProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  backgroundDragMode?: IGraphDragMode;
  chartState: IChartState;
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
  interactionLogic: IInteractionLogic<NodeType, EdgeType, NodeIdType>;
  invertDragControls?: boolean;
}

export function SelectionManager<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  backgroundDragMode,
  chartState,
  graphContext,
  interactionLogic,
  invertDragControls,
}: ISelectionManagerProps<NodeType, EdgeType, NodeIdType>) {
  const {
    handleMoveBackgroundWithMouse,
    handleSelectionMouseDown,
    selectionStart,
    selectionEnd,
  } = useSelectionManagerLogic({
    graphContext,
    chartState,
    interactionLogic,
    invertDragControls,
  });

  // TODO: put the "other" on the "Modifier" key
  // i.e. drag with mouse, and use cmd+drag to make selection
  const selectionContainerMouseDown = useCallback(
    backgroundDragMode === 'multi-select'
      ? handleSelectionMouseDown
      : handleMoveBackgroundWithMouse,
    [backgroundDragMode]
  );

  return (
    <>
      {!selectionStart && !selectionEnd && (
        <rect
          className={cn(
            'ArcGraph-Nodes-selection-container',
            backgroundDragMode ?? 'move'
          )}
          width={'100%'}
          height={'100%'}
          onMouseDown={selectionContainerMouseDown}
        />
      )}
      {selectionStart && selectionEnd && (
        <rect
          className='ArcGraph-Nodes-selection'
          x={Math.min(selectionStart.x, selectionEnd.x)}
          width={Math.abs(selectionStart.x - selectionEnd.x)}
          y={Math.min(selectionStart.y, selectionEnd.y)}
          height={Math.abs(selectionStart.y - selectionEnd.y)}
        />
      )}
    </>
  );
}
