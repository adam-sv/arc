// internals
import { geometry } from '../../../geometry';
// types
import type { ICoords } from '@adam-sv/arc';

const { getPerpendicularVector, normalizeVector } = geometry;

export function buildStraightPath(coords: ICoords[]) {
  return `M${polygonizeAny(coords)
    .map((co) => `${co.x},${co.y}`)
    .join(' ')}`;
}

export function buildArrowHead(arrowTip: ICoords, reverseVector: ICoords) {
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

  return `${arrowTip.x},${arrowTip.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`;
}

export function buildSmartPath(edgePath: ICoords[][]) {
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
export function getOppositeDirection(direction: EdgeDirection): EdgeDirection {
  if (!direction || !opposites[direction]) {
    throw new Error(`Invalid direction "${direction}" provided...`);
  }
  return opposites[direction];
}

export function polygonizeManhattan(path: ICoords[]): ICoords[] {
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

export function polygonizeAny(path: ICoords[]): ICoords[] {
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

export function offsetPoint(point: ICoords, offset: ICoords): ICoords {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  };
}

export function getVectorOffsets(
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
export function getStraightOffsets(
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

export function getRightAngleOffsets(
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

export function findInitialDirection(path: ICoords[]): EdgeDirection {
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

export function findFinalDirection(path: ICoords[]): EdgeDirection {
  return getOppositeDirection(findInitialDirection(path.slice().reverse()));
}

export function findInitialVectorDirection(path: ICoords[]): ICoords | null {
  if (path.length < 2) {
    // console.warn('findInitialVectorDirection called illegally with length 0 / 1 path:', path);
    return null;
  }
  return normalizeVector({
    x: path[1].x - path[0].x,
    y: path[1].y - path[0].y,
  });
}

export function toDOMRect(rect: {
  x: number;
  X: number;
  y: number;
  Y: number;
}): DOMRect {
  return new DOMRect(rect.x, rect.y, rect.X - rect.x, rect.Y - rect.y);
}
