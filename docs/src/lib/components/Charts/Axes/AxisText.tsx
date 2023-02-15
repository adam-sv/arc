import React, { Fragment, useRef } from 'react';
import { cn } from '@adam-sv/arc';
import { RenderableContent } from '@adam-sv/arc';

export interface IXAxisText {
  ticks: {
    position: { x1: number; x2: number; y1: number; y2: number };
    content: RenderableContent;
  }[];
  textOffset?: number;
  className?: string;
  orientation: 'left' | 'right' | 'top' | 'bottom';
}

export const AxisText = ({
  ticks,
  className = '',
  //default text offset for all the other grpahs
  textOffset = 8,
  orientation,
}: IXAxisText) => {
  //12 is the default size in the styles
  const textRef = useRef<SVGGElement>(null);
  if (textRef.current) {
    console.log(textRef.current.getBoundingClientRect().width);
  }

  const cN =
    orientation === 'left'
      ? 'YAxisTextLeft'
      : orientation === 'right'
      ? 'YAxisTextRight'
      : orientation === 'bottom'
      ? 'XAxisTextBottom'
      : 'XAxisTextTop';
  return (
    <g className={cn(cN, className)}>
      {ticks.map((tick, i) => {
        const { x1, x2, y1, y2 } = tick.position;
        return (
          <Fragment key={i}>
            <line x1={x1} x2={x2} y1={y1} y2={y2} />
            <text
              x={x1 - (orientation === 'left' ? textOffset : 0)}
              y={
                y2 +
                (orientation === 'bottom'
                  ? textOffset
                  : orientation === 'top'
                  ? -textOffset
                  : 0)
              }
            >
              {tick.content}
            </text>
          </Fragment>
        );
      })}
    </g>
  );
};
