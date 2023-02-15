import { IChartAxisSizing, IChartDOMSizing, IChartSVGSizing } from '.';
import { ChartComponent } from '../types';

export function getDOMSizeFactory(
  axis: IChartAxisSizing,
  dom: IChartDOMSizing
) {
  return (component: ChartComponent) => {
    let height = 0;
    let width = 0;
    if (component === 'content') {
      height = dom.content.height;
      width = dom.content.width;
    } else if (component === 'left' || component === 'right') {
      width = axis.sizes[component];
      height = dom.content.height;
    } else if (component === 'top' || component === 'bottom') {
      width = dom.content.width;
      height = axis.sizes[component];
    }
    return { width, height };
  };
}

export function getDOMPositionFactory(axis: IChartAxisSizing) {
  return (component: ChartComponent) => {
    let xKey = 'left';
    let xVal = 0;
    let yKey = 'top';
    let yVal = 0;

    const { top, left } = axis.sizes;
    if (component === 'content') {
      xVal = left;
      yVal = top;
    } else if (component === 'top') {
      xVal = left;
    } else if (component === 'right') {
      xKey = 'right';
      yVal = top;
    } else if (component === 'bottom') {
      xVal = left;
      yKey = 'bottom';
    } else if (component === 'left') {
      yVal = top;
    }
    return {
      [xKey]: xVal ?? 0,
      [yKey]: yVal ?? 0,
    };
  };
}

export function getSVGSizeFactory(
  getDOMSize: ReturnType<typeof getDOMSizeFactory>,
  svg: IChartSVGSizing
) {
  return (component: ChartComponent) => {
    const size = getDOMSize(component);

    let xScaleFactor = 1;
    let yScaleFactor = 1;
    if (component === 'content') {
      xScaleFactor = svg.xScaleFactor;
      yScaleFactor = svg.yScaleFactor;
    } else if (component === 'top' || component === 'bottom') {
      xScaleFactor = svg.xScaleFactor;
    } else if (component === 'left' || component === 'right') {
      yScaleFactor = svg.yScaleFactor;
    }

    return {
      height: size.height * yScaleFactor,
      width: size.width * xScaleFactor,
    };
  };
}
