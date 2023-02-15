// dependencies
import React from 'react';
// style
import './style.scss';
// types
import type { IEntry } from '../types';

const EXPANSION_MULTIPLIER = 1.4;

export interface IExpansionOverlayProps<T> {
  entry?: IEntry<T>;
  trackRef?: React.RefObject<HTMLDivElement>;
}

const getLeftOffset = (
  boundingBox: DOMRect | undefined,
  trackBoundingBox: DOMRect | undefined,
): number | undefined => {
  // if the dimensions aren't available, return undefined
  if (!boundingBox || !trackBoundingBox) { return undefined; }

  const leftDiff = boundingBox.left - trackBoundingBox.left;
  const rightDiff = boundingBox.right - trackBoundingBox.right;
  const pxThreshold = ((EXPANSION_MULTIPLIER - 1) / 2) * boundingBox.width;

  if (leftDiff < pxThreshold) {
    return trackBoundingBox.left + pxThreshold;
  }
  if (rightDiff > (pxThreshold * -1)) {
    return (trackBoundingBox.left + trackBoundingBox.width)
      - (boundingBox.width + pxThreshold)
      - 2; // subtract 2 for border width x 2
  }

  return boundingBox.left;
};

const getExpansionOverlayStyle = (
  boundingBox: DOMRect | undefined,
  leftOffset: number,
): React.CSSProperties => {
  return boundingBox ? {
    top: boundingBox.top,
    left: leftOffset,
    height: boundingBox.height,
    width: boundingBox.width,
  } : {};
};

const getExpansionBackgroundStyle = (
  boundingBox: DOMRect | undefined,
): React.CSSProperties => {
  return boundingBox ? {
    top: ((EXPANSION_MULTIPLIER - 1) / 2) * boundingBox.height * -1,
    left: ((EXPANSION_MULTIPLIER - 1) / 2) * boundingBox.width * -1,
    height: boundingBox.height * EXPANSION_MULTIPLIER,
    width: boundingBox.width * EXPANSION_MULTIPLIER,
  } : {};
};

export const ExpansionOverlay = <T,>(props: IExpansionOverlayProps<T>): JSX.Element => {
  const { entry, trackRef } = props;
  const content = (entry?.section)
    ? entry.expandedContentGenerator(entry, entry.section)
    : undefined;
  const boundingBox = entry?.ref?.current?.getBoundingClientRect();
  const trackBoundingBox = trackRef?.current?.getBoundingClientRect();
  const leftOffset = getLeftOffset(boundingBox, trackBoundingBox) || 0;
  const expansionOverlayStyle = getExpansionOverlayStyle(boundingBox, leftOffset);
  const expansionBackgroundStyle = getExpansionBackgroundStyle(boundingBox);
  return (
    <div className='ArcCarousel-ExpansionOverlay' style={expansionOverlayStyle}>
      <div className='ArcCarousel-ExpansionOverlay-bg' style={expansionBackgroundStyle}>
        { content }
      </div>
    </div>
  );
};
