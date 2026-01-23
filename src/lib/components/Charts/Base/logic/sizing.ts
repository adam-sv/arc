// dependencies
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { NumberUtils, throttle } from '@adam-sv/arc';
// logic
import { chartSides } from '.';
import type { ComponentRefs, IChartZoomAndScrollState } from '.';
// types
import type {
  ChartSide,
  IChartConfiguration,
  IChartContentSizeProps,
} from '../types';

// window types > NodeJS types
const { clearTimeout, setTimeout } = window;

// AXIS Sizes
export function useAxisSizing({ axisSettings = {} }: IChartConfiguration) {
  const { preventResize, sizes, minimumSizes, maximumSizes } = axisSettings;
  const sizes_: Partial<Record<ChartSide, number>> = {};
  const setters_: Partial<
    Record<ChartSide, React.Dispatch<React.SetStateAction<number>>>
  > = {};
  const constraints_: Partial<Record<ChartSide, { min: number; max: number }>> =
    {};

  // for each side, track its size
  chartSides.forEach((side) => {
    const min = minimumSizes?.[side] ?? 0;
    const max = maximumSizes?.[side] ?? Infinity;
    const [size, setSize] = useState(() =>
      NumberUtils.clamp(sizes?.[side] ?? 0, min, max)
    );
    sizes_[side] = size;
    setters_[side] = setSize;
    constraints_[side] = { min, max };

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
    constraints: constraints_ as Record<
      ChartSide,
      { min: number; max: number }
    >,
  };
}
export type IChartAxisSizing = ReturnType<typeof useAxisSizing>;

// SVG Sizing
// TODO: this function should determine HOW BIG the SVGs are
// Remember: making huge SVGs is our mechanism for enabling scroll
export function useSVGSizing(
  zoomAndScroll: IChartZoomAndScrollState,
  contentNodeDOMSize: { height: number; width: number },
  contentSizing: IChartContentSizeProps
) {
  const { zoom } = zoomAndScroll;
  const { axes, currentZoom } = zoom;
  const { mode } = contentSizing;

  // Compute zoom factors
  let xScaleFactor = 1;
  let yScaleFactor = 1;
  if (axes?.includes('x') && mode !== 'fits-height') xScaleFactor = currentZoom;
  if (axes?.includes('y') && mode !== 'fits-width') yScaleFactor = currentZoom;

  // Compute the range
  let chartContentWidth = contentNodeDOMSize.width;
  let chartContentHeight = contentNodeDOMSize.height;
  if (mode === 'fits-height') {
    // height is immutable; width can be made LARGER
    chartContentWidth = Math.max(
      chartContentWidth,
      contentSizing.controlledDimensionSize
    );
  } else if (mode === 'fits-width') {
    // width is immutable; height can be made LARGER
    chartContentHeight = Math.max(
      chartContentHeight,
      contentSizing.controlledDimensionSize
    );
  } else if (mode === 'responsive') {
    // everything can be larger
    chartContentWidth = Math.max(
      chartContentWidth,
      contentSizing.coordinateSpace.width
    );
    chartContentHeight = Math.max(
      chartContentHeight,
      contentSizing.coordinateSpace.height
    );
  }
  let xRange = chartContentWidth * xScaleFactor;
  let yRange = chartContentHeight * yScaleFactor;

  if (mode === 'responsive' && contentSizing.fillMaxSpace) {
    // if the scaled svg is smaller than the avaliable dom space then we assign its size to the avalaiable dom space
    xRange = Math.max(xRange, contentNodeDOMSize.width);
    yRange = Math.max(yRange, contentNodeDOMSize.height);
  }

  return {
    xScaleFactor,
    yScaleFactor,
    xRange,
    yRange,
  };
}
export type IChartSVGSizing = ReturnType<typeof useSVGSizing>;

// Responsive & reactive to sizing changes
export function useResponsiveDOMSizing(
  refs: ComponentRefs,
  axis: IChartAxisSizing,
  forceRender: () => unknown
) {
  const forceTimeoutTracker = useRef<number>(undefined);
  const [container, setContainer] = useState(new DOMRect());
  const handleResize = useCallback(
    throttle(([entry]: ResizeObserverEntry[]) => {
      setContainer(entry.contentRect || new DOMRect());
    }, 100),
    []
  );
  const resizeObserver = useRef(new ResizeObserver(handleResize));
  // disconnect the observer when unmounted
  useEffect(
    () => () => {
      resizeObserver.current.disconnect();
    },
    []
  );
  // listen to the ArcChart parent DOM node
  const containerDOMNode = refs.container.current;
  if (containerDOMNode) resizeObserver.current.observe(containerDOMNode);
  else {
    // if we just re-rendered, we can avoid the force
    // For instance the initial render double-renders with the "ref" setting
    if (forceTimeoutTracker.current) clearTimeout(forceTimeoutTracker.current);
    forceTimeoutTracker.current = setTimeout(forceRender, 100);
  }
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
