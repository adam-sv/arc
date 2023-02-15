// dependencies
import React from 'react';
import { Grid } from '@adam-sv/arc';
// types
import type { IChartContainerProps, ICoords } from '@adam-sv/arc';
import type {
  IChartContainerDOMRefs,
  ChartComponent,
  ICCSizing,
} from './types';
import type { ChartComponentRenderer } from '../types';

export interface IContentBackgroundProps {
  chartSize: DOMRect;
  contentGridOptions?: IChartContainerProps['contentGridOptions'];
  offset: ICoords;
  zoom: number;
}

export function ContentBackground({
  chartSize,
  contentGridOptions,
  offset,
  zoom,
}: IContentBackgroundProps) {
  if (!contentGridOptions) {
    return null;
  }

  // falsiness rather than null coalescence guarantees a non-zero value - important
  const xGridSize =
    contentGridOptions?.xLineGap || contentGridOptions.lineGap || 20;
  const yGridSize =
    contentGridOptions?.yLineGap || contentGridOptions.lineGap || 20;

  // we generate NaNs in this scenario - maybe there is a more graceful solution
  if (chartSize.width === 0 || chartSize.height === 0) {
    return null;
  }

  return (
    <g
      className='ArcChartContainer-Grid-group'
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`, // scale(${zoom})
      }}
    >
      <Grid
        className='ArcChartContainer-Grid'
        boundingRect={chartSize}
        xTicks={makeEquidistantGridLines(
          chartSize.left,
          chartSize.right,
          chartSize.width / xGridSize / zoom
        )}
        yTicks={makeEquidistantGridLines(
          chartSize.top,
          chartSize.bottom,
          chartSize.height / yGridSize / zoom
        )}
      />
    </g>
  );
}

export interface IXAxisProps {
  cc: ICCSizing;
  chartWidth: number;
  contentWidth: number;
  height: number;
  offset: ICoords;
  refs: IChartContainerDOMRefs;
  renderer: ChartComponentRenderer;
  scrollXAxis: (
    scrollTop: number,
    scrolledChartComponent?: ChartComponent
  ) => void;
  viewBox: string;
  zoom: number;
}

export function XAxis(props: IXAxisProps) {
  const {
    cc,
    chartWidth,
    contentWidth,
    height,
    offset,
    refs,
    renderer,
    scrollXAxis,
    viewBox,
    zoom,
  } = props;

  return (
    <div
      className='x-axis-container'
      onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) =>
        scrollXAxis(e.currentTarget.scrollLeft, 'bottom')
      }
      ref={refs.bottom}
      style={{
        height: `${height}px`,
        width: `${contentWidth}px`,
      }}
    >
      <svg
        className='x-axis-svg'
        viewBox={viewBox}
        style={{
          minWidth: `${chartWidth}px`,
          minHeight: `${height}px`,
        }}
      >
        <g style={{ transform: `translate(${offset.x}px, 0)` }}>
          {renderer(new DOMRect(0, 0, chartWidth, height), cc)}
        </g>
      </svg>
    </div>
  );
}

export interface IYAxisProps {
  cc: ICCSizing;
  chartHeight: number;
  contentHeight: number;
  offset: ICoords;
  refs: IChartContainerDOMRefs;
  renderer: ChartComponentRenderer;
  scrollYAxis: (
    scrollTop: number,
    scrolledChartComponent?: ChartComponent
  ) => void;
  viewBox: string;
  width: number;
  zoom: number;
}

export function YAxis(props: IYAxisProps) {
  const {
    cc,
    chartHeight,
    contentHeight,
    offset,
    refs,
    renderer,
    scrollYAxis,
    width,
    viewBox,
    zoom,
  } = props;

  return (
    <div
      className='y-axis-container'
      onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) =>
        scrollYAxis(e.currentTarget.scrollTop, 'left')
      }
      ref={refs.left}
      style={{
        height: `${contentHeight}px`,
        width: `${width}px`,
      }}
    >
      <svg
        className='y-axis-svg'
        style={{ minHeight: `${chartHeight}px` }}
        viewBox={viewBox}
      >
        <g
          style={{
            transform: `translate(0, ${offset.y}px)`,
          }}
        >
          {renderer(new DOMRect(0, 0, width, chartHeight), cc)}
        </g>
      </svg>
    </div>
  );
}

// TODO: it would be nice to abstract this out
// how?
// export interface IZoomingDivProps extends IARCProps {
//   ref: MutableRefObject<HTMLDivElement | null>;
//   style?: CSSProperties;
// }

// export function ZoomingDiv(props: IZoomingDivProps) {
//   return (
//     <div
//       className={cn('ARCZoomingDiv', props.className)}
//       ref={props.ref}
//       style={props.style}
//     >
//       {props.children}
//     </div>
//   );
// }

// note: for numSections, we return numSections + 1 lines
export function makeEquidistantGridLines(
  min: number,
  max: number,
  numSections: number
): number[] {
  const intervals = [];
  for (let i = 0; i <= numSections; i++) {
    const minWeight = numSections - i;
    const maxWeight = i;

    intervals.push((minWeight * min + maxWeight * max) / numSections);
  }
  return intervals;
}
