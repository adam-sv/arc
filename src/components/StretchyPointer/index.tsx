// dependencies
import React, { CSSProperties, useState } from 'react';
// internals
import { cn, ChevronLeft, ChevronRight, getSizeClassName } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { IStretchyPointerProps } from './types.d';
export type { IStretchyPointerProps };

interface ICSSPropertiesWithSPVar extends CSSProperties {
  '--overflow-amount'?: string;
}

export function StretchyPointer(props: IStretchyPointerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const style: ICSSPropertiesWithSPVar = {
    '--overflow-amount': props.overflowAmount,
  };

  return (
    <div
      className={cn(
        'ArcStretchyPointer',
        props.className,
        isExpanded && 'is-expanded',
        props.overflowDirection === 'left' && 'is-left'
      )}
      style={style}
      onClick={e => setIsExpanded(!isExpanded)}
    >
      {props.overflowDirection === 'left' && <ChevronLeft />}
      {props.children}
      {props.overflowDirection === 'right' && <ChevronRight />}
    </div>
  );
}
