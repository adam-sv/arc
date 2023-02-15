import type {
  IChartContainerProps,
  IEdgeRouterMode,
  IGraphProps,
  RenderableContent,
} from '@adam-sv/arc';
import type { CSSProperties, SyntheticEvent } from 'react';
import { ILegendItem } from '../ChartContainer/types';
import type { DatumId } from '../types';

export interface IGanttXProps {
  domain?: [number, number];
  label?: string;
  nice?: boolean;
  tickCount?: number;
  tickFormat?: (val: number) => RenderableContent;
}

export interface IGanttYProps {
  domain?: string[];
  label?: string;
}

export interface IGanttBarProps<T = any> {
  height: number;
  padding: number;
  onClick?: (e: SyntheticEvent, datum: IGanttDatum<T>) => unknown;
  onMouseOver?: (e: SyntheticEvent, datum: IGanttDatum<T>) => unknown;
  onMouseOut?: (e: SyntheticEvent, datum: IGanttDatum<T>) => unknown;
}

export interface IGanttEdge {
  from: DatumId;
  to: DatumId;
}

export interface IGanttDatum<T = any> {
  id?: DatumId;
  className?: string;
  data?: T;
  label: string;
  start: Date | number;
  finish: Date | number;
}

export interface IGanttProps<T = any> {
  data: IGanttDatum<T>[];
  edges?: IGanttEdge[];
  edgeMode?: IEdgeRouterMode;
  barOpts?: IGanttBarProps<T>;
  xOpts?: IGanttXProps;
  yOpts?: IGanttYProps;
  minContentHeight?: number;
  children?: (
    graphRect: DOMRect,
    xScale: any,
    yScale: any
  ) => RenderableContent;
  toolTip?: (
    xPos: number,
    yPos: number,
    xValue?: RenderableContent,
    yValue?: RenderableContent
  ) => RenderableContent;
  connectionActions?: IGraphProps<T>['connectionActions'];
  initialLeftAxisWidth?: number; // default: 120;
  disableMouseTracking?: boolean;
  mouseOverStyle?: CSSProperties;
  customMouseOver?: (value: string) => RenderableContent;
  mouseOverTargetElement?: Element;

  // Previously we used "extends IARCProps"
  className?: string;
  id?: string;
  style?: CSSProperties;
  legend?: Array<ILegendItem>;
}
