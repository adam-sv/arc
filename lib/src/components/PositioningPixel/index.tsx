// dependencies
import React from 'react';
// internals
import { cn } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IPositioningPixelProps } from './types';
export type { IPositioningPixelProps };

export function PositioningPixel(props: IPositioningPixelProps) {
  return (
    <div className={cn('ArcPositioningPixel', props.className)}>
      {props.children}
    </div>
  );
}
