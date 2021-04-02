// dependencies
import React, { Fragment } from 'react';
// internals
import { cn, ChartContainer, EdgeRouter, Grid, LogicalArcGraph } from '@adam-sv/arc';
import { computeCategoryDomain, computeCategoryTicks, computeDateDomain, computeDateTicks,  computeRelativePositions } from './logic';
// style
import './style.css';
// types
import type { SyntheticEvent } from 'react';
import type { IEdgeRouterMode } from '@adam-sv/arc';
import type { GanttDatumId, IGanttBarProps, IGanttDatum, IGanttEdge, IGanttProps } from './types';
export type { IGanttProps, IGanttDatum };

export function Gantt<T = any>(props: IGanttProps<T>) {
  const { children, data, edges, edgeMode, barOpts, xOpts, yOpts } = props;

  const xDomain = computeDateDomain(
    data.reduce((dates, datum) => {
      dates.push(datum.start, datum.finish);
      return dates;
    }, []),
    xOpts.domain,
  );
  const yDomain = computeCategoryDomain(
    data.map(datum => datum.label),
    yOpts.domain,
  );
  const rowHeight = computeRowHeight(barOpts);
  const chartHeight = rowHeight * yDomain.length;

  return (
    <ChartContainer
      className={cn("ArcGantt", props.className)}
      onlyZoomX
      contentHeight={chartHeight}
      contentRenderer={(graphRect: DOMRect, zoom: number) => {
        let { x1, x2, y1, y2 } = computeRelativePositions(graphRect);
        const { scale: xScale, ticks: dateTicks } = computeDateTicks(
          xDomain,
          [x1, x2],
          xOpts,
          zoom,
        );
        const { scale: yScale, ticks: categoryTicks } = computeCategoryTicks(
          yDomain,
          [y1, y2],
        );

        return <>
          <rect
            className="ArcGantt-border"
            x={x1}
            y={y1}
            width={x2}
            height={y2}
          />
          <Grid
            xTicks={dateTicks.map(tick => tick.position)}
            yTicks={categoryTicks.map(tick => tick.startPos).concat([y2])}
            boundingRect={new DOMRect(0, 0, x2 - x1, y2 - y1)}
          />
          <GanttData<T>
            xScale={xScale}
            yScale={yScale}
            barOpts={barOpts}
            data={data}
            edges={edges}
            edgeMode={edgeMode}
          />
          <g className="ArcGantt-canvas">
            {typeof children === 'function'
              ? children(new DOMRect(0, 0, x2, y2), xScale, yScale)
              : null
            }
          </g>
        </>;
      }}
      bottomAxisHeight={80}
      bottomAxisRenderer={(graphRect: DOMRect, zoom: number) => {
        const { x1, x2, y1, y2 } = computeRelativePositions(graphRect);
        const { ticks } = computeDateTicks(
          xDomain,
          [x1, x2],
          xOpts,
          zoom,
        );
        return (
          <g className="ArcGantt-xAxis">
            {ticks.map((tick, i) =>
              <Fragment key={`xAxis-${i}`}>
                <line
                  x1={tick.position}
                  x2={tick.position}
                  y1={y1}
                  y2={y1 + 6}
                />
                <text  
                  x={tick.position}
                  y={y1 + 12}
                >
                  {tick.tickContent}
                </text>
              </Fragment>
            )}
          </g>
        );
      }}
      leftAxisWidth={120}
      leftAxisRenderer={(graphRect: DOMRect) => {
        const { x1, x2, y1, y2 } = computeRelativePositions(graphRect);
        const { ticks } = computeCategoryTicks(
          yDomain,
          [y1, y2],
        );

        return (
          <g className="ArcGantt-yAxis">
            <g className="ArcGantt-yAxis-ticks">
              {ticks.map(yTick =>
                <text
                  key={yTick.label}
                  x={(x2 - x1) / 2}
                  y={(yTick.endPos + yTick.startPos + 2) / 2}
                >
                  {yTick.label}
                </text>
              )}
            </g>
            <Grid
              xTicks={[x1, x2]}
              yTicks={ticks.map(tck => tck.startPos).concat([y2])}
              boundingRect={new DOMRect(0, 0, x2 - x1, y2 - y1)}
            />
          </g>
        );
      }}
    />
  );
}

interface IGanttDataProps<T = any> {
  xScale: any;
  yScale: any;
  barOpts: IGanttBarProps<T>;
  data: IGanttDatum<T>[];
  edges?: IGanttEdge[];
  edgeMode?: IEdgeRouterMode;
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
  id?: GanttDatumId;
};

function GanttData<T = any>({
  barOpts,
  data,
  edges,
  edgeMode,
  xScale,
  yScale,
}:IGanttDataProps<T>) {
  const locatedData:ILocatedDatum<T>[] = computeLocatedData(data, xScale, yScale, barOpts);

  let graph;
  if (edges?.length > 0) {
    graph = new LogicalArcGraph(
      locatedData.map(ld => ({
        id: ld.datum.id,
        label: ld.label,
        parentId: null,
        position: ld.position,
        size: ld.size,
      })),
      edges,
    );
  }

  return <>
    {graph && (
      <g className="ArcGantt-connections">
        <EdgeRouter
          edgeMode={edgeMode || 'straight'}
          graph={graph}
          noSVGContainer
        />
      </g>
    )}
    <g className="ArcGantt-data">
      {locatedData.map(ld =>
        <rect
          key={ld.id}
          className={cn(
            "ArcGantt-bar",
            ld.className,
            barOpts.onMouseOver && 'is-hoverable',
          )}
          {...ld.position}
          {...ld.size}
          onMouseEnter={(e: SyntheticEvent) => {
            if (barOpts.onMouseOver) { barOpts.onMouseOver(e, ld.datum); }
          }}
          onMouseOut={(e: SyntheticEvent) => {
            if (barOpts.onMouseOut) { barOpts.onMouseOut(e, ld.datum); }
          }}
        />
      )}
    </g>
  </>;
}

function computeLocatedData<T = any>(
  data: IGanttDatum<T>[],
  xScale: any,
  yScale: any,
  barOpts: IGanttBarProps,
): ILocatedDatum<T>[] {
  return data.map(datum => {
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
