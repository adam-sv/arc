// dependencies
import React, { useEffect, useState, SyntheticEvent } from 'react';
// internals
import {
  ChartContainer,
  cn,
  composeFunctions,
  Droppable,
  EdgeRouter,
} from '@adam-sv/arc';
// stores

import { Node } from './Node';
// styles
import './style.scss';
// types
import type {
  IBoxSize,
  ICCSizing,
  ICoords,
  IProcessedGraphNode,
  IGraphNode,
} from '@adam-sv/arc';
import type {
  IDescribedBox,
  IGraphProps,
  IGraphConnectionActions,
  IGraphNodeActions,
  IGraphSelectionActions,
  IManualZoom,
  IAutomaticZoom,
} from './types';

// exports
export type {
  IDescribedBox,
  IGraphProps,
  IGraphConnectionActions,
  IGraphNodeActions,
  IGraphSelectionActions,
};

export const DEFAULT_GRID_SIZE = 20;
export const DEFAULT_NODE_POSITION = { x: 0, y: 0 };
export const DEFAULT_NODE_SIZE = { width: 180, height: 80 };
export const DEFAULT_PORT_SIZE = 10;

export function Graph({
  className,
  connectionActions = {},
  customHTMLNodeContent,
  customSVGNodeContent,
  edgeMode,
  edgeSpacing,
  graph,
  gridSize,
  id,
  nodeActions = {},
  overrideDefaultClassName,
  padding,
  portSize,
  style,
  selectionActions = {},
  gridFillsAvailableSpace,
  zoomProperties,
  onDrop,
}: IGraphProps) {
  const lineGap = gridSize || DEFAULT_GRID_SIZE;
  const { boundingRect } = graph;
  const graphPositionTransform = `translate(${-1 * boundingRect.x}, ${
    -1 * boundingRect.y
  })`;

  // const [graphOffset, setgraphOffset] = useState<{ x: number; y: number }>();
  let graphOffset: { x: number; y: number } = { x: 0, y: 0 };
  let mousePos: { x: number; y: number } = { x: 0, y: 0 };

  const [containerZoom, setContainerZoom] = useState<number>(1);
  const [selectionRectangleStart, setSelectionRectangleStart] = useState<{
    x: number;
    y: number;
    dim: DOMRect;
    contSelection: boolean;
  }>();
  const [selectionRectangleEnd, setSelectionRectangleEnd] = useState<{
    x: number;
    y: number;
  }>();

  const [selectedNodes, setSelectedNodes] = useState<{
    [key: string]: IGraphNode;
  }>({});

  const [nodeToMove, setNodeToMove] = useState<IGraphNode>();

  // TODO:
  // Previously, the Graph maintained concept of a "selection" which users could make, consisting of a set of nodes
  // We should make that possible again, it was cool.

  useEffect(() => {
    if (
      selectionRectangleStart &&
      selectionRectangleEnd &&
      selectionActions &&
      graphOffset
    ) {
      const x = graphOffset.x + -1 * boundingRect.x;
      const y = graphOffset.y + -1 * boundingRect.y;
      const x1 =
        Math.min(selectionRectangleStart.x, selectionRectangleEnd.x) - x;
      const x2 =
        Math.max(selectionRectangleStart.x, selectionRectangleEnd.x) - x;
      const y1 =
        Math.min(selectionRectangleStart.y, selectionRectangleEnd.y) - y;
      const y2 =
        Math.max(selectionRectangleStart.y, selectionRectangleEnd.y) - y;
      const selNodes: {
        [key: string]: IGraphNode;
      } = selectionRectangleStart.contSelection
        ? Object.assign({}, selectedNodes)
        : {};
      graph.nodes.forEach((node) => {
        if (node.position) {
          const { size } = scaleSizing({
            node,
            portSize,
            zoom: containerZoom,
          });
          if (
            checkOverlap(
              {
                pos1: x1,
                pos2: x2,
              },
              {
                pos1: node.position.x * containerZoom,
                pos2: node.position.x * containerZoom + size.width,
              }
            ) &&
            checkOverlap(
              { pos1: y1, pos2: y2 },
              {
                pos1: node.position.y * containerZoom,
                pos2: node.position.y * containerZoom + size.height,
              }
            )
          ) {
            selNodes[`${node.id}`] = node;
          }
        }
      });
      if (selectionActions.onSelectionUpdated) {
        selectionActions.onSelectionUpdated(undefined, Object.values(selNodes));
      }
      setSelectedNodes(selNodes);
    }
  }, [selectionRectangleStart, selectionRectangleEnd, containerZoom]);

  const clearSelection = (e: React.MouseEvent) => {
    if (selectionActions && selectionActions.onSelectionCancelled) {
      selectionActions.onSelectionCancelled(e, Object.values(selectedNodes));
    }
  };

  const handleClick = (e: SyntheticEvent<Element, Event>, node: IGraphNode) => {
    const newSelection = Object.assign({}, selectedNodes);
    if (
      (e as React.MouseEvent).shiftKey ||
      (e as React.MouseEvent).ctrlKey ||
      (e as React.MouseEvent).metaKey ||
      (e as React.MouseEvent).altKey
    ) {
      if (selectedNodes[`${node.id}`]) {
        delete newSelection[`${node.id}`];
      } else {
        newSelection[`${node.id}`] = node;
      }
      setSelectedNodes(newSelection);
      if (selectionActions && selectionActions.onSelectionUpdated) {
        selectionActions.onSelectionUpdated(e, Object.values(newSelection));
      }
    } else {
      // newSelection[`${node.id}`] = node;
      // setSelectedNodes({ [`${node.id}`]: node });
      // if (selectionActions && selectionActions.onSelectionUpdated) {
      //   selectionActions.onSelectionUpdated(e, Object.values(newSelection));
      // }
    }
  };

  //differentiate between click and mouse down by checking to see if its in the same position
  const handleMouseMove = (evt: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (nodeToMove && nodeActions.onMove) {
      nodeActions.onMove(evt, nodeToMove, {
        x: evt.movementX / containerZoom,
        y: evt.movementY / containerZoom,
      });
    }
    if (selectionActions && graphOffset) {
      if (selectionRectangleStart && evt.buttons > 0) {
        const dim = selectionRectangleStart.dim;
        // const x = evt.clientX - dim.left + boundingRect.x;
        // const y = evt.clientY - dim.top + boundingRect.y;
        const x = mousePos.x;
        const y = mousePos.y;
        setSelectionRectangleEnd({ x, y });
      }
    }
  };

  const handleSelectionCanclled = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (
      selectionRectangleStart &&
      selectionRectangleEnd &&
      selectionRectangleStart.x === selectionRectangleEnd.x &&
      selectionRectangleStart.y === selectionRectangleEnd.y &&
      selectionActions &&
      selectionActions.onSelectionCancelled
    ) {
      selectionActions.onSelectionCancelled(e, Object.values(selectedNodes));
    }
  };

  const handleNodeMouseDown = (evt: React.MouseEvent, node: IGraphNode) => {
    setNodeToMove(node);
  };
  const handleMouseDown = (evt: React.MouseEvent) => {
    if (selectionActions && graphOffset) {
      const e = evt.target as SVGElement;
      const dim = e.getBoundingClientRect();
      // const x = evt.clientX - dim.left + boundingRect.x;
      // const y = evt.clientY - dim.top + boundingRect.y;
      const x = mousePos.x;
      const y = mousePos.y;
      setSelectionRectangleEnd({ x, y });
      setSelectionRectangleStart({
        x,
        y,
        dim,
        contSelection: evt.shiftKey || evt.ctrlKey || evt.metaKey || evt.altKey,
      });
    }
  };
  return (
    <ChartContainer
      className={cn(
        !overrideDefaultClassName && 'ArcGraph',
        className,
        selectionRectangleStart && 'ArcGraph-noUserSelect'
      )}
      id={id}
      style={style}
      sizing={{
        mode: 'responsive',
        matchSizeAtDefaultZoomTo: 'pixelSpace',
        coordinateSpace: boundingRect,
        padding: {
          left: typeof padding?.left === 'number' ? padding.left : 20,
          right: typeof padding?.right === 'number' ? padding.right : 20,
          bottom: typeof padding?.bottom === 'number' ? padding.bottom : 20,
          top: typeof padding?.top === 'number' ? padding.top : 20,
        },
      }}
      gridFillsAvailableSpace={gridFillsAvailableSpace}
      zoom={zoomProperties?.initialZoomLevel ?? 1}
      disableZoomControls={(zoomProperties as IManualZoom)?.disableZoomControls}
      maxZoom={zoomProperties?.maxZoom ?? 2}
      minZoom={zoomProperties?.minZoom ?? 0.5}
      contentShowsScrollBars
      contentGridOptions={{ lineGap }}
      contentRenderer={(coordinateSpace: DOMRect, cc: ICCSizing, MousePos) => {
        const { fullBackGroundSize, offset, viewBox } = cc;
        //the graphoffset  to calcualte
        //if the selection rectangle is over any of the nodes to see
        //if they are selected
        graphOffset = offset;
        if (MousePos) {
          const viewBoxNums = viewBox.content.split(' ');

          mousePos = {
            x: MousePos.chartRelativeX + Number(viewBoxNums[0]),
            y: MousePos.chartRelativeY + Number(viewBoxNums[1]),
          };
        }
        const zoom = cc.zooms.x;
        if (zoom !== containerZoom) {
          setContainerZoom(zoom);
        }

        if (coordinateSpace.width === 0) return null;

        return (
          <g
            onMouseUp={() => {
              setNodeToMove(undefined);
              setSelectionRectangleStart(undefined);
            }}
            onMouseMove={(evt) => handleMouseMove(evt)}
          >
            {/* adds a rect over the graph to click and get coords for
                the draggable selection
              */}
            <rect
              className='ArcGraph-dropTarget'
              width={fullBackGroundSize.width}
              height={fullBackGroundSize.height}
              x={-1 * offset.x + fullBackGroundSize.x}
              y={-1 * offset.y + fullBackGroundSize.y}
              fill={'transparent'}
              onMouseDown={(evt) => handleMouseDown(evt)}
              onMouseUp={(evt) => {
                handleSelectionCanclled(evt);
              }}
              onContextMenu={(e) => {
                if (selectionActions && selectionActions.onContextMenu) {
                  selectionActions.onContextMenu(
                    e,
                    Object.values(selectedNodes)
                  );
                }
              }}
              onDrop={(evt) => {
                if (onDrop) {
                  onDrop(evt, offset, boundingRect, zoom);
                }
              }}
            />
            {/* EDGES */}
            <g
              className='ArcGraph-EdgesGroup'
              transform={`${graphPositionTransform} scale(${zoom})`}
            >
              <EdgeRouter
                containerDOMRect={boundingRect}
                connectionActions={connectionActions}
                edgeMode={edgeMode || 'straight'}
                edgeSpacing={edgeSpacing}
                graph={graph}
                noSVGContainer
              />
            </g>
            {/* NODES  */}
            <g className='ArcGraph-Nodes' transform={graphPositionTransform}>
              {graph.nodes.map((node: IProcessedGraphNode) => {
                return (
                  <Node
                    key={node.id}
                    // logic
                    node={node}
                    className={cn(
                      node.className,
                      selectedNodes[`${node.id}`] ? 'SelectedNode' : ''
                    )}
                    overrideDefaultClassName={
                      selectedNodes[`${node.id}`] ? true : false
                    }
                    graph={graph}
                    {...scaleSizing({ node, portSize, zoom })}
                    // actions
                    nodeActions={{
                      onClick: composeFunctions(
                        clearSelection,
                        nodeActions.onClick
                      ),
                      onDoubleClick: composeFunctions(
                        handleClick,
                        nodeActions.onDoubleClick
                      ),
                      onMove: composeFunctions(
                        clearSelection,
                        nodeActions.onMove
                      ),
                      onMouseDown: composeFunctions(
                        nodeActions.onMouseDown,
                        handleNodeMouseDown
                      ),
                      onContextMenu: composeFunctions(
                        // we add this because we were seeing context menu cause an open-ended drag event
                        () => setNodeToMove(undefined),
                        clearSelection,
                        nodeActions.onContextMenu
                      ),
                      onMouseUp: composeFunctions(nodeActions.onMouseUp),
                    }}
                    connectionActions={connectionActions}
                    customHTMLNodeContent={customHTMLNodeContent}
                    customSVGNodeContent={customSVGNodeContent}
                    selectionAction={handleClick}
                  />
                );
              })}
            </g>
            {selectionRectangleStart && selectionRectangleEnd && (
              <rect
                // TODO: factor in the graphPositionTransform
                transform={`translate(${Math.min(
                  selectionRectangleStart.x - 1 * offset.x,
                  selectionRectangleEnd.x - 1 * offset.x
                )}, ${Math.min(
                  selectionRectangleStart.y - 1 * offset.y,
                  selectionRectangleEnd.y - 1 * offset.y
                )})`}
                width={
                  selectionRectangleEnd && selectionRectangleStart
                    ? Math.abs(
                        selectionRectangleStart.x - selectionRectangleEnd.x
                      )
                    : 0
                }
                height={
                  selectionRectangleEnd && selectionRectangleStart
                    ? Math.abs(
                        selectionRectangleStart.y - selectionRectangleEnd.y
                      )
                    : 0
                }
                fill={'green'}
                opacity={'20%'}
                // onMouseMove={(evt) => {
                //   handleMouseMove(evt);
                // }}
              />
            )}
          </g>
        );
      }}
    />
  );
}

