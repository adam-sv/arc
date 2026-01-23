// dependencies
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// internals
import {
  cn,
  getClosestPointsBetweenRects,
  IGraphEdge,
  IGraphNode,
} from '@adam-sv/arc';
import { Debug } from './debug';
import { Edge } from './Edge';
import { buildArrowHead, buildStraightPath, toDOMRect } from './methods';
// types
import type {
  LogicalArcGraph,
  WCRectangle,
  IProcessedGraphNode,
  GraphNodeId,
} from '@adam-sv/arc';
import type { IGraphRenderContext } from '../Graph';
import type { EdgeDirection } from './methods';
import type {
  IEdgeDataGeometry,
  IEdgeRouterMode,
  IEdgeRouterProps,
} from './types';
import type {
  GraphNodePositionMap,
  IEdgeRouterWorkerProps,
  IEdgeRouterWorkerResponse,
} from './edge-router.worker';
import EdgeRouterWorker from './edge-router.worker?worker&inline';

export type {
  EdgeDirection,
  IEdgeDataGeometry,
  IEdgeRouterMode,
  IEdgeRouterProps,
};

export interface IGraphEdgeContext<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  edgeMode: IEdgeRouterMode;
  edgeSpacing: number;
  getPosition: (node: IProcessedGraphNode<NodeType, NodeIdType>) => WCRectangle;
  getContentPosition?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => WCRectangle;
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>;
  groupPadding: number;
  graphContext?: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
}

export type EdgeStateSetter<
  EdgeType,
  NodeIdType extends GraphNodeId
> = React.Dispatch<
  React.SetStateAction<IEdgeDataGeometry<EdgeType, NodeIdType>[]>
>;

// The best edges are drawn natively in the coordinate space, i.e. along integer positions x/y
// Therefore we want our parent to supply us numbers in the coordinate space
// how will this change everything??? Let's find out.
export function EdgeRouter<NodeType, EdgeType, NodeIdType extends GraphNodeId>({
  className,
  coordinateSpace,
  connectionActions,
  debug,
  edgeMode,
  edgeSpacing = 4,
  edgeRouterTimeAllowed = 3000,
  getContentPosition,
  getEdgeClassName,
  getPosition,
  graph,
  graphContext,
  groupPadding = 20,
  id,
  style,
}: IEdgeRouterProps<NodeType, EdgeType, NodeIdType>) {
  const [edgeGeometry, setEdgeGeometry] = useState<
    IEdgeDataGeometry<EdgeType, NodeIdType>[]
  >([]);

  const computeContext: IGraphEdgeContext<NodeType, EdgeType, NodeIdType> =
    useMemo(
      () => ({
        edgeMode,
        edgeSpacing,
        graph,
        groupPadding,
        getPosition,
        getContentPosition,
        graphContext,
      }),
      [
        edgeMode,
        edgeSpacing,
        graph,
        groupPadding,
        getPosition,
        getContentPosition,
        graphContext,
      ]
    );

  // Track the request sent to the worker by number
  // const requestTracker = useRef<{ latestSent: number; latestReceived: number }>({ latestSent: 0, latestReceived: 0 })
  const requestTracker = useRef({ latestSent: 0, latestReceived: 0 });

  const handleWorkerResponse = useCallback(
    (e: MessageEvent<IEdgeRouterWorkerResponse<EdgeType, NodeIdType>>) => {
      const { instanceRequestCount } = e.data;
      if (instanceRequestCount < requestTracker.current.latestReceived) {
        if (debug)
          console.log(
            'EdgeRouter - not using message from worker',
            e.data,
            requestTracker.current
          );
        return;
      } else {
        requestTracker.current.latestReceived = instanceRequestCount;
      }

      if (debug) console.log('EdgeRouter - message from worker', e.data);
      // Because the type IGraphEdge is generic, we can't guarantee structured clone would work with classes
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
      // Therefore, the worker operates on IGraphEdge<undefined>
      // Therefore, to guarantee mouseover support by reading IGraphEdge.datum, we find the original edge we were provided
      setEdgeGeometry(mergeGeometry(e.data.edges, computeContext.graph.edges));
    },
    [computeContext.graph.edges]
  );

  // Avoids calling getNewWorker every render
  const workerRef = useRef<Worker | null>(null);
  if (workerRef.current === null) workerRef.current = getNewWorker();

  // When the computeContext changes, we handle the worker response differently
  // Therefore we just destroy the last one and get a new one!
  useEffect(() => {
    // Make sure we terminate the worker before we replace it
    const lastWorker = workerRef.current;
    const worker = getNewWorker();

    worker.addEventListener('message', handleWorkerResponse);
    lastWorker?.removeEventListener('message', handleWorkerResponse);
    workerRef.current = worker;

    // Compute new edges
    if (graph.edges.length === 0) setEdgeGeometry([]);
    else if (coordinateSpace.width > 10 && coordinateSpace.height > 10) {
      // update requestTracker
      requestTracker.current.latestSent += 1;
      const requestId = requestTracker.current.latestSent;
      // get messageToWorker
      const messageToWorker = getEdgeRouterConfiguration(
        computeContext,
        requestId,
        debug
      );
      if (debug) console.log('EdgeRouter - sending to worker', messageToWorker);

      // We will give the worker the timeout specified by the user until we just fallback to straight edges
      workerRef.current.postMessage(messageToWorker);
      setTimeout(() => {
        // after the timeout, if the requestId is higher than latestReceived, we use this fallback
        if (requestId > requestTracker.current.latestReceived)
          setEdgeGeometry(
            getStraightEdges(
              computeContext.graph,
              messageToWorker.positions,
              'straight'
            )
          );
      }, edgeRouterTimeAllowed);
    }

    // Finally, we clean up when we change
    return () => lastWorker?.terminate();
  }, [computeContext, handleWorkerResponse, graphContext?.zoom]);

  return (
    <g className={cn('ArcEdgeRouter', className)} id={id} style={style}>
      {debug && <Debug computeContext={computeContext} />}
      {edgeGeometry.map(
        ({ arrowHeadPoints, edge, pathD, arrowHeadDirection }) => (
          <Edge<EdgeType, NodeIdType>
            key={edge.id ? edge.id : `${edge.from}->${edge.to}`}
            arrowHeadDirection={arrowHeadDirection}
            arrowHeadPoints={arrowHeadPoints}
            connectionActions={connectionActions}
            edge={edge}
            getClassName={getEdgeClassName}
            pathD={pathD}
          />
        )
      )}
    </g>
  );
}

