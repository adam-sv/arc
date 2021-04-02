// dependencies
import React, { CSSProperties } from 'react';
// internals
import { cn } from '@adam-sv/arc';
// types
import type { IARCProps } from '@adam-sv/arc';

export interface IStoryContainerProps extends IARCProps {
  style?: CSSProperties;
}

export function StoryContainer({
  children,
  style,
  className,
}:IStoryContainerProps) {
  return (
    <div
      className={cn('StoryContainer', className)}
      style={{
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
