import React, { useState } from 'react';
import { MouseOver } from '@adam-sv/arc';
import './style.scss';

const MouseOverExample = (): JSX.Element => {
  const [mouseInfo, setMouseInfo] = useState<{
    left: number;
    top: number;
    triggerPosition: { top: number; left: number };
    text: string;
    horizontalSpace: number;
    verticalSpace: number;
  }>();

  return (
    <div className='MouseOverExample'>
      <div className='MouseOverExample-Top'>
        <div
          className='MouseOverExample-Trigger'
          onMouseEnter={(e) => {
            const target = (e.target as HTMLDivElement).getBoundingClientRect();
            setMouseInfo({
              left: target.left + target.width,
              top: target.top,
              triggerPosition: { left: target.left, top: target.top },
              text: 'Vertical Space Away from Trigger 1000000px. Content Stops at top of screen.',
              horizontalSpace: 5,
              verticalSpace: 1000000,
            });
          }}
          onMouseLeave={() => setMouseInfo(undefined)}
        >
          Place mouse here
        </div>
      </div>
      <div className='MouseOverExample-Mid'>
        <div
          className='MouseOverExample-Trigger'
          onMouseEnter={(e) => {
            const target = (e.target as HTMLDivElement).getBoundingClientRect();
            setMouseInfo({
              left: target.left + target.width,
              top: target.top,
              triggerPosition: { left: target.left, top: target.top },
              text: 'Horizontal Space Away from Trigger -1000000px. Content Stops at left of screen.',
              horizontalSpace: -1000000,
              verticalSpace: 5,
            });
          }}
          onMouseLeave={() => setMouseInfo(undefined)}
        >
          Place mouse here
        </div>
        <div
          className='MouseOverExample-Trigger'
          onMouseEnter={(e) => {
            const target = (e.target as HTMLDivElement).getBoundingClientRect();
            setMouseInfo({
              left: target.left + target.width,
              top: target.top,
              triggerPosition: { left: target.left, top: target.top },
              text: 'Basic rendering of content.',
              horizontalSpace: 5,
              verticalSpace: 5,
            });
          }}
          onMouseLeave={() => setMouseInfo(undefined)}
        >
          Place mouse here
        </div>
        <div
          className='MouseOverExample-Trigger'
          onMouseEnter={(e) => {
            const target = (e.target as HTMLDivElement).getBoundingClientRect();
            setMouseInfo({
              left: target.left + target.width,
              top: target.top,
              triggerPosition: { left: target.left, top: target.top },
              text: 'Content flips around trigger if too close to right side of screen.',
              horizontalSpace: 5,
              verticalSpace: 5,
            });
          }}
          onMouseLeave={() => setMouseInfo(undefined)}
        >
          Place mouse here
        </div>
      </div>
      <div className='MouseOverExample-Bot'>
        <div
          className='MouseOverExample-Trigger'
          onMouseEnter={(e) => {
            const target = (e.target as HTMLDivElement).getBoundingClientRect();
            setMouseInfo({
              left: target.left + target.width,
              top: target.top,
              triggerPosition: { left: target.left, top: target.top },
              text: 'Vertical Space Away from Trigger -1000000px. Content Stops at bottom of screen.',
              horizontalSpace: 5,
              verticalSpace: -1000000,
            });
          }}
          onMouseLeave={() => setMouseInfo(undefined)}
        >
          Place mouse here
        </div>
      </div>
      {mouseInfo && (
        <MouseOver
          location={{
            top: mouseInfo.top,
            left: mouseInfo.left,
          }}
          horizontalSpaceAwayFromTrigger={mouseInfo.horizontalSpace}
          verticalSpaceAwayFromTrigger={mouseInfo.verticalSpace}
          positionRelativeToTrigger={'Above'}
          shouldRender={!!mouseInfo}
          triggerPosition={mouseInfo.triggerPosition}
          style={{ width: '300px' }}
          portalTargetElement={
            document.getElementById('@adam-sv/arc--docs-app') ?? undefined
          }
        >
          <div>{mouseInfo.text}</div>
        </MouseOver>
      )}
    </div>
  );
};

export default MouseOverExample;