function getEdgeRouterConfiguration<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  {
    edgeMode,
    edgeSpacing,
    graph,
    groupPadding,
    getContentPosition,
    getPosition,
  }: IGraphEdgeContext<NodeType, EdgeType, NodeIdType>,
  instanceRequestCount: number,
  debug: boolean = false
): IEdgeRouterWorkerProps<NodeType, EdgeType, NodeIdType> {
  const edges: IGraphEdge<EdgeType, NodeIdType>[] = [];
  const nodes: IGraphNode<NodeType, NodeIdType>[] = [];
  const positions: GraphNodePositionMap<NodeIdType> = new Map();

  graph.nodes.forEach((node) => {
    const position = getPosition(node);
    const content = getContentPosition?.(node);
    if (!position) return;
    positions.set(node.id, {
      position: toDOMRect(position),
      content: content ? toDOMRect(content) : undefined,
    });

    nodes.push({
      id: node.id,
      label: node.label,
      parentId: node.parentId,
    });
  });

  graph.edges.forEach(({ id, from, to }) => {
    if (positions.has(from) && positions.has(to)) edges.push({ id, from, to });
  });

  const routerQueryMessage: IEdgeRouterWorkerProps<
    NodeType,
    EdgeType,
    NodeIdType
  > = {
    edgeMode,
    nodes,
    edges,
    positions,
    instanceRequestCount,
    edgeSpacing,
    groupPadding,
    debug,
  };
  return routerQueryMessage;
}

// this won't handle multiple edges between the same 2 nodes correctly
// IDs should be provided in this situation anyways
function mergeGeometry<EdgeType, NodeIdType extends GraphNodeId>(
  geometry: Array<IEdgeDataGeometry<EdgeType, NodeIdType>>,
  edges: Array<IGraphEdge<EdgeType, NodeIdType>>
): IEdgeDataGeometry<EdgeType, NodeIdType>[] {
  // We will map the ACTUAL edge ID when available, as well as the WebCola-ified quickEdgeId to the edge
  const edgeMap = new Map<string | number, IGraphEdge<EdgeType, NodeIdType>>();

  edges.forEach((edge) => {
    if (edge.id) edgeMap.set(edge.id, edge);
    edgeMap.set(quickEdgeId(edge), edge);
  });

  // If we can find the edge that belongs to this geometry, assign it directly
  // If this isn't possible somehow, I don't really know what the consequence is honestly!
  // TODO: maybe a bit better logical description could be written in here by a certain author of this code!
  geometry.forEach((geoEdge) => {
    const trueEdgeId = geoEdge.edge.id;
    const edge = trueEdgeId
      ? edgeMap.get(trueEdgeId)
      : edgeMap.get(quickEdgeId(geoEdge.edge));
    if (edge) geoEdge.edge = edge;
  });

  return geometry;
}

function quickEdgeId<EdgeType, NodeIdType extends GraphNodeId>(
  edge: IGraphEdge<EdgeType, NodeIdType>
) {
  return `${edge.from} --> ${edge.to}`;
}

/** `getNewWorker` gets us a new Worker instance. The code is provided from a URL we pass to the Worker.
 * Therefore, the URL we construct must be aware of whether or not we're in development.
 * https://vitejs.dev/guide/features.html#web-workers
 * We have used the ?worker syntax, which seems a bit magic.
 */
function getNewWorker() {
  return new EdgeRouterWorker();
  // Old CRA method:
  // return new Worker(
  //   new URL(
  //     './edge-router.worker',
  //     import.meta.url
  //     // import.meta.env.NODE_ENV === 'production' &&
  //     // !import.meta.env.WEBPACK_BUILD
  //     //   ? './workers/edge-router.worker.js'
  //     //   : './edge-router.worker',
  //     // import.meta.url
  //   )
  // );
}

// Hacking, forgive me - needed an "outside-of-worker" solution
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

    const nearestPoints = getClosestPointsBetweenRects(
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
