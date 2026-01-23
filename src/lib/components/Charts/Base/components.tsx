// dependencies
import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useContext,
} from 'react';
// self
import './style.scss';
// internals
import {
  ChartComponentContext,
  ChartContext,
  cn,
  Droppable,
  getClipPathPolygon,
  ResizeBar,
  ChartSyncedScrollBar,
} from '@adam-sv/arc';
// types
import type {
  ChartComponent,
  ChartSide,
  IBoxSize,
  IChartComponentProps,
  IChartSideProps,
  IChartState,
  ICoords,
  RenderableContent,
  IChartAxisSizing,
  ClipTypes,
} from '@adam-sv/arc';

export type SVGRenderableContent = RenderableContent;
export interface IChartSVGRendererProps {
  children: SVGRenderableContent;
  className?: string;
  component: ChartComponent;
  domRef?: MutableRefObject<SVGSVGElement | null>;
  height: number;
  width: number;
  viewBox?: string;
}

export function SVGRenderer({
  children,
  className,
  component,
  domRef,
  height,
  width,
  viewBox,
}: IChartSVGRendererProps) {
  return (
    <svg
      className={cn(
        'ArcChart-SVGRenderer',
        `ArcChart-SVGRenderer-${component}`,
        className
      )}
      ref={domRef}
      style={{
        width,
        height,
      }}
      viewBox={viewBox || `0 0 ${width} ${height}`}
    >
      {children}
    </svg>
  );
}

export function Content({
  className,
  children,
  id,
  showScrollBars = false,
  style,
  onContextMenu,
  onDrop,
}: IChartComponentProps) {
  const component = 'content';
  const chartState = useContext(ChartContext);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!chartState) return;
      const position = calculateCoordinateSpacePosition(e, chartState);
      onContextMenu?.(e, position);
    },
    [onContextMenu, chartState]
  );
  const handleDrop = useCallback(
    (
      data: string,
      e: React.DragEvent<HTMLDivElement>,
      dragStartPosition: ICoords
    ) => {
      if (!chartState || !onDrop) return null;
      const position = calculateCoordinateSpacePosition(e, chartState);
      const adjustedPosition = {
        x: position.x - dragStartPosition.x,
        y: position.y - dragStartPosition.y,
      };
      onDrop(e, adjustedPosition, data, chartState);
    },
    [onDrop, chartState]
  );

  if (!chartState) return null;

  const { helpers, refs, scroll, styles } = chartState;
  const domPosition = helpers.getDOMPosition(component);
  const domSize = helpers.getDOMSize(component);
  const svgSize = helpers.getSVGSize(component);

  const svgContent = (
    <SVGRenderer
      component={component}
      height={svgSize.height}
      width={svgSize.width}
      viewBox={svgSize.viewBox}
    >
      {children}
    </SVGRenderer>
  );

  return (
    <ChartComponentContext.Provider
      value={{
        component,
        domPosition,
        domSize,
        svgSize,
      }}
    >
      <div
        className={cn(
          'ArcChart-Component',
          'ArcChart-Component-content',
          className
        )}
        onContextMenu={handleContextMenu}
        onScroll={scroll.scrollHandlers.content}
        ref={refs.content}
        id={id}
        style={{
          ...style,
          ...domPosition,
          ...domSize,
          ...styles.content,
        }}
      >
        {onDrop && (
          <Droppable
            onDrop={handleDrop}
            style={{ height: svgSize.height, width: svgSize.width }}
          >
            {svgContent}
          </Droppable>
        )}
        {!onDrop && svgContent}
      </div>
      {showScrollBars && (
        <>
          <ChartSyncedScrollBar
            domRef={refs[`right-floatingScroll`]}
            intendedContentSide='right'
          />
          <ChartSyncedScrollBar
            domRef={refs[`bottom-floatingScroll`]}
            intendedContentSide='bottom'
          />
        </>
      )}
    </ChartComponentContext.Provider>
  );
}

export function Left(props: IChartSideProps) {
  return <ChartSideComponent side='left' {...props} />;
}

export function Top(props: IChartSideProps) {
  return <ChartSideComponent side='top' {...props} />;
}

