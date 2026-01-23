// internals
import { cn } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { ITitleProps, TitleTag, TitleType } from './types';
import type { JSX } from 'react';
export type { ITitleProps, TitleTag, TitleType };

export function Title(props: ITitleProps): JSX.Element {
  const {
    overrideDefaultClassName,
    className,
    textAlign,
    id,
    style,
    children,
    domRef,
  } = props;
  const titleType = props.titleType || 3;
  const Tag = `h${titleType}` as TitleTag;

  return (
    <Tag
      className={cn(
        !overrideDefaultClassName && 'ArcTitle',
        className,
        textAlign
      )}
      id={id}
      style={style}
      ref={domRef}
    >
      {children}
    </Tag>
  );
}
