// dependencies
import React from 'react';
// internals
import { geometry, normalizeVector, useMemoizedState, WCGridRouter } from '@adam-sv/arc';
import { Edge } from './Edge';
// types
import type { ICoords, LogicalGraph } from '@adam-sv/arc';
import type { IEdgeDataGeometry, IEdgeRouterMode, IEdgeRouterProps } from './types';
export type { IEdgeDataGeometry, IEdgeRouterMode, IEdgeRouterProps };

export function EdgeRouter(props: IEdgeRouterProps) {
  const [edgeGeometry, setEdgeGeometry] = useMemoizedState<IEdgeDataGeometry[]>([], {
    equalityTest: edgeGeometriesAreEqual,
  });
  const { edgeMode, edgeSpacing, shift } = getSafeProps(props);
  const { connectionActions, graph, noSVGContainer } = props;
  const coordinateSpace = getCoordinateSpace(graph, shift);

  computeEdgeGeometry(graph, edgeMode, setEdgeGeometry, edgeSpacing);

  const edgesGroup = (
    <g
      className="edges-group"
      transform={`translate(${shift.x}, ${shift.y})`}
    >
      {edgeGeometry.map(({ arrowHeadPoints, edge, pathD }) => 
        <Edge
          key={`${edge.from}->${edge.to}`}
          arrowHeadPoints={arrowHeadPoints}
          edge={edge}
          pathD={pathD}
          connectionActions={connectionActions}
        />
      )}
    </g>
  );

  if (noSVGContainer) return edgesGroup;

  return (
    <svg
      width={coordinateSpace.width}
      height={coordinateSpace.height}
      viewBox={`0 0 ${coordinateSpace.width} ${coordinateSpace.height}`}
    >
      {edgesGroup}
    </svg>
  );
}

function computeEdgeGeometry(
  graph: LogicalGraph,
  mode: IEdgeRouterMode,
  setEdgeGeometry: (geo: IEdgeDataGeometry[]) => void,
  spacing: number,
): void {
  if (['straight', 'straight-corners', 'straight-midpoints-corners'].indexOf(mode) >= 0) {
    const straightEdgeOption = mode === 'straight'
      ? undefined
      : mode.slice(9);
    computeStraightEdges(graph, setEdgeGeometry, straightEdgeOption as 'corners' | 'midpoints-corners' | undefined);
  } else if (mode === 'smart') {
    computeSmartEdges(graph, setEdgeGeometry, spacing);
  } else {
    throw new Error('EdgeRouter "edgeMode" was not passed correctly, handled values are "straight" and "smart".');
  }
}

