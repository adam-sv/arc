// dependencies
import { useRef } from 'react';
// types
import type { ICoords } from '@adam-sv/arc';
import type { MutableRefObject } from 'react';
import type { ChartComponent, IChartContainerDOMRefs, IChartContainerProps, IDomWheelEvent } from './types';

const ccDefaults = {
  bottomAxisHeight: 100,
  leftAxisWidth: 100,
  rightAxisWidth: 100,
  topAxisHeight: 100,
  minZoom: 1,
  maxZoom: 8,
};

declare interface IChartContainerSizing {
  bottomAxisHeight: number;
  leftAxisWidth: number;
  rightAxisWidth: number;
  topAxisHeight: number;
}

declare type ScrollerFn = (nextScrollPos: number, chartComponent?: ChartComponent) => unknown;

// This function and its exclusive child fns are in development
// we should put this behind experimentalAutoZoom prop or similar
export function adjustCanvasPos(
  e: IDomWheelEvent,
  zoom: number,
  nextZoom: number,
  containerRef: HTMLDivElement,
  sizing: IChartContainerSizing,
  scrollLeft: number,
  scrollXAxis: ScrollerFn,
  scrollTop: number,
  scrollYAxis: ScrollerFn,
  shouldScrollXAxis: boolean,
  shouldScrollYAxis: boolean,
) {
  if (!containerRef) {
    console.warn('Bad lifecycle smell: containerRef missing in adjustCanvasPos');
    return;
  }

  const posInfo = getContentPosInfo(
    e,
    containerRef,
    sizing,
    scrollLeft,
    scrollTop,
    zoom,
  );

  const nextPosInfo = getContentPosInfo(
    e,
    containerRef,
    sizing,
    scrollLeft,
    scrollTop,
    nextZoom,
  );

  // the amount of "extra" pixels when zoom is > 0
  // therefore if you wanted to pin to the right, you would `scrollXAxis(extraPixels.width)`
  const extraPixels = getExtraPixels(posInfo);
  const nextExtraPixels = getExtraPixels(nextPosInfo);

  const nextScrolls = {
    x: (posInfo.contentLeftCoords / posInfo.contentWidth) * nextExtraPixels.width,
    y: (posInfo.contentTopCoords / posInfo.contentHeight) * nextExtraPixels.height,
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
  sizing: IChartContainerSizing,
  contentScrollLeft: number,
  contentScrollTop: number,
  zoom,
) {
  const rect = containerDiv.getBoundingClientRect();
  
  const posLeft = e.clientX - rect.x;
  const posTop = e.clientY - rect.y;

  const contentLeftPx = posLeft - sizing.leftAxisWidth;
  const contentTopPx = posTop - sizing.topAxisHeight;

  const contentLeftCoords = contentScrollLeft + (contentLeftPx * zoom);
  const contentTopCoords = contentScrollTop + (contentTopPx * zoom);

  const initialWidth = rect.width - sizing.leftAxisWidth - sizing.rightAxisWidth;
  const initialHeight = rect.height - sizing.topAxisHeight - sizing.bottomAxisHeight;

  const contentWidth =  initialWidth * zoom;
  const contentHeight = initialHeight * zoom;

  console.log({
    contentLeftPx,
    contentLeftCoords,
    contentWidth,
  });

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

export function getSizingOptions(props: IChartContainerProps): IChartContainerSizing {
  return {
    bottomAxisHeight: typeof props.bottomAxisRenderer === 'function'
      ? props.bottomAxisHeight || ccDefaults.bottomAxisHeight
      : 0,
    leftAxisWidth: typeof props.leftAxisRenderer === 'function'
      ? props.leftAxisWidth || ccDefaults.leftAxisWidth
      : 0,
    rightAxisWidth: typeof props.rightAxisRenderer === 'function'
      ? props.rightAxisWidth || ccDefaults.rightAxisWidth
      : 0,
    topAxisHeight: typeof props.topAxisRenderer === 'function'
      ? props.topAxisHeight || ccDefaults.topAxisHeight
      : 0,
  };
}

export function getZoomOptions(props: IChartContainerProps) {
  return {
    initialZoom: typeof props.initialZoomLevel === 'number' ? props.initialZoomLevel : 1,
    minZoom: typeof props.minZoom === 'number' ? props.minZoom : ccDefaults.minZoom,
    maxZoom: typeof props.maxZoom === 'number' ? props.maxZoom : ccDefaults.maxZoom,
  };
}

export function useChartContainerDOMRefs(): IChartContainerDOMRefs {
  const [top, right, bottom, left, content, container] = Array.from(new Array(6), () => useRef<HTMLDivElement>());
  return {
    top,
    right,
    bottom,
    left,
    content,
    container,
  };
}

export function scrollIfNotTarget(
  refs: IChartContainerDOMRefs,
  mouseTarget: MutableRefObject<ChartComponent>,
  chartComponent: ChartComponent,
  scrollDir: 'scrollLeft' | 'scrollTop',
  scrollPos: number,
) {
  if (refs[chartComponent].current && mouseTarget.current !== chartComponent)
    refs[chartComponent].current[scrollDir] = scrollPos;
}

export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}
