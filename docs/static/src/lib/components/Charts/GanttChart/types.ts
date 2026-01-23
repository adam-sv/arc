import { SyntheticEvent } from 'react';
import type {
  RenderableContent,
  IGraphProps,
  IEdgeRouterMode,
  IARCProps,
  GraphNodeId,
} from '@adam-sv/arc';

export interface IGanttChart<NodeType, NodeIdType extends GraphNodeId>
  extends IARCProps {
  data: IGanttChartDatum<NodeType, NodeIdType>[];
  barOpts: IGanttDevBarProps<NodeType, NodeIdType>;
  valueDomain?: [Date | number, Date | number];
  edges?: IGanttChartEdge<NodeIdType>[];
  edgeMode?: IEdgeRouterMode;
  edgeSpacing?: number; // only for edgeMode="smart"
  connectionActions?: IGraphProps<
    NodeType,
    never,
    NodeIdType
  >['connectionActions'];
  axisSettings?: Partial<Record<'left' | 'bottom', IGanttChartAxisProps>>;
  minContentHeight?: number;
  zoomSettings?: Partial<IGanttChartZoom>;
  mouseOverContent?: (
    bar: IGanttChartDatum<NodeType, NodeIdType>
  ) => RenderableContent;
  mouseOverTargetElement?: Element;
}

export interface IGanttChartZoom {
  min: number;
  max: number;
  value?: number;
}
export interface IGanttChartEdge<NodeIdType> {
  from: NodeIdType;
  to: NodeIdType;
}

export interface IGanttChartDatum<NodeType, NodeIdType extends GraphNodeId> {
  id: NodeIdType;
  className?: string;
  data?: NodeType;
  label: string;
  start: Date | number;
  finish: Date | number;
}

export interface IGanttDevBarProps<NodeType, NodeIdType extends GraphNodeId> {
  height: number;
  padding: number;
  onClick?: (
    e: SyntheticEvent,
    datum: IGanttChartDatum<NodeType, NodeIdType>
  ) => unknown;
  onMouseOver?: (
    e: SyntheticEvent,
    datum: IGanttChartDatum<NodeType, NodeIdType>
  ) => unknown;
  onMouseOut?: (
    e: SyntheticEvent,
    datum: IGanttChartDatum<NodeType, NodeIdType>
  ) => unknown;
}

export interface IGanttChartAxisProps {
  size?: number;
  label?: string;
  preventResize?: boolean;
}
export type DatumId = string | number;
