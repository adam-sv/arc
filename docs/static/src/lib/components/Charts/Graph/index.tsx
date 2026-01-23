// dependencies
import React, { useCallback, useMemo } from 'react';
// internals
import {
  cn,
  ChartBase,
  ChartComponents,
  EdgeRouter,
  Grid,
  GraphNodeId,
} from '@adam-sv/arc';
// self
import { GraphContextProvider } from './GraphContext';
import { InteractionManager } from './InteractionManager';
import { NodeBase } from './NodeBase';
import { useGraphLogic } from './logic';
// style
import './style.scss';
// types
import type {
  IGraphRenderContext,
  IGraphNodeContentRenderer,
  IGraphChildNodeRenderer,
  IGraphDragMode,
  IGraphLayoutOptions,
  IGraphProps,
  IGraphStrategy,
  INodePlacement,
  IGraphSelection,
  IGraphSelectionActions,
  IGraphNodeActions,
  IGraphConnectionActions,
} from './types';
export type {
  IGraphChildNodeRenderer,
  IGraphDragMode,
  IGraphLayoutOptions,
  IGraphNodeContentRenderer,
  IGraphRenderContext,
  IGraphProps,
  IGraphStrategy,
  INodePlacement,
  IGraphSelection,
  IGraphSelectionActions,
  IGraphNodeActions,
  IGraphConnectionActions,
};
import * as GraphUtils from './utilsBarrel';
export { GraphUtils };

const { Content } = ChartComponents;

export function Graph<NodeType, EdgeType, NodeIdType extends GraphNodeId>(
  props: IGraphProps<NodeType, EdgeType, NodeIdType>
) {
  const {
    boundingRect,
    chartState,
    className,
    debug,
    edgeCreation,
    edgeMode,
    edgesOnTop,
    edgeSpacing,
    gridOptions,
    graphContext,
    hideScrollBars,
    nodeChildrenRenderer,
    nodeContentRenderer,
    topLevelNodes,
    xTicks,
    yTicks,

    getNodeContentPosition,
    getNodePosition,
    formattedConnectionActions,
    getEdgeClassName,
  } = useGraphLogic(props);

  // Our smart edge router expects children to be "nested" in their parent by a fixed amount. Kinda weird.
  const groupPadding = Math.max(
    graphContext.scaledPadding.child.x,
    graphContext.scaledPadding.child.y
  );

  const edges = useMemo(
    () => (
      <EdgeRouter<NodeType, EdgeType, NodeIdType>
        coordinateSpace={boundingRect}
        connectionActions={formattedConnectionActions}
        debug={debug}
        edgeMode={edgeMode}
        edgeSpacing={edgeSpacing}
        getContentPosition={getNodeContentPosition}
        getEdgeClassName={getEdgeClassName}
        getPosition={getNodePosition}
        graph={graphContext.graph}
        groupPadding={groupPadding}
        graphContext={graphContext}
      />
    ),
    [
      boundingRect,
      debug,
      edgeMode,
      edgeSpacing,
      formattedConnectionActions,
      getEdgeClassName,
      getNodePosition,
      getNodeContentPosition,
      graphContext,
      groupPadding,
      // why? this must be forcing EdgeRouter to respect zoom, but that seems bad to do it this way
      chartState.zoom.currentZoom,
    ]
  );

  const { onContextMenu, onDrop, backgroundDragMode } = props;
  const handleContentDrop = useCallback<
    Required<IGraphProps<NodeType, EdgeType, NodeIdType>>['onDrop']
  >(
    (e, { x, y }, data, chartState) => {
      const { left, top } = boundingRect;
      const pd = graphContext.scaledPadding.topLevel;
      const zoom = chartState.zoom.currentZoom;
      onDrop?.(
        e,
        {
          x: x / zoom + left - pd.x,
          y: y / zoom + top - pd.y,
        },
        data,
        chartState
      );
    },
    [
      onDrop,
      boundingRect,
      graphContext.scaledPadding.topLevel,
      chartState.zoom.currentZoom,
    ]
  );
  const handleContextMenu = useCallback<
    Required<IGraphProps<NodeType, EdgeType, NodeIdType>>['onContextMenu']
  >(
    (e, { x, y }) => {
      const { left, top } = boundingRect;
      const pd = graphContext.scaledPadding.topLevel;
      const zoom = chartState.zoom.currentZoom;
      onContextMenu?.(e, {
        x: (x + left) / zoom - pd.x,
        y: (y + top) / zoom - pd.y,
      });
    },
    [
      onContextMenu,
      boundingRect,
      graphContext.scaledPadding.topLevel,
      chartState.zoom.currentZoom,
    ]
  );

  // TODO: grid thickness shoudl be passed as a CSS var we can consume when setting stroke-width
  const { gridStyle, gridSize } = gridOptions;

  return (
    <GraphContextProvider graphContext={graphContext}>
      <ChartBase className={cn('ArcGraph', className)} chartState={chartState}>
        <Content
          onContextMenu={handleContextMenu}
          onDrop={handleContentDrop}
          showScrollBars={!hideScrollBars}
        >
          {gridStyle !== 'none' && (
            <Grid
              xTicks={xTicks}
              yTicks={yTicks}
              xDashed={gridStyle === 'dot-grid' ? `0, ${gridSize}` : undefined}
              yDashed={gridStyle === 'dot-grid' ? `0, ${gridSize}` : undefined}
            />
          )}
          {/* All interactivity goes into its own component,
        so we can render less items less frequently
        It will draw above and below the graph, so we pass that thru */}
          <InteractionManager<NodeType, EdgeType, NodeIdType>
            backgroundDragMode={backgroundDragMode}
            chartState={chartState}
            edgeCreation={edgeCreation}
            graphContext={graphContext}
            graphProps={props}
            backLayer={
              <>
                {/* When the edges are not smart, they will overlap things, so we draw them "under" the graph */}
                {!edgesOnTop && edges}
                {/* The Node rendering strategy is that we do all the placement logic,
            but they can draw custom content in a fixed subset of the area.
            For children, today we do it all since it is just simple recursion,
            but maybe later it can be customized further. */}
                <g className={cn('ArcGraph-Nodes', className)}>
                  {topLevelNodes.map((node) => (
                    <NodeBase
                      key={node.id}
                      node={node}
                      childNodeRenderer={nodeChildrenRenderer}
                      contentRenderer={nodeContentRenderer}
                    />
                  ))}
                </g>
              </>
            }
            frontLayer={
              <>
                {/* When the edges are smart, they will avoid things,
            so we can draw them "on top". Also, in nested graphs, this is necessary. */}
                {edgesOnTop && edges}
              </>
            }
          />
        </Content>
      </ChartBase>
    </GraphContextProvider>
  );
}