function computeStraightEdges(
  graph: LogicalGraph,
  setEdgeGeometry: (geo: IEdgeDataGeometry[]) => void,
  straightEdgeOption?: 'corners' | 'midpoints-corners',
): void {
  const { accessors, edges } = graph;
  const edgeData:IEdgeDataGeometry[] = [];

  for (const edge of edges) {
    const { from, to } = edge;
    const fromNode = graph.getNode(from);
    const toNode = graph.getNode(to);

    const fromPos = accessors.getBounds(fromNode).toDOMRect();
    const toPos = accessors.getBounds(toNode).toDOMRect();

    const nearestPoints = geometry.getClosestPointsBetweenRects(fromPos, toPos, straightEdgeOption);

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

function computeSmartEdges(
  graph: LogicalGraph,
  setEdgeGeometry: (geo: IEdgeDataGeometry[]) => void,
  spacing: number,
): void {
  // console.log('computeSmartEdges');
  const { accessors, edges, nodes } = graph.webcolaDefinition;
  const gridRouter = new WCGridRouter(
    nodes,
    accessors,
    0,
  );

  const rawEdgePaths = gridRouter.routeEdges(
    edges,
    spacing,
    edge => edge.from,
    edge => edge.to,
  );

  const edgeData:IEdgeDataGeometry[] = [];
  edges.forEach((edge, i) => {
    const finalEdgeSegment = rawEdgePaths[i].slice(-1)[0];
    edgeData.push({
      arrowHeadPoints: buildArrowHead(finalEdgeSegment[1], {
        x: finalEdgeSegment[0].x - finalEdgeSegment[1].x,
        y: finalEdgeSegment[0].y - finalEdgeSegment[1].y,
      }),
      edge: edge,
      pathD: buildSmartPath(rawEdgePaths[i]),
    });
  });

  setEdgeGeometry(edgeData);
}

interface ISafeProps {
  edgeMode: IEdgeRouterMode;
  edgeSpacing: number;
  shift: ICoords;
}

function getSafeProps(props: IEdgeRouterProps): ISafeProps {
  return {
    edgeMode: props.edgeMode || 'straight',
    edgeSpacing: props.edgeSpacing || 4,
    shift: props.shift || { x: 0, y: 0 },
  };
}

function buildStraightPath(coords: ICoords[]) {
  return `M${polygonizeAny(coords)
    .map(co => `${co.x},${co.y}`)
    .join(' ')
  }`;
}

function buildArrowHead(arrowTip: ICoords, reverseVector: ICoords) {
  const { addVector, normalizeVector } = geometry;

  const reverseLength = 6;
  const sidewaysFlair = 2.5;

  reverseVector = normalizeVector(reverseVector);
  const perpendicularVector = normalizeVector({ x: reverseVector.y * -1, y: reverseVector.x });

  const arrowLeft = addVector(
    addVector(reverseVector, perpendicularVector, 1, sidewaysFlair),
    addVector(arrowTip, reverseVector, 1, reverseLength),
  );
  const arrowRight = addVector(
    addVector(reverseVector, perpendicularVector, 1, -1 * sidewaysFlair),
    addVector(arrowTip, reverseVector, 1, reverseLength),
  );

  return `${arrowTip.x},${arrowTip.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`;
}

function edgeGeometriesAreEqual(newEdgeData: IEdgeDataGeometry[], oldEdgeData: IEdgeDataGeometry[]) {
  if (newEdgeData.length !== oldEdgeData.length) {
    return false;
  }

  for (let i = 0; i < newEdgeData.length; i++) {
    const newD = newEdgeData[i];
    const oldD = oldEdgeData[i];
    if (
      newD.arrowHeadPoints !== oldD.arrowHeadPoints
      || newD.pathD !== oldD.pathD
      || newD.edge.from !== oldD.edge.from
      || newD.edge.to !== oldD.edge.to
    ) {
      return false;
    }
  }

  return true;
}

function getCoordinateSpace(graph: LogicalGraph, shift: ICoords) {
  const { top, left, width, height } = graph.boundingRect;

  return new DOMRect(top, left, width + shift.x, height + shift.y);
}

function buildSmartPath(edgePath: ICoords[][]) {
  const points:ICoords[] = edgePath.reduce((pointsList, segment) => {
    const last = pointsList.length - 1;
    segment.forEach((point: ICoords) => {
      if (
        !pointsList[last]
        || (
          pointsList[last].x !== point.x
          || pointsList[last].y !== point.y
        )
      ) {
        pointsList.push(point);
      }
    });
    return pointsList;
  }, []);

  return `M ${polygonizeManhattan(points)
    .map((point) => `${point.x},${point.y}`)
    .join(' L ')
  }`;
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

type Direction = 'left' | 'right' | 'up' | 'down';
const opposites = {
  left: 'right',
  up: 'down',
  right: 'left',
  down: 'up',
};
function getOppositeDirection(direction: Direction): Direction {
  if (!direction || !opposites[direction]) {
    throw new Error(`Invalid direction "${direction}" provided...`);
  }
  return opposites[direction] as Direction;
}

function polygonizeManhattan(path: ICoords[]): ICoords[] {
  const forwardPathPoints:ICoords[] = [];
  const reversePathPoints:ICoords[] = [];

  let multiplier = 1;
  let lastDir = findInitialDirection(path);
  while (path.length > 0) {
    const dir = findInitialDirection(path);
    const [forward, reverse] = (dir === lastDir)
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
  const forwardPathPoints:ICoords[] = [];
  const reversePathPoints:ICoords[] = [];

  let multiplier = 1;
  let lastDir = findInitialVectorDirection(path);
  while (path.length > 0) {
    const dir = findInitialVectorDirection(path);
    const [forward, reverse] = getVectorOffsets(lastDir, dir, multiplier);
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

function getVectorOffsets(dir: ICoords, lastDir: ICoords, multiplier?: number): [ICoords, ICoords] {
  multiplier = multiplier || 1;

  return getStraightOffsets('left', multiplier);
}

// we assume we're going "forwards" in this direction and building a clockwise polygon around it
function getStraightOffsets(dir: Direction, multiplier?: number): [ICoords, ICoords] {
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

function getRightAngleOffsets(dir: Direction, lastDir: Direction, multiplier?: number): [ICoords, ICoords] {
  multiplier = multiplier || 1;
  let goesRight = 0;
  let goesDown = 0;

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

function findInitialDirection(path: ICoords[]): Direction {
  const [point1, point2, ...rest] = path;
  if (!point1 || !point2) {
    return 'right';
  }

  if (point2.x != point1.x) {
    return point2.x > point1.x ? 'right' : 'left';
  } else {
    return point2.y > point1.y ? 'down' : 'up';
  }
}

function findFinalDirection(path: ICoords[]): Direction {
  return getOppositeDirection(findInitialDirection(path.slice().reverse()));
}

function findInitialVectorDirection(path: ICoords[]): ICoords {
  if (path.length < 2) {
    // console.warn('findInitialVectorDirection called illegally with length 0 / 1 path:', path);
    return { x: 1, y: 0 };
  }
  return normalizeVector({
    x: path[1].x - path[0].x,
    y: path[1].y - path[0].y,
  });
}
