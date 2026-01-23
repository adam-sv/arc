// dependencies
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  NumberUtils,
  throttle,
  useEffectWithPreviousValue,
  useStateThatRespondsToPropChanges,
} from '@adam-sv/arc';
// logic
import {
  horizontalScrollableComponents,
  verticalScrollableCopmonents,
} from '.';
import type { ComponentRefs } from '.';
// types
import type { ChartComponent, IChartConfiguration } from '../types';

const DEFAULT_MIN_ZOOM = 0.01;
const DEFAULT_MAX_ZOOM = 100;

// Zoom logic
export function useZoomAndScrollState(
  refs: ComponentRefs,
  { scrollControls, zoomSettings }: IChartConfiguration,
  contentSize: {
    height: number;
    width: number;
  }
) {
  const minZoom = useMemo(
    () => zoomSettings?.min || DEFAULT_MIN_ZOOM,
    [zoomSettings]
  );
  const maxZoom = useMemo(
    () => zoomSettings?.max || DEFAULT_MAX_ZOOM,
    [zoomSettings]
  );

  const clampZoom = useCallback(
    (zoom: number) => NumberUtils.clamp(zoom, minZoom, maxZoom),
    [minZoom, maxZoom]
  );

  /*
   * Zoom State
   */
  const [zoomFactor, setZoomFactor] = useStateThatRespondsToPropChanges(
    zoomSettings?.value || 1
  ); // 0 is meant to be illegal here, surely?

  const zoomIn = useCallback(
    (exponent = 1) => {
      setZoomFactor(clampZoom(zoomFactor * Math.pow(1.02, exponent)));
    },
    [zoomFactor, clampZoom, setZoomFactor]
  );

  const zoomOut = useCallback(
    (exponent = 1) => {
      setZoomFactor(clampZoom(zoomFactor / Math.pow(1.02, exponent)));
    },
    [zoomFactor, setZoomFactor, clampZoom]
  );

  const zoomState = {
    currentZoom: zoomFactor,
    setZoom: (zoom: number) => {
      setZoomFactor(clampZoom(zoom));
    },
    axes: zoomSettings?.axes,
    min: minZoom,
    max: maxZoom,
    zoomIn,
    zoomOut,
  };

  /*
   * Scroll state
   */

  // bind scroll listener on content

  const throttledWheelZoom = throttle((ev: WheelEvent) => {
    if (ev.deltaY < 0) {
      setZoomFactor((zoomFactor) => clampZoom(zoomFactor / 1.05));
    } else {
      setZoomFactor((zoomFactor) => clampZoom(zoomFactor * 1.05));
    }
  }, 50);

  useEffect(() => {
    if (refs.content.current) {
      refs.content.current.addEventListener('wheel', (ev: WheelEvent) => {
        if (eventHasModifierKeyPressed(ev)) {
          ev.preventDefault();
          void throttledWheelZoom(ev);
        }
      });
    }
  }, []);

  const [scrollLeft, setStateScrollLeft] = useState(0);
  const [scrollTop, setStateScrollTop] = useState(0);

  const setScrollTop = (top: number) => {
    // do the DOM updates
    verticalScrollableCopmonents.forEach((componentKey) => {
      const target = refs[componentKey].current;
      if (target && target.scrollTop !== top) {
        target.scrollTop = top;
      }
    });
    // set the state
    setStateScrollTop(top);
  };

  const setScrollLeft = (left: number) => {
    // do the DOM updates
    horizontalScrollableComponents.forEach((componentKey) => {
      const target = refs[componentKey].current;
      if (target && target.scrollLeft !== left) {
        target.scrollLeft = left;
      }
    });
    // set the state
    setStateScrollLeft(left);
  };

  const horizontalScrollHandler = useCallback((e: React.UIEvent) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  }, []);

  const verticalScrollHandler = useCallback((e: React.UIEvent) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const contentScrollHandler = useCallback(
    (e: React.UIEvent) => {
      horizontalScrollHandler(e);
      verticalScrollHandler(e);
    },
    [horizontalScrollHandler, verticalScrollHandler]
  );

  const scrollState = {
    scrollValues: {
      scrollLeft,
      setScrollLeft,
      scrollTop,
      setScrollTop,
    },
    scrollHandlers: {
      top: horizontalScrollHandler,
      bottom: horizontalScrollHandler,
      left: verticalScrollHandler,
      right: verticalScrollHandler,
      content: contentScrollHandler,
      container: () => null, // type issue
    } as Record<ChartComponent, (e: React.UIEvent) => unknown>,
  };

  useEffectWithPreviousValue(
    (currentZoom, previousZoom) => {
      // when current zoom updates
      if (currentZoom !== previousZoom) {
        // by what factor has our zoom changed?
        const changeInZoom = currentZoom / previousZoom;

        // how much must we offset by to preserve the center of the viewport?
        const viewportCenter = {
          x: (contentSize.width || 0) / 2,
          y: (contentSize.height || 0) / 2,
        };
        const xOffset = viewportCenter.x * (changeInZoom - 1);
        const yOffset = viewportCenter.y * (changeInZoom - 1);

        // change scroll by the same factor
        scrollState.scrollValues.setScrollLeft(
          changeInZoom * scrollState.scrollValues.scrollLeft + xOffset
        );

        scrollState.scrollValues.setScrollTop(
          changeInZoom * scrollState.scrollValues.scrollTop + yOffset
        );

        if (zoomSettings?.onZoomUpdate) zoomSettings.onZoomUpdate(currentZoom);
      }
    },
    zoomFactor,
    useLayoutEffect
  );

  // Update the scrollControls
  useLayoutEffect(() => {
    scrollControls?.onScrollUpdate?.(scrollLeft, scrollTop);
  }, [scrollLeft, scrollTop, scrollControls?.onScrollUpdate]);
  // Update from scrollControls
  useLayoutEffect(() => {
    if (typeof scrollControls?.left === 'number')
      setScrollLeft(scrollControls.left);
    if (typeof scrollControls?.top === 'number')
      setScrollTop(scrollControls.top);
  }, [scrollControls?.left, scrollControls?.top]);

  return { zoom: zoomState, scroll: scrollState };
}

export type IChartZoomAndScrollState = ReturnType<typeof useZoomAndScrollState>;

// "Modifier" = "ctrl/cmd"
export function eventHasModifierKeyPressed(e: WheelEvent) {
  return Boolean(e.ctrlKey || e.metaKey);
}
