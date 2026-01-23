import { IChartAxisSizing, IChartDOMSizing, IChartSVGSizing } from '.';
import { ChartComponent, ChartSide } from '../types';

export function getDOMSizeFactory(
  axis: IChartAxisSizing,
  dom: IChartDOMSizing
) {
  const { top, right, left, bottom } = axis.sizes;
  const extraHeight = top + bottom;
  const extraWidth = left + right;

  return function getDOMSize(component: ChartComponent, fitContent?: boolean) {
    let height = 0;
    let width = 0;
    if (component === 'content') {
      height = dom.content.height;
      width = dom.content.width;
    } else if (component === 'left' || component === 'right') {
      width = axis.sizes[component];
      height = dom.content.height + (fitContent ? 0 : extraHeight);
    } else if (component === 'top' || component === 'bottom') {
      width = dom.content.width + (fitContent ? 0 : extraWidth);
      height = axis.sizes[component];
    }
    return { width, height };
  };
}

export function getDOMPositionFactory(axis: IChartAxisSizing) {
  return function getDOMPosition(
    component: ChartComponent,
    fitContent?: boolean
  ): Partial<Record<ChartSide, number>> {
    let xKey: 'left' | 'right' = 'left';
    let xVal = 0;
    let yKey: 'top' | 'bottom' = 'top';
    let yVal = 0;

    const { top, left } = axis.sizes;
    if (component === 'content') {
      xVal = left;
      yVal = top;
    } else if (component === 'top') {
      // already goes at (0, 0), unless aligning with content
      if (fitContent) xVal = left;
    } else if (component === 'right') {
      xKey = 'right';
      if (fitContent) yVal = top;
    } else if (component === 'bottom') {
      yKey = 'bottom';
      if (fitContent) xVal = left;
    } else if (component === 'left') {
      // already goes at (0, 0), unless aligning with content
      if (fitContent) yVal = top;
    }
    return {
      [xKey]: xVal ?? 0,
      [yKey]: yVal ?? 0,
    };
  };
}

export function getSVGSizeFactory(
  getDOMSize: ReturnType<typeof getDOMSizeFactory>,
  axis: IChartAxisSizing,
  svg: IChartSVGSizing
) {
  const xZoomingComponents = ['top', 'bottom', 'content'];
  const yZoomingComponents = ['left', 'right', 'content'];
  // EXPERIMENTAL TODO: is this really the right approach?
  // Approach: we want to tell them the size of the SVG they render
  // However, for non-content components, we also want to use ViewBox shenanigans so if the axis overflows (i.e. some text)
  // or is zoomed, it scrolls past the edge of the visible content
  // To do this, we need to figure out:
  // - how big our DOM parent is
  // - how much non-content SVG space we'll have available
  // - what the corresponding viewBox should be
  return function getSVGSize(
    component: ChartComponent,
    fitContent?: boolean
  ): { width: number; height: number; viewBox?: string } {
    const domSize = getDOMSize(component, fitContent);
    let height = domSize.height;
    let width = domSize.width;

    let xScaleFactor = 1;
    let yScaleFactor = 1;

    if (xZoomingComponents.includes(component)) {
      xScaleFactor = svg.xScaleFactor;
      width = svg.xRange;
    }
    if (yZoomingComponents.includes(component)) {
      yScaleFactor = svg.yScaleFactor;
      height = svg.yRange;
    }

    // height and width, once scaled, accurately represent how big our SVG's DOM node is
    // Note if fitContent is false, this may be incorrect and require adjustment
    // AC: The scale facotrs were already being applied before this point applying them again compunded them...
    const svgSize = {
      height: height,
      //  * yScaleFactor,
      width: width,
      //  * xScaleFactor,
    };

    // if it's the content, we're done - it can by definition never have too much space
    // fitContent true also implies we dont need to make adjustments
    if (['content', 'container'].includes(component) || fitContent)
      return svgSize;

    // fitContent is false - we want to know: how much non-content space do we have?
    // first, we need to know how big the content viewport is
    // if contentDomSize is non-viewable, we don't really need to waste time on math
    const contentDomSize = getDOMSize('content');
    if (contentDomSize.width < 1 || contentDomSize.height < 1) return svgSize;

    // we are doing math on one of the sides; we want to know if it will "grow" / scroll in the Height or Width dimension
    const overflowDimension = ['left', 'right'].includes(component)
      ? 'height'
      : 'width';
    const otherDimension = overflowDimension === 'width' ? 'height' : 'width';
    const isVerticalOverflow = overflowDimension === 'height';

    // we need to compute:
    // * negative space (starting gutter)
    // * positive space (ending gutter)
    // * coordinate space (content)
    // * viewBox (if we have negative or positive space)
    let negativeSpace = 0;
    let contentSpace = 0;
    let positiveSpace = 0;
    const { top, right, bottom, left } = axis.sizes;

    if (isVerticalOverflow) {
      negativeSpace = top;
      contentSpace = svg.yRange;
      positiveSpace = bottom;
    } else {
      negativeSpace = left;
      contentSpace = svg.xRange;
      positiveSpace = right;
    }

    // compute the final size
    const finalSVGSize = {
      [overflowDimension]:
        svgSize[overflowDimension] + negativeSpace + positiveSpace,
      [otherDimension]: svgSize[otherDimension],
    };

    // compute the final viewbox
    // in the Content space, the viewbox is `0 0 ${svg.xRange} ${svg.yRange}`
    // Here, we add negative coordinates for our negativeSpace, and extend the size by enough to account for positiveSpace
    // This means drawing into the content space (0, xRange), (0, yRange) will look right here, but you can allow text to go negative or positive without clipping :)
    const viewBox = {
      [overflowDimension]: {
        start: -1 * negativeSpace,
        size: finalSVGSize[overflowDimension],
      },
      [otherDimension]: {
        start: 0,
        size: finalSVGSize[otherDimension],
      },
    };
    const finalViewBox = `${viewBox.width.start} ${viewBox.height.start} ${viewBox.width.size} ${viewBox.height.size}`;

    return {
      width: finalSVGSize.width,
      height: finalSVGSize.height,
      viewBox: finalViewBox,
    };
  };
}
