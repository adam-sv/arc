import { useCallback, useState } from 'react';
import {
  IGanttChartDatum,
  IGanttChart,
  useChartState,
  ChartSide,
  IGanttDevBarProps,
  IGanttChartEdge,
  LogicalArcGraph,
  IProcessedGraphNode,
  WCRectangle,
  GraphNodeId,
} from '@adam-sv/arc';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3';

export interface IGanttChartLogic<NodeType, NodeIdType extends GraphNodeId> {
  data: IGanttChartDatum<NodeType, NodeIdType>[];
  axisSettings: IGanttChart<NodeType, NodeIdType>['axisSettings'];
  barOpts: IGanttChart<NodeType, NodeIdType>['barOpts'];
  zoomSettings: IGanttChart<NodeType, NodeIdType>['zoomSettings'];
  minContentHeight?: number;
  valueDomain: IGanttChart<NodeType, NodeIdType>['valueDomain'];
  edges?: IGanttChartEdge<NodeIdType>[];
}

export const useGanttChartLogic = <NodeType, NodeIdType extends GraphNodeId>({
  data,
  axisSettings,
  barOpts,
  zoomSettings,
  minContentHeight,
  valueDomain,
  edges,
}: IGanttChartLogic<NodeType, NodeIdType>) => {
  const [mouseInfo, setMouseInfo] = useState<{
    left: number;
    top: number;
    triggerPosition: { top: number; left: number };
    horizontalSpace: number;
    verticalSpace: number;
    bar: IGanttChartDatum<NodeType, NodeIdType>;
  }>();

  const numberTicks = 10;

  const getDomains = () => {
    let minStart = Infinity;
    let maxStart = -Infinity;
    const bandDomain = data.map((d) => {
      if (new Date(d.start).getTime() < minStart)
        minStart = new Date(d.start).getTime();
      if (new Date(d.finish).getTime() > maxStart)
        maxStart = new Date(d.finish).getTime();
      return d.label;
    });

    return { bandDomain, calculatedValueDomain: [minStart, maxStart] };
  };

  const { bandDomain, calculatedValueDomain } = getDomains();

  const preventResizeSet = new Set<ChartSide>();

  if (axisSettings?.left?.preventResize) {
    preventResizeSet.add('left');
  }

  if (axisSettings?.bottom?.preventResize) {
    preventResizeSet.add('bottom');
  }

  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: axisSettings?.left?.size ?? 100,
        bottom: axisSettings?.bottom?.size ?? 100,
      },
      preventResize: preventResizeSet,
    },
    contentSizing: {
      mode: 'fits-width',
      controlledDimensionSize:
        data.length * barOpts.height + barOpts.padding * 2 * data.length,
      minContentHeight: minContentHeight ?? 200,
    },
    zoomSettings: {
      value: zoomSettings?.value ?? 1,
      min: zoomSettings?.min ?? 0.1,
      max: zoomSettings?.max ?? 10,
      axes: 'x',
    },
  });

  const bandScale = scaleBand()
    .domain(bandDomain)
    .range([0, chartState.sizes.svg.yRange]);

  const linearScale = scaleLinear()
    .domain(valueDomain ?? calculatedValueDomain)
    .range([0, chartState.sizes.svg.xRange]);

  function computeLocatedData<NodeType, NodeIdType extends GraphNodeId>(
    data: IGanttChartDatum<NodeType, NodeIdType>[],
    xScale: ScaleLinear<number, number>,
    yScale: ScaleBand<string>,
    barOpts: IGanttDevBarProps<NodeType, NodeIdType>
  ) {
    return data.map((datum) => {
      const x1 = xScale(datum.start);
      const x2 = xScale(datum.finish);
      const y1 = (yScale(datum.label) ?? 0) + barOpts.padding;
      const y2 = y1 + barOpts.height;
      return {
        position: {
          x: x1,
          y: y1,
        },
        size: {
          width: x2 - x1,
          height: y2 - y1,
        },
        className: datum.className,
        datum,
        label: datum.label,
        id: datum.id,
      };
    });
  }

  const locatedData = computeLocatedData(data, linearScale, bandScale, barOpts);

  const graph: LogicalArcGraph<NodeType, never, NodeIdType> = edges
    ? new LogicalArcGraph(
        locatedData.map((ld) => ({
          id: ld.datum.id || (0 as NodeIdType),
          label: ld.label,
          position: ld.position,
          size: ld.size,
        })),
        edges
      )
    : new LogicalArcGraph([], []);

  const getPosition = useCallback(
    (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
      const { x, y } = node.position ??
        locatedData.find((ld) => ld.id === node.id)?.position ?? { x: 0, y: 0 };
      const { width, height } = node.size ??
        locatedData.find((ld) => ld.id === node.id)?.size ?? {
          height: 0,
          width: 0,
        };
      return new WCRectangle(x, x + width, y, y + height);
    },
    [locatedData]
  );

  return {
    chartState,
    bandScale,
    linearScale,
    numberTicks,
    locatedData,
    setMouseInfo,
    graph,
    mouseInfo,
    getPosition,
  };
};
