import React, { Fragment, useEffect } from 'react';
import { Grid, MouseOver } from '@adam-sv/arc';
import { ILineChartDatum, ILineChartProps } from './types';
import { LineChartXScale, LineChartYScale } from './helpers';
import type { MousePos } from '../types';
import * as d3 from 'd3';
import { cn } from '@adam-sv/arc';

export const getContent = <T,>(
  props: ILineChartProps<T>,
  xTicks: number[],
  xScale: LineChartXScale,
  yTicks: number[],
  yScale: LineChartYScale,
  graphRect: DOMRect,
  mousePos: MousePos | undefined,
  setYValues: React.Dispatch<
    React.SetStateAction<
      { value: number | string; top: number; left: number }[]
    >
  >,
  dateMode: boolean | undefined,
  displayXValueInMouseOver: boolean | undefined
) => {
  const { height, width } = graphRect;
  const gridXTicks = xTicks.map((t) => xScale(t));
  const gridYTicks = yTicks.map((t) => graphRect.height - yScale(t));

  const currentYValues: { value: number | string; top: number; left: number }[] =
    [];

  if (mousePos) {
    // mousePos.chartRelativeX = xScale.invert(mousePos.chartRelativeX);
    // mousePos.chartRelativeY = yScale.invert(height - mousePos.chartRelativeY);
    if (displayXValueInMouseOver) {
      const absolutePosYOffset =
        (mousePos?.absoluteY ?? 0) - (mousePos?.chartRelativeY ?? 0);
      currentYValues.push({
        value: dateMode
          ? props.customDateConversion
            ? props.customDateConversion(mousePos.chartRelativeX)
            : new Date(mousePos.chartRelativeX).toLocaleDateString()
          : mousePos.chartRelativeX,
        left: mousePos.absoluteX,
        top: graphRect.height - yScale(0) + absolutePosYOffset,
      });
    }
  }

  const { data } = props;

  const allData = Object.values(data);
  const allD3Points: [number, number][][] = [];

  allData.forEach((dataArray) => {
    const sortedData = dataArray.sort((a, b) => a.time - b.time);
    const d3points: [number, number][] = [];
    sortedData.forEach((d, i) => {
      if (
        mousePos &&
        mousePos.chartRelativeX &&
        sortedData[i + 1] &&
        d.time <= xScale.invert(mousePos.chartRelativeX) &&
        sortedData[i + 1].time >= xScale.invert(mousePos.chartRelativeX)
      ) {
        const absolutePosYOffset =
          (mousePos?.absoluteY ?? 0) - (mousePos?.chartRelativeY ?? 0);
        const currY = getCurrentY(
          d.time,
          sortedData[i + 1].time,
          d.value,
          sortedData[i + 1].value,
          xScale.invert(mousePos.chartRelativeX)
        );
        currentYValues.push({
          value: currY,
          left: mousePos.absoluteX,
          top: graphRect.height - yScale(currY) + absolutePosYOffset,
        });
      }
      d3points.push([d.time, d.value]);
    });
    //Makes sure the lines start/end at 0
    if (d3points.length) {
      if (d3points[0][0] !== 0) {
        d3points.unshift([d3points[0][0], 0]);
      }
      if (d3points[d3points.length - 1][0] !== 0) {
        d3points.push([d3points[d3points.length - 1][0], 0]);
      }
    }
    allD3Points.push(d3points);
  });

  useEffect(() => {
    setYValues(currentYValues);
  }, [mousePos?.chartRelativeX]);

  const colors = props.colors || defaultColors;
  const totalColors = colors.length;

  return (
    <>
      <rect
        className='ArcLineChart-border'
        x={0}
        y={0}
        width={width}
        height={height}
      />
      <Grid
        xTicks={gridXTicks}
        yTicks={gridYTicks}
        boundingRect={new DOMRect(0, 0, width, height)}
      />

      {getLines(props, yScale, xScale, graphRect, allD3Points)}
      {mousePos && !props.disableMouseTracking && (
        <line
          className='ArcLineChart-MouseXLine'
          x1={mousePos.chartRelativeX}
          y1={0}
          x2={mousePos.chartRelativeX}
          y2={graphRect.height}
        />
      )}
      {mousePos &&
        !props.disableMouseTracking &&
        currentYValues.map((y, i) => {
          return (
            <circle
              key={`YLine-MouseCircle-${y}-${i}`}
              className='ArcLineChart-MouseXCircle'
              cx={mousePos.chartRelativeX}
              cy={
                graphRect.height -
                (typeof y.value === 'number' ? yScale(y.value ) : 0)
              }
              r={4}
              stroke={colors[i % totalColors]}
              fill={colors[i % totalColors]}
            />
          );
        })}
    </>
  );
};

const getLines = <T,>(
  props: ILineChartProps<T>,
  yScale: LineChartYScale,
  xScale: LineChartXScale,
  graphRect: DOMRect,
  allD3Points: [number, number][][]
) => {
  const { data } = props;
  const allData = Object.values(data);

  const lineFn = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => graphRect.height - yScale(d[1]));

  const colors = props.colors || defaultColors;
  const totalColors = colors.length;
  const baseColor = props.baseColor || 'var(--surface)';

  return (
    <>
      {allD3Points.map((d, i) => {
        return (
          <Fragment key={`YLine-${i}`}>
            <linearGradient
              id={`gradient${i % totalColors}`}
              x1='0%'
              y1='100%'
              x2='0%'
              y2='0%'
            >
              <stop offset='0%' stopColor={baseColor} stopOpacity='.5' />
              <stop
                offset='80%'
                stopColor={colors[i % totalColors]}
                stopOpacity='.5'
              />
            </linearGradient>
            <path
              d={lineFn(d) as string}
              strokeWidth={2}
              stroke={colors[i]}
              // className={cn(`ArcLineChart-line-${i % 5}`)}
              style={{ fill: `url(#gradient${i % 5})` }}
              onMouseOver={(e) => {
                if (props.lineOpts?.onMouseOver) {
                  props.lineOpts?.onMouseOver(e, allData[i]);
                }
              }}
              onMouseOut={(e) => {
                if (props.lineOpts?.onMouseOut) {
                  props.lineOpts.onMouseOut(e, allData[i]);
                }
              }}
              onClick={(e) => {
                if (props.lineOpts?.onClick) {
                  props.lineOpts.onClick(e, allData[i]);
                }
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
};

const getCurrentY = (
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  mouseX: number
) => {
  //y = mx + b
  const m = (y2 - y1) / (x2 - x1);
  //svg starts at top left so the y values are fliped
  const b = (m * x1 - y1) * -1;
  const currentY = m * mouseX + b;

  return currentY;
};

const defaultColors = [
  'var(--primary)',
  'var(--secondary)',
  'var(--tertiary)',
  'var(--warning)',
  'var(--error)',
];
