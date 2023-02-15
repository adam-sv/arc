// dependencies
import { MutableRefObject, useContext } from 'react';
// self
import { ChartContext } from '.';
import { ResizeBar } from './ResizeBar/index';
import './style.scss';
// internals
import { cn } from '@adam-sv/arc';
// types
import type { RenderableContent } from '@adam-sv/arc';
import type {
  ChartComponent,
  ChartSide,
  IChartComponentProps,
  IChartSideProps,
} from './types';

export type SVGRenderableContent = RenderableContent;
export interface IChartSVGRendererProps {
  children: SVGRenderableContent;
  className?: string;
  component: ChartComponent;
  domRef?: MutableRefObject<SVGSVGElement | null>;
}

export function SVGRenderer({
  children,
  className,
  component,
  domRef,
}: IChartSVGRendererProps) {
  const chartState = useContext(ChartContext);
  if (!chartState) return null;
  const { height, width } = chartState.helpers.getSVGSize(component);

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
      viewBox={`0 0 ${width} ${height}`}
    >
      {children}
    </svg>
  );
}

// Do we try to abstract it? The Sides are nicely abstracted, but this guy has special behavior anyways
export function Content({
  className,
  children,
  id,
  showScrollBars = true,
  style,
}: IChartComponentProps) {
  const component = 'content';
  const chartState = useContext(ChartContext);
  if (!chartState) return null;

  const { helpers, refs, scroll, styles } = chartState;
  const domPosition = helpers.getDOMPosition(component);
  const domSize = helpers.getDOMSize(component);

  return (
    <div
      className={cn(
        'ArcChart-Component',
        'ArcChart-Component-content',
        showScrollBars ? 'WithScrollBar' : 'HideScrollBar',
        className
      )}
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
      <SVGRenderer component={component}>{children}</SVGRenderer>
    </div>
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
}: IChartSideProps & { side: ChartSide }) {
  const chartState = useContext(ChartContext);
  if (!chartState) return null;

  const { helpers, refs, scroll } = chartState;
  const domPosition = helpers.getDOMPosition(side);
  const domSize = helpers.getDOMSize(side);
  const canResize = helpers.canResizeSide(side);

  return (
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
      }}
    >
      {label && <ChartLabel side={side}>{label}</ChartLabel>}
      <div
        className={cn(
          'ArcChart-Component-SVGScrollWrapper',
          `ArcChart-Component-SVGScrollWrapper-${side}`,
          showScrollBars ? 'WithScrollBar' : 'HideScrollBar'
        )}
        onScroll={scroll.scrollHandlers[side]}
        ref={refs[side]}
      >
        {/* <div className='ArcChart-Component-Overflow'> */}
        <SVGRenderer component={side}>{children}</SVGRenderer>
        {/* </div> */}
      </div>
      {canResize && <ResizeBar side={side} />}
    </div>
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
