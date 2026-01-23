// dependencies
import { scaleLinear } from 'd3';
import { useCallback, useMemo } from 'react';
import {
  LogicalGraphUtils,
  serializeFunctions,
  StringUtils,
  useChartState,
} from '@adam-sv/arc';
// self
import {
  defaultNodeContentRenderer,
  defaultNodeChildrenRenderer,
} from './NodeBase';
import { getRenderedLayout } from './layouts';
import { foreignObjectWrap } from './NodeBase';
// types
import type { ScaleLinear } from 'd3';
import type {
  GraphNodeId,
  IBoxSize,
  ICoords,
  IGraphEdge,
  IProcessedGraphNode,
} from '@adam-sv/arc';
import type {
  IGraphProps,
  IGraphLayoutOptions,
  IGraphRenderContext,
  IGraphSelection,
} from '.';
import type { IGraphDefaults } from './types';
const { positionSizeToWebcolaRectangle } = LogicalGraphUtils;

export function useGraphLogic<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  // html stuff
  className,
  // controls
  scrollControls,
  zoomControls,
  // id,
  // style,
  // edge options
  edgeMode = 'straight',
  forceEdgesOnTop,
  edgeSpacing,
  edgeCreation,
  connectionActions = {},
  // graph options
  gridSize = GRAPH_DEFAULTS.GRID_SIZE, // represents gap between lines or dots
  gridLineOrDotThickness = GRAPH_DEFAULTS.GRID_LINE_OR_DOT_THICKNESS,
  gridStyle = 'grid',
  graph,
  hideScrollBars,
  minHeight = GRAPH_DEFAULTS.MIN_HEIGHT,
  mode = 'flat',
  layoutOptions: {
    padding = GRAPH_DEFAULTS.LAYOUT_OPTIONS.PADDING,
    childPadding = GRAPH_DEFAULTS.LAYOUT_OPTIONS.CHILD_PADDING,
    defaultNodeSize = GRAPH_DEFAULTS.LAYOUT_OPTIONS.DEFAULT_NODE_SIZE,
    inputOutputHeight = GRAPH_DEFAULTS.LAYOUT_OPTIONS.INPUT_OUTPUT_HEIGHT,
    inputOutputWidth = GRAPH_DEFAULTS.LAYOUT_OPTIONS.INPUT_OUTPUT_WIDTH,
    contentHeight = GRAPH_DEFAULTS.LAYOUT_OPTIONS.CONTENT_HEIGHT,
    connectionTargetSize = GRAPH_DEFAULTS.LAYOUT_OPTIONS.CONNECTION_TARGET_SIZE,
  } = defaultLayoutOptions,
  renderedLayout,
  // node content
  htmlNodeContentRenderer,
  svgNodeContentRenderer,
  // selection
  selectionActions,
  selectedEdges,
  selectedNodeIds,
  // debug
  debug,
}: IGraphProps<NodeType, EdgeType, NodeIdType>) {
  // Set default layout options
  const layoutOptions = useMemo(
    () => ({
      padding,
      childPadding,
      defaultNodeSize,
      inputOutputHeight,
      inputOutputWidth,
      contentHeight,
      connectionTargetSize,
    }),
    [
      padding,
      childPadding,
      defaultNodeSize,
      inputOutputHeight,
      inputOutputWidth,
      contentHeight,
      connectionTargetSize,
    ]
  );

  // First, we decide where things are rendered, and therefore what the coordinate space is
  // Note: we shortcircuit calling "getRenderedLayout" when the user provides renderedLayout
  const { boundingRect, placements, topLevelNodes } = useMemo(
    () => renderedLayout ?? getRenderedLayout(graph, mode, layoutOptions),
    [graph, mode, layoutOptions, renderedLayout]
  );
  // Based on the layout, we calculate domain / coordinate space for the chart state
  const { xDomain, yDomain, coordinateSpace } = getDomains(
    boundingRect,
    padding
  );
  const safeZoomControls = getZoomControls(zoomControls);

  // Then, the chart state does the math about how much space we have for rendering
  const chartState = useChartState({
    contentSizing: {
      mode: 'responsive',
      coordinateSpace,
      minContentHeight: minHeight,
      fillMaxSpace: true,
    },
    scrollControls,
    zoomSettings: {
      value: safeZoomControls.value,
      min: safeZoomControls.min,
      max: safeZoomControls.max,
      onZoomUpdate: zoomControls?.onZoomUpdate,
      axes: 'xy',
    },
  });

  // Compute our scales for rendering from Coordinate Space -> SVG Space
  // TODO: scale by zoom on all of these - it's only right at 1 zoom I guess
  const { finalGridSize, xScale, yScale, xTicks, yTicks } = useScalesAndTicks(
    coordinateSpace,
    chartState.sizes.svg,
    xDomain,
    yDomain,
    gridSize,
    chartState.zoom.currentZoom
  );

  const gridOptions = useMemo(
    () => ({
      gridSize: finalGridSize,
      gridThickness: gridLineOrDotThickness, // temporarily embarrassed important variable
      gridStyle,
    }),
    [finalGridSize, gridLineOrDotThickness, gridStyle]
  );

  // Finally, we need to determine our rendering strategy
  // Nodes get "content" and "child" rendering
  // We will provide super basic label display for content atm. users can provide fanciness
  const nodeContentRenderer = useMemo(() => {
    if (svgNodeContentRenderer) return svgNodeContentRenderer;
    if (htmlNodeContentRenderer)
      return foreignObjectWrap(htmlNodeContentRenderer);
    return defaultNodeContentRenderer;
  }, [svgNodeContentRenderer, htmlNodeContentRenderer]);

  const nodeChildrenRenderer = useMemo(() => {
    return defaultNodeChildrenRenderer;
  }, []);

  // Padding is going to annoy us unless we give it a better handling!
  const scaledPadding = {
    topLevel: {
      x: getScalarInScale(padding, xScale),
      y: getScalarInScale(padding, yScale),
    },
    child: {
      x: getScalarInScale(childPadding, xScale),
      y: getScalarInScale(childPadding, yScale),
    },
  };
  const positionOffset = {
    x: scaledPadding.topLevel.x,
    y: scaledPadding.topLevel.y,
  };

  // If no position is determined, we will not render the node
  const getPosition = useCallback(
    (
      { id }: IProcessedGraphNode<NodeType, NodeIdType>,
      useAbsolute = false
    ): ICoords | undefined => {
      const placement = placements.get(id);
      if (!placement) return;
      const position = useAbsolute
        ? placement.absolutePosition
        : placement.relativePosition;
      return { x: xScale(position.x), y: yScale(position.y) };
    },
    [placements, xScale, yScale]
  );
  // TODO: when no size is determined, should we not render the node?
  // For now, we will return a default size
  const getSize = useCallback(
    ({ id }: IProcessedGraphNode<NodeType, NodeIdType>): IBoxSize => {
      const { width, height } = placements.get(id)?.size ?? {};

      return {
        width: getScalarInScale(width ?? 180, xScale),
        height: getScalarInScale(height ?? 80, yScale),
      };
    },
    [placements, xScale, yScale]
  );

  // 1.2.0 TODO: these flags are hilarious because they are opposite
  const getNodeContentLayout = useCallback(
    (
      { id }: IProcessedGraphNode<NodeType, NodeIdType>,
      useAbsolutePosition?: boolean
    ) => {
      const nodePlacement = placements.get(id);
      const contentPlacement = placements.get(id)?.contentPlacement;
      if (!nodePlacement || !contentPlacement) return;

      const { x, y } = contentPlacement.position;
      const { width, height } = contentPlacement.size;
      const { absolutePosition } = nodePlacement;
      const finalXY = {
        x: x + ((useAbsolutePosition && absolutePosition.x) || 0),
        y: y + ((useAbsolutePosition && absolutePosition.y) || 0),
      };
      return {
        position: {
          x: useAbsolutePosition ? xScale(finalXY.x) : 0,
          y: useAbsolutePosition
            ? yScale(finalXY.y)
            : getScalarInScale(finalXY.y, yScale),
        },
        size: {
          width: getScalarInScale(width, xScale),
          height: getScalarInScale(height, yScale),
        },
        isStrictSubset: true,
      };
    },
    [placements, xScale, yScale]
  );

  const getNodeConnectionLayout = useCallback(
    (
      { id }: IProcessedGraphNode<NodeType, NodeIdType>,
      useRelativePosition?: boolean
    ) => {
      const placement = placements.get(id);
      if (!placement) return;

      const { absolutePosition, connectionTargetPlacement } = placement;
      const relevantPosition = useRelativePosition ? origin : absolutePosition;
      const offset = useRelativePosition ? positionOffset : origin;

      const finalSize = connectionTargetPlacement?.size || placement.size;
      const finalPosition = {
        x: relevantPosition.x + (connectionTargetPlacement?.position.x ?? 0),
        y: relevantPosition.y + (connectionTargetPlacement?.position.y ?? 0),
      };

      const { x, y } = finalPosition;
      const { width, height } = finalSize;
      return {
        position: {
          x: xScale(x) - offset.x,
          y: yScale(y) - offset.y,
        },
        size: {
          width: getScalarInScale(width, xScale),
          height: getScalarInScale(height, yScale),
        },
        isStrictSubset: Boolean(connectionTargetPlacement),
      };
    },
    [xScale, yScale]
  );

  // Edges using behavior from what we've rendered
  // TODO: how can we gracefully handle "not rendered" nodes? do we:
  // - make a validation pass in the useMemo?
  // - filter edges connected to "not rendered" nodes?
  // - use parent positions?
  // FOR NOW, we hack it to the origin at size 0
  const getRenderedPosition = useCallback(
    (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
      const position = getPosition(node, true);
      return positionSizeToWebcolaRectangle(
        position ?? { x: 0, y: 0 },
        position ? getSize(node) : { width: 0, height: 0 }
      );
    },
    [getPosition, getSize]
  );

  const edgesOnTop =
    forceEdgesOnTop || edgeMode === 'smart' || mode === 'functional';

  const graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType> =
    useMemo(
      () => ({
        graph,
        // layout info
        getNodeConnectionLayout,
        getNodeContentLayout,
        getPosition,
        getSize,
        layoutOptions,
        scaledPadding,
        zoom: chartState.zoom.currentZoom,
      }),
      [
        graph,
        getNodeConnectionLayout,
        getNodeContentLayout,
        getPosition,
        getSize,
        chartState.zoom.currentZoom,
        layoutOptions,
      ]
    );

  const getNodeContentPosition = useMemo(
    () =>
      graphContext.getNodeContentLayout
        ? (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
            const plc = graphContext.getNodeContentLayout(node, true);
            return plc
              ? positionSizeToWebcolaRectangle(plc.position, plc.size)
              : getRenderedPosition(node);
          }
        : undefined,
    [graphContext.getNodeContentLayout]
  );

  const getNodePosition = useCallback(
    graphContext.getNodeConnectionLayout
      ? (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
          const plc = graphContext.getNodeConnectionLayout(node);
          return plc
            ? positionSizeToWebcolaRectangle(plc.position, plc.size)
            : getRenderedPosition(node);
        }
      : getRenderedPosition,
    [graphContext.getNodeConnectionLayout, getRenderedPosition]
  );

  const handleConnectionClick = useCallback(
    (e: React.MouseEvent, edge: IGraphEdge<EdgeType, NodeIdType>) => {
      if (!selectionActions) return;
      const multiEvent = eventHasContinuationKeyPressed(e);
      const edgeIsSelected = selectedEdges?.has(edge);
      const position: 'added' | 'deleted' = edgeIsSelected
        ? 'deleted'
        : 'added';
      selectionActions.onSelectionChanged?.({
        [position]: { edges: new Set([edge]), multiEvent },
      });

      const finalSelection: IGraphSelection<EdgeType, NodeIdType> = {
        nodeIds: multiEvent ? new Set(selectedNodeIds) : new Set(),
        edges: multiEvent ? new Set(selectedEdges) : new Set(),
      };
      finalSelection.edges[edgeIsSelected ? 'delete' : 'add'](edge);
      selectionActions.onSelectionUpdated?.(finalSelection);
    },
    [selectedNodeIds, selectedEdges, selectionActions]
  );

  const formattedConnectionActions = useMemo(
    () => ({
      ...connectionActions,
      onClick: serializeFunctions(
        handleConnectionClick,
        connectionActions.onClick
      ),
    }),
    [connectionActions, handleConnectionClick]
  );

  const getEdgeClassName = useCallback(
    (edge: IGraphEdge<EdgeType, NodeIdType>) =>
      selectedEdges?.has(edge) ? 'selected' : undefined,
    [selectedEdges]
  );

  return useMemo(
    () => ({
      boundingRect,
      chartState,
      childPadding,
      className,
      debug,
      edgeCreation,
      edgeMode,
      edgesOnTop,
      edgeSpacing,
      gridOptions,
      getRenderedPosition,
      graph,
      graphContext,
      hideScrollBars,
      mode,
      nodeChildrenRenderer,
      nodeContentRenderer,
      padding,
      placements,
      topLevelNodes,
      xTicks,
      yTicks,

      getNodeContentPosition,
      getNodePosition,
      formattedConnectionActions,
      getEdgeClassName,
    }),
    [
      boundingRect,
      chartState,
      childPadding,
      className,
      debug,
      edgeCreation,
      edgeMode,
      edgesOnTop,
      edgeSpacing,
      gridOptions,
      getRenderedPosition,
      graph,
      graphContext,
      hideScrollBars,
      nodeChildrenRenderer,
      nodeContentRenderer,
      mode,
      padding,
      placements,
      topLevelNodes,
      xTicks,
      yTicks,

      getNodeContentPosition,
      getNodePosition,
      formattedConnectionActions,
      getEdgeClassName,
    ]
  );
}

