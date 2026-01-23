/** EdgeRouter - Worker
 * We possibly run very expensive calculations in the edge router, so we cannot do it on the main thread.
 * However, this results in 2 separate compile stages:
 * - ARC library
 * - downstream consumer app
 *
 * There is an attempt at automating this by using relative paths so the production library builds the Worker like this:
 * `return new Worker("" + new URL("assets/edge-router.worker-DKuH-F9K.js", import.meta.url).href)`
 * You can see the configuration related to this in `vite.config.lib.ts`.
 */

import { geometry } from '../../../geometry';
import {
  LogicalArcGraph,
  getParameterizedWebcolaDefinition,
  WCGridRouter,
  WCRectangle,
} from '../../../graphs';
import {
  buildArrowHead,
  buildStraightPath,
  buildSmartPath,
  findInitialDirection,
} from './methods';
import type {
  GraphNodeId,
  IGraphNode,
  IGraphEdge,
  IEdgeRouterMode,
  IProcessedGraphNode,
  IWebcolaEdge,
} from '@adam-sv/arc';
import type { IEdgeDataGeometry } from './types';

// nodes without an entry are ignored; nodes with an entry will use the values.
// "content" only required when using smart edge routing
export type GraphNodePositionMap<NodeIdType extends GraphNodeId> = Map<
  NodeIdType,
  { content?: DOMRect; position: DOMRect }
>;

export interface IEdgeRouterWorkerResponse<
  EdgeType,
  NodeIdType extends GraphNodeId,
> {
  edges: Array<IEdgeDataGeometry<EdgeType, NodeIdType>>;
  instanceRequestCount: number;
}

export interface IEdgeRouterWorkerProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId,
> {
  edgeMode: IEdgeRouterMode;
  nodes: IGraphNode<NodeType, NodeIdType>[];
  edges: IGraphEdge<EdgeType, NodeIdType>[];
  positions: GraphNodePositionMap<NodeIdType>;
  // for request tracking
  instanceRequestCount: number;
  // optional configuration for smart routing
  edgeSpacing?: number;
  groupPadding?: number;
  /** debug prints for each request and response to and from the Web Worker */
  debug?: boolean;
}

self.onmessage = <NodeType, EdgeType, NodeIdType extends GraphNodeId>(
  e: MessageEvent<IEdgeRouterWorkerProps<NodeType, EdgeType, NodeIdType>>
) => {
  try {
    const {
      edgeMode,
      edges,
      nodes,
      positions,
      instanceRequestCount,
      edgeSpacing = 4,
      groupPadding = 20,
      debug = false,
    } = e.data;
    if (debug) console.log('EdgeRouter::Worker - received event', e);
    const graph = new LogicalArcGraph(nodes, edges);

    const renderedEdges =
      edgeMode === 'smart'
        ? getSmartEdges(graph, positions, edgeSpacing, groupPadding)
        : getStraightEdges(graph, positions, edgeMode);

    if (debug)
      console.log(
        `EdgeRouter::Worker - finished request #${instanceRequestCount}. Edge 0:`,
        renderedEdges[0]
      );

    self.postMessage({
      edges: renderedEdges,
      instanceRequestCount,
    });
  } catch (e) {
    console.error('EdgeRouter::Worker - error:', e);
    self.postMessage([]);
  }
};

