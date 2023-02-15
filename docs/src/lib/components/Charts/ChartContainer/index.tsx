// dependencies
import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// internals
import {
  cn,
  throttle,
  useStateIterator,
  useStateThatRespondsToPropChanges,
} from '@adam-sv/arc';
import { ContentBackground, XAxis, YAxis } from './components';
import {
  adjustCanvasPos,
  clamp,
  doAllSizing,
  getZoomOptions,
  scrollIfNotTarget,
  useChartContainerDOMRefs,
  getSizingOptions,
  addMouseMoveListener,
  useLabelRefs,
} from './logic';
// style
import './style.scss';
// types
import type {
  ICCFitsOneDimensionSizing,
  ICCResponsiveSizing,
  ICCSizing,
  IChartContainerProps,
  IChartContainerSizeProps,
  IDomWheelEvent,
  ChartComponent,
} from './types';
import { MousePos } from '../types';

export type {
  ICCFitsOneDimensionSizing,
  ICCResponsiveSizing,
  ICCSizing,
  IChartContainerProps,
  IChartContainerSizeProps,
};

const defaultResizeBarThickness = 5;
const defaultAxisSize = 100;

export function ChartContainer(props: IChartContainerProps) {
  // process zoom options
  const { id, style } = props;
  const { minZoom, initialZoom, maxZoom } = getZoomOptions(props);
  const buttonZoomFactor = 1.25 * (props.zoomFactors?.button || 1);
  const pinchZoomFactor = props.zoomFactors?.pinch || 1;
  const scrollZoomFactor = props.zoomFactors?.scroll || 1;

  // manual throttled rerender helper
  const [forceRenderCounter, forceRerender] = useStateIterator(100);
  // we will track scroll state and manipulate via refs
  const refs = useChartContainerDOMRefs();
  const labelRefs = useLabelRefs();
  const plotAreaRef = useRef<SVGSVGElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [zoom, setZoom] = useState(initialZoom);

  const [managedLeftAxisWidth, setMLAW] = useStateThatRespondsToPropChanges(
    props.leftAxisWidth ?? defaultAxisSize
  );
  const [managedRightAxisWidth, setMRAW] = useStateThatRespondsToPropChanges(
    props.rightAxisWidth ?? defaultAxisSize
  );
  const [managedTopAxisHeight, setMTAH] = useStateThatRespondsToPropChanges(
    props.topAxisHeight ?? defaultAxisSize
  );
  const [managedBottomAxisHeight, setMBAH] = useStateThatRespondsToPropChanges(
    props.bottomAxisHeight ?? defaultAxisSize
  );

  useEffect(() => {
    if (props.zoom) {
      setZoom(props.zoom);
    }
  }, [props.zoom]);

  const resizeBarThickness =
    props.resizeBarThickness || defaultResizeBarThickness;
  const resizeBarLeftRightThickness = props.resizeLeftRightAxis
    ? resizeBarThickness
    : 0;
  const resizeBarTopBottomThickness = props.resizeTopBottomAxis
    ? resizeBarThickness
    : 0;

  const finalAxisSizes = {
    left: managedLeftAxisWidth,
    right:
      managedRightAxisWidth +
      resizeBarLeftRightThickness +
      (labelRefs.rightLabel.current?.clientWidth ?? 0),
    top: managedTopAxisHeight - resizeBarTopBottomThickness,
    bottom: managedBottomAxisHeight - resizeBarTopBottomThickness,
  };

  // SIZING
  const cc = doAllSizing(
    props,
    refs,
    zoom,
    finalAxisSizes.left,
    finalAxisSizes.right,
    finalAxisSizes.top,
    finalAxisSizes.bottom,
    resizeBarLeftRightThickness,
    resizeBarTopBottomThickness,
    labelRefs
  );
  const {
    // containerSize,
    chartSize,
    offset,
    sizing,
    viewBox,
    xAxisPixelWidth,
    yAxisPixelHeight,
    zooms,
    fullBackGroundOffset,
    fullBackGroundSize,
  } = cc;

  // this exists outside of React state, being a reference
  // but useLayoutEffect can look at this ref to see where the scroll came from
  const mouseTarget = useRef<ChartComponent | undefined>();
  const [mousePos, setMousePos] = useState<MousePos>();

  // to keep disparate "scroll" sections aligned, we manually useLayoutEffect when scrollLeft or scrollTop are updated
  // the "orthogonally" aligned
  const leftScrollers: ChartComponent[] = ['top', 'content', 'bottom'];
  const topScrollers: ChartComponent[] = ['left', 'content', 'right'];
  // update scrollLeft for top, content, bottom IF they exist & weren't scrolled
  useLayoutEffect(
    () =>
      leftScrollers.forEach((chartComponent) => {
        scrollIfNotTarget(
          refs,
          mouseTarget,
          chartComponent,
          'scrollLeft',
          scrollLeft
        );
      }),
    [scrollLeft]
  );
  // update scrollTop for left, content, right IF they exist & weren't scrolled
  useLayoutEffect(
    () =>
      topScrollers.forEach((chartComponent) => {
        scrollIfNotTarget(
          refs,
          mouseTarget,
          chartComponent,
          'scrollTop',
          scrollTop
        );
      }),
    [scrollTop]
  );

  useEffect(() => {
    //For some reason sometimes the math used to calcualte all the sizes
    //is out of sync with the rendering process or something. Adding this force
    //rerender prop gives it time to catch up.
    // setTimeout(() => {
    //   forceRerender();
    // }, 250);
    //TODO: figure out why we need this
  }, []);

  // shorthand scroll handlers for convenience
  function scrollXAxis(
    nextScrollLeft: number,
    chartComponent?: ChartComponent
  ) {
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
    if (nextScrollLeft !== scrollLeft) {
      setScrollLeft(nextScrollLeft);
    }
    if (nextScrollTop !== scrollTop) {
      setScrollTop(nextScrollTop);
    }
  }

  function startDrag(
    e: React.MouseEvent<HTMLDivElement>,
    position: 'left' | 'right' | 'top' | 'bottom'
  ) {
    const chartContainerNode = refs.container.current!;
    const domNode = e.nativeEvent.target as HTMLDivElement;
    domNode.classList.add('is-being-dragged');
    chartContainerNode.classList.add('is-resizing');

    addMouseMoveListener(
      (e) =>
        position === 'left'
          ? setMLAW((olaw) =>
              clamp(
                olaw + e.movementX,
                20,
                chartContainerNode.offsetWidth * 0.45
              )
            )
          : position === 'right'
          ? setMRAW((oraw) =>
              clamp(
                oraw - e.movementX,
                20,
                chartContainerNode.offsetWidth * 0.45
              )
            )
          : position === 'top'
          ? setMTAH((otaw) =>
              clamp(
                otaw + e.movementY,
                20,
                chartContainerNode.offsetHeight * 0.45
              )
            )
          : setMBAH((obaw) =>
              clamp(
                obaw - e.movementY,
                20,
                chartContainerNode.offsetWidth * 0.45
              )
            ),
      () => {
        domNode.classList.remove('is-being-dragged');
        chartContainerNode.classList.remove('is-resizing');
      }
    );
  }

  // ZOOM
  // onWheelCapture / 'wheel' event issue & example solution part 1: handler
  // also ensures the zoom pays attention to user mouse position and scrolls around!
  // we ALWAYS need to suppress the event but only at a throttled rate should we set the zoom
  function handleAllContainerWheel(e: IDomWheelEvent): void {
    // we might want to consider:
    // e.wheelDeltaY
    // altKey/ctrlKey/metaKey/shiftKey
    // wheel: false/false/true/false
    // pinch: false/true/false/false
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      onContainerWheel(e);
    }
  }
  function _onContainerWheel(e: IDomWheelEvent): void {
    let zoomFactor = (lastZoom: number) => 1;
    if (e.ctrlKey) {
      // pinch - values are large (~120)
      zoomFactor = (lastZoom: number) => {
        return (
          lastZoom +
          (typeof e.wheelDeltaY === 'number' ? e.wheelDeltaY : e.deltaY) *
            CHART_CONTAINER_PINCH_ZOOM_MULTIPLIER *
            pinchZoomFactor
        );
      };
    }
    if (e.metaKey) {
      // scroll wheel - values are small (~5-10)
      zoomFactor = (lastZoom: number) => {
        return (
          lastZoom -
          (typeof e.wheelDeltaY === 'number' ? e.wheelDeltaY : e.deltaY) *
            CHART_CONTAINER_SCROLL_ZOOM_MULTIPLIER *
            scrollZoomFactor
        );
      };
    }

    setZoom((lastZoom) => {
      const nextZoom = clamp(zoomFactor(lastZoom), minZoom, maxZoom);
      if (!refs.container.current) return nextZoom;

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
        !props.onlyZoomX
      );

      return nextZoom;
    });
  }
  const onContainerWheel = throttle(_onContainerWheel, 16);

  // TODO: can we abstract this into a special div? ZoomingDiv?
  // onWheelCapture / 'wheel' event issue & example solution part 2: attaching handler directly to DOM component
  // https://github.com/facebook/react/issues/14856#issuecomment-586781399
  useEffect(() => {
    // force rerender when the container is mounted (otherwise component cant do the math, maybe a lifecycle smell)
    forceRerender();

    // wheel workaround so I can call preventDefault
    if (refs.container.current) {
      refs.container.current.addEventListener('wheel', handleAllContainerWheel);
    }
  }, [refs.container.current]);

  // handle resizes automatically. I think it doesnt work very well today though
  useEffect(() => {
    window.addEventListener('resize', forceRerender);
    return () => window.removeEventListener('resize', forceRerender);
  }, []);

  const finalStyle: CSSProperties & {
    '--resizeBarThickness'?: string | number;
  } = { ...style };
  if (typeof sizing.minTotalHeight === 'number') {
    finalStyle.minHeight = sizing.minTotalHeight;
  }
  if (typeof sizing.maxTotalHeight === 'number') {
    finalStyle.maxHeight = sizing.maxTotalHeight;
  }
  if (!finalStyle['--resizeBarThickness']) {
    finalStyle['--resizeBarThickness'] = `${resizeBarThickness}px`;
  }

  return (
    <div className='ArcChartContainer-Container'>
      {props.topAxisLabel && (
        <div className='ArcChartContainer-bottomAxis-label'>
          {props.topAxisLabel}
        </div>
      )}
      <div
        className={cn(
          'ArcChartContainer',
          props.className,
          props.contentShowsScrollBars &&
            'ArcChartContainer-contentShowsScrollBars'
        )}
        id={id}
        ref={refs.container}
        style={finalStyle}
        key={`${refs.container.current?.getBoundingClientRect().width}`}
      >
        <div className='ArcChartContainer-scrollOverflowElement'>
          {/* ZOOM */}
          {maxZoom !== minZoom && !props.disableZoomControls && (
            <div className='ArcChartContainer-zoomButtons'>
              <div
                className='ArcChartContainer-zoomButtons-button'
                onClick={() => {
                  setZoom(clamp(zoom / buttonZoomFactor, minZoom, maxZoom));
                }}
              >
                &#8722;
              </div>
              <div
                className='ArcChartContainer-zoomButtons-button'
                onClick={() => {
                  setZoom(clamp(zoom * buttonZoomFactor, minZoom, maxZoom));
                }}
              >
                &#43;
              </div>
            </div>
          )}

          {/* LEFT AXIS */}
          {typeof props.leftAxisRenderer === 'function' ? (
            //Im not sure if this is the right approach but its all I could think of
            //to account for the height of the top axis;
            <div
              className='ArcChartContainer-leftAxis'
              style={
                props.topAxisRenderer
                  ? { marginTop: `${managedTopAxisHeight}px` }
                  : {}
              }
            >
              {props.leftAxisLabel && (
                <div
                  className='ArcChartContainer-leftAxis-label'
                  style={{ maxHeight: yAxisPixelHeight }}
                  ref={labelRefs.leftLabel}
                >
                  {props.leftAxisLabel}
                </div>
              )}
              <YAxis
                cc={cc}
                chartHeight={chartSize.height}
                contentHeight={yAxisPixelHeight}
                offset={offset}
                refs={refs}
                renderer={props.leftAxisRenderer}
                scrollYAxis={scrollYAxis}
                viewBox={viewBox.leftYAxis}
                width={finalAxisSizes.left}
                zoom={zooms.y}
              />
              {props.resizeLeftRightAxis && (
                <div
                  className='ArcChartContainer-leftAxis-resizeBar'
                  onMouseDown={(e) => startDrag(e, 'left')}
                  style={{
                    maxHeight: yAxisPixelHeight,
                  }}
                />
              )}
            </div>
          ) : null}

          {/* CONTENT COLUMN - top, bottom, & content */}
          <div
            className='content-column'
            style={{
              maxWidth: `calc(100% - ${
                props.leftAxisRenderer ? managedLeftAxisWidth : 0
              } - ${props.rightAxisRenderer ? managedRightAxisWidth : 0}px)`,
            }}
          >
            {/* TOP AXIS */}
            {typeof props.topAxisRenderer === 'function' ? (
              <>
                <XAxis
                  cc={cc}
                  chartWidth={chartSize.width}
                  contentWidth={xAxisPixelWidth}
                  height={finalAxisSizes.top}
                  offset={offset}
                  refs={refs}
                  renderer={props.topAxisRenderer}
                  scrollXAxis={scrollXAxis}
                  viewBox={viewBox.topXAxis}
                  zoom={zooms.x}
                />
                {props.resizeTopBottomAxis && (
                  <div
                    className='ArcChartContainer-topAxis-resizeBar'
                    onMouseDown={(e) => startDrag(e, 'top')}
                    style={{
                      maxWidth: xAxisPixelWidth,
                    }}
                  />
                )}
              </>
            ) : null}

            {/* CONTENT ALWAYS RENDERS */}
            <div
              className={cn('plot-area-container')}
              onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) =>
                scrollContent(
                  e.currentTarget.scrollLeft,
                  e.currentTarget.scrollTop
                )
              }
              // we don't set contentHeight because the ref determines contentHeight
              // this works better with CSS - "responds" to CSS settings
              ref={refs.content}
            >
              <svg
                className='plot-area-svg'
                style={{
                  minHeight: chartSize.height,
                  minWidth: chartSize.width,
                }}
                viewBox={viewBox.content}
                onMouseMove={(evt) => {
                  if (plotAreaRef.current) {
                    const e = plotAreaRef.current as SVGElement;
                    const dim = e.getBoundingClientRect();
                    setMousePos({
                      chartRelativeX: evt.clientX - dim.left,
                      chartRelativeY: evt.clientY - dim.top,
                      absoluteX: evt.clientX,
                      absoluteY: evt.clientY,
                    });
                  }
                }}
                preserveAspectRatio='none'
                onMouseLeave={() => setMousePos(undefined)}
                ref={plotAreaRef}
              >
                {/* PROVIDED CAPABILITIES */}
                <ContentBackground
                  chartSize={
                    props.gridFillsAvailableSpace
                      ? fullBackGroundSize
                      : chartSize
                  }
                  contentGridOptions={props.contentGridOptions}
                  // pass the "full" viewBox coordinate space here
                  offset={
                    props.gridFillsAvailableSpace
                      ? fullBackGroundOffset
                      : offset
                  }
                  zoom={zoom}
                />

                {/* USER CONTENT */}
                <g
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                  }}
                >
                  {props.contentRenderer(
                    chartSize,
                    cc,
                    mousePos ? mousePos : undefined
                  )}
                </g>
              </svg>
            </div>

            {/* BOTTOM AXIS */}
            {typeof props.bottomAxisRenderer === 'function' ? (
              <>
                {props.resizeTopBottomAxis && (
                  <div
                    className='ArcChartContainer-bottomAxis-resizeBar'
                    onMouseDown={(e) => startDrag(e, 'bottom')}
                    style={{
                      maxWidth: xAxisPixelWidth,
                    }}
                  />
                )}
                <XAxis
                  cc={cc}
                  chartWidth={chartSize.width}
                  contentWidth={xAxisPixelWidth}
                  height={finalAxisSizes.bottom}
                  offset={offset}
                  refs={refs}
                  renderer={props.bottomAxisRenderer}
                  scrollXAxis={scrollXAxis}
                  viewBox={viewBox.bottomXAxis}
                  zoom={zooms.x}
                />
              </>
            ) : null}
          </div>

          {/* RIGHT AXIS */}

          {typeof props.rightAxisRenderer === 'function' ? (
            <div
              className='ArcChartContainer-rightAxis'
              style={
                props.topAxisRenderer
                  ? { marginTop: `${managedTopAxisHeight}px` }
                  : {}
              }
            >
              {props.resizeLeftRightAxis && (
                <div
                  className='ArcChartContainer-rightAxis-resizeBar'
                  onMouseDown={(e) => startDrag(e, 'right')}
                  style={{
                    maxHeight: yAxisPixelHeight,
                  }}
                />
              )}
              <YAxis
                cc={cc}
                chartHeight={chartSize.height}
                contentHeight={yAxisPixelHeight}
                offset={offset}
                refs={refs}
                renderer={props.rightAxisRenderer}
                scrollYAxis={scrollYAxis}
                viewBox={viewBox.rightYAxis}
                width={finalAxisSizes.right}
                zoom={zooms.y}
              />
              {props.rightAxisLabel && (
                <div
                  className='ArcChartContainer-rightAxis-label'
                  style={{ maxHeight: yAxisPixelHeight }}
                  ref={labelRefs.rightLabel}
                >
                  {props.rightAxisLabel}
                </div>
              )}
            </div>
          ) : null}
        </div>
        {props.absoluteHTMLRenderer && (
          <div className='ArcChartContainer-absoluteHTMLContent'>
            {props.absoluteHTMLRenderer()}
          </div>
        )}
      </div>
      {props.bottomAxisLabel && (
        <div className='ArcChartContainer-bottomAxis-label'>
          {props.bottomAxisLabel}
        </div>
      )}
      {props.legend && (
        <div className='ArcChartContainer-legend'>
          {props.legend.map((key, i) => {
            return (
              <div
                className={cn(
                  'ArcChartContainer-legend-item',
                  key.className ?? ''
                )}
                key={key.label + i}
              >
                {key.icon ?? (
                  <div
                    className='ArcChartContainer-legend-symbol'
                    style={key.color ? { background: key.color } : {}}
                  ></div>
                )}
                <div>{key.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const CHART_CONTAINER_PINCH_ZOOM_MULTIPLIER = 0.0003;
const CHART_CONTAINER_SCROLL_ZOOM_MULTIPLIER = 0.005;
