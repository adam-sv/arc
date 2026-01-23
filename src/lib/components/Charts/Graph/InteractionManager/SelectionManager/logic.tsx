import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import type { ISelectionManagerProps } from '.';
import { GraphNodeId, IProcessedGraphNode } from '@adam-sv/arc';
import { eventHasContinuationKeyPressed } from '../../logic';
import { captureMouseEvents } from '../NodeInteractionManager/logic';
import { ICoords } from '@adam-sv/arc';

export function useSelectionManagerLogic<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId,
>({
  graphContext,
  chartState,
  interactionLogic,
  invertDragControls,
}: ISelectionManagerProps<NodeType, EdgeType, NodeIdType>) {
  const { selectedNodeIds, selectedEdges, selectionActions } = interactionLogic;
  const { layoutOptions, graph } = graphContext;

  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  }>();
  const [selectionEnd, setSelectionEnd] = useState<{
    x: number;
    y: number;
  }>();

  const selectionEndRef = useRef<{
    x: number | undefined;
    y: number | undefined;
    prevScrollTop: number;
    prevScrollLeft: number;
  }>({
    x: undefined,
    y: undefined,
    prevScrollTop: 0,
    prevScrollLeft: 0,
  });

  useEffect(() => {
    // we add an event listener that listens to content scroll but the state variables are stale
    // so this makes it so that the listener has the current values
    const x = selectionEnd?.x;
    const y = selectionEnd?.y;

    selectionEndRef.current.x = x;
    selectionEndRef.current.y = y;
    if (
      selectionEnd &&
      selectionStart &&
      Math.abs(selectionEnd.x - selectionStart.x) > 1 &&
      Math.abs(selectionEnd.y - selectionStart.y) > 1
    )
      updateSelectionFromSelectionRectangle();
  }, [selectionEnd, selectionStart]);

  useLayoutEffect(() => {
    // when we get a selection start point we set up the end point an all the event listeners
    // so that no matter where a user clicks we will ahve the proper listners lsitening for scroll events
    // and mouse up which then cancles all scroll events
    if (selectionStart && !selectionEnd) {
      document.addEventListener('mouseup', handleSelectionMouseUp);
      selectionEndRef.current.prevScrollLeft =
        chartState.refs.content.current?.scrollLeft ?? 0;

      selectionEndRef.current.prevScrollTop =
        chartState.refs.content.current?.scrollTop ?? 0;
      setSelectionEnd({ ...selectionStart });
    }
  }, [selectionStart]);

  const handleSelectionMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!eventHasContinuationKeyPressed(e)) {
        selectionActions?.onSelectionUpdated?.({
          edges: new Set(),
          nodeIds: new Set(),
        });
        selectionActions?.onSelectionChanged?.({
          deleted: { edges: selectedEdges, nodeIds: selectedNodeIds },
        });
      }
      const canvas = chartState.refs.content.current;
      if (canvas) {
        const { left, top } = canvas.getBoundingClientRect();
        const contentRef = chartState.refs.content.current;
        setSelectionStart({
          x: e.pageX - left + (contentRef?.scrollLeft ?? 0),
          y: e.pageY - top + (contentRef?.scrollTop ?? 0),
        });
      }
      chartState.refs.content.current?.addEventListener(
        'scroll',
        handleContentScroll
      );
      captureMouseEvents(handleSelectionMouseMove, handleWindowMouseUp);
    },
    [selectionActions, selectedEdges, selectedNodeIds]
  );

  const handleSelectionMouseMove = useCallback(
    (e: MouseEvent) => {
      // have to use the ref here because when this gets created in graph context the state is stale...
      if (
        selectionEndRef.current &&
        // they can be 0!
        selectionEndRef.current.x !== undefined &&
        selectionEndRef.current.y !== undefined
      ) {
        const x = (selectionEndRef.current.x ?? 0) + e.movementX;
        const y = (selectionEndRef.current.y ?? 0) + e.movementY;
        setSelectionEnd({ x, y });
      }
    },
    [selectionEnd]
  );

  const handleContentScroll = useCallback(
    (e: Event) => {
      const { x, y, prevScrollTop, prevScrollLeft } = selectionEndRef.current;
      if (x && y) {
        const currentTarget = e.currentTarget as HTMLDivElement;
        const newX = x + currentTarget.scrollLeft - prevScrollLeft;
        const newY = y + currentTarget.scrollTop - prevScrollTop;
        selectionEndRef.current.prevScrollTop = currentTarget.scrollTop;
        selectionEndRef.current.prevScrollLeft = currentTarget.scrollLeft;
        setSelectionEnd({ x: newX, y: newY });
      }
    },
    [selectionEnd]
  );

  const handleSelectionMouseUp = useCallback(() => {
    document.removeEventListener('mouseup', handleSelectionMouseUp);
    chartState.refs.content.current?.removeEventListener(
      'scroll',
      handleContentScroll
    );
    setSelectionStart(undefined);
    setSelectionEnd(undefined);
  }, []);

  const updateSelectionFromSelectionRectangle = useCallback(() => {
    let selectionChanged = false;
    const newSelectedIds = new Set<NodeIdType>();
    const addedIds = new Set<NodeIdType>();
    const deletedIds = new Set<NodeIdType>();
    graph.nodes.forEach((node) => {
      const { id } = node;
      const isInSelection = selectedNodeIds?.has(id);
      if (nodeIsIntersectingSelectionRectangle(node)) {
        newSelectedIds.add(id);
        if (!isInSelection) {
          selectionChanged = true;
          addedIds.add(id);
        }
      } else if (isInSelection) {
        selectionChanged = true;
        deletedIds.add(id);
      }
    });

    if (selectionChanged) {
      selectionActions?.onSelectionChanged?.({
        added: { nodeIds: addedIds },
        deleted: { nodeIds: deletedIds },
      });
      selectionActions?.onSelectionUpdated?.({
        nodeIds: newSelectedIds,
        edges: selectedEdges ?? new Set(),
      });
    }
  }, [selectionEnd, selectionStart, graph, selectedNodeIds, selectedEdges]);

  const backgroundDragRef = useRef<ICoords | null>(null);
  const handleMoveBackgroundWithMouse = useCallback(
    (e: React.MouseEvent) => {
      backgroundDragRef.current = { x: e.pageX, y: e.pageY };
      window.addEventListener('mouseup', handleWindowMouseUp);
      window.addEventListener('mousemove', moveBackgroundWithMouse);
    },
    [chartState.refs.content]
  );

  const moveBackgroundWithMouse = useCallback(
    (e: MouseEvent) => {
      const contentNode = chartState.refs.content.current;
      const x = invertDragControls ? -e.movementX : e.movementX;
      const y = invertDragControls ? -e.movementY : e.movementY;
      contentNode?.scrollTo({
        top: contentNode.scrollTop - y,
        left: contentNode.scrollLeft - x,
      });
    },
    [chartState.refs.content.current]
  );

  const handleWindowMouseUp = useCallback((e: MouseEvent) => {
    window.removeEventListener('mouseup', handleWindowMouseUp);
    window.removeEventListener('mousemove', moveBackgroundWithMouse);
    chartState.refs.content.current?.removeEventListener(
      'scroll',
      handleContentScroll
    );
    const mousePos = { x: e.pageX, y: e.pageY };
    const originalMousePos = backgroundDragRef.current;
    // fake on click if mouse didn't move
    if (
      !originalMousePos ||
      (Math.abs(originalMousePos.x - mousePos.x) < 2 &&
        Math.abs(originalMousePos.y - mousePos.y) < 2)
    )
      interactionLogic.selectionActions?.onSelectionUpdated?.({
        nodeIds: new Set(),
        edges: new Set(),
      });
    backgroundDragRef.current = null;
  }, []);

  const nodeIsIntersectingSelectionRectangle = useCallback(
    (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
      const { getSize, getPosition } = graphContext;
      if (selectionEnd && selectionStart) {
        const x1 =
          Math.min(selectionStart.x, selectionEnd.x) -
          (layoutOptions.padding ?? 0);
        const x2 =
          x1 +
          Math.abs(selectionEnd.x - selectionStart.x) -
          (layoutOptions.padding ?? 0);
        const y1 =
          Math.min(selectionStart.y, selectionEnd.y) -
          (layoutOptions.padding ?? 0);
        const y2 =
          y1 +
          Math.abs(selectionEnd.y - selectionStart.y) -
          (layoutOptions.padding ?? 0);
        const position = getPosition(node);
        const size = getSize(node);
        if (position && size) {
          return (
            checkOverlap([x1, x2], [position.x, position.x + size.width]) &&
            checkOverlap([y1, y2], [position.y, position.y + size.height])
          );
        } else {
          return false;
        }
      }
      return false;
    },
    [selectionEnd, selectionStart, graphContext]
  );

  return {
    handleMoveBackgroundWithMouse,
    handleSelectionMouseDown,
    selectionStart,
    selectionEnd,
  };
}

