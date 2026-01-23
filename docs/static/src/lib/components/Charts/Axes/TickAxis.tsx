// dependencies
import { useContext, Fragment } from 'react';
import { ScaleLinear } from 'd3';
// internals
import { ChartComponentContext } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { ChartSide } from '../Base/types';
import type { IBoxSize } from '@adam-sv/arc';
export interface ITickAxisProps {
  tickLength?: number;
  textOffset?: number;
  numberTicks?: number;
  scale: ScaleLinear<number, number>;
  dateMode?: boolean;
}

// TODO: tick formatting of the value
export const TickAxis = ({
  numberTicks = 10,
  tickLength = 10,
  textOffset = 5,
  scale,
  dateMode = false,
}: ITickAxisProps) => {
  const chartComponentState = useContext(ChartComponentContext);
  if (!chartComponentState) return null;
  if (!safeChartComponents.has(chartComponentState.component as ChartSide))
    return null;

  const component = chartComponentState.component as ChartSide;
  const { svgSize } = chartComponentState;

  const ticks = getTickAndTextPositions(component, svgSize, {
    scale,
    numberTicks,
    tickLength,
    textOffset,
    dateMode,
  });

  return (
    <g className='TickAxis'>
      {ticks.map((positions) => {
        const { tickProps, textProps, value } = positions;
        return (
          <Fragment key={value}>
            <line {...tickProps} />
            <text
              {...textProps}
              children={
                !dateMode
                  ? value
                  : `${new Date(value).toLocaleDateString()} - 
                    ${new Date(value).toLocaleTimeString()}`
              }
            />
          </Fragment>
        );
      })}
    </g>
  );
};

// TODO: tick formatting of the value
function getTickAndTextPositions(
  component: ChartSide,
  svgSize: IBoxSize,
  { numberTicks, tickLength, textOffset, scale }: Required<ITickAxisProps>
) {
  const { width, height } = svgSize;

  const isLeftOrRight = ['left', 'right'].includes(component);
  const isOutside = ['left', 'top'].includes(component);

  const outsidePosition = isLeftOrRight ? width : height;

  return scale.ticks(numberTicks).map((tick, i) => {
    const tickPosition = scale(tick);
    return {
      value: tick,
      tickProps: {
        x1: !isLeftOrRight
          ? tickPosition
          : isOutside
          ? outsidePosition - tickLength
          : tickLength,
        x2: !isLeftOrRight ? tickPosition : isOutside ? outsidePosition : 0,
        y1: isLeftOrRight
          ? tickPosition
          : isOutside
          ? outsidePosition - tickLength
          : tickLength,
        y2: isLeftOrRight ? tickPosition : isOutside ? outsidePosition : 0,
      },
      textProps: {
        x: !isLeftOrRight
          ? tickPosition
          : isOutside
          ? outsidePosition - tickLength - textOffset
          : tickLength + textOffset,
        y: isLeftOrRight
          ? tickPosition
          : isOutside
          ? outsidePosition - tickLength - textOffset
          : tickLength + textOffset,
      },
    };
  });
}

// TS shenanigans
const safeChartComponents: Set<ChartSide> = new Set([
  'left',
  'right',
  'bottom',
  'top',
]);