export function Right(props: IChartSideProps) {
  return <ChartSideComponent side='right' {...props} />;
}

export function Bottom(props: IChartSideProps) {
  return <ChartSideComponent side='bottom' {...props} />;
}

export function ChartSideComponent({
  className,
  children,
  label,
  id,
  side,
  showScrollBars = false,
  style,
  clipTypes = {},
  showCornerMaskBorder = true,
}: IChartSideProps & { side: ChartSide }) {
  const chartState = useContext(ChartContext);
  if (!chartState) return null;

  const { helpers, refs, scroll, sizes } = chartState;
  const { axis } = sizes;
  const domPosition = helpers.getDOMPosition(side);
  const domSize = helpers.getDOMSize(side);
  const canResize = helpers.canResizeSide(side);
  const svgSize = helpers.getSVGSize(side);

  return (
    <ChartComponentContext.Provider
      value={{
        component: side,
        canResize,
        domPosition,
        domSize,
        svgSize,
      }}
    >
      <div
        className={cn(
          'ArcChart-Component',
          `ArcChart-Component-${side}`,
          className
        )}
        id={id}
        style={{
          ...style,
          ...domPosition,
          ...domSize,
          clipPath: getClipPath(sizes.axis.sizes, side, domSize, clipTypes),
        }}
      >
        {/* SVG Content */}
        <div
          className={cn(
            'ArcChart-Component-SVGScrollWrapper',
            `ArcChart-Component-SVGScrollWrapper-${side}`
          )}
          onScroll={scroll.scrollHandlers[side]}
          ref={refs[side]}
        >
          <SVGRenderer
            component={side}
            height={svgSize.height}
            width={svgSize.width}
            viewBox={svgSize.viewBox}
          >
            {children}
          </SVGRenderer>
        </div>
        {/* SCROLLING, RESIZING, LABELING */}
        {showScrollBars && (
          <ChartSyncedScrollBar domRef={refs[`${side}-floatingScroll`]} />
        )}
        {canResize && <ResizeBar side={side} />}
        {label && <ChartLabel side={side}>{label}</ChartLabel>}
        {/* GUTTER LINE LOGIC */}
      </div>
      {showCornerMaskBorder && (
        <ChartCornerMaskBorder
          axisSizes={axis.sizes}
          domSize={domSize}
          domPosition={domPosition}
          side={side}
        />
      )}
    </ChartComponentContext.Provider>
  );
}

export interface IChartLabelProps {
  children: RenderableContent;
  className?: string;
  side: ChartSide;
}
// Right now, we have `white-space: nowrap` set, which makes text look good here
// Non-text items may have overflow issues when the axis gets small due to use of `transform: rotate(-90deg)`
export function ChartLabel({ children, className, side }: IChartLabelProps) {
  return (
    <div
      className={cn(
        'ArcChart-Component-Label',
        `ArcChart-Component-Label-${side}`,
        className
      )}
    >
      {children}
    </div>
  );
}

export interface IChartLegendProps {
  keys: { label: string; className: string; symbol?: RenderableContent }[];
}

export function ChartLegend({ keys }: IChartLegendProps) {
  return (
    <div className={cn('ArcChart-Component-Legend')}>
      {keys.map((key) => (
        <div
          className={cn('ArcChart-Component-Legend-Key', key.className)}
          key={key.label}
        >
          {key.label}
          {!key.symbol && <div className='ArcChart-Component-Legend-Symbol' />}
          {key.symbol}
        </div>
      ))}
    </div>
  );
}

export interface IChartCornerMaskBorder {
  axisSizes: IChartAxisSizing['sizes'];
  domPosition: Partial<Record<ChartSide, number>>;
  domSize: IBoxSize;
  side: ChartSide;
}

declare type SlashBorder = 'forward' | 'backward';

