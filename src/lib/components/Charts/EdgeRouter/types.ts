import type {
  IARCProps,
  LogicalArcGraph,
  IGraphConnectionActions,
  IGraphEdge,
  IProcessedGraphNode,
  WCRectangle,
  GraphNodeId,
} from '@adam-sv/arc';
import { EdgeDirection } from '.';
import type { IGraphRenderContext } from '../Graph';

export type IEdgeRouterMode =
  | 'straight'
  | 'straight-corners'
  | 'straight-midpoints-corners'
  | 'smart';

export interface IEdgeDataGeometry<EdgeType, NodeIdType extends GraphNodeId> {
  arrowHeadPoints: string;
  edge: IGraphEdge<EdgeType, NodeIdType>;
  pathD: string;
  /** arrowHeadDirection will be used in CSS to make sure the arrowhead grows correctly when hovered.
   *
   * However, our logic only supports classNames within the `EdgeDirection` type, other names will have to be handled manually. */
  arrowHeadDirection?: EdgeDirection | string;
}

export interface IEdgeRouterProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> extends IARCProps {
  // We need to know the legal drawing area
  coordinateSpace: DOMRect;
  // Edge options
  edgeMode: IEdgeRouterMode;
  edgeSpacing?: number;
  groupPadding?: number; // default 20, this must tell wehcola how "inset" children nodes are from their parent for some reason
  getEdgeClassName?: (
    edge: IGraphEdge<EdgeType, NodeIdType>
  ) => string | undefined;
  // Provide info about where the node is positioned, and optionally where its "content" is displayed internally
  getPosition: (node: IProcessedGraphNode<NodeType, NodeIdType>) => WCRectangle;
  getContentPosition?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => WCRectangle;
  // Graph info
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>;
  graphContext?: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
  // Interactivity
  connectionActions?: IGraphConnectionActions<EdgeType, NodeIdType>;
  // Debug mode draws the rectangles we see!
  debug?: boolean;
  // Timing control - configure how long it should try to solve smart edges before using straight edges
  edgeRouterTimeAllowed?: number; // default: 3000
}
