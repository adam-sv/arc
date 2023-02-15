// dependencies
import React, { Fragment, useEffect, useState } from 'react';
import { scaleBand, ScaleBand } from 'd3';
// internals
import {
  cn,
  ChartContainer,
  EdgeRouter,
  Grid,
  LogicalArcGraph,
  IGraphProps,
  MouseOver,
} from '@adam-sv/arc';
import {
  computeCategoryDomain,
  computeDateDomain,
  computeDateTicks,
  computeRelativePositions,
} from './logic';

// style
import './style.scss';
// types
import type { SyntheticEvent } from 'react';
import type { ICCSizing, IEdgeRouterMode } from '@adam-sv/arc';
import type {
  IGanttBarProps,
  IGanttDatum,
  IGanttEdge,
  IGanttProps,
} from './types';
import type {
  CategoryDomain,
  D3Range,
  DatumId,
  ICategoryTick,
  IDependentValue,
  MousePos,
} from '../types';
import { YAxisSwimLane } from '../Axes/SwimLanes';
import { AxisText } from '../Axes/AxisText';

export type { IGanttProps, IGanttDatum };

export const getCategoryTicks = (
  domain: CategoryDomain,
  range: D3Range
): {
  ticks: ICategoryTick[];
  scale: ScaleBand<string>;
} => {
  const labelHeight =
    domain.length > 0 ? (range[1] - range[0]) / domain.length : 1;
  const scale = scaleBand().domain(domain).range(range);

  return {
    ticks: domain.map((category) => {
      return {
        startPos: scale(category) || 0,
        endPos: (scale(category) || 0) + labelHeight,
        label: category,
      };
    }),
    scale,
  };
};

