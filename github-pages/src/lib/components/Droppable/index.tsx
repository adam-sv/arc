// dependencies
import React, { useState } from 'react';
// internals
import { cn, IARCProps, RenderableContent } from '@adam-sv/arc';
// styles

export interface IDroppableProps extends IARCProps {
  children: RenderableContent;
  onDrop?: (data: string, ev: React.DragEvent<HTMLDivElement>) => unknown;
  onDragOver?: (ev: React.DragEvent<HTMLDivElement>) => unknown;
  onDragOut?: (ev: React.DragEvent<HTMLDivElement>) => unknown;
}

export const Droppable = ({
  children,
  className,
  id,
  style,
  onDrop,
  onDragOver,
  onDragOut,
}: IDroppableProps): JSX.Element => {
  const [dragoverCounter, setDragoverCounter] = useState<number>(0);
  const didDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragoverCounter(0);
    const data = ev.dataTransfer.getData('text');
    if (onDrop) onDrop(data, ev);
    ev.dataTransfer.clearData();
  };

  const didDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const newCount = dragoverCounter + 1;
    setDragoverCounter(newCount);
    if (newCount === 1) {
      if (onDragOver) onDragOver(ev);
    }
  };

  const didDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const newCount = dragoverCounter - 1;
    setDragoverCounter(newCount);
    if (newCount === 0) {
      if (onDragOut) onDragOut(ev);
    }
  };

  return (
    <div
      className={cn(className, 'ArcDroppable')}
      id={id}
      style={style}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
      onDrop={didDrop}
      onDragEnter={didDragEnter}
      onDragLeave={didDragLeave}
    >
      {children}
    </div>
  );
};
