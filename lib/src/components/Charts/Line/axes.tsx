import { IYAxis } from './types';
import { LineChartYScale, LineChartXScale } from './helpers';
import { AxisText } from '../Axes/AxisText';

export const getXAxis = (
  ticks: number[],
  scale: LineChartXScale,
  dateMode: boolean | undefined,
  customDateConversion?: (dateTime: number) => string
) => {
  const formattedTicks = ticks.map((tick) => {
    const tickPosition = scale(tick);
    return {
      position: { x1: tickPosition, x2: tickPosition, y1: 0, y2: 8 },
      content: dateMode
        ? customDateConversion
          ? customDateConversion(tick)
          : new Date(tick).toLocaleDateString()
        : tick,
    };
  });
  return (
    <AxisText
      ticks={formattedTicks}
      className={'LineChart-xAxis'}
      orientation={'bottom'}
      textOffset={8}
    />
  );
};

export const getYAxis = (
  yAxis: IYAxis | undefined,
  scale: LineChartYScale,
  ticks: number[],
  axisRect: DOMRect
) => {
  const tickElems = ticks.map((tick, i) => {
    const tickPosition = scale(tick);
    const x1 = axisRect.width - 8;
    const x2 = axisRect.width;
    const y1 = axisRect.height - tickPosition;
    const y2 = axisRect.height - tickPosition;

    return { position: { x1, x2, y1, y2 }, content: tick };
  });

  return <AxisText ticks={tickElems} orientation={'left'} textOffset={8} />;
};
