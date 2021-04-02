// dependencies
import React from 'react';
// internals
import { cn } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { ITitleProps, TitleTag, TitleType } from './types';
export type { ITitleProps, TitleTag, TitleType };

export function Title(props: ITitleProps): JSX.Element {
  const titleType = (props.titleType || 3) as TitleType;
  const Tag = `h${titleType}` as TitleTag;

  return (
    <Tag
      className={cn(
        !props.overrideDefaultClassName && 'ArcTitle',
        props.className,
        props.textAlign || 'center',
      )}
    >
      {props.text}
    </Tag>
  );
}
