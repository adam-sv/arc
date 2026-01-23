// dependencies
import React, { MutableRefObject } from 'react';
// internals
import { NumberUtils, throttle } from '@adam-sv/arc';
// types
import type { ICoords } from '@adam-sv/arc';

export function resizeHandlerFactory(
  lastMousePos: MutableRefObject<ICoords | null>,
  setWidth: React.Dispatch<React.SetStateAction<number>>,
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>,
  dimension: 'x' | 'y' = 'x',
  invertDelta = false,
  minWidth: number,
  maxWidth: number
) {
  const deltaMultiplier = invertDelta ? -1 : 1;

  return (e: React.MouseEvent) => {
    const dragStart = { x: e.pageX, y: e.pageY };
    setIsResizing(true);
    lastMousePos.current = dragStart;

    const onMouseMove = throttle((e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const currentMousePos = { x: e.pageX, y: e.pageY };
      if (!lastMousePos.current) lastMousePos.current = currentMousePos;

      const nextPos = currentMousePos[dimension];
      const delta = nextPos - (lastMousePos.current[dimension] || 100);
      setWidth((last) => {
        lastMousePos.current = currentMousePos;
        return NumberUtils.clamp(
          last + delta * deltaMultiplier,
          minWidth,
          maxWidth
        );
      });
    }, 100);

    document.addEventListener('mousemove', onMouseMove);

    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const finalPos = { x: e.pageX, y: e.pageY };
      const delta =
        finalPos[dimension] - (lastMousePos.current?.[dimension] || 100);

      setWidth((last) => {
        lastMousePos.current = null;
        return NumberUtils.clamp(
          last + delta * deltaMultiplier,
          minWidth,
          maxWidth
        );
      });
      setIsResizing(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
  };
}
