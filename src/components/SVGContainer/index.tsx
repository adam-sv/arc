// dependencies
import React, { useEffect, useState } from 'react';
// internals
import { geometry, useMemoizedState, useStateIterator } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { IBoxDimensions, ICoords } from '@adam-sv/arc';
import type { ISVGContainerProps, ISVGContentProps } from './types';
export type { ISVGContainerProps, ISVGContentProps };

export function SVGContainer(props: ISVGContainerProps) {
  // state
  const iterator = useStateIterator()[1];
  const [containerRect, setContainerRect] = useMemoizedState<DOMRect>(new DOMRect(), {
    equalityTest: geometry.rectsAreEqual,
  });
  const [contentRect, setContentRect] = useMemoizedState<DOMRect>(new DOMRect(), {
    equalityTest: geometry.rectsAreEqual,
  });
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    document.addEventListener('resize', () => iterator());
    return () => document.removeEventListener('resize', () => iterator());
  }, []);

  // derived values for children
  const { coordinateSpace, positionerFillsSpace } = props;
  const { margin, padding } = getSafeProps(props);
  const { paddedContentRect, shift } = getAdjustedCoordinates(coordinateSpace, margin, padding);
  const contentProps:ISVGContentProps = {
    containerRect,
    contentRect,
    margin,
    padding,
    paddedContentRect,
    shift,
    zoom,
  };

  let width = paddedContentRect.width;
  if (positionerFillsSpace && containerRect.width > width) {
    width = containerRect.width;
  }

  let height = paddedContentRect.height;
  if (positionerFillsSpace && containerRect.height > height) {
    height = containerRect.height;
  }

  width = Math.round(width);
  height = Math.round(height);

  return (
    <div
      className="ArcSVGContainer"
      ref={ele => setContainerRect(ele && ele.getBoundingClientRect())}
    >
      <div
        id="positioner-item"
        ref={ele => setContentRect(ele && ele.getBoundingClientRect())}
        className="graph-container"
        style={{
          width: `${width + margin.left + margin.right}px`,
          height: `${height + margin.top + margin.bottom}px`,
          paddingLeft: `${margin.left}px`,
          paddingTop: `${margin.top}px`,
          paddingRight: `${margin.right}px`,
          paddingBottom: `${margin.bottom}px`,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <svg
          className="graph"
          viewBox={`0 0 ${width} ${height}`}
          width={zoom * width}
          height={zoom * height}
        >
          {props.children(contentProps)}
        </svg>
      </div>
    </div>
  );
}

interface ISafeProps {
  margin: IBoxDimensions;
  padding: IBoxDimensions;
}

function getSafeProps(props: ISVGContainerProps): ISafeProps {
  const safeProps = {
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    padding: { top: 20, right: 20, bottom: 20, left: 20 },
  };

  if (props.margin) {
    safeProps.margin = props.margin;
  }
  if (props.padding) {
    safeProps.padding = props.padding;
  }

  return safeProps;
}

interface IAdjustedCoordinates {
  paddedContentRect: DOMRect;
  shift: ICoords;
}

function getAdjustedCoordinates(coordinateSpace: DOMRect, margin: IBoxDimensions, padding: IBoxDimensions): IAdjustedCoordinates {
  // we have all of these things now
  return {
    paddedContentRect: new DOMRect(
      coordinateSpace.left - padding.left,
      coordinateSpace.top - padding.top,
      coordinateSpace.width + padding.left + padding.right,
      coordinateSpace.height + padding.top + padding.bottom,
    ),
    shift: { x: padding.left, y: padding.top },
  };
}

// get paddedGraphRect(): DOMRect {
//   // TODO: document the algorithm behind this placement
//   const { margin, padding } = this;
//   const { contextBoundingRect } = this.stores.nodes;
//   const { containerRect } = this.state;

//   const left = Math.min(
//     0,
//     contextBoundingRect.left
//   );
//   const top = Math.min(
//     0,
//     contextBoundingRect.top
//   );
//   const width = Math.max(
//     containerRect.width - margin.horizontalSize,
//     contextBoundingRect.width + padding.horizontalSize,
//   );
//   const height = Math.max(
//     containerRect.height - margin.verticalSize,
//     contextBoundingRect.height + padding.verticalSize,
//   );

//   const coordinates = new DOMRect(
//     // to pad the left and the top we must pull them away
//     left,
//     top,
//     // but we push the right and bottom
//     width,
//     height,
//   );

//   return coordinates;
// }

// get graphOffset() {
//   const offset = {
//     x: 0,
//     y: 0,
//   };

//   if (!this.stores) {
//     return offset;
//   }

//   const { containerRect } = this.state;
//   const { paddedGraphRect } = this;
//   if (paddedGraphRect.width > 0 && paddedGraphRect.width < containerRect.width) {
//     offset.x = (containerRect.width - paddedGraphRect.width) / 2;
//   }
//   if (paddedGraphRect.height > 0 && paddedGraphRect.height < containerRect.height) {
//     offset.y = (containerRect.height - paddedGraphRect.height) / 2;
//   }

//   return offset;
// }