function getStraightEdges<NodeType, EdgeType, NodeIdType extends GraphNodeId>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  positions: GraphNodePositionMap<NodeIdType>,
  edgeMode: Exclude<IEdgeRouterMode, 'smart'>
): IEdgeDataGeometry<EdgeType, NodeIdType>[] {
  const { edges } = graph;
  const edgeData: IEdgeDataGeometry<EdgeType, NodeIdType>[] = [];

  for (const edge of edges) {
    const fromPos = positions.get(edge.from);
    const toPos = positions.get(edge.to);

    if (!fromPos || !toPos) continue;

    const nearestPoints = geometry.getClosestPointsBetweenRects(
      fromPos.position,
      toPos.position,
      edgeMode === 'straight'
        ? 'midpoints'
        : (edgeMode.slice(9) as 'corners' | 'midpoints-corners')
    );

    edgeData.push({
      arrowHeadPoints: buildArrowHead(nearestPoints[1], {
        x: nearestPoints[0].x - nearestPoints[1].x,
        y: nearestPoints[0].y - nearestPoints[1].y,
      }),
      edge: edge,
      pathD: buildStraightPath(nearestPoints),
    });
  }

  return edgeData;
}

function getSmartEdges<NodeType, EdgeType, NodeIdType extends GraphNodeId>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  positions: GraphNodePositionMap<NodeIdType>,
  edgeSpacing: number,
  groupPadding: number
): IEdgeDataGeometry<EdgeType, NodeIdType>[] {
  if (!graph.edges.length) return [];

  try {
    const { accessors, edges, nodes, getOriginalEdge } =
      getParameterizedWebcolaDefinition<NodeType, EdgeType, NodeIdType>(
        graph,
        (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
          const posInfo = positions.get(node.id);
          if (!posInfo) throw new Error('TS error');
          return domToWCRect(posInfo.position);
        },
        (node: IProcessedGraphNode<NodeType, NodeIdType>) => {
          const posInfo = positions.get(node.id);
          if (!posInfo) throw new Error('TS error');
          return domToWCRect(posInfo.content ?? posInfo.position);
        }
      );

    const gridRouter = new WCGridRouter(nodes, accessors, groupPadding);
    const rawEdgePaths = gridRouter.routeEdges(
      edges,
      edgeSpacing,
      (edge: IWebcolaEdge) => edge.from,
      (edge: IWebcolaEdge) => edge.to
    );

    const edgeData: IEdgeDataGeometry<EdgeType, NodeIdType>[] = [];
    edges.forEach((edge, i) => {
      const rawEdge = rawEdgePaths[i];
      const firstEdgeSegment = rawEdge[0];
      const finalEdgeSegment = rawEdge.slice(-1)[0];
      // We need to find which end is closer to the target node for the arrowhead. Very frustrating, I know
      const { X, x, Y, y } = nodes[edge.to].rectangle;
      const centerPoint = { x: (x + X) / 2, y: (y + Y) / 2 };
      const endpoint1 = rawEdge[0][0];
      const endpoint2 = finalEdgeSegment[1];
      const distance1 = geometry.getDistanceBetweenCoords(
        endpoint1,
        centerPoint
      );
      const distance2 = geometry.getDistanceBetweenCoords(
        endpoint2,
        centerPoint
      );

      // If we use the first segment, the arrowhead must connect to point [0]. If we use the final segment, it must connect to point [1].
      // This is a bit confusing, but I found an insane edge case where this broke consistently, and this fixed it.
      const edgeSegmentToUse =
        distance1 < distance2
          ? firstEdgeSegment.slice().reverse()
          : finalEdgeSegment;

      edgeData.push({
        arrowHeadPoints: buildArrowHead(edgeSegmentToUse[1], {
          x: edgeSegmentToUse[0].x - edgeSegmentToUse[1].x,
          y: edgeSegmentToUse[0].y - edgeSegmentToUse[1].y,
        }),
        edge: getOriginalEdge(edge),
        pathD: buildSmartPath(rawEdgePaths[i]),
        arrowHeadDirection: findInitialDirection(finalEdgeSegment),
      });
    });

    return edgeData;
  } catch (e) {
    console.error('EdgeRouter::Worker::Smart failed:', e);
    return getStraightEdges(graph, positions, 'straight');
  }
}

function domToWCRect(rect: DOMRect): WCRectangle {
  return new WCRectangle(rect.left, rect.right, rect.top, rect.bottom);
}