// TODO: separate logic file?
interface INodeSizingInfo {
  node: IProcessedGraphNode;
  portSize?: number;
  zoom: number;
}
interface IComputedSizing {
  position: ICoords;
  portSize: number;
  size: IBoxSize;
}
function scaleSizing(info: INodeSizingInfo): IComputedSizing {
  // collect infos
  const { node, zoom } = info;
  const portSize = info.portSize || DEFAULT_PORT_SIZE;
  const position = node.position || DEFAULT_NODE_POSITION;
  const size = node.size || DEFAULT_NODE_SIZE;

  // NOTE: we are getting mutable data from the graph
  // make sure to not mutate in place
  return {
    position: {
      x: position.x * zoom,
      y: position.y * zoom,
    },
    size: {
      width: size.width * zoom,
      height: size.height * zoom,
    },
    portSize,
  };
}

const checkOverlap = (
  selectionPos: { pos1: number; pos2: number },
  nodePos: { pos1: number; pos2: number }
) => {
  let overlap = false;
  if (
    selectionPos.pos1 === nodePos.pos1 ||
    selectionPos.pos1 === nodePos.pos2
  ) {
    overlap = true;
  } else if (
    selectionPos.pos2 === nodePos.pos1 ||
    selectionPos.pos2 === nodePos.pos2
  ) {
    overlap = true;
  } else if (
    nodePos.pos1 > selectionPos.pos1 &&
    selectionPos.pos1 > nodePos.pos2 &&
    nodePos.pos2 > selectionPos.pos2
  ) {
    overlap = true;
  } else if (
    selectionPos.pos1 > nodePos.pos1 &&
    nodePos.pos1 > selectionPos.pos2 &&
    selectionPos.pos2 > nodePos.pos2
  ) {
    overlap = true;
  } else if (
    nodePos.pos1 < selectionPos.pos1 &&
    selectionPos.pos1 < nodePos.pos2 &&
    nodePos.pos2 < selectionPos.pos2
  ) {
    overlap = true;
  } else if (
    selectionPos.pos1 < nodePos.pos1 &&
    nodePos.pos1 < selectionPos.pos2 &&
    selectionPos.pos2 < nodePos.pos2
  ) {
    overlap = true;
    //engulf
  } else if (
    nodePos.pos1 > selectionPos.pos1 &&
    nodePos.pos1 < selectionPos.pos2 &&
    selectionPos.pos1 < nodePos.pos2 &&
    selectionPos.pos2 > nodePos.pos2
  ) {
    overlap = true;
  } else if (
    selectionPos.pos1 > nodePos.pos1 &&
    selectionPos.pos1 < nodePos.pos2 &&
    nodePos.pos1 < selectionPos.pos2 &&
    nodePos.pos2 > selectionPos.pos2
  ) {
    overlap = true;
  }
  return overlap;
};
