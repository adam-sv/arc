// dependencies
import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
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
// types
import type { ChartComponent, ChartSide, IChartBaseProps } from '../types';

// We pass all the state & setters back, hopefully grouped by logic
export function useChartState(props: IChartBaseProps) {
  const forceRender = useForceRender();
  const axis = useAxisSizing(props);
  const refs = useComponentRefs();
  const dom = useResponsiveDOMSizing(refs, axis, forceRender);
  const scroll = useScrollState(refs);
  const zoom = useZoomState(props, scroll);
  const svg = useSVGSizing(zoom);
  const helpers = useHelpers(axis, dom, svg);
  const styles = useStylesForSizing(props, axis);

  const chartState = {
    forceRender,
    sizes: {
      axis,
      dom,
      svg,
    },
    refs,
    scroll,
    zoom,
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
  svg: { xScaleFactor: number; yScaleFactor: number }
) {
  const canResizeSide = axis.canResizeSide;
  const getDOMPosition = getDOMPositionFactory(axis);
  const getDOMSize = getDOMSizeFactory(axis, dom);
  const getSVGSize = getSVGSizeFactory(getDOMSize, svg);

  return {
    canResizeSide,
    getDOMPosition,
    getDOMSize,
    getSVGSize,
  };
}

// AXIS Sizes
function useAxisSizing({ axisSettings = {} }: IChartBaseProps) {
  const { preventResize, sizes } = axisSettings;
  // keep TS happy
  const sizes_: Partial<Record<ChartSide, number>> = {};
  const setters_: Partial<
    Record<ChartSide, React.Dispatch<React.SetStateAction<number>>>
  > = {};
  // for each side, track its size
  chartSides.forEach((side) => {
    const [size, setSize] = useState(sizes?.[side] ?? 0);
    sizes_[side] = size;
    setters_[side] = setSize;

    // any time a side size changes in props, update the axis size in code
    useLayoutEffect(() => {
      setSize((last) => sizes?.[side] ?? last ?? 0);
    }, [sizes?.[side] ?? 0]);
  });

  const canResizeSide = useCallback(
    (side: ChartSide) => {
      if (!preventResize) return true;
      if (typeof preventResize === 'boolean') return !preventResize;
      return !preventResize.has(side);
    },
    [preventResize]
  );

  return {
    canResizeSide,
    sizes: sizes_ as Record<ChartSide, number>,
    setters: setters_ as Record<
      ChartSide,
      React.Dispatch<React.SetStateAction<number>>
    >,
  };
}
export type IChartAxisSizing = ReturnType<typeof useAxisSizing>;

// CHART Components
type ComponentRef = MutableRefObject<HTMLDivElement | null>;
type ComponentRefs = Record<ChartComponent, ComponentRef>;
function useComponentRefs() {
  const refs: Partial<ComponentRefs> = useRef({}).current;
  chartComponents.forEach((componentKey) => {
    const componentRef = useRef<HTMLDivElement>(null);
    refs[componentKey] = componentRef;
  });
  return refs as ComponentRefs;
}

// Responsive & reactive to sizing changes
function useResponsiveDOMSizing(
  refs: ComponentRefs,
  axis: IChartAxisSizing,
  forceRender: () => unknown
) {
  const [container, setContainer] = useState(new DOMRect());
  const handleResize = useCallback(
    throttle(([entry]: ResizeObserverEntry[]) => {
      setContainer(entry?.contentRect || new DOMRect());
    }, 100),
    []
  );
  const resizeObserver = useRef(new ResizeObserver(handleResize));
  // disconnect the observer when unmounted
  useEffect(() => () => resizeObserver.current.disconnect(), []);
  // listen to the ArcChart parent DOM node
  const containerDOMNode = refs.container.current;
  if (containerDOMNode) resizeObserver.current.observe(containerDOMNode);
  else setTimeout(forceRender, 100);
  // derive the content size based on current axis sizing
  const { left, right, top, bottom } = axis.sizes;
  return {
    container,
    content: {
      width: Math.max(container.width - left - right, 0),
      height: Math.max(container.height - top - bottom, 0),
    },
  };
}
export type IChartDOMSizing = ReturnType<typeof useResponsiveDOMSizing>;

// Scroll logic
function useScrollState(refs: ComponentRefs) {
  // 2 approaches are available - function-only, or state & effect
  // we could use this for effect
  // const [scrollLeft, setScrollLeft] = useState(0);
  // const [scrollTop, setScrollTop] = useState(0);
  // const mouseTarget = useRef<ChartComponent | null>(null);
  // Whenever a scroll changes, update its comrades
  // useLayoutEffect(() => {});

  // let's try a functional / callback approach
  // No state involved!
  const horizontalScrollHandler = useCallback(
    (e: React.UIEvent) => {
      const { scrollLeft } = e.currentTarget || {};
      horizontalComponents.forEach((componentKey) => {
        const target = refs[componentKey].current;
        if (
          target &&
          target.scrollLeft !== scrollLeft &&
          target !== e.currentTarget
        )
          target.scrollLeft = scrollLeft;
      });
    },
    [refs]
  );

  const verticalScrollHandler = useCallback(
    (e: React.UIEvent) => {
      const { scrollTop } = e.currentTarget || {};
      verticalComponents.forEach((componentKey) => {
        const target = refs[componentKey].current;
        if (
          target &&
          target.scrollTop !== scrollTop &&
          target !== e.currentTarget
        )
          target.scrollTop = scrollTop;
      });
    },
    [refs]
  );

  const contentScrollHandler = useCallback(
    (e: React.UIEvent) => {
      horizontalScrollHandler(e);
      verticalScrollHandler(e);
    },
    [horizontalScrollHandler, verticalScrollHandler, refs.content]
  );

  return {
    scrollHandlers: {
      top: horizontalScrollHandler,
      bottom: horizontalScrollHandler,
      left: verticalScrollHandler,
      right: verticalScrollHandler,
      content: contentScrollHandler,
      container: () => null, // type issue
    } as Record<ChartComponent, (e: React.UIEvent) => unknown>,
  };
}
export type IScrollState = ReturnType<typeof useScrollState>;

// Zoom logic
function useZoomState(
  { zoomSettings }: IChartBaseProps,
  scrollState: IScrollState
) {
  const [currentZoom, setZoom] = useState(zoomSettings?.value || 1); // 0 is meant to be illegal here, surely?

  const zoomIn = useCallback((exponent: number = 1) => {
    setZoom((last) => last * Math.pow(1.02, exponent));
  }, []);
  const zoomOut = useCallback((exponent: number = 1) => {
    setZoom((last) => last / Math.pow(1.02, exponent));
  }, []);

  return {
    currentZoom,
    setZoom,
    axes: zoomSettings?.axes,
    min: zoomSettings?.min || 0.01,
    max: zoomSettings?.max || 100,
    zoomIn,
    zoomOut,
  };
}
export type IZoomState = ReturnType<typeof useZoomState>;

// SVG Sizing
function useSVGSizing(zoom: IZoomState) {
  const { axes, currentZoom } = zoom;
  if (!axes) {
    // shortcut?
  }

  let xScaleFactor = 1;
  let yScaleFactor = 1;
  if (axes?.includes('x')) xScaleFactor = currentZoom;
  if (axes?.includes('y')) yScaleFactor = currentZoom;

  return {
    xScaleFactor,
    yScaleFactor,
  };
}
export type IChartSVGSizing = ReturnType<typeof useSVGSizing>;

function useStylesForSizing(
  props: IChartBaseProps,
  axis: IChartAxisSizing
): Record<'container' | 'content', CSSProperties> {
  const { minContentHeight, maxContentHeight } = props.contentSizing;
  const { top, bottom } = axis.sizes;

  let minContainerHeight = `${top + bottom}px`;
  let maxContainerHeight = undefined;
  if (minContentHeight)
    minContainerHeight = `calc(${minContainerHeight} + ${minContentHeight})`;
  if (maxContentHeight)
    maxContainerHeight = `calc(${minContainerHeight} + ${maxContainerHeight})`;

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
export const verticalComponents: ChartComponent[] = [
  'left',
  'content',
  'right',
];
