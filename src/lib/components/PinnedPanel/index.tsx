import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from 'react';
import {
  cn,
  FloatingPanelAnchorDirection,
  FloatingPanel,
  useScrollDetector,
} from '@adam-sv/arc';
import type { IARCProps } from '@adam-sv/arc';
import './style.scss';

export interface IPinnedPanelProps extends IARCProps {
  element: HTMLElement | null;
  anchor?: FloatingPanelAnchorDirection; // relative to element in ref
  isOpen?: boolean; // defaults to true if undefined/missing
  recalcTrigger?: number | string; // change to force a position recalculation
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  domRef?: RefObject<HTMLDivElement | null>;
  portalTargetElement?: Element | null;
  offset?: number; // margin between the panel and the thing it's pinned to
  showArrow?: boolean;
  respondToResize?: boolean;
}

export const PinnedPanel = (props: IPinnedPanelProps): JSX.Element | null => {
  const {
    children,
    className,
    id,
    overrideDefaultClassName,
    style,
    recalcTrigger,
    onClick,
    domRef,
    portalTargetElement,
    offset = 12,
    showArrow = false,
    isOpen,
    element,
    respondToResize,
  } = props;
  const anchor = props.anchor || 'top-left';
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const [localRecalcTrigger, setLocalRecalcTrigger] = useState<number>(0);
  const [anchorRelativeToPanel, setAnchorRelativeToPanel] =
    useState<FloatingPanelAnchorDirection>('center');

  const localPanelRef = useRef<HTMLDivElement>(null);
  const panelRef = domRef || localPanelRef;

  const shouldBeOpen = useMemo(
    () => !!element && (isOpen === false ? false : true),
    [isOpen, element]
  );

  useScrollDetector(() => {
    setLocalRecalcTrigger(localRecalcTrigger + 1);
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setLocalRecalcTrigger((p) => p + 1);
    };
    if (respondToResize) window.addEventListener('resize', handleWindowResize);
    return () => {
      if (respondToResize)
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [respondToResize]);

  useLayoutEffect(() => {
    const element = props.element;
    if (!element) return;
    const rect = element.getBoundingClientRect();

    if (anchor === 'top-left') {
      setCoords([rect.left - offset, rect.top - offset]);
      setAnchorRelativeToPanel('bottom-right');
    }
    if (anchor === 'top') {
      setCoords([rect.left + rect.width / 2, rect.top - offset]);
      setAnchorRelativeToPanel('bottom');
    }
    if (anchor === 'top-right') {
      setCoords([rect.left + rect.width + offset, rect.top - offset]);
      setAnchorRelativeToPanel('bottom-left');
    }
    if (anchor === 'left') {
      setCoords([rect.left - offset, rect.top + rect.height / 2]);
      setAnchorRelativeToPanel('right');
    }
    if (anchor === 'center') {
      setCoords([rect.left + rect.width / 2, rect.top + rect.height / 2]);
      setAnchorRelativeToPanel('center');
    }
    if (anchor === 'right') {
      setCoords([rect.left + rect.width + offset, rect.top + rect.height / 2]);
      setAnchorRelativeToPanel('left');
    }
    if (anchor === 'bottom-left') {
      setCoords([rect.left - offset, rect.top + rect.height + offset]);
      setAnchorRelativeToPanel('top-right');
    }
    if (anchor === 'bottom') {
      setCoords([rect.left + rect.width / 2, rect.top + rect.height + offset]);
      setAnchorRelativeToPanel('top');
    }
    if (anchor === 'bottom-right') {
      setCoords([
        rect.left + rect.width + offset,
        rect.top + rect.height + offset,
      ]);
      setAnchorRelativeToPanel('top-left');
    }
  }, [props.element, anchor, recalcTrigger, localRecalcTrigger, offset]);

  return (
    <FloatingPanel
      className={cn(className, !overrideDefaultClassName && 'ArcPinnedPanel')}
      id={id}
      overrideDefaultClassName={overrideDefaultClassName}
      style={style}
      anchor={anchorRelativeToPanel}
      x={coords[0]}
      y={coords[1]}
      isOpen={shouldBeOpen}
      onClick={onClick}
      domRef={panelRef}
      portalTargetElement={portalTargetElement}
    >
      {children}
      {showArrow && (
        <div
          className={cn(
            'ArcPinnedPanel-Arrow',
            `ArcPinnedPanel-Arrow-anchor-${anchorRelativeToPanel}`
          )}
        ></div>
      )}
    </FloatingPanel>
  );
};
