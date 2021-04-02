// dependencies
import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { IARCProps } from '@adam-sv/arc';

export interface IModalProps extends IARCProps {
  className?: string;
  style?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onShow?: () => void;
  onHide?: () => void;
  dontCloseOnBackgroundClick?: boolean;
  animationDuration?: number;
}

export function Modal(props: IModalProps): JSX.Element | null {
  const { isOpen, setIsOpen, children } = props;
  const style = props.style || {} as React.CSSProperties;

  useEffect(() => {
    if (isOpen && props.onShow) {
      props.onShow();
    }
    if (!isOpen && props.onHide) {
      props.onHide();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="ArcModal-helper-componentHidden">
      <Transition in={isOpen} timeout={props.animationDuration || 400}>
        {(animState) => ReactDOM.createPortal(
          <Fragment>
            <div
              className={cn(
                !props.overrideDefaultClassName && 'ArcModal',
                props.className,
                animState,
              )}
              style={style}
            >
              <div className="ArcModal-layer-background"
                onClick={e => !props.dontCloseOnBackgroundClick && setIsOpen(false)}
              />
              <div className="ArcModal-layer-content">
                {children}
              </div>
            </div>
          </Fragment>,
          document.body,
        )}
      </Transition>
    </div>
  )
}
