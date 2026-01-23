// dependencies
import React, { useContext } from 'react';
// internals
import { ChartComponentContext, cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';

export interface IGridProps extends IARCProps {
  xTicks: number[];
  yTicks: number[];
  xDashed?: number | string;
  yDashed?: number | string;
}

export function Grid({
  className,
  xTicks,
  yTicks,
  yDashed,
  xDashed,
}: IGridProps) {
  const chartComponentState = useContext(ChartComponentContext);
  if (!chartComponentState) return null;

  const { height, width } = chartComponentState.svgSize;
  const boundingRect = new DOMRect(0, 0, width, height);

  return (
    <g className={cn('ArcGrid', className)}>
      {xTicks.map((xTick, i) => (
        <line
          key={`xGrid-${i}`}
          className='ArcGrid-line ArcGrid-line-x'
          y1={boundingRect.top}
          y2={boundingRect.bottom}
          x1={xTick}
          x2={xTick}
          strokeDasharray={xDashed}
        />
      ))}
      {yTicks.map((yTick, i) => (
        <line
          key={`yGrid-${i}`}
          className='ArcGrid-line ArcGrid-line-y'
          x1={boundingRect.left}
          x2={boundingRect.right}
          y1={yTick}
          y2={yTick}
          strokeDasharray={yDashed}
        />
      ))}
    </g>
  );
}
