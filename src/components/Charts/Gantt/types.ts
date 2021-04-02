import type { IARCProps, IEdgeRouterMode, RenderableContent } from '@adam-sv/arc';
import type { SyntheticEvent } from 'react';

export interface IGanttXProps {
  domain?: [number, number];
  label?: string;
  nice?: boolean;
  tickCount?: number;
  tickFormat?: (val: number) => RenderableContent;
}

export interface IGanttYProps {
  domain?: string[];
}

export interface IGanttBarProps<T = any> {
  height: number;
  padding: number;
  onMouseOver?: (e: SyntheticEvent, datum: IGanttDatum<T>) => unknown;
  onMouseOut?: (e: SyntheticEvent, datum: IGanttDatum<T>) => unknown;
}

export type GanttDatumId = string | number;

export interface IGanttEdge {
  from: GanttDatumId;
  to: GanttDatumId;
}

export interface IGanttDatum<T = any> {
  id?: GanttDatumId;
  className?: string;
  data?: T;
  label: string;
  start: Date | number;
  finish: Date | number;
}

export interface IGanttProps<T = any> extends IARCProps {
  data: IGanttDatum<T>[],
  edges?: IGanttEdge[];
  edgeMode?: IEdgeRouterMode;
  barOpts?: IGanttBarProps<T>;
  xOpts?: IGanttXProps;
  yOpts?: IGanttYProps;
  children?: (graphRect: DOMRect, xScale: any, yScale: any) => RenderableContent;
}
