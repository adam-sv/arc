import React, { useLayoutEffect, useState } from 'react';
import { cn } from '@adam-sv/arc';
import type { IARCProps } from '@adam-sv/arc';
import { FloatingPanel, FloatingPanelAnchorDirection } from '../FloatingPanel';

export interface IPinnedPanelProps extends IARCProps {
  element: HTMLElement | null;
  anchor?: FloatingPanelAnchorDirection; // relative to element in ref
  isOpen?: boolean; // defaults to true if undefined/missing
  recalcTrigger?: number | string; // change to force a position recalculation
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
  } = props;
  const anchor = props.anchor || 'top-left';
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const [anchorRelativeToPanel, setAnchorRelativeToPanel] =
    useState<FloatingPanelAnchorDirection>('center');

  const shouldBeOpen =
    !!props.element && (props.isOpen === false ? false : true);

  useLayoutEffect(() => {
    const element = props.element;
    if (!element) return;
    const rect = element.getBoundingClientRect();

    if (anchor === 'top-left') {
      setCoords([rect.left, rect.top]);
      setAnchorRelativeToPanel('bottom-right');
    }
    if (anchor === 'top') {
      setCoords([rect.left + rect.width / 2, rect.top]);
      setAnchorRelativeToPanel('bottom');
    }
    if (anchor === 'top-right') {
      setCoords([rect.left + rect.width, rect.top]);
      setAnchorRelativeToPanel('bottom-left');
    }
    if (anchor === 'left') {
      setCoords([rect.left, rect.top + rect.height / 2]);
      setAnchorRelativeToPanel('right');
    }
    if (anchor === 'center') {
      setCoords([rect.left + rect.width / 2, rect.top + rect.height / 2]);
      setAnchorRelativeToPanel('center');
    }
    if (anchor === 'right') {
      setCoords([rect.left + rect.width, rect.top + rect.height / 2]);
      setAnchorRelativeToPanel('left');
    }
    if (anchor === 'bottom-left') {
      setCoords([rect.left, rect.top + rect.height]);
      setAnchorRelativeToPanel('top-right');
    }
    if (anchor === 'bottom') {
      setCoords([rect.left + rect.width / 2, rect.top + rect.height]);
      setAnchorRelativeToPanel('top');
    }
    if (anchor === 'bottom-right') {
      setCoords([rect.left + rect.width, rect.top + rect.height]);
      setAnchorRelativeToPanel('top-left');
    }
  }, [props.element, anchor, recalcTrigger]);

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
    >
      {children}
    </FloatingPanel>
  );
};
