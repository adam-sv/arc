// dependencies
import { useRef } from 'react';
// types
import type { MutableRefObject } from 'react';
import type {
  ChartComponent,
  ICCSizing,
  IChartContainerDerivedSizes,
  IChartContainerDOMRefs,
  IChartContainerProps,
  IDomWheelEvent,
} from './types';
import type { IChartContainerSizeProps, ICoords } from '@adam-sv/arc';

const ccDefaults = {
  bottomAxisHeight: 100,
  leftAxisWidth: 100,
  rightAxisWidth: 100,
  topAxisHeight: 100,
  minZoom: 1,
  maxZoom: 8,
};

declare type ScrollerFn = (
  nextScrollPos: number,
  chartComponent?: ChartComponent
) => unknown;

// This function and its exclusive child fns are in development
// we should put this behind experimentalAutoZoom prop or similar
// Works well zooming in
// works poorly zooming out
export function adjustCanvasPos(
  e: IDomWheelEvent,
  zoom: number,
  nextZoom: number,
  containerRef: HTMLDivElement,
  sizing: IChartContainerDerivedSizes,
  scrollLeft: number,
  scrollXAxis: ScrollerFn,
  scrollTop: number,
  scrollYAxis: ScrollerFn,
  shouldScrollXAxis: boolean,
  shouldScrollYAxis: boolean
) {
  if (!containerRef) {
    console.warn(
      'Bad lifecycle smell: containerRef missing in adjustCanvasPos'
    );
    return;
  }

  const posInfo = getContentPosInfo(
    e,
    containerRef,
    sizing,
    scrollLeft,
    scrollTop,
    zoom
  );

  const nextPosInfo = getContentPosInfo(
    e,
    containerRef,
    sizing,
    scrollLeft,
    scrollTop,
    nextZoom
  );

  // the amount of "extra" pixels when zoom is > 0
  // therefore if you wanted to pin to the right, you would `scrollXAxis(extraPixels.width)`
  const extraPixels = getExtraPixels(posInfo);
  const nextExtraPixels = getExtraPixels(nextPosInfo);

  const nextScrolls = {
    x:
      (posInfo.contentLeftCoords / posInfo.contentWidth) *
      nextExtraPixels.width,
    y:
      (posInfo.contentTopCoords / posInfo.contentHeight) *
      nextExtraPixels.height,
  };

  if (shouldScrollXAxis && nextScrolls.x != scrollLeft) {
    scrollXAxis(nextScrolls.x);
  }
  if (shouldScrollYAxis && nextScrolls.y != scrollTop) {
    scrollYAxis(nextScrolls.y);
  }
}

function getExtraPixels(posInfo: PosInfo) {
  return {
    width: posInfo.contentWidth - posInfo.initialWidth,
    height: posInfo.contentHeight - posInfo.initialHeight,
  };
}

declare type PosInfo = ReturnType<typeof getContentPosInfo>;

function getContentPosInfo(
  e: IDomWheelEvent,
  containerDiv: HTMLDivElement,
  sizing: IChartContainerDerivedSizes,
  contentScrollLeft: number,
  contentScrollTop: number,
  zoom: number
) {
  const rect = containerDiv.getBoundingClientRect();

  const posLeft = e.clientX - rect.x;
  const posTop = e.clientY - rect.y;

  const contentLeftPx = posLeft - sizing.leftAxisWidth;
  const contentTopPx = posTop - sizing.topAxisHeight;

  const contentLeftCoords = contentScrollLeft + contentLeftPx * zoom;
  const contentTopCoords = contentScrollTop + contentTopPx * zoom;

  const initialWidth =
    rect.width - sizing.leftAxisWidth - sizing.rightAxisWidth;
  const initialHeight =
    rect.height - sizing.topAxisHeight - sizing.bottomAxisHeight;

  const contentWidth = initialWidth * zoom;
  const contentHeight = initialHeight * zoom;

  return {
    contentLeftPx,
    contentTopPx,
    contentLeftCoords,
    contentTopCoords,
    initialWidth,
    initialHeight,
    contentWidth,
    contentHeight,
  };
}

