// dependencies
import { useState } from 'react';
import { cn, ChartContainer, ICCSizing, MouseOver } from '@adam-sv/arc';
// internals
import { getXAxis, getYAxis } from './axes';
import { getContent } from './content';
import {
  getXDomain,
  getXScale,
  getTicks,
  getYDomain,
  getYScale,
} from './helpers';
// style
import './style.scss';
// types
import type { ILineChartProps, ILineChartDatum } from './types';
import type { D3Range, MousePos } from '../types';

export function LineChart<T = any>(props: ILineChartProps) {
  const { yAxis, xAxis, data, mouseOverStyle, disableMouseTracking, legend } =
    props;

  const [yValues, setYValues] = useState<
    { value: number | string; top: number; left: number }[]
  >([]);

  const flatData = Object.values(data).reduce((flat, dataArr) => {
    flat.push(...dataArr);
    return flat;
  }, []);
  const xDomain = getXDomain(
    props.maxXValue ??
      Math.max(...flatData.map((d: ILineChartDatum) => d.time)) * 1.05,
    props.minXValue ?? 0
  );
  const xDomainTicks = xAxis?.tickCount || 10;

  const yDomain = getYDomain(
    props.maxYValue ??
      Math.max(...flatData.map((d: ILineChartDatum) => d.value)) * 1.05,
    props.minYValue ?? 0
  );
  const yDomainTicks = yAxis?.tickCount || 10;

  const bottomAxisRenderer = (axisRect: DOMRect, cc: ICCSizing) => {
    const zoom = cc.zooms.x;
    const xRange: D3Range = [0, axisRect.width];
    const xScale = getXScale(xDomain, xRange);

    return getXAxis(
      getTicks(xDomainTicks, xScale, zoom),
      xScale,
      props.dateMode,
      props.customDateConversion
    );
  };

  const leftAxisRenderer = (axisRect: DOMRect, cc: ICCSizing) => {
    const zoom = cc.zooms.y;
    const yRange: D3Range = [0, axisRect.height];
    const yScale = getYScale(yDomain, yRange);

    return getYAxis(
      yAxis,
      yScale,
      getTicks(yDomainTicks, yScale, zoom),
      axisRect
    );
  };

  const contentRenderer = (
    graphRect: DOMRect,
    cc: ICCSizing,
    mousePos?: MousePos
  ) => {
    const yRange: D3Range = [0, graphRect.height];
    const yScale = getYScale(yDomain, yRange);

    const xRange: D3Range = [0, graphRect.width];
    const xScale = getXScale(xDomain, xRange);

    const xTicks = getTicks(xDomainTicks, xScale, cc.zooms.x);
    const yTicks = getTicks(yDomainTicks, yScale, cc.zooms.y);

    return getContent(
      props,
      xTicks,
      xScale,
      yTicks,
      yScale,
      graphRect,
      mousePos,
      setYValues,
      props.dateMode,
      props.displayXValueInMouseOver
    );
  };

  const mouseoverRenderer = () =>
    !disableMouseTracking
      ? yValues.map((yValue, i) => (
          <MouseOver
            key={`Line-Mouseover-${i}`}
            shouldRender={true}
            location={{
              top: yValue.top,
              left: yValue.left,
            }}
            positionRelativeToTrigger='Center'
            horizontalSpaceAwayFromTrigger={10}
            verticalSpaceAwayFromTrigger={0}
            triggerPosition={{
              top: yValue.top,
              left: yValue.left,
            }}
            style={mouseOverStyle}
            portalTargetElement={props.mouseOverTargetElement}
          >
            {/* <div>
              {typeof yValue.value === 'number'
                ? yValue.value.toFixed(2)
                : yValue.value}
            </div> */}
            {props.customMouseOver ? (
              props.customMouseOver(`${yValue.value}`)
            ) : (
              <div>
                {typeof yValue.value === 'number'
                  ? yValue.value.toFixed(2)
                  : yValue.value}
              </div>
            )}
          </MouseOver>
        ))
      : null;

  const axisThickness = 80;

  return (
    <>
      <ChartContainer
        className={cn('ArcLineChart', props.className)}
        minZoom={1}
        maxZoom={2}
        minContentHeight={(props.minHeight || 240) - axisThickness}
        maxContentHeight={500}
        bottomAxisHeight={axisThickness}
        bottomAxisRenderer={bottomAxisRenderer}
        contentRenderer={contentRenderer}
        leftAxisRenderer={leftAxisRenderer}
        leftAxisWidth={axisThickness}
        absoluteHTMLRenderer={mouseoverRenderer}
        bottomAxisLabel={xAxis?.label}
        leftAxisLabel={yAxis?.label}
        legend={legend}
      />
    </>
  );
}
