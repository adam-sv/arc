import React, { useEffect, useState } from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
import { IParallelAxisChartDerivedDatum } from '.';

export interface IParallelAxisChartLineProps {
  derivedDatum: IParallelAxisChartDerivedDatum;
  className?: string;
}

interface ILinePosition {
  x1: string;
  x2: string;
  y1: string;
  y2: string;
}

const getLinePositions = (
  fractionalPoints: { x: number; y: number }[]
): ILinePosition[] =>
  fractionalPoints.reduce((positions: ILinePosition[], point, pointIndex) => {
    const hasNextPoint = pointIndex + 1 < fractionalPoints.length;
    if (!hasNextPoint) return positions;
    const nextPoint = fractionalPoints[pointIndex + 1];
    return [
      ...positions,
      {
        x1: `${point.x * 100}%`,
        y1: `${point.y * 100}%`,
        x2: `${nextPoint.x * 100}%`,
        y2: `${nextPoint.y * 100}%`,
      },
    ];
  }, []);

export const ParallelAxisChartLine = (
  props: IParallelAxisChartLineProps
): JSX.Element => {
  const { derivedDatum, className } = props;
  const { fractionalPoints } = derivedDatum;
  const [linePositions, setLinePostions] = useState(
    getLinePositions(fractionalPoints)
  );

  useEffect(() => {
    setLinePostions(getLinePositions(fractionalPoints));
  }, [fractionalPoints]);
  return (
    <g className={cn('ArcParallelAxisChart-Line', className)}>
      {linePositions.map((pos, index) => (
        <line key={`ArcParallelAxisChart-Line-segment-${index}`} {...pos} />
      ))}
    </g>
  );
};
