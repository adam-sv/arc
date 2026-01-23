// dependencies
import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
// internals
import { throttle, useForceRender } from '@adam-sv/arc';
// self
import {
  getDOMPositionFactory,
  getDOMSizeFactory,
  getSVGSizeFactory,
} from './factories';
import {
  useAxisSizing,
  useResponsiveDOMSizing,
  useSVGSizing,
  IChartAxisSizing,
  IChartDOMSizing,
  IChartSVGSizing,
} from './sizing';
// types
import type {
  ChartComponent,
  ChartSide,
  IChartConfiguration,
  ScrollableChartComponent,
} from '../types';
import { useZoomAndScrollState } from './zoomAndScroll';
import type { IChartZoomAndScrollState } from './zoomAndScroll';
// re-exports
export type {
  IChartAxisSizing,
  IChartDOMSizing,
  IChartSVGSizing,
  IChartZoomAndScrollState,
};

// We pass all the state & setters back, hopefully grouped by logic
export function useChartState(props: IChartConfiguration) {
  const forceRender = useForceRender();
  const refs = useComponentRefs();
  const axis = useAxisSizing(props);
  const dom = useResponsiveDOMSizing(refs, axis, forceRender);
  const zoomAndScroll = useZoomAndScrollState(refs, props, dom.content);
  const svg = useSVGSizing(zoomAndScroll, dom.content, props.contentSizing);
  const styles = useStylesForSizing(props, axis);
  // Accesses which are not simple should be wrapped with a "helper"
  const helpers = useHelpers(axis, dom, svg);
  const chartState = {
    forceRender,
    sizes: {
      axis,
      dom,
      svg,
    },
    refs,
    scroll: zoomAndScroll.scroll,
    zoom: zoomAndScroll.zoom,
    helpers,
    styles,
    // Is this a bad practice?
    props,
  };

  return chartState;
}
export type IChartState = ReturnType<typeof useChartState>;

function useHelpers(
  axis: IChartAxisSizing,
  dom: IChartDOMSizing,
  svg: IChartSVGSizing
) {
  const canResizeSide = axis.canResizeSide;
  const getDOMPosition = getDOMPositionFactory(axis);
  const getDOMSize = getDOMSizeFactory(axis, dom);
  const getSVGSize = getSVGSizeFactory(getDOMSize, axis, svg);

  return {
    canResizeSide,
    getDOMPosition,
    getDOMSize,
    getSVGSize,
  };
}

// CHART Components
export type ComponentRef = MutableRefObject<HTMLDivElement | null>;
export type ComponentRefs = Record<ScrollableChartComponent, ComponentRef>;
function useComponentRefs() {
  const refs: Partial<ComponentRefs> = useRef({}).current;
  allComponents.forEach((componentKey) => {
    const componentRef = useRef<HTMLDivElement>(null);
    refs[componentKey] = componentRef;
  });
  return refs as ComponentRefs;
}

// On the <ChartBase /> and <Content /> nodes, we need to specify these minHeights
// Otherwise, our Chart won't "make space" for itself, and needs height set explicitly
// Note we don't really help the user who fails to pass minContentHeight, but we make sure the axes show
function useStylesForSizing(
  props: IChartConfiguration,
  axis: IChartAxisSizing
): Record<'container' | 'content', CSSProperties> {
  const { minContentHeight, maxContentHeight } = props.contentSizing;
  const { top, bottom } = axis.sizes;

  let minContainerHeight = `${top + bottom}px`;
  if (minContentHeight)
    minContainerHeight = `calc(${minContainerHeight} + ${getValidStyle(
      minContentHeight
    )})`;

  let maxContainerHeight = undefined;
  if (maxContentHeight)
    maxContainerHeight = `calc(${minContainerHeight} + ${getValidStyle(
      maxContentHeight
    )})`;

  return {
    container: {
      minHeight: minContainerHeight,
      maxHeight: maxContainerHeight,
    },
    content: {
      minHeight: minContentHeight,
      maxHeight: maxContentHeight,
    },
  };
}

// Iterators for ease-of-use
export const chartSides: ChartSide[] = ['left', 'top', 'right', 'bottom'];
export const chartComponents: ChartComponent[] = [
  'container',
  'content',
  ...chartSides,
];
export const horizontalComponents: ChartComponent[] = [
  'top',
  'content',
  'bottom',
];
export const horizontalScrollableComponents: ScrollableChartComponent[] = [
  ...horizontalComponents,
  'top-floatingScroll',
  'bottom-floatingScroll',
];
export const verticalComponents: ChartComponent[] = [
  'left',
  'content',
  'right',
];
export const verticalScrollableCopmonents: ScrollableChartComponent[] = [
  ...verticalComponents,
  'left-floatingScroll',
  'right-floatingScroll',
];
export const scrollableComponents: ScrollableChartComponent[] = [
  'content',
  'top',
  'top-floatingScroll',
  'bottom',
  'bottom-floatingScroll',
  'left',
  'left-floatingScroll',
  'right',
  'right-floatingScroll',
];
export const allComponents: Array<ChartComponent | ScrollableChartComponent> = [
  'container',
  ...scrollableComponents,
];

// This is pretty unsafe
// If it's a string, we return it; we assume they passed `40vh` or `50px`
// If it's a number, we assume they were trying to do like 40 and therefore meant 40px
function getValidStyle(cssProperty: string | number) {
  return typeof cssProperty === 'string' ? cssProperty : `${cssProperty}px`;
}

declare type IScrollControls = Required<IChartConfiguration>['scrollControls'];
export function useScrollBridge(): IScrollControls {
  const [scrollLeft, setStateScrollLeft] = useState(0);
  const [scrollTop, setStateScrollTop] = useState(0);

  const onScrollUpdate = useCallback(
    throttle((left: number, top: number) => {
      setStateScrollLeft(left);
      setStateScrollTop(top);
    }, 50),
    []
  );

  return { left: scrollLeft, top: scrollTop, onScrollUpdate };
}

declare type IZoomControls = Required<IChartConfiguration>['zoomSettings'];
export function useZoomBridge(min?: number, max?: number): IZoomControls {
  const [zoom, setZoom] = useState(1);

  const onZoomUpdate = useCallback(
    throttle((zoom: number) => {
      setZoom(zoom);
    }, 50),
    []
  );

  return {
    value: zoom,
    min,
    max,
    onZoomUpdate,
  };
}
