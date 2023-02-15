// dependencies
import React from 'react';
// internals
import { cn, Surface } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IARCProps } from '../../types';

export interface IPanelProps extends IARCProps {
  domRef?: React.RefObject<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Panel = (props: IPanelProps): JSX.Element => {
  const {
    children,
    className,
    id,
    domRef,
    overrideDefaultClassName,
    style,
    onClick,
  } = props;

  return (
    <Surface
      className={cn(className, !overrideDefaultClassName && 'ArcPanel')}
      id={id}
      overrideDefaultClassName={overrideDefaultClassName}
      style={style}
      domRef={domRef}
      onClick={onClick}
    >
      {children}
    </Surface>
  );
};