export function Gantt<T = any>({
  barOpts = {
    height: 12,
    padding: 10,
  },
  children,
  className,
  connectionActions,
  data = [],
  edges,
  edgeMode,
  id,
  minContentHeight,
  style,
  xOpts = {
    nice: true,
    label: 'X Label',
    tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
    tickCount: 8,
  },
  yOpts,
  disableMouseTracking,
  mouseOverStyle,
  customMouseOver,
  mouseOverTargetElement,
  initialLeftAxisWidth,
  legend,
}: IGanttProps<T>) {
  const [mouseOverValue, setMouseOverValue] = useState<IDependentValue>();
  const [leftAxisWidth, setLeftAxisWidth] = useState(
    initialLeftAxisWidth ?? 120
  );

  const xDomain = computeDateDomain(
    data.reduce((dates: (number | Date)[], datum) => {
      dates.push(datum.start, datum.finish);
      return dates;
    }, []),
    xOpts.domain
  );

  const yDomain = computeCategoryDomain(
    data.map((datum) => datum.label),
    yOpts?.domain
  );
  const rowHeight = computeRowHeight(barOpts);
  const chartHeight = rowHeight * yDomain.length;

  const mouseoverRenderer = () => {
    if (!disableMouseTracking && mouseOverValue) {
      return (
        <MouseOver
          shouldRender={!!mouseOverValue}
          location={{
            top: mouseOverValue.top,
            left: mouseOverValue.left,
          }}
          horizontalSpaceAwayFromTrigger={5}
          verticalSpaceAwayFromTrigger={5}
          positionRelativeToTrigger={'Above'}
          triggerPosition={{
            top: mouseOverValue.parentBoundaries.top,
            left: mouseOverValue.parentBoundaries.left,
          }}
          style={mouseOverStyle}
          portalTargetElement={mouseOverTargetElement}
        >
          {customMouseOver
            ? customMouseOver(mouseOverValue.value as string)
            : mouseOverValue.value}
        </MouseOver>
      );
    }
  };

  return (
    <ChartContainer
      className={cn('ArcGantt', className)}
      id={id}
      style={style}
      onlyZoomX
      sizing={{
        mode: 'fits-width',
        controlledCoordinateSpaceSize: chartHeight,
      }}
      resizeLeftRightAxis
      minContentHeight={minContentHeight || 180}
      maxContentHeight={chartHeight}
      contentRenderer={(
        graphRect: DOMRect,
        cc: ICCSizing,
        mousePos?: MousePos
      ) => {
        const zoom = cc.zooms.x;
        const { x1, x2, y1, y2 } = computeRelativePositions(graphRect);
        const { scale: xScale, ticks: dateTicks } = computeDateTicks(
          xDomain,
          [x1, x2],
          xOpts,
          zoom
        );
        const { scale: yScale, ticks: categoryTicks } = getCategoryTicks(
          yDomain,
          [y1, y2]
        );

        return (
          <>
            <rect
              className='ArcGantt-border'
              x={x1}
              y={y1}
              width={x2}
              height={y2}
            />
            <Grid
              xTicks={dateTicks.map((tick) => tick.position)}
              yTicks={categoryTicks.map((tick) => tick.startPos).concat([y2])}
              boundingRect={new DOMRect(0, 0, x2 - x1, y2 - y1)}
            />
            <GanttData<T>
              connectionActions={connectionActions}
              graphRect={graphRect}
              xScale={xScale}
              yScale={yScale}
              barOpts={barOpts}
              data={data}
              edges={edges}
              edgeMode={edgeMode}
              mousePos={mousePos}
              mouseOverValue={mouseOverValue}
              setMouseOverValue={setMouseOverValue}
            />
            {/* {toolTip &&
              mousePos &&
              toolTip(mousePos.x, mousePos.y, mousePos.xValue, mousePos.yValue)} */}
            <g className='ArcGantt-canvas'>
              {typeof children === 'function'
                ? children(new DOMRect(0, 0, x2, y2), xScale, yScale)
                : null}
            </g>
          </>
        );
      }}
      bottomAxisHeight={80}
      bottomAxisRenderer={(graphRect: DOMRect, cc: ICCSizing) => {
        const zoom = cc.zooms.x;
        const { x1, x2, y1, y2 } = computeRelativePositions(graphRect);
        const { ticks } = computeDateTicks(xDomain, [x1, x2], xOpts, zoom);
        const formattedTicks = ticks.map((tick) => {
          return {
            position: { x1: tick.position, x2: tick.position, y1, y2: y1 + 8 },
            content: tick.tickContent,
          };
        });
        return (
          <AxisText
            ticks={formattedTicks}
            orientation={'bottom'}
            textOffset={8}
            // label={
            //   xOpts.label
            //     ? { text: xOpts.label, axisRect: graphRect }
            //     : undefined
            // }
          />
        );
      }}
      leftAxisWidth={leftAxisWidth}
      leftAxisRenderer={(graphRect: DOMRect) => {
        const { x1, x2, y1, y2 } = computeRelativePositions(graphRect);
        const { ticks } = getCategoryTicks(yDomain, [y1, y2]);

        return <YAxisSwimLane ticks={ticks} postions={{ x1, x2, y1, y2 }} />;
      }}
      absoluteHTMLRenderer={mouseoverRenderer}
      bottomAxisLabel={xOpts.label}
      leftAxisLabel={yOpts?.label}
      legend={legend}
    />
  );
}

interface IGanttDataProps<T = any> {
  graphRect: DOMRect;
  xScale: any;
  yScale: any;
  barOpts: IGanttBarProps<T>;
  data: IGanttDatum<T>[];
  edges?: IGanttEdge[];
  edgeMode?: IEdgeRouterMode;
  connectionActions?: IGraphProps<T>['connectionActions'];
  mousePos?: MousePos;
  mouseOverValue: IDependentValue | undefined;
  setMouseOverValue: React.Dispatch<
    React.SetStateAction<IDependentValue | undefined>
  >;
}

interface ILocatedDatum<T> {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  className?: string;
  datum: IGanttDatum<T>;
  label: string;
  id?: DatumId;
}

