import React, { useState, SyntheticEvent } from 'react';
import {
  useChartState,
  ILineChartDatum,
  ILineChartProps,
  cn,
} from '@adam-sv/arc';
import { ScaleLinear, scaleLinear, line } from 'd3';

export interface IUseLineChartLogic {
  data: ILineChartProps['data'];
  yMin?: number;
  yMax?: number;
  xMin?: number;
  xMax?: number;
  axisSettings?: ILineChartProps['axisSettings'];
  minContentHeight?: number;
  lineOpts?: ILineChartProps['lineOpts'];
  disableMouseTracking?: boolean;
}
export const useLineChartLogic = ({
  data,
  yMin,
  yMax,
  xMin,
  xMax,
  axisSettings,
  minContentHeight,
  lineOpts,
  disableMouseTracking,
}: IUseLineChartLogic) => {
  const [currentMousePos, sertCurrentMousePos] = useState<{
    x: number;
    y: number;
  }>();

  const numberTicks = 10;
  const getDomains = () => {
    let calcYMin = Infinity;
    let calcYMax = -Infinity;
    let calcXMin = Infinity;
    let calcXMax = -Infinity;
    Object.values(data)
      .flat()
      .forEach((datum) => {
        if (datum.value > calcYMax) calcYMax = datum.value;
        if (datum.value < calcYMin) calcYMin = datum.value;
        if (datum.time > calcXMax) calcXMax = datum.time;
        if (datum.time < calcXMin) calcXMin = datum.time;
      });

    return {
      yDomain: [yMin ?? calcYMin, yMax ?? calcYMax],
      xDomain: [xMin ?? calcXMin, xMax ?? calcXMax],
    };
  };

  const { yDomain, xDomain } = getDomains();

  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: axisSettings?.left?.size ?? 50,
        bottom: axisSettings?.bottom?.size ?? 50,
      },
    },

    contentSizing: {
      mode: 'fits-height',
      controlledDimensionSize: minContentHeight ?? 200,
      minContentHeight: minContentHeight ?? 200,
    },
  });

  const yLinearScale = scaleLinear()
    .domain(yDomain)
    .range([chartState.sizes.svg.yRange, 0]);

  const xLinearScale = scaleLinear()
    .domain(xDomain)
    .range([0, chartState.sizes.svg.xRange]);

  const getMouseRelativeLineY = (
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

  const canALineFnBeMade = (
    mouseX: number | undefined,
    d1: ILineChartDatum,
    d2: ILineChartDatum | undefined
  ) => {
    return (
      mouseX &&
      d2 &&
      mouseX >= xLinearScale(d1.time) &&
      mouseX <= xLinearScale(d2.time)
    );
  };

  const getD3Points = () => {
    const allData = Object.values(data);
    const allD3Points: [number, number][][] = [];
    const yValues: number[] = [];
    const classNames: (string | undefined)[] = [];
    allData.forEach((dataArray) => {
      if (dataArray[0]?.className) {
        classNames.push(dataArray[0].className);
      }
      const sortedData = dataArray.sort((a, b) => a.time - b.time);
      const d3points: [number, number][] = sortedData.map((d, i) => {
        if (canALineFnBeMade(currentMousePos?.x, d, sortedData[i + 1])) {
          yValues.push(
            getMouseRelativeLineY(
              xLinearScale(d.time),
              xLinearScale(sortedData[i + 1].time),
              yLinearScale(d.value),
              yLinearScale(sortedData[i + 1].value),
              currentMousePos?.x ?? 0
            )
          );
        }
        return [d.time, d.value];
      });
      // Makes sure the lines start/end at 0
      // needed if we do the area under curver
      // if (d3points.length) {
      //   if (d3points[0][0] !== 0) {
      //     d3points.unshift([d3points[0][0], 0]);
      //   }
      //   if (d3points[d3points.length - 1][0] !== 0) {
      //     d3points.push([d3points[d3points.length - 1][0], 0]);
      //   }
      // }
      allD3Points.push(d3points);
    });
    return { allD3Points, yValues, classNames };
  };

  const { allD3Points, yValues, classNames } = getD3Points();

  const getLines = (
    xScale: ScaleLinear<number, number>,
    yScale: ScaleLinear<number, number, number>,
    allD3Points: [number, number][][],
    classNames: (string | undefined)[]
  ) => {
    const lineFn = line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));

    return allD3Points.map((d, i) => {
      const line = Object.values(data)[i];
      return (
        <path
          className={cn('ArcLineChart-Path', classNames[i] ?? '')}
          key={i}
          d={lineFn(d) as string}
          onClick={(e: SyntheticEvent) => {
            if (lineOpts?.onClick) lineOpts.onClick(e, line);
          }}
          onMouseOver={(e: SyntheticEvent) => {
            if (lineOpts?.onMouseOver) lineOpts.onMouseOver(e, line);
          }}
          onMouseOut={(e: SyntheticEvent) => {
            if (lineOpts?.onMouseOut) lineOpts.onMouseOut(e, line);
          }}
        />
      );
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
    if (disableMouseTracking) return;
    const bound = e.currentTarget.getBoundingClientRect();
    sertCurrentMousePos({
      x: e.clientX - bound.left - e.currentTarget.clientLeft,
      y: e.clientY - bound.top - e.currentTarget.clientTop,
    });
  };

  return {
    chartState,
    yLinearScale,
    xLinearScale,
    numberTicks,
    handleMouseMove,
    allD3Points,
    classNames,
    getLines,
    currentMousePos,
    yValues,
  };
};
