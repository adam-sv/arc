// dependencies
import React from 'react';
// types
import type { ChartComponent, ChartComponentRenderer, IChartContainerDOMRefs } from './types';

export interface IXAxisProps {
  height: number;
  refs: IChartContainerDOMRefs;
  renderer: ChartComponentRenderer;
  scrollXAxis: (scrollTop: number, scrolledChartComponent?: ChartComponent) => void;
  width: number;
  zoom: number;
}

export function XAxis(props: IXAxisProps) {
  const { height, refs, renderer, scrollXAxis, width, zoom } = props;

  return (
    <div
      className="x-axis-container"
      onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) =>
        scrollXAxis(e.currentTarget.scrollLeft, 'bottom')
      }
      ref={refs.bottom}
      style={{
        height: `${height}px`,
      }}
    >
      <svg
        className="x-axis-svg"
        viewBox={`0 0 ${width * zoom} ${height}`}
        style={{
          height: `${height}px`,
          width: `${zoom * width}px`
        }}
      >
        {renderer(
          new DOMRect(0, 0, width * zoom, height),
          zoom,
        )}
      </svg>
    </div>
  );
}

export interface IYAxisProps {
  chartHeight: number;
  contentHeight: number;
  refs: IChartContainerDOMRefs;
  renderer: ChartComponentRenderer;
  scrollYAxis: (scrollTop: number, scrolledChartComponent?: ChartComponent) => void;
  width: number;
  zoom: number;
}

export function YAxis(props: IYAxisProps) {
  const { chartHeight, contentHeight, refs, renderer, scrollYAxis, width, zoom } = props;

  return (
    <div
      className="y-axis-container"
      onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) =>
        scrollYAxis(e.currentTarget.scrollTop, 'left')
      }
      ref={refs.left}
      style={{
        height: `${chartHeight}px`,
        width: `${width}px`,
      }}
    >
      <svg
        className="y-axis-svg"
        style={{ height: `${contentHeight * zoom}px` }}
        viewBox={`0 0 ${width} ${contentHeight}`}
      >
        {renderer(
          new DOMRect(0, 0, width, contentHeight),
          zoom,
        )}
      </svg>
    </div>
  );
}
