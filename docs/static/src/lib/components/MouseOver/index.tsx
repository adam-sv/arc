import React, { useRef, useEffect, useState, Fragment, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { cn, IARCProps, Panel } from '@adam-sv/arc';
import './style.scss';

export interface IMouseOver extends IARCProps {
  location: { top: number; left: number };
  horizontalSpaceAwayFromTrigger: number;
  verticalSpaceAwayFromTrigger: number;
  positionRelativeToTrigger: 'Above' | 'Center';
  triggerPosition: { top: number; left: number };
  shouldRender?: boolean;
  portalTargetElement?: Element | null;
  paperRef?: RefObject<HTMLDivElement | null>;
}

interface IMouseOverCssProperties extends React.CSSProperties {
  '--ArcMouseOver-absolute-top': string;
  '--ArcMouseOver-absolute-left': string;
}

export const MouseOver = (props: IMouseOver) => {
  const {
    location,
    shouldRender,
    style,
    horizontalSpaceAwayFromTrigger,
    verticalSpaceAwayFromTrigger,
    positionRelativeToTrigger,
    triggerPosition,
    portalTargetElement,
    paperRef,
  } = props;

  const [absolutePositioning, setAbsolutePositioning] = useState<{
    top: number;
    left: number;
  }>();

  const [positioningOffset, setPositioningOffset] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const contWidth = contentRef.current?.clientWidth;
  const contHeight = contentRef.current?.clientHeight;

  useEffect(() => {
    setAbsolutePositioning(undefined);
    //allows location positinoning to be applied first before the
    //calculations apply

    //Calculates how high up to originally place the component.
    if (contentRef.current) {
      const contHeight = contentRef.current.clientHeight;

      if (
        positionRelativeToTrigger === 'Center' &&
        positioningOffset !== contHeight / 2
      ) {
        setPositioningOffset(contHeight / 2);
      }

      if (
        positionRelativeToTrigger === 'Above' &&
        positioningOffset !== contHeight
      ) {
        setPositioningOffset(contHeight);
      }
    }
  }, [props.children]);

  useEffect(() => {
    //this is in a useEffect with no paramters because when using the mouseover in the
    //line chart the previous rendering would effect the newest position of the
    //new rendering causing some items to appear on the wrongside/offscreen
    //still not perfect as there is some flickering
    if (contWidth && contHeight && contentRef.current) {
      let absLeft = contentRef.current.getBoundingClientRect().left;
      let absTop = contentRef.current.getBoundingClientRect().top;

      const newWidth =
        triggerPosition.left - contWidth - horizontalSpaceAwayFromTrigger;

      //check to make sure that the mouse over does not hang off the left or right
      //side of the screen.
      if (contWidth + absLeft >= document.body.clientWidth) {
        absLeft = newWidth;
      } else if (absLeft < 0) {
        absLeft = 0;
      }
      //check to make sure that the mouse over does not hang off the top or bottom
      //side of the screen.
      if (absTop <= 0) {
        absTop = 0;
      } else if (absTop > window.innerHeight) {
        absTop = window.innerHeight - contHeight;
      }
      //checks to see if anything has changed
      if (
        absolutePositioning?.left !== absLeft ||
        absolutePositioning.top !== absTop
      ) {
        setAbsolutePositioning({ left: absLeft, top: absTop });
      }
    }
  });

  if (!shouldRender || !location) {
    return null;
  }
  const cssProps: IMouseOverCssProperties = Object.assign(
    absolutePositioning ? { ...absolutePositioning } : {},
    {
      '--ArcMouseOver-absolute-top': `${
        location.top - verticalSpaceAwayFromTrigger - positioningOffset
      }px`,
      '--ArcMouseOver-absolute-left': `${
        location.left + horizontalSpaceAwayFromTrigger
      }px`,
    },
    style || {}
  );

  return ReactDOM.createPortal(
    <Fragment>
      <div className={cn('ArcMouseOver')} style={cssProps} ref={contentRef}>
        <Panel domRef={paperRef}>{props.children}</Panel>
      </div>
    </Fragment>,
    portalTargetElement || document.body
  );
};
