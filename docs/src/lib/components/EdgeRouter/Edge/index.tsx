// dependencies
import React, { useState } from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type {
  IARCProps,
  IGraphConnectionActions,
  IGraphEdge,
} from '@adam-sv/arc';

export interface IEdgeProps<T = any> extends IARCProps {
  arrowHeadPoints: string;
  edge: IGraphEdge<T>;
  connectionActions?: IGraphConnectionActions;
  pathD: string;
  arrowHeadDirection?: string;
}

export function Edge<T = any>(props: IEdgeProps<T>): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const connectionActions = props.connectionActions || {};
  const { arrowHeadPoints, edge, pathD, arrowHeadDirection } = props;

  return (
    <g
      className={cn(
        !props.overrideDefaultClassName && 'ArcEdge',
        props.className,
        edge.className,
        isHovered && 'hovered',
        arrowHeadDirection
      )}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (connectionActions.onHover) {
          connectionActions.onHover(e, edge);
        }
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        if (connectionActions.onUnhover) {
          connectionActions.onUnhover(e, edge);
        }
      }}
      onClick={(e) =>
        connectionActions.onClick
          ? connectionActions.onClick(e, edge)
          : undefined
      }
    >
      <path className='connector' d={pathD} />
      <polygon className='arrowhead' points={arrowHeadPoints} />
    </g>
  );
}
