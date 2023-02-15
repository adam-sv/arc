import React, { CSSProperties, useRef, useState } from 'react';
import { cn, RangeSlider } from '@adam-sv/arc';
import type {
  ParallelAxisChartDatum,
  IParallelAxisChartColumn,
} from '@adam-sv/arc';
import './style.scss';
import { getFractionalYPos } from './fractional-positioning';

export interface IParallelAxisChartColumnProps {
  columnDef: IParallelAxisChartColumn;
  fractionalXPos: number; // values between (0,1) representing percentage across graph
  data: ParallelAxisChartDatum[];
  didUpdateFilterSlider?: (newSliderValues: [number, number]) => unknown;
  max: number;
  min: number;
}

export const ParallelAxisChartColumn = (
  props: IParallelAxisChartColumnProps
): JSX.Element => {
  const { data, columnDef, fractionalXPos, didUpdateFilterSlider } = props;
  const { className, id, style, label, key, tickWidth = 10 } = columnDef;
  const axisMax = columnDef.max === undefined ? props.max : columnDef.max;
  const axisMin = columnDef.min === undefined ? props.min : columnDef.min;
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    axisMin,
    axisMax,
  ]);

  const lineRef = useRef<SVGLineElement>(null);
  const numTicks = columnDef.numTicks ? Math.max(2, columnDef.numTicks) : 10; // minimum number of ticks is 2
  const ticks =
    columnDef.ticks ||
    Array(numTicks)
      .fill(0)
      .map((zero, tickIndex) => {
        const tickFracY = tickIndex / (numTicks - 1);
        const tickValue = axisMax - (axisMax - axisMin) * tickFracY;
        return tickValue;
      });

  const dataPoints = data.map((datum) => datum.values[key]).sort();
  const columnId = `ParallelAxisChart-Column-${key}`;
  const xPercentString = `${fractionalXPos * 100}%`;

  const tickElements = ticks.map((tickValue: number, tickIndex: number) => {
    const tickFracY = getFractionalYPos(tickValue, axisMax, axisMin);
    const tickYPercentageString = `${tickFracY * 100}%`;
    const pos = {
      x1: `calc(${xPercentString} - ${tickWidth / 2}px)`,
      x2: `calc(${xPercentString} + ${tickWidth / 2}px)`,
      y1: tickYPercentageString,
      y2: tickYPercentageString,
    };

    const xLabelPos = `calc(${xPercentString} ${
      fractionalXPos === 1 ? '-' : '+' // if we're at the last column, put labels on the inside
    } ${tickWidth / 2 + 8}px)`;

    return (
      <g key={`${columnId}-tick-${tickIndex}`}>
        <line {...pos} />
        <foreignObject
          x={xLabelPos}
          y={tickYPercentageString}
          height='1'
          width='1'
        >
          <div
            className={cn(
              'ArcParallelAxisChart-Column-tick-label',
              !tickFracY && 'ArcParallelAxisChart-Column-top-tick',
              tickFracY === 1 && 'ArcParallelAxisChart-Column-bottom-tick',
              `${columnId}-tick-${tickIndex}`
            )}
          >
            {tickValue}
          </div>
        </foreignObject>
      </g>
    );
  });
  const dataPointCircles = dataPoints.map(
    (dataPointValue: number, dataPointIndex: number) => {
      const dataPointFracY = getFractionalYPos(
        dataPointValue,
        axisMax,
        axisMin
      );

      const circleCenter = {
        cx: xPercentString,
        cy: `${dataPointFracY * 100}%`,
      };

      return (
        <circle
          className='ArcParallelAxisChart-Column-data-circle'
          key={`${columnId}-datum-${dataPointIndex}`}
          {...circleCenter}
          r={3}
          fill={'black'}
        />
      );
    }
  );
  return (
    <g
      className={cn('ArcParallelAxisChart-Column', columnId, className)}
      id={id}
      style={style}
    >
      <line
        ref={lineRef}
        {...{
          x1: xPercentString,
          x2: xPercentString,
          y1: 0,
          y2: '100%',
        }}
      />

      {tickElements}
      {dataPointCircles}
      <foreignObject x={xPercentString} y={'100%'}>
        <span className='ArcParallelAxisChart-Column-label'>{label}</span>
      </foreignObject>
      {didUpdateFilterSlider && (
        <foreignObject x={xPercentString} y='0' height='100%' width='1px'>
          <RangeSlider
            min={axisMin}
            max={axisMax}
            interval={1}
            value={sliderValue}
            title=''
            isVertical
            onChange={(newValue) => {
              setSliderValue(newValue);
              if (didUpdateFilterSlider) didUpdateFilterSlider(newValue);
            }}
            style={
              lineRef?.current
                ? ({
                    '--ArcSlider-track-length': `calc(${
                      lineRef.current.getBoundingClientRect().height
                    }px + var(--ArcSlider-thumb-size))`,
                    height: lineRef.current.getBoundingClientRect().height,
                  } as CSSProperties)
                : {}
            }
          />
        </foreignObject>
      )}
    </g>
  );
};
