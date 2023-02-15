// dependencies
import React, { useEffect } from 'react';
// internals
import {
  cn,
  geometry,
  getPerpendicularVector,
  normalizeVector,
  useMemoizedState,
  WCGridRouter,
} from '@adam-sv/arc';
import { Edge } from './Edge';
// types
import type { ICoords, LogicalArcGraph, IWebcolaEdge } from '@adam-sv/arc';
import type {
  IEdgeDataGeometry,
  IEdgeRouterMode,
  IEdgeRouterProps,
} from './types';

export type { IEdgeDataGeometry, IEdgeRouterMode, IEdgeRouterProps };

export function EdgeRouter<NodeType = any, EdgeType = any>(
  props: IEdgeRouterProps<NodeType, EdgeType>
) {
  const [edgeGeometry, setEdgeGeometry] = useMemoizedState<
    IEdgeDataGeometry<EdgeType>[]
  >([], {
    equalityTest: edgeGeometriesAreEqual,
  });
  const {
    connectionActions,
    containerDOMRect,
    graph,
    id,
    noSVGContainer,
    style,
  } = props;
  const { edgeMode, edgeSpacing, shift } = getSafeProps(props);
  const coordinateSpace = getCoordinateSpace(graph, shift);

  useEffect(() => {
    if (containerDOMRect?.width > 10 && containerDOMRect?.height > 10)
      computeEdgeGeometry(graph, edgeMode, setEdgeGeometry, edgeSpacing);
  }, [graph.edges, edgeMode, edgeSpacing, containerDOMRect]);

  const edgesGroup = (
    <g
      className={cn('ArcEdgeRouter ArcEdgeRouter-edges', props.className)}
      transform={`translate(${shift.x}, ${shift.y})`}
      id={noSVGContainer ? id : undefined}
      style={noSVGContainer ? style : undefined}
    >
      {edgeGeometry?.map(
        ({ arrowHeadPoints, edge, pathD, arrowHeadDirection }) => (
          <Edge
            // I suppose there's nothing illegal about passing 2 edges between the same 2 nodes
            // Accordingly, we added edge.id, so they can deconflict this situation
            // { from: 1, to: 2 } => key="1->2"                     not unique if two edges from 1->2 exist!
            // { id: 'myId', from: 1, to: 2 } => key="myId::1->2"   always unique if you use IDs properly!
            key={`${edge.id ? `${edge.id}::` : ''}${edge.from}->${edge.to}`}
            className={props.className}
            arrowHeadDirection={arrowHeadDirection}
            arrowHeadPoints={arrowHeadPoints}
            connectionActions={connectionActions}
            edge={edge}
            pathD={pathD}
          />
        )
      )}
    </g>
  );

  if (noSVGContainer) return edgesGroup;

  return (
    <svg
      className={cn('ArcEdgeRouter-svgContainer', props.svgContainerClassName)}
      id={id}
      style={style}
      height={coordinateSpace.height}
      width={coordinateSpace.width}
      viewBox={`0 0 ${coordinateSpace.width} ${coordinateSpace.height}`}
    >
      {edgesGroup}
    </svg>
  );
}

function computeEdgeGeometry<NodeType = any, EdgeType = any>(
  graph: LogicalArcGraph<NodeType, EdgeType>,
  mode: IEdgeRouterMode,
  setEdgeGeometry: (geo: IEdgeDataGeometry<EdgeType>[]) => void,
  spacing: number
): void {
  if (
    ['straight', 'straight-corners', 'straight-midpoints-corners'].indexOf(
      mode
    ) >= 0
  ) {
    const straightEdgeOption = mode === 'straight' ? undefined : mode.slice(9);
    computeStraightEdges(
      graph,
      setEdgeGeometry,
      straightEdgeOption as 'corners' | 'midpoints-corners' | undefined
    );
  } else if (mode === 'smart') {
    try {
      computeSmartEdges(graph, setEdgeGeometry, spacing);
    } catch (e) {
      console.warn('ADAMWarning: smart edge computation failed...', e);
      computeStraightEdges(graph, setEdgeGeometry);
    }
  } else {
    throw new Error(
      'EdgeRouter "edgeMode" was not passed correctly,\
      handled values are "straight" and "smart".'
    );
  }
}

