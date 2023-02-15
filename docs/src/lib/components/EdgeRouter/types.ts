import type {
  IARCProps,
  ICoords,
  LogicalArcGraph,
  IGraphConnectionActions,
  IGraphEdge,
} from '@adam-sv/arc';
import { EdgeDirection } from '.';

export type IEdgeRouterMode =
  | 'straight'
  | 'straight-corners'
  | 'straight-midpoints-corners'
  | 'smart';

export interface IEdgeDataGeometry<EdgeType = any> {
  arrowHeadPoints: string;
  edge: IGraphEdge<EdgeType>;
  pathD: string;
  // we will use this direction to transform the arrowhead when we hover
  // we only implement CSS for the EdgeDirection classes though!
  arrowHeadDirection?: EdgeDirection | string;
}

export interface IEdgeRouterProps<NodeType = any, EdgeType = any>
  extends IARCProps {
  connectionActions?: IGraphConnectionActions;
  containerDOMRect: DOMRect;
  edgeMode: IEdgeRouterMode;
  edgeSpacing?: number;
  graph: LogicalArcGraph<NodeType, EdgeType>;
  noSVGContainer?: boolean;
  shift?: ICoords;
  svgContainerClassName?: string;
}