export function getZoomOptions(props: IChartContainerProps) {
  return {
    initialZoom: typeof props.zoom === 'number' ? props.zoom : 1,
    minZoom:
      typeof props.minZoom === 'number' ? props.minZoom : ccDefaults.minZoom,
    maxZoom:
      typeof props.maxZoom === 'number' ? props.maxZoom : ccDefaults.maxZoom,
  };
}

export function useChartContainerDOMRefs(): IChartContainerDOMRefs {
  const [top, right, bottom, left, content, container] = Array.from(
    new Array(6),
    () => useRef<HTMLDivElement | null>(null)
  );
  return {
    top,
    right,
    bottom,
    left,
    content,
    container,
  };
}

export function useLabelRefs() {
  const [leftLabel, rightLabel] = Array.from(new Array(2), () =>
    useRef<HTMLDivElement | null>(null)
  );
  return {
    leftLabel,
    rightLabel,
  };
}

export function scrollIfNotTarget(
  refs: IChartContainerDOMRefs,
  mouseTarget: MutableRefObject<ChartComponent | undefined>,
  chartComponent: ChartComponent,
  scrollDir: 'scrollLeft' | 'scrollTop',
  scrollPos: number
) {
  if (refs[chartComponent].current && mouseTarget.current !== chartComponent) {
    refs[chartComponent].current![scrollDir] = scrollPos;
  }
}

export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

// <svg viewBox="x y width height" />
export type SVGViewBoxAttribute = string;

