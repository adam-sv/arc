import React, {
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
  type JSX,
} from 'react';
import ReactDOM from 'react-dom';
import { cn, NumberUtils, useWindowDimensions, Panel } from '@adam-sv/arc';
import './style.scss';
import type { IARCProps } from '@adam-sv/arc';

export type FloatingPanelAnchorDirection =
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'top-left'
  | 'top'
  | 'top-right';

export interface IFloatingPanelProps extends IARCProps {
  x: number;
  y: number;
  anchor?: FloatingPanelAnchorDirection;
  edgeOfSreenMargin?: number; // defaults to 10 (pixels)
  isOpen?: boolean; // defaults to true if undefined
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  domRef?: RefObject<HTMLDivElement | null>;
  portalTargetElement?: Element | null;
}

interface IFloatingPanelStyle extends React.CSSProperties {
  '--ArcFloatingPanel-x': string;
  '--ArcFloatingPanel-y': string;
}

export const FloatingPanel = (props: IFloatingPanelProps): JSX.Element => {
  const {
    children,
    className,
    id,
    overrideDefaultClassName,
    style,
    x,
    y,
    onClick,
    domRef,
    portalTargetElement,
  } = props;
  const isOpen = props.isOpen === false ? false : true;
  const margin = props.edgeOfSreenMargin || 10;
  const anchor = props.anchor || 'top-left';
  const localRef = useRef<HTMLDivElement>(null);
  const ref = domRef || localRef;
  const windowDimensions = useWindowDimensions();
  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    // calculate maximums to prevents floating panel from going off screen
    const theseBounds = ref.current?.getBoundingClientRect();
    let maxX = windowDimensions.width - margin;
    let maxY = windowDimensions.height - margin;
    let minX = margin;
    let minY = margin;
    if (theseBounds) {
      if (anchor === 'top-left') {
        minX = margin;
        maxX = windowDimensions.width - margin - theseBounds.width;
        minY = margin;
        maxY = windowDimensions.height - margin - theseBounds.height;
      }
      if (anchor === 'top') {
        minX = margin + theseBounds.width / 2;
        maxX = windowDimensions.width - margin - theseBounds.width / 2;
        minY = margin;
        maxY = windowDimensions.height - margin - theseBounds.height;
      }

      if (anchor === 'top-right') {
        minX = margin + theseBounds.width;
        maxX = windowDimensions.width - margin;
        minY = margin;
        maxY = windowDimensions.height - margin - theseBounds.height;
      }

      if (anchor === 'left') {
        minX = margin;
        maxX = windowDimensions.width - margin - theseBounds.width;
        minY = margin + theseBounds.height / 2;
        maxY = windowDimensions.height - margin - theseBounds.height / 2;
      }

      if (anchor === 'center') {
        minX = margin + theseBounds.width / 2;
        maxX = windowDimensions.width - margin - theseBounds.width / 2;
        minY = margin + theseBounds.height / 2;
        maxY = windowDimensions.height - margin - theseBounds.height / 2;
      }

      if (anchor === 'right') {
        minX = margin + theseBounds.width;
        maxX = windowDimensions.width - margin;
        minY = margin + theseBounds.height / 2;
        maxY = windowDimensions.height - margin - theseBounds.height / 2;
      }

      if (anchor === 'bottom-left') {
        minX = margin;
        maxX = windowDimensions.width - theseBounds.width - margin;
        minY = margin + theseBounds.height;
        maxY = windowDimensions.height - margin;
      }
      if (anchor === 'bottom') {
        minX = margin + theseBounds.width / 2;
        maxX = windowDimensions.width - margin - theseBounds.width / 2;
        minY = margin + theseBounds.height;
        maxY = windowDimensions.height - margin;
      }
      if (anchor === 'bottom-right') {
        minX = margin + theseBounds.width;
        maxX = windowDimensions.width - margin;
        minY = margin + theseBounds.height;
        maxY = windowDimensions.height - margin;
      }

      const effectiveX = NumberUtils.clamp(x, minX, maxX);
      const effectiveY = NumberUtils.clamp(y, minY, maxY);
      setCoords([effectiveX, effectiveY]);
    }
  }, [
    anchor,
    margin,
    windowDimensions.height,
    windowDimensions.width,
    x,
    y,
    ref,
  ]);

  return ReactDOM.createPortal(
    <Panel
      className={cn(
        className,
        !overrideDefaultClassName && 'ArcFloatingPanel',
        `anchor-${anchor}`,
        !isOpen && 'fade'
      )}
      domRef={ref}
      id={id}
      onClick={onClick}
      overrideDefaultClassName={overrideDefaultClassName}
      style={
        {
          ...style,
          '--ArcFloatingPanel-x': `${coords[0]}px`,
          '--ArcFloatingPanel-y': `${coords[1]}px`,
        } as IFloatingPanelStyle
      }
    >
      {children}
    </Panel>,
    portalTargetElement || document.body
  );
};