export function getDomains(
  { left, top, right, bottom }: DOMRect,
  padding: number
) {
  const xDomain = [-1 * padding + left, right + padding] as [number, number];
  const yDomain = [-1 * padding + top, bottom + padding] as [number, number];
  const coordinateSpace = {
    width: xDomain[1] - xDomain[0],
    height: yDomain[1] - yDomain[0],
  };
  return { xDomain, yDomain, coordinateSpace };
}

export function getGridTicks(range: [number, number], gridSize: number) {
  const ticks: Array<number> = [];
  let position = range[0];
  const maximum = range[1];
  while (position < maximum) {
    ticks.push(position);
    position += gridSize;
  }
  return ticks;
}

function useScalesAndTicks(
  coordinateSpace: IBoxSize,
  svgSpace: Record<'xRange' | 'yRange', number>,
  xDomain: [number, number],
  yDomain: [number, number],
  gridSize: number,
  zoom: number
) {
  const finalGridSize = gridSize * zoom;
  const usefulXRange = coordinateSpace.width * zoom;
  const usefulYRange = coordinateSpace.height * zoom;

  const xScale = useMemo(
    () => scaleLinear().domain(xDomain).range([0, usefulXRange]),
    [xDomain[0], xDomain[1], usefulXRange]
  );
  const yScale = useMemo(
    () => scaleLinear().domain(yDomain).range([0, usefulYRange]),
    [yDomain[0], yDomain[1], usefulYRange]
  );

  const xTicks = getGridTicks([0, svgSpace.xRange], finalGridSize);
  const yTicks = getGridTicks([0, svgSpace.yRange], finalGridSize);

  return { xScale, yScale, xTicks, yTicks, finalGridSize };
}

