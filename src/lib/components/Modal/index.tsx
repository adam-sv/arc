// dependencies
import React, { CSSProperties, useEffect, type JSX } from 'react';
import ReactDOM from 'react-dom';
// internals
import { cn, Panel } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IModalProps extends IARCProps {
  children?: RenderableContent;
  className?: string;
  panelClassName?: string;
  style?: CSSProperties;
  panelStyle?: CSSProperties;
  isOpen: boolean;
  dontCloseOnBackgroundClick?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onShow?: () => void;
  onHide?: () => void;
  // Pass a DOM node if you want Modal to be a child of a theme-providing element
  // For example, <Background /> lets you render a new theme, so you can pass portalTargetElement={document.getElementById('#SomeBackgroundWithACoolTheme')}
  // but if your CSS is providing the theme in the root, you don't need this
  portalTargetElement?: Element | null;
  anchor?: 'center' | 'left' | 'right'; // defaults to center
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => unknown;
  domRef?: React.RefObject<HTMLDivElement | null>;
}

export function Modal(props: IModalProps): JSX.Element | null {
  const {
    children,
    className,
    panelClassName,
    dontCloseOnBackgroundClick,
    id,
    isOpen,
    onHide,
    onShow,
    overrideDefaultClassName,
    portalTargetElement,
    setIsOpen,
    style,
    anchor,
    onClick,
    domRef,
  } = props;
  const modalAnchor = anchor || 'center';

  useEffect(() => {
    if (isOpen && onShow) onShow();
    if (!isOpen && onHide) onHide();
  }, [isOpen, onHide, onShow]);

  const backgroundClickHandler = () => {
    if (isOpen && !dontCloseOnBackgroundClick) {
      setIsOpen(false);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={cn(
        !overrideDefaultClassName && 'ArcModal',
        `ArcModal-anchor-${modalAnchor}`,
        isOpen && 'ArcModal-open',
        className
      )}
      ref={domRef}
      onClick={onClick}
    >
      {!dontCloseOnBackgroundClick && (
        <div
          className='ArcModal-background-click-target'
          onClick={backgroundClickHandler}
        />
      )}
      <Panel
        className={cn(
          !overrideDefaultClassName && 'ArcModal-panel',
          panelClassName
        )}
        id={id}
        style={style}
      >
        {children}
      </Panel>
    </div>,
    portalTargetElement || document.body
  );
}
