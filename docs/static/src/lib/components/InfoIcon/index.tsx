// dependencies
import { useRef, useState } from 'react';
import { PinnedPanel, cn } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IInfoIconProps } from './types';
export type { IInfoIconProps };

// TODO: should this be refactored as a Modal
// and it opens "softly" on mouseover, and you can click to "hard open" it?
// seems like it'd be better UX and debuggability and reuse and CSS
export function InfoIcon({
  children,
  className,
  id,
  style,
  text,
  anchor = 'left',
}: IInfoIconProps) {
  const [isShowing, setIsShowing] = useState(false);
  const infoRef = useRef(null);
  const popoverRef = useRef(null);
  const [recalcTrigger, setRecalcTrigger] = useState(0);

  if (!(text || children)) {
    return null;
  }

  return (
    <>
      <div
        ref={infoRef}
        className={cn('ArcInfoIcon', className)}
        id={id}
        onMouseEnter={() => {
          setIsShowing(true);
          setRecalcTrigger((p) => p + 1);
        }}
        onMouseLeave={() => {
          setIsShowing(false);
        }}
        style={style}
        data-testid={'ArcInfoIcon'}
      >
        <span>i</span>
      </div>
      <PinnedPanel
        domRef={popoverRef}
        element={infoRef.current}
        isOpen={isShowing}
        anchor={anchor}
        className='ArcInfoIcon-tooltip'
        showArrow={true}
        respondToResize
        recalcTrigger={recalcTrigger}
      >
        {text || children}
      </PinnedPanel>
    </>
  );
}
