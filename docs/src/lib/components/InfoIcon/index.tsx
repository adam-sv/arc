// dependencies
import React, { useState } from 'react';
import { cn } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IInfoIconProps } from './types';
export type { IInfoIconProps };

// TODO: should this be refactored as a Modal
// and it opens "softly" on mouseover, and you can click to "hard open" it?
// seems like it'd be better UX and debuggability and reuse and CSS
export function InfoIcon({
  children,
  className,
  id,
  style,
  text,
}: IInfoIconProps) {
  const [isShowing, setIsShowing] = useState(false);

  if (!(text || children)) {
    return null;
  }

  return (
    <div
      className={cn('ArcInfoIcon', className)}
      id={id}
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
      style={style}
    >
      <span>i</span>
      {isShowing && (
        <div className='ArcInfoIcon-tooltip'>
          <div className='ArcInfoIcon-tooltip-content'>{text || children}</div>
          <div className='ArcInfoIcon-tooltip-arrow' />
        </div>
      )}
    </div>
  );
}
