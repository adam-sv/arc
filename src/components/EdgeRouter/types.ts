import type { IARCProps, ICoords, LogicalArcGraph, IGraphConnectionActions, IGraphEdge } from '@adam-sv/arc';

export type IEdgeRouterMode = 'straight' | 'straight-corners' | 'straight-midpoints-corners' | 'smart';

export interface IEdgeDataGeometry {
  arrowHeadPoints: string;
  edge: IGraphEdge;
  pathD: string;
} 

export interface IEdgeRouterProps extends IARCProps {
  connectionActions?: IGraphConnectionActions;
  edgeMode: IEdgeRouterMode,
  edgeSpacing?: number;
  graph: LogicalArcGraph;
  noSVGContainer?: boolean;
  shift?: ICoords;
}
