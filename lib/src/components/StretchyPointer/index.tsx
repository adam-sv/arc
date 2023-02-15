import React, { MouseEvent } from 'react';

// dependencies
import { CSSProperties, useState } from 'react';
// internals
import { cn, ChevronLeft, ChevronRight } from '@adam-sv/arc';
// styles
import './style.scss';
// types

import type { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IStretchyPointerProps extends IARCProps {
  overflowDirection: 'left' | 'right';
  overflowAmount: string;
  children: RenderableContent;
  value: boolean;
  onClick: (ev: MouseEvent<HTMLDivElement>) => unknown;
}

interface ICSSPropertiesWithSPVar extends CSSProperties {
  '--overflow-amount'?: string;
}

export function StretchyPointer(props: IStretchyPointerProps): JSX.Element {
  const {
    overflowAmount,
    children,
    overflowDirection,
    value,
    className,
    onClick,
  } = props;

  const style: ICSSPropertiesWithSPVar = {
    '--overflow-amount': overflowAmount,
  };

  return (
    <div
      className={cn(
        'ArcStretchyPointer',
        className,
        value && 'is-expanded',
        overflowDirection === 'left' && 'is-left'
      )}
      style={style}
      onClick={onClick}
    >
      {overflowDirection === 'left' && <ChevronLeft />}
      {children}
      {overflowDirection === 'right' && <ChevronRight />}
    </div>
  );
}
