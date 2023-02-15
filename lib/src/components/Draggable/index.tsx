import React from 'react';
import { cn, IARCProps, RenderableContent } from '@adam-sv/arc';
import './style.scss';

export interface IDraggableProps extends IARCProps {
  children: RenderableContent;
  onDragStart?: (ev: React.DragEvent<HTMLDivElement>) => unknown;
  data: string;
}

export const Draggable = ({
  children,
  className,
  id,
  style,
  onDragStart,
  data,
}: IDraggableProps): JSX.Element => {
  const didDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData('text', data);
    if (onDragStart) onDragStart(ev);
  };

  return (
    <div
      className={cn(className, 'ArcDraggable')}
      id={id}
      style={style}
      draggable
      onDragStart={didDragStart}
    >
      {children}
    </div>
  );
};
