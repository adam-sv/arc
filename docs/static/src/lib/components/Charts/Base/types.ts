// types
import type {
  ClipTypes,
  IBoxDimensionsByEdge,
  IBoxSize,
  RenderableContent,
} from '@adam-sv/arc';
import type { CSSProperties } from 'react';
// guts
import type { IChartState } from './logic/index';
import { ICoords } from '@adam-sv/arc';
export type { IChartState };

export type ChartSide = 'left' | 'top' | 'right' | 'bottom';
export type ChartComponent = ChartSide | 'content' | 'container';
export type _ScrollableSide = `${ChartSide}-floatingScroll`;
export type ScrollableChartComponent =
  | ChartComponent
  | _ScrollableSide
  | 'content';

export interface IChartConfiguration {
  // Axis settings
  axisSettings?: {
    // defaults: 0. Ensure what you pass here is also rendered via <ChartComponents.Top /> etc.
    sizes?: Partial<Record<ChartSide, number>>;
    minimumSizes?: Partial<Record<ChartSide, number>>; // Ensure that the size can't go below a minimum
    maximumSizes?: Partial<Record<ChartSide, number>>; // Ensure that they can't grow past certain sizes
    preventResize?: boolean | Set<ChartSide>; // Any members of the set will not allow resize, i.e. Set(['left']) means left axis is fixed at axisContainerSizes['left']
  };
  // Content sizes need to be specified
  contentSizing: IChartContentSizeProps;
  // Scroll sync
  scrollControls?: {
    left: number;
    top: number;
    onScrollUpdate?: (scrollLeft: number, scrollTop: number) => unknown;
  };
  // Zoom
  zoomSettings?: {
    value?: number;
    min?: number;
    max?: number;
    onZoomUpdate?: (zoom: number) => unknown;
    // Note: this doesn't allow different zoom per-axis
    axes?: 'x' | 'y' | 'xy'; // default: 'xy'
  };
}

export interface IChartBaseProps {
  // use the <Top>, <Left>, <Content> etc. components to render your beautiful chart
  children?: RenderableContent;
  chartState: IChartState;
  // Normal accesses
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
  // TODO: implement scrollBarOffset
  // scrollBarOffset?: number; // by default, we put it at the "outside position" - 0. 0-axisSize is your range we clamp to
  // actions
  onContextMenu?: (
    ev: React.MouseEvent<HTMLDivElement>,
    coordinateSpacePosition: ICoords
  ) => unknown;
  onDrop?: (
    ev: React.DragEvent<HTMLDivElement>,
    coordinateSpacePosition: ICoords,
    data: string,
    chartState: IChartState
  ) => unknown;
}

// On the Sides (Left/Top/Right/Bottom) we will render labels for you
// you can pass anything - note we'll do some rotations automatically
// as you are also rendering the ChartBase yourself, you can do more custom work there
export interface IChartSideProps extends IChartComponentProps {
  /**
   * Label to display on chart side
   */
  label?: RenderableContent;
  /**
   * Clip path options for the two sides of your chart side.
   * If side is 'top' then clipTypes can be {left: ClipType, right: clipType}
   * Other ClipTypes are ignored ('top' and 'bottom' don't make sense for 'top' side)
   */
  clipTypes?: ClipTypes;
  /**
   * Shows or hides the corner mask border line
   * For now this line is only diagonal. If you have clip paths other than diagonal
   * it might make sense to turn this off
   */
  showCornerMaskBorder?: boolean;
}

/* SIZING OPTIONS */
export interface IChartContentSizePropsBase {
  mode: 'responsive' | 'fits-width' | 'fits-height';
  minContentHeight?: number;
  maxContentHeight?: number;
}
// fixed in both dimensions, we must render the aspect ratio
export interface IChartResponsiveSizing extends IChartContentSizePropsBase {
  mode: 'responsive';
  coordinateSpace: IBoxSize; // we need to know your height / width of coordinate space
  matchSizeAtDefaultZoomTo?: 'width' | 'height' | 'pixelSpace'; // default is pixelSpace
  /**
   * WARNING: use of padding is exposed to ChartBase consumer as part of chartSize
   */
  padding?: IBoxDimensionsByEdge;
  fillMaxSpace?: boolean;
}

export interface IChartFitsOneDimensionSizing
  extends IChartContentSizePropsBase {
  /**
   * Options are 'fits-width' or 'fits-height'
   * fits-width => the chart can be arbitrarily wide
   * fits-height => the chart can be arbitrarily tall
   * the other dimension is "controlled"
   */
  mode: 'fits-width' | 'fits-height';
  // size of pixel space (mode === 'fits-height' ? width : height) at 1 zoom
  controlledDimensionSize: number;
}

export type IChartContentSizeProps =
  | IChartResponsiveSizing
  | IChartFitsOneDimensionSizing;
