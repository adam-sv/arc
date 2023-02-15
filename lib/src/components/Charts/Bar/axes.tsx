import { BarChartOrientation, IDependentAxisProps } from './types';
import { ICategoryTick } from '../types';
import { BarChartDependentScale } from './helpers';
import { AxisText } from '../Axes/AxisText';

export const getIndependentAxis = (
  ticks: ICategoryTick[],
  tickOffset: number,
  orientation: BarChartOrientation,
  axisRect: DOMRect
) => {
  const tickSize = 8;
  const tickTextOffset = 8;
  const tickElms = ticks.map((tick, i) => {
    const x1: number =
      orientation === BarChartOrientation.horizontal
        ? axisRect.width - tickSize
        : tick.startPos + tickOffset;

    const x2 =
      orientation === BarChartOrientation.horizontal
        ? axisRect.width
        : tick.startPos + tickOffset;

    const y1: number =
      orientation === BarChartOrientation.horizontal
        ? tick.startPos + tickOffset
        : 0;
    const y2 =
      orientation === BarChartOrientation.horizontal
        ? tick.startPos + tickOffset
        : tickSize;

    return { position: { x1, x2, y1, y2 }, content: tick.label };
  });
  return (
    <AxisText
      ticks={tickElms}
      orientation={
        orientation === BarChartOrientation.horizontal ? 'left' : 'bottom'
      }
      textOffset={tickTextOffset}
    />
  );
};

export const getDependentAxis = (
  dependentAxisProps: IDependentAxisProps | undefined,
  scale: BarChartDependentScale,
  ticks: number[],
  orientation: BarChartOrientation,
  axisRect: DOMRect
) => {
  const tickSize = 8;
  const tickTextOffset = 8;

  const tickElems = ticks.map((tick, i) => {
    const tickPosition: number = scale(tick);
    const x1 =
      orientation === BarChartOrientation.horizontal
        ? tickPosition
        : axisRect.width - tickSize;
    const x2 =
      orientation === BarChartOrientation.horizontal
        ? tickPosition
        : axisRect.width;

    const y1 =
      orientation === BarChartOrientation.horizontal
        ? 0
        : axisRect.height - tickPosition;
    const y2 =
      orientation === BarChartOrientation.horizontal
        ? tickSize
        : axisRect.height - tickPosition;

    return { position: { x1, x2, y1, y2 }, content: tick };
  });
  return (
    <AxisText
      ticks={tickElems}
      textOffset={tickTextOffset}
      orientation={
        orientation === BarChartOrientation.horizontal ? 'bottom' : 'left'
      }
    />
  );
};

export const getAltDependentAxis = (
  scale: BarChartDependentScale,
  ticks: number[],
  orientation: BarChartOrientation,
  axisRect: DOMRect
) => {
  const tickSize = 8;
  const tickTextOffset = 8;

  const tickElems = ticks.map((tick, i) => {
    const tickPosition = scale(tick);
    const x2 =
      orientation === BarChartOrientation.horizontal ? tickPosition : 0;
    const x1 =
      orientation === BarChartOrientation.horizontal
        ? tickPosition
        : 0 + tickSize;

    const y1 =
      orientation === BarChartOrientation.horizontal
        ? axisRect.height
        : axisRect.height - tickPosition;
    const y2 =
      orientation === BarChartOrientation.horizontal
        ? axisRect.height - tickSize
        : axisRect.height - tickPosition;

    return { position: { x1, x2, y1, y2 }, content: tick };
  });
  return (
    <AxisText
      ticks={tickElems}
      textOffset={tickTextOffset}
      orientation={
        orientation === BarChartOrientation.horizontal ? 'top' : 'right'
      }
    />
  );
};