const toDOMRect = (rect: {
  x: number;
  X: number;
  y: number;
  Y: number;
}): DOMRect => {
  return new DOMRect(rect.x, rect.y, rect.X - rect.x, rect.Y - rect.y);
};

// TODO:
// can we accept legal attachment points in this mode?
// for example, we have semantic meaning to some connection types "start after finish" or "start after start"
// "start after start" edges should come from the "start" of a node, or the left
// "start after finish" should come from the "finish" of a node, or the right
function computeStraightEdges<NodeType = any, EdgeType = any>(
  graph: LogicalArcGraph<NodeType, EdgeType>,
  setEdgeGeometry: (geo: IEdgeDataGeometry<EdgeType>[]) => void,
  straightEdgeOption?: 'corners' | 'midpoints-corners'
): void {
  const { accessors, edges } = graph;
  const edgeData: IEdgeDataGeometry<EdgeType>[] = [];

  for (const edge of edges) {
    const { from, to } = edge;
    const fromNode = graph.getNode(from);
    const toNode = graph.getNode(to);

    const fromPos = toDOMRect(accessors.getBounds(fromNode));
    const toPos = toDOMRect(accessors.getBounds(toNode));

    const nearestPoints = geometry.getClosestPointsBetweenRects(
      fromPos,
      toPos,
      straightEdgeOption || 'corners'
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

  setEdgeGeometry(edgeData);
}

function computeSmartEdges<NodeType = any, EdgeType = any>(
  graph: LogicalArcGraph<NodeType, EdgeType>,
  setEdgeGeometry: (geo: IEdgeDataGeometry<EdgeType>[]) => void,
  spacing: number
): void {
  const { accessors, edges, nodes, getOriginalEdge } = graph.webcolaDefinition;
  const gridRouter = new WCGridRouter(nodes, accessors, 0);

  const rawEdgePaths = gridRouter.routeEdges(
    edges,
    spacing,
    (edge: IWebcolaEdge) => edge.from,
    (edge: IWebcolaEdge) => edge.to
  );

  const edgeData: IEdgeDataGeometry<EdgeType>[] = [];
  edges.forEach((edge, i) => {
    const finalEdgeSegment = rawEdgePaths[i].slice(-1)[0];
    edgeData.push({
      arrowHeadPoints: buildArrowHead(finalEdgeSegment[1], {
        x: finalEdgeSegment[0].x - finalEdgeSegment[1].x,
        y: finalEdgeSegment[0].y - finalEdgeSegment[1].y,
      }),
      edge: getOriginalEdge(edge),
      pathD: buildSmartPath(rawEdgePaths[i]),
      arrowHeadDirection: findInitialDirection(finalEdgeSegment),
    });
  });

  setEdgeGeometry(edgeData);
}

interface ISafeProps {
  edgeMode: IEdgeRouterMode;
  edgeSpacing: number;
  shift: ICoords;
}

function getSafeProps<EdgeType = any>(
  props: IEdgeRouterProps<EdgeType>
): ISafeProps {
  return {
    edgeMode: props.edgeMode || 'straight',
    edgeSpacing: props.edgeSpacing || 4,
    shift: props.shift || { x: 0, y: 0 },
  };
}

function buildStraightPath(coords: ICoords[]) {
  return `M${polygonizeAny(coords)
    .map((co) => `${co.x},${co.y}`)
    .join(' ')}`;
}

function buildArrowHead(arrowTip: ICoords, reverseVector: ICoords) {
  const { addVector, normalizeVector } = geometry;

  const reverseLength = 6;
  const sidewaysFlair = 2.5;

  reverseVector = normalizeVector(reverseVector);
  const perpendicularVector = normalizeVector(
    getPerpendicularVector(reverseVector)
  );

  const arrowLeft = addVector(
    addVector(reverseVector, perpendicularVector, 1, sidewaysFlair),
    addVector(arrowTip, reverseVector, 1, reverseLength)
  );
  const arrowRight = addVector(
    addVector(reverseVector, perpendicularVector, 1, -1 * sidewaysFlair),
    addVector(arrowTip, reverseVector, 1, reverseLength)
  );

  return `${arrowTip.x},${arrowTip.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`; // eslint-disable-line max-len
}

function edgeGeometriesAreEqual<EdgeType = any>(
  newEdgeData: IEdgeDataGeometry<EdgeType>[],
  oldEdgeData: IEdgeDataGeometry<EdgeType>[]
) {
  if (newEdgeData.length !== oldEdgeData.length) {
    return false;
  }

  for (let i = 0; i < newEdgeData.length; i++) {
    const newD = newEdgeData[i];
    const oldD = oldEdgeData[i];
    if (
      newD.arrowHeadPoints !== oldD.arrowHeadPoints ||
      newD.pathD !== oldD.pathD ||
      newD.edge.from !== oldD.edge.from ||
      newD.edge.to !== oldD.edge.to
    ) {
      return false;
    }
  }

  return true;
}

function getCoordinateSpace<NodeType = any, EdgeType = any>(
  graph: LogicalArcGraph<NodeType, EdgeType>,
  shift: ICoords
) {
  const { top, left, width, height } = graph.boundingRect;

  return new DOMRect(top, left, width + shift.x, height + shift.y);
}

function buildSmartPath(edgePath: ICoords[][]) {
  const points: ICoords[] = edgePath.reduce((pointsList, segment) => {
    const last = pointsList.length - 1;
    segment.forEach((point: ICoords) => {
      if (
        !pointsList[last] ||
        pointsList[last].x !== point.x ||
        pointsList[last].y !== point.y
      ) {
        pointsList.push(point);
      }
    });
    return pointsList;
  }, []);

  return `M ${polygonizeManhattan(points)
    .map((point) => `${point.x},${point.y}`)
    .join(' L ')}`;
}

// we have some path like
// ----
//    |
//    -->
// now we make it like
// ____
// |   |
// --- |
//   | ----\
//   |_____/

export type EdgeDirection = 'left' | 'right' | 'up' | 'down';
const opposites: Record<EdgeDirection, EdgeDirection> = {
  left: 'right',
  up: 'down',
  right: 'left',
  down: 'up',
};
function getOppositeDirection(direction: EdgeDirection): EdgeDirection {
  if (!direction || !opposites[direction]) {
    throw new Error(`Invalid direction "${direction}" provided...`);
  }
  return opposites[direction] ;
}

function polygonizeManhattan(path: ICoords[]): ICoords[] {
  const forwardPathPoints: ICoords[] = [];
  const reversePathPoints: ICoords[] = [];

  const multiplier = 1;
  let lastDir = findInitialDirection(path);
  while (path.length > 0) {
    // if the path is only 1 length, we just use the straight offsets logic because we'll "turn around"
    const dir = path.length > 1 ? findInitialDirection(path) : lastDir;

    const [forward, reverse] =
      dir === lastDir
        ? getStraightOffsets(dir, multiplier)
        : getRightAngleOffsets(dir, lastDir, multiplier);

    forwardPathPoints.push(offsetPoint(path[0], forward));
    reversePathPoints.push(offsetPoint(path[0], reverse));

    path = path.slice(1);
    lastDir = dir;
  }

  return forwardPathPoints.concat(reversePathPoints.reverse());
}

function polygonizeAny(path: ICoords[]): ICoords[] {
  const forwardPathPoints: ICoords[] = [];
  const reversePathPoints: ICoords[] = [];

  if (path.length < 2) {
    return path;
  }

  const multiplier = 1;
  let lastDir = findInitialVectorDirection(path)!;
  while (path.length > 0) {
    const dir = findInitialVectorDirection(path) || lastDir;
    const [forward, reverse] = getVectorOffsets(dir, multiplier);
    forwardPathPoints.push(offsetPoint(path[0], forward));
    reversePathPoints.push(offsetPoint(path[0], reverse));

    path = path.slice(1);
    lastDir = dir;
  }

  return forwardPathPoints.concat(reversePathPoints.reverse());
}

function offsetPoint(point: ICoords, offset: ICoords): ICoords {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  };
}

function getVectorOffsets(
  dir: ICoords,
  multiplier?: number
): [ICoords, ICoords] {
  multiplier = multiplier || 1;

  const perpendicularVec = normalizeVector(getPerpendicularVector(dir));
  return [
    perpendicularVec,
    { x: -1 * perpendicularVec.x, y: -1 * perpendicularVec.y },
  ];
}

// we assume we're going "forwards" in this direction and building a clockwise polygon around it
function getStraightOffsets(
  dir: EdgeDirection,
  multiplier?: number
): [ICoords, ICoords] {
  multiplier = multiplier || 1;
  let goesRight = 0;
  let goesDown = 0;

  if (dir === 'right') {
    goesDown = -1;
  } else if (dir === 'left') {
    goesDown = 1;
  } else if (dir === 'up') {
    goesRight = -1;
  } else if (dir === 'down') {
    goesRight = 1;
  }

  return [
    { x: goesRight * multiplier, y: goesDown * multiplier },
    { x: -1 * goesRight * multiplier, y: -1 * goesDown * multiplier },
  ];
}

function getRightAngleOffsets(
  dir: EdgeDirection,
  lastDir: EdgeDirection,
  multiplier?: number
): [ICoords, ICoords] {
  multiplier = multiplier || 1;
  let goesRight = 0;
  let goesDown = 0;

  // this logic seems very flawed
  // what are we hoping to return?
  // what does "goesRight" even mean?

  if (dir === 'right' && lastDir === 'up') {
    goesRight = -1;
    goesDown = -1;
  } else if (dir === 'right' && lastDir === 'down') {
    goesRight = 1;
    goesDown = -1;
  } else if (dir === 'left' && lastDir === 'up') {
    goesRight = -1;
    goesDown = 1;
  } else if (dir === 'left' && lastDir === 'down') {
    goesRight = 1;
    goesDown = 1;
  } else if (dir === 'up' && lastDir === 'left') {
    goesRight = -1;
    goesDown = 1;
  } else if (dir === 'up' && lastDir === 'right') {
    goesRight = -1;
    goesDown = -1;
  } else if (dir === 'down' && lastDir === 'left') {
    goesRight = 1;
    goesDown = 1;
  } else if (dir === 'down' && lastDir === 'right') {
    goesRight = 1;
    goesDown = -1;
  }

  return [
    { x: goesRight * multiplier, y: goesDown * multiplier },
    { x: -1 * goesRight * multiplier, y: -1 * goesDown * multiplier },
  ];
}

function findInitialDirection(path: ICoords[]): EdgeDirection {
  const [point1, point2, ...rest] = path;
  if (!point1 || !point2) {
    // this is a problem - "right" is not a good direction always
    return 'right';
  }

  if (point2.x != point1.x) {
    return point2.x > point1.x ? 'right' : 'left';
  } else {
    return point2.y > point1.y ? 'down' : 'up';
  }
}

function findFinalDirection(path: ICoords[]): EdgeDirection {
  return getOppositeDirection(findInitialDirection(path.slice().reverse()));
}

function findInitialVectorDirection(path: ICoords[]): ICoords | null {
  if (path.length < 2) {
    // console.warn('findInitialVectorDirection called illegally with length 0 / 1 path:', path);
    return null;
  }
  return normalizeVector({
    x: path[1].x - path[0].x,
    y: path[1].y - path[0].y,
  });
}
