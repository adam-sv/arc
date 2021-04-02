// dependencies
import React from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { IARCProps } from '@adam-sv/arc';
export interface IGridProps extends IARCProps {
  xTicks: number[];
  yTicks: number[];
  boundingRect: DOMRect;
}

export function Grid({ boundingRect, className, xTicks, yTicks }:IGridProps) {
  return (
    <g className={cn("ArcGrid", className)}>
      {xTicks.map((xTick, i) =>
        <line
          key={`xGrid-${i}`}
          className="ArcGrid-line ArcGrid-line-x" y1={boundingRect.top} y2={boundingRect.bottom}
          x1={xTick}
          x2={xTick}
        />
      )}
      {yTicks.map((yTick, i) =>
        <line
          key={`yGrid-${i}`}
          className="ArcGantt-grid" x1={boundingRect.left} x2={boundingRect.right}
          y1={yTick}
          y2={yTick}
        />
      )}
    </g>
  );
}