// This component renders an "angled border" that matches with the masking
// Recall we have 5 areas: top, right, bottom, left, content
// We now make it so the outside adjacent areas like top/left meet at an angled line that clips content past it
// This function serves to draw the lines over the mask area so it's clear why the masking applies there
export function ChartCornerMaskBorder({
  axisSizes,
  domPosition,
  domSize,
  side,
}: IChartCornerMaskBorder) {
  const gutters = getGutterSizes(axisSizes, side);
  const isInside = ['left', 'top'].includes(side);
  const isVertical = ['left', 'right'].includes(side);

  // We have the two slashes
  // forward-slash /, belongs in bottom-left or top-right
  // backward-slash \, belongs in top-left or bottom-right
  const firstSlash: SlashBorder = isInside ? 'backward' : 'forward';
  const secondSlash: SlashBorder = isInside ? 'forward' : 'backward';

  const dimensions = {
    first: { width: 0, height: 0 },
    second: { width: 0, height: 0 },
  };
  if (isVertical) {
    dimensions.first.width = domSize.width;
    dimensions.second.width = domSize.width;
    dimensions.first.height = gutters[0];
    dimensions.second.height = gutters[1];
  } else {
    dimensions.first.height = domSize.height;
    dimensions.second.height = domSize.height;
    dimensions.first.width = gutters[0];
    dimensions.second.width = gutters[1];
  }

  const firstStyle = getHypotenuseLengthAndLeftOffset(
    dimensions.first.width,
    dimensions.first.height,
    firstSlash === 'forward'
  );
  const secondStyle = getHypotenuseLengthAndLeftOffset(
    dimensions.second.width,
    dimensions.second.height,
    secondSlash === 'forward'
  );

  return (
    <div
      className='ArcChart-Component-BorderSlashContainer'
      style={{
        position: 'absolute',
        overflow: 'hidden',
        ...domPosition,
        ...domSize,
      }}
    >
      <div
        className='ArcChart-Component-BorderSlashParent'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: dimensions.first.width,
          height: dimensions.first.height,
        }}
      >
        <div className='ArcChart-Component-BorderSlash' style={firstStyle} />
      </div>
      <div
        className='ArcChart-Component-BorderSlashParent'
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: dimensions.second.width,
          height: dimensions.second.height,
        }}
      >
        <div className='ArcChart-Component-BorderSlash' style={secondStyle} />
      </div>
    </div>
  );
}

function getGutterSizes(
  sizes: IChartAxisSizing['sizes'],
  side: ChartSide
): [number, number] {
  const isVertical = ['left', 'right'].includes(side);
  return isVertical ? [sizes.top, sizes.bottom] : [sizes.left, sizes.right];
}

function getClipPath(
  sizes: IChartAxisSizing['sizes'],
  side: ChartSide,
  domSize: IBoxSize,
  clipTypes: ClipTypes
) {
  const isVertical = ['left', 'right'].includes(side);
  const gutters = getGutterSizes(sizes, side);
  const totalGutter = gutters[0] + gutters[1];

  return `polygon(${getClipPathPolygon({
    axisSide: side,
    axisSize: (isVertical ? domSize.height : domSize.width) - totalGutter,
    startingGutterSize: gutters[0],
    endingGutterSize: gutters[1],
    clipTypes,
  })})`;
}

// This function is used to compute info about a line being rendered across a box
function getHypotenuseLengthAndLeftOffset(
  width: number,
  height: number,
  isForwardSlash: boolean
): CSSProperties {
  const hypotenuseLength = Math.sqrt(width * width + height * height);
  const lineAngle = (Math.asin(height / hypotenuseLength) * 180) / Math.PI;
  const leftOffset = (hypotenuseLength - width) / 2;

  return {
    position: 'absolute',
    top: 'calc(50%)',
    left: -1 * leftOffset,
    height: 1,
    width: hypotenuseLength,
    transform: `rotate(${isForwardSlash ? '-' : ''}${lineAngle}deg)`,
  };
}

function calculateCoordinateSpacePosition(
  e: React.MouseEvent<HTMLDivElement>,
  chartState: IChartState
) {
  const contentDomNode = chartState.refs.content.current;
  const { scrollTop, scrollLeft } = contentDomNode ?? {
    scrollTop: 0,
    scrollLeft: 0,
  };
  const { left, top } =
    contentDomNode?.getBoundingClientRect() ?? new DOMRect();
  const x = e.pageX - left + scrollLeft;
  const y = e.pageY - top + scrollTop;
  return { x, y };
}