function checkOverlap(
  selectionPos: [number, number],
  nodePos: [number, number]
) {
  if (
    nodePos[0] >= selectionPos[0] &&
    selectionPos[0] >= nodePos[1] &&
    nodePos[1] >= selectionPos[1]
  ) {
    return true;
  } else if (
    selectionPos[0] >= nodePos[0] &&
    nodePos[0] >= selectionPos[1] &&
    selectionPos[1] >= nodePos[1]
  ) {
    return true;
  } else if (
    nodePos[0] <= selectionPos[0] &&
    selectionPos[0] <= nodePos[1] &&
    nodePos[1] <= selectionPos[1]
  ) {
    return true;
  } else if (
    selectionPos[0] <= nodePos[0] &&
    nodePos[0] <= selectionPos[1] &&
    selectionPos[1] <= nodePos[1]
  ) {
    return true;
  } else if (
    nodePos[0] >= selectionPos[0] &&
    nodePos[0] <= selectionPos[1] &&
    selectionPos[0] <= nodePos[1] &&
    selectionPos[1] >= nodePos[1]
  ) {
    return true;
  } else if (
    selectionPos[0] >= nodePos[0] &&
    selectionPos[0] <= nodePos[1] &&
    nodePos[0] <= selectionPos[1] &&
    nodePos[1] >= selectionPos[1]
  ) {
    return true;
  }
  return false;
}
