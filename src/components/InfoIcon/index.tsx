// dependencies
import React, { useState } from 'react';
// internals
import { PositioningPixel } from '@adam-sv/arc';
// styles
import "./style.css";
// types
import type { IInfoIconProps } from './types';
export type { IInfoIconProps };

export function InfoIcon(props: IInfoIconProps) {
  const [isShowing, setIsShowing] = useState(false);

  if (!(props.text || props.children)) {
    return null;
  }

  return (
    <PositioningPixel className="info-icon-container">
      <div
        className="InfoIcon"
        onMouseEnter={e => setIsShowing(true)}
        onMouseLeave={e => setIsShowing(false)}
      >
        <span>i</span>
        {isShowing && (
          <div className="tooltip">
            <div className="tooltip-content">
              {props.text || props.children}
            </div>
            <div className="tooltip-arrow" />
          </div>
        )}
      </div>
    </PositioningPixel>
  );  
}
