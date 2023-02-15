// dependencies
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// internals
import { throttle, useStateIterator } from '@adam-sv/arc';
// types
import type { ChartComponent, ChartSide, IChartBaseProps } from './types';

export function useChartState(props: IChartBaseProps) {
  const forceRender = useStateIterator()[1];
  const refs = useComponentRefs();
  const axis = useAxisSizing(props);
  const dom = useResponsiveDOMSizing(refs, axis, forceRender);
  const zoom = useZoomState(props);

  return {
    forceRender,
    sizes: {
      axis,
      content: dom.content,
      container: dom.container,
    },
    refs,
    zoom,
    // Maybe deprecate these
    axis,
    domSizes: dom,
    props, // Not intended for direct usage, maybe shouldn't be included
  };
}
export type IChartState = ReturnType<typeof useChartState>;

function useAxisSizing({
  axisContainerSizes,
  preventAxisResize,
}: IChartBaseProps) {
  const [sizes, setSizes] = useState({
    top: axisContainerSizes?.top ?? 0,
    right: axisContainerSizes?.right ?? 0,
    bottom: axisContainerSizes?.bottom ?? 0,
    left: axisContainerSizes?.left ?? 0,
  });

  // any time a side size changes in props, update the axis size in code
  chartSides.forEach((side) => {
    useLayoutEffect(() => {
      setSizes((last) => {
        last[side] = axisContainerSizes?.[side] ?? last[side] ?? 0;
        return last;
      });
    }, [axisContainerSizes?.[side] ?? 0]);
  });

  const setSizeBySide = useCallback(
    (side: ChartSide, size: number) =>
      setSizes((last) => ({ ...last, [side]: size })),
    []
  );

  const canResizeSide = useCallback(
    (side: ChartSide) => {
      if (!preventAxisResize) return true;
      if (typeof preventAxisResize === 'boolean') return !preventAxisResize;
      return !preventAxisResize.has(side);
    },
    [preventAxisResize]
  );

  return {
    canResizeSide,
    sizes,
    setSizes,
    setSizeBySide,
  };
}
export type IChartAxisSizing = ReturnType<typeof useAxisSizing>;

type ComponentRef = MutableRefObject<HTMLDivElement | null>;
type ComponentRefs = Record<ChartComponent, ComponentRef>;
function useComponentRefs() {
  const refs: Partial<ComponentRefs> = {};
  chartComponents.forEach((componentKey) => {
    const componentRef = useRef<HTMLDivElement>(null);
    refs[componentKey] = componentRef;
  });
  return refs as ComponentRefs;
}

// TODO: should user be able to decide throttle rate?
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

function useZoomState({ zoomSettings }: IChartBaseProps) {
  const [currentZoom, setZoom] = useState(zoomSettings?.value || 1); // 0 is meant to be illegal here, surely

  const zoomIn = useCallback((exponent: number = 1) => {
    setZoom((last) => last * Math.pow(1.02, exponent));
  }, []);
  const zoomOut = useCallback((exponent: number = 1) => {
    setZoom((last) => last / Math.pow(1.02, exponent));
  }, []);

  return {
    currentZoom,
    setZoom,
    min: zoomSettings?.min || 0.01,
    max: zoomSettings?.max || 100,
    zoomIn,
    zoomOut,
  };
}

// Easy iterators
export const chartSides: ChartSide[] = ['left', 'top', 'right', 'bottom'];
export const chartComponents: ChartComponent[] = [
  'container',
  'content',
  ...chartSides,
];
