import { ICoords } from '@adam-sv/arc';

interface ICoordsDistance {
  point: ICoords;
  distance: number;
}

interface ICoordsDistanceBetween {
  points: [ICoords, ICoords];
  distance: number;
}

export const getEdgeMidpoints = (rect: DOMRect): ICoords[] => {
  return [
    { // Top-mid
      x: rect.x + (rect.width / 2),
      y: rect.y,
    },
    { // right-mid
      x: rect.x + rect.width,
      y: rect.y + (rect.height / 2),
    },
    { // bottom-mid
      x: rect.x + (rect.width / 2),
      y: rect.y + rect.height,
    },
    { // left-mid
      x: rect.x,
      y: rect.y + (rect.height / 2),
    },
  ];
}

export const getEdgeCorners = (rect: DOMRect): ICoords[] => {
  return [
    { // Top-left
      x: rect.x,
      y: rect.y,
    },
    { // Top-right
      x: rect.x + rect.width,
      y: rect.y,
    },
    { // bottom-right
      x: rect.x + rect.width,
      y: rect.y + rect.height,
    },
    { // bottom-left
      x: rect.x,
      y: rect.y + rect.height,
    },
  ];
}

export const getCenter = (rect: DOMRect): ICoords => {
  return {
    x: (rect.x + (rect.width / 2)),
    y: (rect.y + (rect.height / 2)),
  }
}

export const getDistanceBetweenCoords = (coords1: ICoords, coords2: ICoords) => {
  const run = coords2.x - coords1.x;
  const rise = coords2.y - coords1.y;
  return Math.sqrt((run * run) + (rise * rise));
}

export const getClosestPointToAnotherRect = (rect: DOMRect, anotherRect: DOMRect): ICoords => {
  const eligiblePoints: ICoords[] = [
    ...getEdgeMidpoints(rect),
    // ...getEdgeCorners(rect), // disable corners for now
  ];

  const centerOfTheOtherRect: ICoords = getCenter(anotherRect);

  return eligiblePoints.reduce((previousClosestPoint: ICoords, curPoint: ICoords) => {
    const previousDistance = getDistanceBetweenCoords(previousClosestPoint, centerOfTheOtherRect);
    const curDistance = getDistanceBetweenCoords(curPoint, centerOfTheOtherRect);
    return previousDistance > curDistance ? curPoint : previousClosestPoint;
  }, eligiblePoints[0]);
}

// for now, this just returns the closest edge midpoints
export const getClosestPointsBetweenRects =
  (rect1: DOMRect, rect2: DOMRect): [ICoords, ICoords] => {
    const eligiblePoints1: ICoords[] = [
      ...getEdgeMidpoints(rect1),
      // ...getEdgeCorners(rect1),
    ];

    const eligiblePoints2: ICoords[] = [
      ...getEdgeMidpoints(rect2),
      // ...getEdgeCorners(rect2),
    ];

    const default1 = eligiblePoints1[0];
    const default2 = eligiblePoints2[0];
    const defaultDistance = getDistanceBetweenCoords(default1, default2);
    const { points } = eligiblePoints1.reduce((
      previous: ICoordsDistanceBetween,
      curPoint: ICoords,
    ) => {
      // get closest eligible point from rect2 to current point
      const defaultClosest: ICoordsDistance = {
        point: eligiblePoints2[0],
        distance: getDistanceBetweenCoords(curPoint, eligiblePoints2[0]),
      };
      const closestCoords = eligiblePoints2.reduce((
        previousClosestPoint: ICoordsDistance,
        curPoint2: ICoords,
      ) => {
        const curDistance = getDistanceBetweenCoords(curPoint, curPoint2);
        return previousClosestPoint.distance > curDistance
          ? { point: curPoint2, distance: curDistance }
          : previousClosestPoint;
      }, defaultClosest);
      // then, compare that distance to the previous distance
      return previous.distance > closestCoords.distance
        ? {
          points: [curPoint, closestCoords.point],
          distance: closestCoords.distance,
        } as ICoordsDistanceBetween
        : previous;

    }, { points: [default1, default2], distance: defaultDistance});
    return points;
}
