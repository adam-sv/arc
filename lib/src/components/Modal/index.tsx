// dependencies
import React, { CSSProperties, Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
// internals
import { cn, Panel } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IModalBackgroundProps extends IARCProps {
  style?: CSSProperties;
}

export interface IModalProps extends IARCProps {
  // should render anything!
  children?: JSX.Element | JSX.Element[] | RenderableContent;
  // style
  className?: string;
  style?: React.CSSProperties;
  animationDuration?: number;
  backgroundProps?: IModalBackgroundProps;
  topLevelContainerClassName?: string;
  // open/close logic & listeners
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
}

export function Modal({
  animationDuration,
  backgroundProps = {},
  children,
  className,
  dontCloseOnBackgroundClick,
  id,
  isOpen,
  onHide,
  onShow,
  overrideDefaultClassName,
  portalTargetElement,
  setIsOpen,
  style,
  topLevelContainerClassName,
  anchor,
  onClick,
}: IModalProps): JSX.Element | null {
  const modalAnchor = anchor || 'center';

  useEffect(() => {
    if (isOpen && onShow) {
      onShow();
    }
    if (!isOpen && onHide) {
      onHide();
    }
  }, [isOpen, onHide, onShow]);

  return (
    <div
      className={cn(
        'ArcModal-helper-componentHidden',
        topLevelContainerClassName
      )}
      onClick={onClick}
    >
      <Transition in={isOpen} timeout={animationDuration || 400}>
        {(animState) =>
          ReactDOM.createPortal(
            <Fragment>
              <div
                className={cn(
                  !overrideDefaultClassName && 'ArcModal',
                  animState,
                  `ArcModal-anchor-${modalAnchor}`,
                  className
                )}
              >
                <div
                  className={cn(
                    !backgroundProps.overrideDefaultClassName &&
                      'ArcModal-layer-background',
                    backgroundProps.className
                  )}
                  onClick={(e) =>
                    !dontCloseOnBackgroundClick && setIsOpen(false)
                  }
                  style={backgroundProps.style}
                />
                <Panel
                  className={cn(
                    !overrideDefaultClassName && 'ArcModal-layer-content'
                  )}
                  id={id}
                  style={style}
                >
                  {children}
                </Panel>
              </div>
            </Fragment>,
            portalTargetElement || document.body
          )
        }
      </Transition>
    </div>
  );
}
