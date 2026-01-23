import React, { useState, useCallback, type JSX } from 'react';
import { useChartState, ChartSide } from '@adam-sv/arc';
import { scaleBand, scaleLinear } from 'd3';
import type {
  IBarChartAxisProps,
  IBarChartDatum,
  IBarChartSecondaryLineData,
  IBarOpts,
} from './types';

export interface IBarChartLogic {
  data: IBarChartDatum[];
  stackedBars?: boolean;
  orientation: 'horizontal' | 'vertical';
  minimumWidth: number;
  minimumHeight: number;
  axisSettings?: Partial<Record<'left' | 'bottom', IBarChartAxisProps>>;
  barOpts?: IBarOpts;
  lineData?: IBarChartSecondaryLineData;
  minValue?: number;
  maxValue?: number;
}

export const useBarChartLogic = ({
  data,
  stackedBars,
  orientation,
  minimumWidth,
  minimumHeight,
  axisSettings,
  barOpts,
  lineData,
  minValue,
  maxValue,
}: IBarChartLogic) => {
  const barThickness = barOpts?.minBarThickness ?? 1; // if no min is supplied the bar size will be calculated later
  const barPadding = barOpts?.barPadding ?? 5;
  const [mouseInfo, setMouseInfo] = useState<{
    left: number;
    top: number;
    triggerPosition: { top: number; left: number };
    text: string;
    horizontalSpace: number;
    verticalSpace: number;
    bar: IBarChartDatum;
  }>();

  const getGroups = useCallback(() => {
    // figure out if bars are goruped or not
    // group on categoryIdentifier if one is there or just use label
    // get the band domain from props
    // calcualte the value domain in case none was provided
    let maxValue = -Infinity;
    let minValue = Infinity;

    const stackedValues: Record<string, number> = {};
    const groupMap: { [key: string]: IBarChartDatum[] } = {};
    data.forEach((d) => {
      if (d.value > maxValue) maxValue = d.value;
      if (d.value < minValue) minValue = d.value;
      const grouping = d.categoryIdentifier ?? d.label;
      if (groupMap[grouping]) {
        groupMap[grouping].push(d);
      } else {
        groupMap[grouping] = [d];
      }

      if (stackedValues[grouping]) {
        stackedValues[grouping] += d.value;
      } else {
        stackedValues[grouping] = d.value;
      }
    });

    // band domain should just be the keys of group map
    return {
      groupMap,
      bandDomain: Object.keys(groupMap),
      calculatedValueDomain: [
        (stackedBars ? Math.min(...Object.values(stackedValues)) : minValue) *
          0.95,
        (stackedBars ? Math.max(...Object.values(stackedValues)) : maxValue) *
          1.05,
      ],
    };
  }, [data]);

  const { groupMap, bandDomain, calculatedValueDomain } = getGroups();

  const getLongestGroup = () => {
    const values = Object.values(groupMap);
    let longest: IBarChartDatum[] = [];
    values.forEach((value) => {
      if (value.length > longest.length) longest = value;
    });
    return longest;
  };

  // calculates the length the padding adds to the bar chart, each lane automatically has padding on the left and right side
  // and there is padding between each bar. So one bar will have two paddings, 2 bars will have 3, 3 bars will have 4 etc.
  // ASSUMPTION: all groups will have the same ammount of bars in their lane

  const longestGroup = getLongestGroup();
  const paddingFactor = stackedBars
    ? 2
    : (longestGroup.length + 1) / (longestGroup.length || 1);

  const controlledDemension = Math.max(
    barThickness * (stackedBars ? bandDomain : data).length +
      (stackedBars ? bandDomain : data).length * barPadding * paddingFactor,
    orientation === 'horizontal' ? minimumWidth : minimumHeight
  );

  const preventResizeSet = new Set<ChartSide>();

  if (axisSettings?.left?.preventResize) {
    preventResizeSet.add('left');
  }
  if (axisSettings?.bottom?.preventResize) {
    preventResizeSet.add('bottom');
  }

  // This determines DOM sizes and available ranges
  // This will have a left-right scrollbar when minimumWidth is bigger than the content area given
  // These are switched with horizontal / veritcal
  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: axisSettings?.left?.size ?? 50,
        bottom: axisSettings?.bottom?.size ?? 50,
        right: orientation === 'horizontal' ? lineData?.axisSettings.size : 0,
        top: orientation === 'vertical' ? lineData?.axisSettings.size : 0,
      },
      preventResize: preventResizeSet,
    },
    contentSizing: {
      mode: orientation === 'horizontal' ? 'fits-height' : 'fits-width',
      controlledDimensionSize: controlledDemension,
      minContentHeight: minimumHeight,
    },
  });

  // we determine the domain and scales
  const linearScale = scaleLinear()
    .domain([
      minValue ?? calculatedValueDomain[0],
      maxValue ?? calculatedValueDomain[1],
    ])
    .range(
      orientation === 'horizontal'
        ? [chartState.sizes.svg.yRange, 0]
        : [0, chartState.sizes.svg.xRange]
    );

  const lineLinearScale = lineData
    ? scaleLinear()
        .domain([lineData.minValue, lineData.maxValue])
        .range(
          orientation === 'horizontal'
            ? [chartState.sizes.svg.yRange, 0]
            : [0, chartState.sizes.svg.xRange]
        )
    : linearScale;

  const bandScale = scaleBand()
    .domain(bandDomain)
    .range([
      0,
      orientation === 'horizontal'
        ? chartState.sizes.svg.xRange
        : chartState.sizes.svg.yRange,
    ]);

  const getRemainingSpace = (barSize: number, groupLength: number) => {
    return (
      bandScale.bandwidth() -
      (groupLength * barSize + barPadding * paddingFactor * groupLength)
    );
  };

  // TO-DO: => groupMap is not used LOL where was it intended to be used?
  const getBarSizeAndOffset = useCallback(
    (groupMap: { [key: string]: IBarChartDatum[] }) => {
      let calculatedBarThickness = barThickness;
      let barOffset = 0;

      const groupLength = stackedBars ? 1 : longestGroup.length;
      if (
        barOpts?.maxBarThickness &&
        calculatedBarThickness +
          getRemainingSpace(calculatedBarThickness, groupLength) / groupLength >
          barOpts.maxBarThickness
      ) {
        // shift the bars over so they are centered
        calculatedBarThickness = barOpts.maxBarThickness;
        barOffset = getRemainingSpace(calculatedBarThickness, groupLength) / 2;
      } else {
        calculatedBarThickness +=
          getRemainingSpace(calculatedBarThickness, groupLength) / groupLength;
      }
      return { calculatedBarThickness, barOffset };
    },
    [barThickness, bandScale, barPadding, paddingFactor]
  );

  const { calculatedBarThickness, barOffset } = getBarSizeAndOffset(groupMap);

  const getBarPositionStacked = (
    d: IBarChartDatum,
    bandStart: number,
    barOffset: number
  ) => {
    const x =
      orientation === 'horizontal' ? bandStart + barOffset + barPadding : 0;

    const y =
      orientation === 'horizontal'
        ? linearScale(d.value)
        : bandStart + barPadding + barOffset;

    return { x, y };
  };

  const getBarPositionNonStacked = (
    d: IBarChartDatum,
    bandStart: number,
    barOffset: number,
    calculatedBarThickness: number,
    i: number
  ) => {
    const x =
      orientation === 'horizontal'
        ? bandStart +
          barOffset +
          i * (calculatedBarThickness + barPadding) +
          barPadding
        : 0;

    const y =
      orientation === 'horizontal'
        ? linearScale(d.value)
        : bandStart +
          barOffset +
          i * (calculatedBarThickness + barPadding) +
          barPadding;

    return { x, y };
  };

  const devGetBars = useCallback(() => {
    const bars: {
      datum: any;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }[] = [];

    Object.entries(groupMap).forEach(([group, datum], i) => {
      const nonStackedBarOffset =
        getRemainingSpace(calculatedBarThickness, datum.length) / 2;
      const grouping = datum[0].label
        ? group
        : bandScale.domain()[Number(group)];
      const bandStart = bandScale(grouping) ?? 0;

      let previousBarsHeight = 0;
      const barInfo = datum.map((d, i) => {
        const { x, y } = stackedBars
          ? getBarPositionStacked(d, bandStart, barOffset)
          : getBarPositionNonStacked(
              d,
              bandStart,
              nonStackedBarOffset,
              calculatedBarThickness,
              i
            );

        const width =
          orientation === 'horizontal'
            ? calculatedBarThickness
            : linearScale(d.value);

        const height =
          orientation === 'horizontal'
            ? chartState.sizes.svg.yRange - linearScale(d.value)
            : calculatedBarThickness;

        const position = {
          x: x + (orientation === 'vertical' ? previousBarsHeight : 0),
          y: y - (orientation === 'horizontal' ? previousBarsHeight : 0),
        };
        if (stackedBars)
          previousBarsHeight += orientation === 'horizontal' ? height : width;

        return {
          datum: d,
          position,
          size: {
            width,
            height,
          },
        };
      });
      bars.push(...barInfo);
    });
    return bars;
  }, [
    bandScale,
    linearScale,
    groupMap,
    barThickness,
    barPadding,
    paddingFactor,
    calculatedBarThickness,
  ]);

  const getLines = useCallback(() => {
    if (!lineData) return [];
    const { data, dataPoints } = lineData;
    const dataCoords = data.map((datum) => {
      const grouping = datum.category ?? datum.label;
      const x =
        orientation === 'horizontal'
          ? (bandScale(grouping) ?? 0) + bandScale.bandwidth() / 2
          : lineLinearScale(datum.value);
      const y =
        orientation === 'horizontal'
          ? lineLinearScale(datum.value)
          : (bandScale(grouping) ?? 0) + bandScale.bandwidth() / 2;
      return { x, y, datum };
    });

    const lines: JSX.Element[] = [];
    const points: JSX.Element[] = [];
    const labels: JSX.Element[] = [];

    if (lineData.horizontalLine) {
      const x1 =
        orientation === 'horizontal'
          ? dataCoords[0].x
          : lineLinearScale(lineData.horizontalLine);
      const x2 =
        orientation === 'horizontal'
          ? dataCoords[dataCoords.length - 1].x
          : lineLinearScale(lineData.horizontalLine);
      const y1 =
        orientation === 'horizontal'
          ? lineLinearScale(lineData.horizontalLine)
          : dataCoords[0].y;
      const y2 =
        orientation === 'horizontal'
          ? lineLinearScale(lineData.horizontalLine)
          : dataCoords[dataCoords.length - 1].y;

      lines.push(
        <line className='ArcBarChart-Line' x1={x1} x2={x2} y1={y1} y2={y2} />
      );
    }

    dataCoords.forEach((coords, i) => {
      if (dataCoords[i + 1]) {
        lines.push(
          <line
            className='ArcBarChart-Line'
            key={'line' + i}
            x1={coords.x}
            x2={dataCoords[i + 1].x}
            y1={coords.y}
            y2={dataCoords[i + 1].y}
          />
        );
      }
      if (dataPoints)
        points.push(
          <circle
            key={'circle' + i}
            className='ArcBarChart-DataPoint'
            cx={coords.x}
            cy={coords.y}
          />
        );

      if (coords.datum.displayValue)
        labels.push(
          <text
            key={'text' + i}
            x={coords.x + (lineData.textOffset?.horizontal ?? 0)}
            y={coords.y + (lineData.textOffset?.vertical ?? 0)}
            className='ArcBarChart-Text'
          >
            {coords.datum.displayValue}
          </text>
        );
    });
    return [...lines, ...points, ...labels];
  }, [lineData, calculatedBarThickness, barOffset, bandScale, lineLinearScale]);

  return {
    chartState,
    linearScale,
    bandScale,
    lineLinearScale,
    devGetBars,
    setMouseInfo,
    getLines,
    mouseInfo,
    bandDomain,
  };
};
