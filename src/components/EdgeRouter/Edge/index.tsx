// dependencies
import React, { useState } from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { IARCProps, IGraphConnectionActions, IGraphEdge } from '@adam-sv/arc';

export interface IEdgeProps extends IARCProps {
  arrowHeadPoints: string;
  edge: IGraphEdge;
  connectionActions: IGraphConnectionActions;
  pathD: string;
}

export function Edge(props: IEdgeProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const connectionActions = props.connectionActions || {};
  const { arrowHeadPoints, edge, pathD } = props;

  return (
    <g
      className={cn(
        !props.overrideDefaultClassName && 'ArcEdge',
        props.className,
        isHovered && 'hovered',
      )}
      onMouseEnter={e => {
        setIsHovered(true);
        if (connectionActions.onHover) { connectionActions.onHover(e, edge); }
      }}
      onMouseLeave={e => {
        setIsHovered(false);
        if (connectionActions.onUnhover) { connectionActions.onUnhover(e, edge); }
      }}
      onClick={connectionActions.onClick ? (e) => connectionActions.onClick(e, edge) : null}
    >
      <path
        className="connector"
        d={pathD}
      />
      <polygon
        className="arrowhead"
        points={arrowHeadPoints}
      />
    </g>
  );
}
