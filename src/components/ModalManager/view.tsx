// visual components
import React, {
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
} from 'react';

// styles
import './style.css';

import { cn } from '@adam-sv/arc';

export interface IModalManagerViewProps {
  modal?: JSX.Element;
  onBackdropClick: MouseEventHandler;
  setBackdrop: LegacyRef<HTMLDivElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

export const View = ({
  modal: Modal,
  onBackdropClick,
  setBackdrop,
  onKeyDown,
}: IModalManagerViewProps) => (
  <div
    className={cn('ArcModal-backdrop', !!Modal && 'is-shown')}
    onClick={onBackdropClick}
    ref={setBackdrop}
    onKeyDown={onKeyDown}
  >
    {Modal}
  </div>
);