// it's not ideal this is all tied up, but it is all closely related
export function doAllSizing(
  props: IChartContainerProps,
  refs: IChartContainerDOMRefs,
  zoom: number,
  managedLeftAxisWidth: number,
  managedRightAxisWidth: number,
  managedTopAxisHeight: number,
  managedBottomAxisHeight: number,
  resizeBarLeftRightThickness: number,
  resizeBarTopBottomThickness: number,
  labelRefs: Record<
    'leftLabel' | 'rightLabel',
    MutableRefObject<HTMLDivElement | null>
  >
): ICCSizing {
  const initialZoom = props.zoom || 1;

  const ccs: ICCSizing = {
    chartSize: new DOMRect(),
    containerSize: new DOMRect(),
    // this helps us factor in padding & to center the chart when we have more pixel space than coordinate space
    offset: {
      x: 0,
      y: 0,
    },
    sizing: {
      bottomAxisHeight:
        typeof props.bottomAxisRenderer === 'function'
          ? managedBottomAxisHeight + resizeBarTopBottomThickness
          : 0,
      leftAxisWidth:
        typeof props.leftAxisRenderer === 'function'
          ? managedLeftAxisWidth +
            resizeBarLeftRightThickness +
            (labelRefs.leftLabel.current?.clientWidth ?? 0)
          : 0,
      rightAxisWidth:
        typeof props.rightAxisRenderer === 'function'
          ? managedRightAxisWidth +
            resizeBarLeftRightThickness +
            (labelRefs.rightLabel.current?.clientWidth ?? 0)
          : 0,
      topAxisHeight:
        typeof props.topAxisRenderer === 'function'
          ? managedTopAxisHeight + resizeBarTopBottomThickness
          : 0,
    },
    zooms: {
      x: props.onlyZoomY ? initialZoom : zoom,
      y: props.onlyZoomX ? initialZoom : zoom,
    },
    xAxisPixelWidth: 0,
    yAxisPixelHeight: 0,
    viewBox: {
      pixelHeight: 0,
      pixelWidth: 0,
      content: '0 0 0 0',
      topXAxis: '0 0 0 0',
      bottomXAxis: '0 0 0 0',
      rightYAxis: '0 0 0 0',
      leftYAxis: '0 0 0 0',
      responsiveContent: '0 0 0 0',
    },
    fullBackGroundOffset: { x: 0, y: 0 },
    fullBackGroundSize: new DOMRect(),
  };
  if (!refs.container.current) {
    return ccs;
  }

  // minimum sizes
  const horizontalAxisSize =
    ccs.sizing.leftAxisWidth + ccs.sizing.rightAxisWidth;
  const verticalAxisSize =
    ccs.sizing.bottomAxisHeight + ccs.sizing.topAxisHeight;
  if (props.minContentHeight) {
    ccs.sizing.minTotalHeight = props.minContentHeight + verticalAxisSize;
  }
  if (props.maxContentHeight) {
    ccs.sizing.maxTotalHeight = props.maxContentHeight + verticalAxisSize;
  }

  // container sizing first
  ccs.containerSize = refs.container.current.getBoundingClientRect();

  // we know how big the axes are in pixels now
  ccs.xAxisPixelWidth = getXAxisPixelWidth(ccs.containerSize, ccs.sizing);

  ccs.yAxisPixelHeight = getYAxisPixelHeight(ccs.containerSize, ccs.sizing);

  // let's compute the coordinateSpace at 1 zoom next
  const coordSpaceAt1Zoom: Partial<ICoords> = {
    x: undefined,
    y: undefined,
  };
  if (props.sizing?.mode === 'responsive') {
    coordSpaceAt1Zoom.x = props.sizing.coordinateSpace.width;
    coordSpaceAt1Zoom.y = props.sizing.coordinateSpace.height;
  } else if (props.sizing?.mode === 'fits-height') {
    coordSpaceAt1Zoom.x = props.sizing.controlledCoordinateSpaceSize;
  } else if (props.sizing?.mode === 'fits-width') {
    coordSpaceAt1Zoom.y = props.sizing.controlledCoordinateSpaceSize;
  }

  // using default coordinateSpace, compute chart size before scaling & scaling factors
  // this considers provided coordinate options, DOM space available in the content ref, zoom props, etc.
  // padding only applies in 'responsive' mode and is a bit poorly done
  const padding = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  };
  if (props.sizing?.mode === 'responsive' && props.sizing.padding) {
    const { bottom, left, right, top } = props.sizing.padding;
    padding.width += left + right;
    padding.height += top + bottom;
    padding.top = top;
    padding.left = left;
  }
  const chartWidthBeforeScale =
    (coordSpaceAt1Zoom.x || ccs.xAxisPixelWidth) + padding.width;
  const chartHeightBeforeScale =
    (coordSpaceAt1Zoom.y || ccs.yAxisPixelHeight) + padding.height;
  const scaleFactors: ICoords = {
    x: ccs.zooms.x,
    y: ccs.zooms.y,
  };
  if (props.sizing?.mode === 'responsive') {
    // matchSizeAtDefaultZoomTo === 'pixelSpace' is our default behavior
    let scaleFactor = 1;
    if (props.sizing.matchSizeAtDefaultZoomTo === 'width') {
      scaleFactor = ccs.xAxisPixelWidth / (coordSpaceAt1Zoom.x || 1);
    } else if (props.sizing.matchSizeAtDefaultZoomTo === 'height') {
      scaleFactor = ccs.yAxisPixelHeight / (coordSpaceAt1Zoom.y || 1);
    }
    if (scaleFactor !== 1) {
      scaleFactors.x *= scaleFactor;
      scaleFactors.y *= scaleFactor;
    }
  } else if (props.sizing?.mode === 'fits-height') {
    if (props.sizing.stretchToFillControlledDimension) {
      if (chartWidthBeforeScale < ccs.xAxisPixelWidth) {
        scaleFactors.x *= ccs.xAxisPixelWidth / chartWidthBeforeScale;
      }
    }
  } else if (props.sizing?.mode === 'fits-width') {
    if (props.sizing.stretchToFillControlledDimension) {
      if (chartHeightBeforeScale < ccs.yAxisPixelHeight) {
        scaleFactors.y *= ccs.yAxisPixelHeight / chartHeightBeforeScale;
      }
    }
  }
  ccs.chartSize = new DOMRect(
    -1 * padding.left * scaleFactors.x,
    -1 * padding.top * scaleFactors.y,
    chartWidthBeforeScale * scaleFactors.x,
    chartHeightBeforeScale * scaleFactors.y
  );

  // compute offsets

  if (ccs.chartSize.width < ccs.xAxisPixelWidth) {
    ccs.offset.x =
      (ccs.xAxisPixelWidth - ccs.chartSize.width) / 2 + padding.left;
  }
  if (ccs.chartSize.height < ccs.yAxisPixelHeight) {
    ccs.offset.y =
      (ccs.yAxisPixelHeight - ccs.chartSize.height) / 2 + padding.top;
  }

  // viewBox
  const vb = {
    pixelWidth: Math.max(
      ccs.chartSize.width,
      ccs.containerSize.width - horizontalAxisSize
    ),
    pixelHeight: Math.max(
      ccs.chartSize.height,
      ccs.containerSize.height - verticalAxisSize
    ),
    left: Math.min(0, ccs.offset.x + ccs.chartSize.left), // chartSize.left is negative when padding used
    top: Math.min(0, ccs.offset.y + ccs.chartSize.top), // chartSize.top is negative when padding used
  };

  ccs.viewBox = {
    // content: 'x y width height',
    content: `${vb.left} ${vb.top} ${vb.pixelWidth} ${vb.pixelHeight}`,
    // xAxis: 'x 0 width provided?',
    topXAxis: `${vb.left} 0 ${vb.pixelWidth} ${
      ccs.sizing.topAxisHeight -
      (props.resizeTopBottomAxis ? resizeBarTopBottomThickness : 0)
    }`,
    bottomXAxis: `${vb.left} 0 ${vb.pixelWidth} ${
      ccs.sizing.bottomAxisHeight -
      (props.resizeTopBottomAxis ? resizeBarTopBottomThickness : 0)
    }`,
    // yAxis: '0 y provided? height',
    leftYAxis: `0 ${vb.top} ${
      ccs.sizing.leftAxisWidth -
      (props.resizeLeftRightAxis ? resizeBarLeftRightThickness : 0) -
      (labelRefs.leftLabel.current?.clientWidth ?? 0)
    } ${vb.pixelHeight}`,
    rightYAxis: `0 ${vb.top} ${
      ccs.sizing.rightAxisWidth -
      (props.resizeLeftRightAxis ? resizeBarLeftRightThickness : 0) -
      (labelRefs.rightLabel.current?.clientWidth ?? 0)
    } ${vb.pixelHeight}`,
    pixelWidth: vb.pixelWidth,
    pixelHeight: vb.pixelHeight,
    responsiveContent: `0 0 ${ccs.chartSize.width} ${ccs.chartSize.height}`,
  };

  const fullBackGroundSize = new DOMRect(
    vb.left,
    vb.top,
    vb.pixelWidth,
    vb.pixelHeight
  );

  ccs.fullBackGroundSize = fullBackGroundSize;
  return ccs;
}

