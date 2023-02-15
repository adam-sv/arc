import React from 'react';
import { Grid } from '@adam-sv/arc';
import { ICategoryTick } from '../types';
import './style.scss';

export interface IYAxisSwimLane {
  ticks: ICategoryTick[];
  postions: { x1: number; x2: number; y1: number; y2: number };
}

export const YAxisSwimLane = ({ ticks, postions }: IYAxisSwimLane) => {
  const { y1, y2, x1, x2 } = postions;
  return (
    <g className='YAxisSwimLane'>
      <g className='YAxisSwimLane-ticks'>
        {ticks.map((yTick) => (
          <text
            key={yTick.label}
            x={8}
            y={(yTick.endPos + yTick.startPos + 2) / 2}
          >
            {yTick.label}
          </text>
        ))}
      </g>
      <Grid
        xTicks={[x1, x2]}
        yTicks={ticks.map((tck) => tck.startPos).concat([y2])}
        boundingRect={new DOMRect(0, 0, x2 - x1, y2 - y1)}
      />
    </g>
  );
};
