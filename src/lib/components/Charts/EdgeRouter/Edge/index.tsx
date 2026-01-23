// dependencies
import React, { useCallback, useState } from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type {
  GraphNodeId,
  IARCProps,
  IGraphConnectionActions,
  IGraphEdge,
} from '@adam-sv/arc';

export interface IEdgeProps<EdgeType, NodeIdType extends GraphNodeId>
  extends IARCProps {
  arrowHeadDirection?: string;
  arrowHeadPoints: string;
  connectionActions?: IGraphConnectionActions<EdgeType, NodeIdType>;
  edge: IGraphEdge<EdgeType, NodeIdType>;
  getClassName?: (edge: IGraphEdge<EdgeType, NodeIdType>) => string | undefined;
  pathD: string;
}

export function Edge<EdgeType, NodeIdType extends GraphNodeId>({
  arrowHeadDirection,
  arrowHeadPoints,
  className,
  connectionActions,
  edge,
  getClassName,
  overrideDefaultClassName,
  pathD,
}: IEdgeProps<EdgeType, NodeIdType>): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <g
      className={cn(
        !overrideDefaultClassName && 'ArcEdge',
        className,
        edge.className,
        getClassName?.(edge),
        isHovered && 'hovered',
        arrowHeadDirection
      )}
      onMouseEnter={useCallback(
        (e: React.MouseEvent<SVGGElement>) => {
          setIsHovered(true);
          connectionActions?.onHover?.(e, edge);
        },
        [connectionActions?.onHover]
      )}
      onMouseLeave={useCallback(
        (e: React.MouseEvent<SVGGElement>) => {
          setIsHovered(false);
          connectionActions?.onUnhover?.(e, edge);
        },
        [connectionActions?.onUnhover]
      )}
      onClick={useCallback(
        (e: React.MouseEvent<SVGGElement>) =>
          connectionActions?.onClick?.(e, edge),
        [connectionActions?.onClick]
      )}
      onContextMenu={useCallback(
        (e: React.MouseEvent<SVGGElement>) =>
          connectionActions?.onContextMenu?.(e, edge),
        [connectionActions?.onContextMenu]
      )}
    >
      <path className='connector' d={pathD} />
      <polygon className='arrowhead' points={arrowHeadPoints} />
    </g>
  );
}
