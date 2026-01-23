// dependencies
import { MutableRefObject, useContext } from 'react';
// internals
import { cn, ChartContext, ChartComponentContext } from '@adam-sv/arc';

export interface IChartSyncedScrollBarProps {
  className?: string;
  domRef?: MutableRefObject<HTMLDivElement | null>;
  intendedContentSide?: 'bottom' | 'right'; // Adding left or top would be trivial
  // scrollBarOffset?: number;
}

// This number makes it look symmetrical
// Should probably be done in CSS somehow
const MAGIC_SCROLL_WIDTH = 13;
const scrollBarOffset = 0; // TODO: we have the idea you can offset it on the axis it doesn't scroll, but we haven't had a need

export function ChartSyncedScrollBar({
  className,
  domRef,
  intendedContentSide,
}: IChartSyncedScrollBarProps) {
  // We can assert the non-nullishness of the contexts because we control the component, it is not exposed to end-users
  const { helpers, scroll } = useContext(ChartContext)!;
  const { component } = useContext(ChartComponentContext)!;
  const finalComponent = intendedContentSide || component;
  // Previously, this could only be left/right or top/bottom
  // Now, it could also be "content"

  const domPosition = helpers.getDOMPosition(finalComponent, true);
  const domSize = helpers.getDOMSize(finalComponent, true);
  const svgSize = helpers.getSVGSize(finalComponent, true);

  // here, "content" doesn't even make sense
  // therefore we need one extra prop I think
  const isVerticalOverflow = ['left', 'right'].includes(finalComponent);
  const fixedDimension = isVerticalOverflow ? 'width' : 'height';

  return (
    <div
      className={cn('ChartSyncedScrollBar', className)}
      onScroll={scroll.scrollHandlers[finalComponent]}
      style={{
        ...domPosition,
        ...domSize,
        [fixedDimension]: MAGIC_SCROLL_WIDTH,
        margin: 0,
        padding: 0,
      }}
      ref={domRef}
    >
      <div
        className='ChartSyncedScrollBar-ForcedSizeElement'
        style={{ ...svgSize, [fixedDimension]: 1 }}
      />
    </div>
  );
}
