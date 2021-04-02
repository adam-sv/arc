// dependencies
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// internals
import { cn, useStateIterator } from '@adam-sv/arc';
import { XAxis, YAxis } from './components';
import { adjustCanvasPos, clamp, getSizingOptions, getZoomOptions, scrollIfNotTarget, useChartContainerDOMRefs } from './logic';
// style
import './style.css';
// types
export type { IChartContainerProps };
import type { ChartComponent, IChartContainerProps, IDomWheelEvent } from './types';


export function ChartContainer(props: IChartContainerProps) {
  const { isFullHeight, contentHeight } = props;
  const { minZoom, initialZoom, maxZoom } = getZoomOptions(props);
  const sizing = getSizingOptions(props);

  // manual rerender helper
  const iterator = useStateIterator()[1];
  // we will track scroll state and manipulate via refs
  const refs = useChartContainerDOMRefs();
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [zoom, setZoom] = useState(initialZoom);
  // this exists outside of React state, being a reference
  // but useLayoutEffect can look at this ref to see where the scroll came from
  const mouseTarget = useRef<ChartComponent | undefined>();

  // to keep disparate "scroll" sections aligned, we manually useLayoutEffect when scrollLeft or scrollTop are updated
  // the "orthogonally" aligned 
  const leftScrollers:ChartComponent[] = ['top', 'content', 'bottom'];
  const topScrollers:ChartComponent[] = ['left', 'content', 'right'];
  // update scrollLeft for top, content, bottom IF they exist & weren't scrolled
  useLayoutEffect(() => leftScrollers.forEach((chartComponent) => {
    scrollIfNotTarget(refs, mouseTarget, chartComponent, 'scrollLeft', scrollLeft);
  }), [scrollLeft]);
  // update scrollTop for left, content, right IF they exist & weren't scrolled
  useLayoutEffect(() => topScrollers.forEach((chartComponent) => {
    scrollIfNotTarget(refs, mouseTarget, chartComponent, 'scrollTop', scrollTop);
  }), [scrollTop]);
  // shorthand scroll handlers for convenience
  function scrollXAxis(nextScrollLeft: number, chartComponent?: ChartComponent) {
    mouseTarget.current = chartComponent;
    setScrollLeft(nextScrollLeft);
  }
  function scrollYAxis(nextScrollTop: number, chartComponent?: ChartComponent) {
    mouseTarget.current = chartComponent;
    setScrollTop(nextScrollTop);
  }
  // only content scrolls two directions
  function scrollContent(nextScrollLeft: number, nextScrollTop: number) {
    mouseTarget.current = 'content';
    if (nextScrollLeft !== scrollLeft) { setScrollLeft(nextScrollLeft); }
    if (nextScrollTop !== scrollTop) { setScrollTop(nextScrollTop); }
  }
  // onWheelCapture / 'wheel' event issue & example solution part 1: handler
  // also ensures the zoom pays attention to user mouse position and scrolls around!
  function onContainerWheel(e: IDomWheelEvent): void {
    if (e.ctrlKey || e.metaKey) {
      setZoom(lastZoom => {
        const nextZoom = clamp(lastZoom + (e.deltaY * 0.05), minZoom, maxZoom);

        // side effect is questionable yet quite effective
        // I would expect to have similar perf / timings to useLayoutEffect version with easier access to both zooms
        adjustCanvasPos(
          e,
          lastZoom,
          nextZoom,
          refs.container.current,
          sizing,
          scrollLeft,
          scrollXAxis,
          scrollTop,
          scrollYAxis,
          !props.onlyZoomY,
          !props.onlyZoomX,
        );

        return nextZoom;
      });
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // do some math on the sizing
  let containerSize = new DOMRect();
  let chartSize = new DOMRect();
  if (refs.container.current) {
    // containerSize is the DOMRect for the container
    containerSize = refs.container.current.getBoundingClientRect();
    // chartSize is the DOMRect for the content section
    chartSize = new DOMRect(
      containerSize.x + sizing.leftAxisWidth,
      containerSize.y + sizing.topAxisHeight,
      containerSize.width - sizing.leftAxisWidth - sizing.rightAxisWidth,
      containerSize.height - sizing.bottomAxisHeight - sizing.topAxisHeight,
    );
  }

  // onWheelCapture / 'wheel' event issue & example solution part 2: attaching handler directly to DOM component
  // https://github.com/facebook/react/issues/14856#issuecomment-586781399
  useEffect(() => {
    // force rerender when the container is mounted (otherwise component cant do the math, maybe a lifecycle smell)
    iterator();

    // wheel workaround so I can call preventDefault
    if (refs.container.current) {
      refs.container.current.addEventListener('wheel', onContainerWheel);
    }
  }, [refs.container.current]);

  // handle resizes automatically. I think it doesnt work very well today though
  useEffect(() => {
    window.addEventListener('resize', iterator);
    return () => window.removeEventListener('resize', iterator);
  }, []);

  return (
    <div
      className={cn("ArcChartContainer", props.className)}
      ref={refs.container}
      style={isFullHeight
        ? { minHeight: sizing.bottomAxisHeight + props.contentHeight + sizing.topAxisHeight }
        : null
      }
    >
      <div className="ArcChartContainer-scrollOverflowElement">
        <div className="ArcChartContainer-zoomButtons">
          <div
            className="ArcChartContainer-zoomButtons-button"
            onClick={() => setZoom(clamp(zoom / 1.25, minZoom, maxZoom))}
          >&#8722;</div>
          <div
            className="ArcChartContainer-zoomButtons-button"
            onClick={() => setZoom(clamp(zoom * 1.25, minZoom, maxZoom))}
          >&#43;</div>
        </div>
        {typeof props.leftAxisRenderer === 'function'
          ? <YAxis
              chartHeight={chartSize.height}
              contentHeight={contentHeight}
              refs={refs}
              renderer={props.leftAxisRenderer}
              scrollYAxis={scrollYAxis}
              width={sizing.leftAxisWidth}
              zoom={props.onlyZoomX ? initialZoom : zoom}
            />
          : null
        }
        <div
          className="content-column"
          style={{ maxWidth: `calc(100% - ${sizing.leftAxisWidth}px)`}}
        >
          {/* we use a "column" since top, bottom, & content are aligned */}
          {typeof props.topAxisRenderer === 'function'
            ? <XAxis
                height={sizing.topAxisHeight}
                refs={refs}
                renderer={props.topAxisRenderer}
                scrollXAxis={scrollXAxis}
                width={chartSize.width}
                zoom={props.onlyZoomY ? initialZoom : zoom}
              />
            : null
          }
          <div
            className="plot-area-container"
            onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) =>
              scrollContent(e.currentTarget.scrollLeft, e.currentTarget.scrollTop)
            }
            ref={refs.content}
          >
            <svg
              className="plot-area-svg"
              style={{
                height: `${contentHeight}px`,
                width: `${zoom * chartSize.width}px`
              }}
              viewBox={`0 0 ${chartSize.width * zoom} ${contentHeight}`}
            >
              {props.contentRenderer(
                new DOMRect(
                  0,
                  0,
                  props.onlyZoomY ? chartSize.width * initialZoom : chartSize.width * zoom,
                  props.onlyZoomX ? contentHeight * initialZoom : contentHeight * zoom,
                ),
                zoom,
              )}
            </svg>
          </div>
          {typeof props.bottomAxisRenderer === 'function'
            ? <XAxis
                height={sizing.bottomAxisHeight}
                refs={refs}
                renderer={props.bottomAxisRenderer}
                scrollXAxis={scrollXAxis}
                width={chartSize.width}
                zoom={props.onlyZoomY ? initialZoom : zoom}
              />
            : null
          }
        </div>
        {typeof props.rightAxisRenderer === 'function'
          ? <YAxis
              chartHeight={chartSize.height}
              contentHeight={contentHeight}
              refs={refs}
              renderer={props.rightAxisRenderer}
              scrollYAxis={scrollYAxis}
              width={sizing.rightAxisWidth}
              zoom={props.onlyZoomX ? initialZoom : zoom}
            />
          : null
        }
      </div>
    </div>
  );
}
