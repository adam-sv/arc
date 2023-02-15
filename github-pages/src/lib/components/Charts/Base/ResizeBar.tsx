// dependencies
import { useCallback, useContext } from 'react';
import { cn } from '@adam-sv/arc';
// internals
import { ChartContext } from '.';
import { ChartSide } from './types';

export interface IResizeBarProps {
  className?: string;
  side: ChartSide;
}

// TODO: Copy from vsm-interface
export function ResizeBar({ className, side }: IResizeBarProps) {
  const { axis } = useContext(ChartContext)!;

  const handleMouseDown = useCallback(() => null, [axis.setSizeBySide]);

  return (
    <div
      className={cn(
        'ArcChart-ResizeBar',
        `ArcChart-ResizeBar-${side}`,
        className
      )}
      onMouseDown={handleMouseDown}
    />
  );
}
