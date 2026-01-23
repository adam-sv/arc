import { MouseEvent, type JSX } from 'react';

// dependencies
import { CSSProperties } from 'react';
// internals
import { cn, MatIcon } from '@adam-sv/arc';
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
  domRef?: React.RefObject<HTMLDivElement | null>;
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
    domRef,
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
      ref={domRef}
    >
      {overflowDirection === 'left' && <MatIcon.ChevronLeft />}
      {children}
      {overflowDirection === 'right' && <MatIcon.ChevronRight />}
    </div>
  );
}
