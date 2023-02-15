// dependencies
import { useCallback, useContext, useRef, useState } from 'react';
// internals
import { cn } from '@adam-sv/arc';
import { ChartContext } from '..';
// self
import { resizeHandlerFactory } from './logic';
import './style.scss';
// types
import type { ChartSide } from '../types';
import type { ICoords } from '@adam-sv/arc';

export interface IResizeBarProps {
  className?: string;
  side: ChartSide;
}

// TODO: Copy from vsm-interface
export function ResizeBar({ className, side }: IResizeBarProps) {
  const lastMousePos = useRef<ICoords>(null);
  const [isResizing, setIsResizing] = useState(false);
  const { axis } = useContext(ChartContext)!.sizes;

  const resizeDimension = side === 'left' || side === 'right' ? 'x' : 'y';
  const reverseMath = side === 'right' || side === 'bottom';

  // TODO: can we stop resizing on page losing focus?
  const handleResizeStart = useCallback(
    resizeHandlerFactory(
      lastMousePos,
      axis.setters[side],
      setIsResizing,
      resizeDimension,
      reverseMath
    ),
    [axis.setters[side]]
  );

  return (
    <div
      className={cn(
        'ArcChart-ResizeBar',
        `ArcChart-ResizeBar-${side}`,
        isResizing && `ArcChart-ResizeBar-active`,
        className
      )}
      onMouseDown={handleResizeStart}
    />
  );
}