function GanttData<T = any>({
  barOpts,
  connectionActions,
  data,
  edges,
  edgeMode,
  graphRect,
  xScale,
  yScale,
  mousePos,
  mouseOverValue,
  setMouseOverValue,
}: IGanttDataProps<T>) {
  const [tempDepVal, setTempDepVal] = useState<IDependentValue>();

  let isMousedOver = false;

  useEffect(() => {
    //needed for lifecycle methods
    setMouseOverValue(tempDepVal);
  }, [tempDepVal]);

  useEffect(() => {
    if (!mousePos) {
      setTempDepVal(undefined);
    }
  }, [mousePos]);

  const locatedData: ILocatedDatum<T>[] = computeLocatedData(
    data,
    xScale,
    yScale,
    barOpts
  );

  let graph;
  if (edges?.length) {
    graph = new LogicalArcGraph(
      locatedData.map((ld) => ({
        id: ld.datum.id || 0,
        label: ld.label,
        parentId: null,
        position: ld.position,
        size: ld.size,
      })),
      edges
    );
  }

  return (
    <>
      {graph && (
        <g className='ArcGantt-connections'>
          <EdgeRouter
            connectionActions={connectionActions}
            containerDOMRect={graphRect}
            edgeMode={edgeMode || 'straight'}
            graph={graph}
            noSVGContainer
          />
        </g>
      )}
      <g className='ArcGantt-data'>
        {locatedData.map((ld, i) => {
          const currentlyMousedOver =
            mousePos &&
            mousePos.chartRelativeX >= ld.position.x &&
            mousePos.chartRelativeX <= ld.position.x + ld.size.width &&
            mousePos.chartRelativeY >= ld.position.y &&
            mousePos.chartRelativeY <= ld.position.y + ld.size.height;

          if (currentlyMousedOver) {
            isMousedOver = true;
          }
          if (i === locatedData.length - 1 && !isMousedOver && tempDepVal) {
            //without this check the mouse over is always present as nothing
            //clears the the tempDepVal
            setTempDepVal(undefined);
          }

          const absolutePosXOffset =
            (mousePos?.absoluteX ?? 0) - (mousePos?.chartRelativeX ?? 0);
          const absolutePosYOffset =
            (mousePos?.absoluteY ?? 0) - (mousePos?.chartRelativeY ?? 0);

          if (
            currentlyMousedOver &&
            (!tempDepVal ||
              (ld.position.x + ld.size.width + absolutePosXOffset !==
                tempDepVal.left &&
                ld.position.y + absolutePosYOffset !== tempDepVal.top))
          ) {
            setTempDepVal({
              left: ld.position.x + ld.size.width + absolutePosXOffset,
              top: ld.position.y + absolutePosYOffset,
              value:
                typeof ld.datum.start === 'number'
                  ? `${ld.datum.start} - ${ld.datum.finish}`
                  : `${ld.datum.label} Start: ${new Date(
                      ld.datum.start
                    ).toLocaleString()} Finish: ${new Date(
                      ld.datum.finish
                    ).toLocaleString()}`,
              parentBoundaries: {
                top: ld.position.y + absolutePosYOffset,
                left: ld.position.x + absolutePosXOffset,
              },
            });
          }
          return (
            <rect
              key={ld.id}
              className={cn(
                'ArcGantt-bar',
                ld.className,
                barOpts.onMouseOver && 'is-hoverable'
              )}
              {...ld.position}
              {...ld.size}
              onClick={(e: SyntheticEvent) => {
                if (barOpts.onClick) barOpts.onClick(e, ld.datum);
              }}
              onMouseEnter={(e: SyntheticEvent) => {
                if (barOpts.onMouseOver) barOpts.onMouseOver(e, ld.datum);
              }}
              onMouseOut={(e: SyntheticEvent) => {
                if (barOpts.onMouseOut) barOpts.onMouseOut(e, ld.datum);
              }}
            />
          );
        })}
      </g>
    </>
  );
}

function computeLocatedData<T = any>(
  data: IGanttDatum<T>[],
  xScale: any,
  yScale: any,
  barOpts: IGanttBarProps
): ILocatedDatum<T>[] {
  return data.map((datum) => {
    const x1 = xScale(datum.start);
    const x2 = xScale(datum.finish);
    const y1 = yScale(datum.label) + barOpts.padding;
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

function computeRowHeight(barOpts: IGanttBarProps) {
  return barOpts.height + 2 * barOpts.padding;
}