export function getScalarInScale(
  scalar: number,
  scale: ScaleLinear<number, number>
) {
  return scale(scalar) - scale(0);
}

export function getZoomControls(
  zoomControls?: Partial<IGraphDefaults['ZOOM_DEFAULTS']>
) {
  const newZoomControls: Partial<IGraphDefaults['ZOOM_DEFAULTS']> = {};

  newZoomControls.value =
    zoomControls?.value ?? GRAPH_DEFAULTS.ZOOM_DEFAULTS.value;
  newZoomControls.max = zoomControls?.max ?? GRAPH_DEFAULTS.ZOOM_DEFAULTS.max;
  newZoomControls.min = zoomControls?.min ?? GRAPH_DEFAULTS.ZOOM_DEFAULTS.min;
  return newZoomControls as IGraphDefaults['ZOOM_DEFAULTS'];
}

export const GRAPH_DEFAULTS: IGraphDefaults = {
  GRID_SIZE: 10,
  GRID_LINE_OR_DOT_THICKNESS: 1,
  MIN_HEIGHT: 140,
  ZOOM_DEFAULTS: { value: 1, min: 0.5, max: 5 },
  LAYOUT_OPTIONS: {
    PADDING: 20,
    CHILD_PADDING: 20,
    DEFAULT_NODE_SIZE: {
      width: 180,
      height: 80,
    },
    INPUT_OUTPUT_HEIGHT: 30,
    INPUT_OUTPUT_WIDTH: 120,
    CONTENT_HEIGHT: 40,
    CONNECTION_TARGET_SIZE: 30,
  },
};

export const defaultLayoutOptions = Object.fromEntries(
  Object.entries(GRAPH_DEFAULTS.LAYOUT_OPTIONS).map(([key, value]) => [
    StringUtils.capitalSnakeToCamelCase(key),
    value,
  ])
) as unknown as IGraphLayoutOptions;

const origin = { x: 0, y: 0 };

export function preventDefault(e: { preventDefault: () => unknown }) {
  e.preventDefault();
}

// "Continuation" = "multi", in this case ctrl / cmd / shift
export function eventHasContinuationKeyPressed(e: React.MouseEvent) {
  return Boolean(e.ctrlKey || e.metaKey || e.shiftKey);
}

// "Modifier" = "ctrl/cmd"
export function eventHasModifierKeyPressed(e: React.MouseEvent) {
  return Boolean(e.ctrlKey || e.metaKey);
}
