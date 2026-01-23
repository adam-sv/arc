import type { ICoords } from '@adam-sv/arc';

export interface IGeometry {
  // vector math
  addVector: (
    vec1: ICoords,
    vec2: ICoords,
    scale1?: number,
    scale2?: number
  ) => ICoords;
  getDistanceBetweenCoords: (coords1: ICoords, coords2: ICoords) => number;
  getMagnitude: (vec1: ICoords) => number;
  getPerpendicularVector: typeof getPerpendicularVector;
  normalizeVector: (vec: ICoords) => ICoords;
  // DOMRect math
  getCenter: (rect: DOMRect) => ICoords;
  getClosestPointsBetweenRects: (
    rect: DOMRect,
    anotherRect: DOMRect,
    mode: 'midpoints' | 'corners' | 'midpoints-corners'
  ) => [ICoords, ICoords];
  getClosestPointToAnotherRect: (
    rect: DOMRect,
    anotherRect: DOMRect
  ) => ICoords;
  getEdgeCorners: (rect: DOMRect) => ICoords[];
  getEdgeMidpoints: (rect: DOMRect) => ICoords[];
  rectsAreEqual: (rect1: DOMRect, rect2: DOMRect) => boolean;
}

export const geometry: IGeometry = {
  // points
  addVector,
  getDistanceBetweenCoords,
  getMagnitude,
  getPerpendicularVector,
  normalizeVector,
  // rects
  getCenter,
  getClosestPointsBetweenRects,
  getClosestPointToAnotherRect,
  getEdgeCorners,
  getEdgeMidpoints,
  rectsAreEqual,
};

export interface ICoordsDistance {
  point: ICoords;
  distance: number;
}

export interface ICoordsDistanceBetween {
  points: [ICoords, ICoords];
  distance: number;
}

export function addVector(
  vec1: ICoords,
  vec2: ICoords,
  scale1?: number,
  scale2?: number
): ICoords {
  scale1 = scale1 || 1;
  scale2 = scale2 || 1;

  return {
    x: scale1 * vec1.x + scale2 * vec2.x,
    y: scale1 * vec1.y + scale2 * vec2.y,
  };
}

export function getMagnitude(vec: ICoords) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function getPerpendicularVector(vec: ICoords): ICoords {
  const normalized = normalizeVector(vec);
  return {
    x: -1 * normalized.y,
    y: normalized.x,
  };
}

export function normalizeVector(vec: ICoords): ICoords {
  const magnitude = getMagnitude(vec);
  if (magnitude === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: vec.x / magnitude,
    y: vec.y / magnitude,
  };
}

export function getEdgeMidpoints(rect: DOMRect): ICoords[] {
  return [
    {
      // Top-mid
      x: rect.x + rect.width / 2,
      y: rect.y,
    },
    {
      // right-mid
      x: rect.x + rect.width,
      y: rect.y + rect.height / 2,
    },
    {
      // bottom-mid
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height,
    },
    {
      // left-mid
      x: rect.x,
      y: rect.y + rect.height / 2,
    },
  ];
}

export function getEdgeCorners(rect: DOMRect): ICoords[] {
  return [
    {
      // Top-left
      x: rect.x,
      y: rect.y,
    },
    {
      // Top-right
      x: rect.x + rect.width,
      y: rect.y,
    },
    {
      // bottom-right
      x: rect.x + rect.width,
      y: rect.y + rect.height,
    },
    {
      // bottom-left
      x: rect.x,
      y: rect.y + rect.height,
    },
  ];
}

export function getCenter(rect: DOMRect): ICoords {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

export function getDistanceBetweenCoords(coords1: ICoords, coords2: ICoords) {
  const run = coords2.x - coords1.x;
  const rise = coords2.y - coords1.y;
  return Math.sqrt(run * run + rise * rise);
}

export function getClosestPointToAnotherRect(
  rect: DOMRect,
  anotherRect: DOMRect
): ICoords {
  const eligiblePoints: ICoords[] = [
    ...getEdgeMidpoints(rect),
    // ...getEdgeCorners(rect), // disable corners for now
  ];

  const centerOfTheOtherRect: ICoords = getCenter(anotherRect);

  return eligiblePoints.reduce(
    (previousClosestPoint: ICoords, curPoint: ICoords) => {
      const previousDistance = getDistanceBetweenCoords(
        previousClosestPoint,
        centerOfTheOtherRect
      );
      const curDistance = getDistanceBetweenCoords(
        curPoint,
        centerOfTheOtherRect
      );
      return previousDistance > curDistance ? curPoint : previousClosestPoint;
    },
    eligiblePoints[0]
  );
}

// for now, this just returns the closest edge midpoints
export function getClosestPointsBetweenRects(
  rect1: DOMRect,
  rect2: DOMRect,
  mode?: 'midpoints' | 'corners' | 'midpoints-corners'
): [ICoords, ICoords] {
  let useMidpoints = true;
  let useCorners = false;
  if (mode) {
    useMidpoints = mode.indexOf('midpoints') >= 0;
    useCorners = mode.indexOf('corners') >= 0;
  }

  const eligiblePoints1: ICoords[] = [
    ...(useMidpoints ? getEdgeMidpoints(rect1) : []),
    ...(useCorners ? getEdgeCorners(rect1) : []),
  ];

  const eligiblePoints2: ICoords[] = [
    ...(useMidpoints ? getEdgeMidpoints(rect2) : []),
    ...(useCorners ? getEdgeCorners(rect2) : []),
  ];

  const default1 = eligiblePoints1[0];
  const default2 = eligiblePoints2[0];
  const defaultDistance = getDistanceBetweenCoords(default1, default2);
  const { points } = eligiblePoints1.reduce(
    (previous: ICoordsDistanceBetween, curPoint: ICoords) => {
      // get closest eligible point from rect2 to current point
      const defaultClosest: ICoordsDistance = {
        point: eligiblePoints2[0],
        distance: getDistanceBetweenCoords(curPoint, eligiblePoints2[0]),
      };
      const closestCoords = eligiblePoints2.reduce(
        (previousClosestPoint: ICoordsDistance, curPoint2: ICoords) => {
          const curDistance = getDistanceBetweenCoords(curPoint, curPoint2);
          return previousClosestPoint.distance > curDistance
            ? { point: curPoint2, distance: curDistance }
            : previousClosestPoint;
        },
        defaultClosest
      );
      // then, compare that distance to the previous distance
      return previous.distance > closestCoords.distance
        ? ({
            points: [curPoint, closestCoords.point],
            distance: closestCoords.distance,
          } as ICoordsDistanceBetween)
        : previous;
    },
    { points: [default1, default2], distance: defaultDistance }
  );
  return points;
}

export function rectsAreEqual(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.top === rect2.top &&
    rect1.right === rect2.right &&
    rect1.bottom === rect2.bottom &&
    rect1.left === rect2.left
  );
}