export function getSizingOptions(
  props: IChartContainerProps
): IChartContainerDerivedSizes {
  return {
    bottomAxisHeight:
      typeof props.bottomAxisRenderer === 'function'
        ? props.bottomAxisHeight || ccDefaults.bottomAxisHeight
        : 0,
    leftAxisWidth:
      typeof props.leftAxisRenderer === 'function'
        ? props.leftAxisWidth || ccDefaults.leftAxisWidth
        : 0,
    rightAxisWidth:
      typeof props.rightAxisRenderer === 'function'
        ? props.rightAxisWidth || ccDefaults.rightAxisWidth
        : 0,
    topAxisHeight:
      typeof props.topAxisRenderer === 'function'
        ? props.topAxisHeight || ccDefaults.topAxisHeight
        : 0,
  };
}

export function addMouseMoveListener(
  mouseMoveFn: (e: MouseEvent) => unknown,
  afterMouseUpAction?: () => unknown
) {
  function handleMouseUp() {
    document.removeEventListener('mousemove', mouseMoveFn);
    document.removeEventListener('mouseup', handleMouseUp);

    if (typeof afterMouseUpAction === 'function') {
      afterMouseUpAction();
    }
  }

  document.addEventListener('mousemove', mouseMoveFn);
  document.addEventListener('mouseup', handleMouseUp);
}

// later, if we allow wider axes than the content, we can do it seamlessly here
function getXAxisPixelWidth(
  containerSize: DOMRect,
  sizing: IChartContainerDerivedSizes
) {
  return containerSize.width - sizing.leftAxisWidth - sizing.rightAxisWidth;
}
function getYAxisPixelHeight(
  containerSize: DOMRect,
  sizing: IChartContainerDerivedSizes
) {
  return containerSize.height - sizing.topAxisHeight - sizing.bottomAxisHeight;
}
