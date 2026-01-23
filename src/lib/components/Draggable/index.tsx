import { cn, IARCProps, ICoords, RenderableContent } from '@adam-sv/arc';
import './style.scss';
import type { JSX } from 'react';

export interface IDraggableProps extends IARCProps {
  children: RenderableContent;
  onDragStart?: (
    ev: React.DragEvent<HTMLDivElement>,
    dragStartedAtCoords: ICoords
  ) => unknown;
  data: string;
  domRef?: React.RefObject<HTMLDivElement | null>;
  divEventListeners?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export const Draggable = ({
  children,
  className,
  id,
  style,
  onDragStart,
  data,
  domRef,
  divEventListeners = {},
}: IDraggableProps): JSX.Element => {
  const didDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    const x = ev.nativeEvent.offsetX;
    const y = ev.nativeEvent.offsetY;
    ev.dataTransfer.setData(
      'text',
      JSON.stringify({ data, dragStartPosition: { x, y } })
    );
    if (onDragStart) onDragStart(ev, { x, y });
  };

  return (
    <div
      className={cn(className, 'ArcDraggable')}
      id={id}
      style={style}
      ref={domRef}
      draggable
      onDragStart={didDragStart}
      data-testid={'draggable'}
      {...divEventListeners}
    >
      {children}
    </div>
  );
};
