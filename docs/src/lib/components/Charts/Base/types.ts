// types
import type {
  IBoxDimensionsByEdge,
  IBoxSize,
  RenderableContent,
} from '@adam-sv/arc';
import type { CSSProperties } from 'react';
// guts
import type { IChartState } from './logic/index';
export type { IChartState };

export type ChartSide = 'left' | 'top' | 'right' | 'bottom';
export type ChartComponent = ChartSide | 'content' | 'container';

export interface IChartBaseProps {
  // use the <Top>, <Left>, <Content> etc. components to render your beautiful chart
  children?: RenderableContent;
  // axis settings
  axisSettings?: {
    sizes?: Partial<Record<ChartSide, number>>; // Ensure what you pass here is also rendered via <ChartComponents.Top /> etc.
    preventResize?: boolean | Set<ChartSide>; // Any members of the set will not allow resize, i.e. Set(['left']) means left axis is fixed at axisContainerSizes['left']
  };
  // content sizes need to be specified
  contentSizing: IChartContentSizeProps;
  // zoom
  zoomSettings?: {
    value?: number;
    min?: number;
    max?: number;
    axes?: 'x' | 'y' | 'xy'; // default: 'x'? none? tbd
    // I also would note that this doesn't allow different zoom per-axis or anything fancy for now
  };
  // IARCProps can't be extended ? maybe with this children it can be?
  className?: string;
  id?: string;
  style?: CSSProperties;
}

// ChartComponent = Content/Left/Top/Right/Bottom
export interface IChartComponentProps {
  children?: RenderableContent;
  className?: string;
  id?: string;
  style?: CSSProperties;
  showScrollBars?: boolean;
}

// On the Sides (Left/Top/Right/Bottom) we will render labels for you
// you can pass anything - note we'll do some rotations automatically
// as you are also rendering the ChartBase yourself, you can do more custom work there
export interface IChartSideProps extends IChartComponentProps {
  label?: RenderableContent;
}

/* SIZING OPTIONS */
declare interface IChartContentSizePropsBase {
  mode: 'responsive' | 'fits-width' | 'fits-height';
  minContentHeight?: number;
  maxContentHeight?: number;
}
// fixed in both dimensions, we must render the aspect ratio
export interface IChartResponsiveSizing extends IChartContentSizePropsBase {
  mode: 'responsive';
  coordinateSpace: IBoxSize; // we need to know your height / width of coordinate space
  matchSizeAtDefaultZoomTo?: 'width' | 'height' | 'pixelSpace'; // default is pixelSpace
  padding?: IBoxDimensionsByEdge; // WARNING: use of padding is exposed to ChartContainer user as part of chartSize
}

export interface IChartFitsOneDimensionSizing
  extends IChartContentSizePropsBase {
  // fits-width => the chart can be arbitrarily wide
  // fits-height => the chart can be arbitrarily tall
  // the other dimension is "controlled"
  mode: 'fits-width' | 'fits-height';
  // size of pixel space (mode === 'fits-height' ? width : height) at 1 zoom
  controlledDimensionSize: number;
}

export type IChartContentSizeProps =
  | IChartResponsiveSizing
  | IChartFitsOneDimensionSizing;
