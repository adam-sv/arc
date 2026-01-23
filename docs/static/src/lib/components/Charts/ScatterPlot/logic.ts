import { scaleLinear } from 'd3';
import { useChartState } from '@adam-sv/arc';
import { IScatterPlotDatum, IScatterPlotProps } from '.';
import { useMemo, useState } from 'react';

export function useScatterPlotLogic<T>(props: IScatterPlotProps<T>) {
  // Mouseover state - custom renderer from user required
  const [mouseInfo, setMouseInfo] = useState<{
    left: number;
    top: number;
    bar: IScatterPlotDatum<T>;
  }>();

  // 1. Compute Domain
  const { xDomain, yDomain } = useMemo(() => {
    if (!props.data.length)
      return {
        xDomain: { min: 0, max: 1 },
        yDomain: { min: 0, max: 1 },
      };

    const xDomain = { max: -Infinity, min: Infinity };
    const yDomain = { max: -Infinity, min: Infinity };

    props.data.forEach(({ x, y }) => {
      if (x < xDomain.min) xDomain.min = x;
      if (x > xDomain.max) xDomain.max = x;
      if (y < yDomain.min) yDomain.min = y;
      if (y > yDomain.max) yDomain.max = y;
    });

    const xDomainSize = xDomain.max - xDomain.min;
    const yDomainSize = yDomain.max - yDomain.min;
    const xOffset = props.domainPadding?.x || xDomainSize / 10;
    const yOffset = props.domainPadding?.y || yDomainSize / 10;
    xDomain.min -= xOffset;
    xDomain.max += xOffset;
    yDomain.min -= yOffset;
    yDomain.max += yOffset;

    xDomain.min = Math.max(xDomain.min, 0);
    yDomain.min = Math.max(yDomain.min, 0);

    return { xDomain, yDomain };
  }, [props.data]);

  // 2. Compute ticks & therefore "true" domain
  const minContentHeight = props.minHeight || 200;

  // 2. Compute chart state
  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: 50,
        bottom: 50,
      },
    },
    contentSizing: {
      mode: 'fits-width',
      controlledDimensionSize: minContentHeight,
      minContentHeight,
      maxContentHeight: minContentHeight,
    },
  });

  const xNumTicks = Math.min(8, xDomain.max - xDomain.min);
  const xScale = scaleLinear([0, chartState.sizes.svg.xRange]).domain([
    xDomain.min,
    xDomain.max,
  ]);
  // .range([0, chartState.sizes.svg.xRange]);

  const yNumTicks = minContentHeight / 25;
  const yScale = scaleLinear([chartState.sizes.svg.yRange, 0]).domain([
    yDomain.min,
    yDomain.max,
  ]);
  // .range([chartState.sizes.svg.yRange, 0]);

  // TODO: abstract this, I guess?
  const colorScale = scaleLinear(['red', 'yellow', 'green']).domain([
    0, 50, 100,
  ]);

  function getMouseoverHandlers(
    d: IScatterPlotDatum<T>
  ): Partial<React.SVGProps<SVGRectElement>> {
    return {
      onMouseEnter: (e) => {
        // TS why you do this to me? maybe I need new DOM lib bindings
        const target = (e.target as HTMLElement).getBoundingClientRect();
        setMouseInfo({
          left: target.left + target.width,
          top: target.top,
          bar: d,
        });
      },
      onMouseOut: () => setMouseInfo(undefined),
    };
  }

  return {
    chartState,
    data: props.data,
    mouseInfo,
    colorScale,
    xScale,
    yScale,
    x: { ticks: xScale.ticks(xNumTicks).map(xScale) },
    y: { ticks: yScale.ticks(yNumTicks).map(yScale) },
    getMouseoverHandlers,
  };
}
