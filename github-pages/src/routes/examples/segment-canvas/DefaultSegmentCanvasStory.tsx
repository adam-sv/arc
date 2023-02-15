import React, { useState } from 'react';
import { Panel, SegmentCanvas, cn, CheckboxGroup } from '@adam-sv/arc';
import type { ISegment } from '@adam-sv/arc';
import './style.scss';

const canvasDimensions = {
  canvasHeight: 400,
  canvasWidth: 600,
};

const insetOutlineSegment: ISegment = {
  data: { someData: 'I am some data!' },
  className: cn('segment-inset-outline'),
  contentGenerator: () => <span>Inset Outline</span>,
  id: 'segment-inset-outline',
  x1: canvasDimensions.canvasWidth * 0.1,
  x2: canvasDimensions.canvasWidth * 0.9,
  y1: canvasDimensions.canvasHeight * 0.1,
  y2: canvasDimensions.canvasHeight * 0.9,
};

const extentsOutlineSegment: ISegment = {
  data: { someData: 'I am some data!' },
  className: cn('segment-extents-outline'),
  contentGenerator: () => <span>Extents Outline</span>,
  id: 'segment-extents-outline',
  x1: 0,
  x2: canvasDimensions.canvasWidth,
  y1: 0,
  y2: canvasDimensions.canvasHeight,
};

export const DefaultSegmentCanvasStory = (): JSX.Element => {
  const [isBottomYOrigin, setIsBottomYOrigin] = useState<boolean>(false);
  const [yIsCenterline, setYIsCenterline] = useState<boolean>(false);

  let message = '';
  if (yIsCenterline) {
    message = 'Y Origin is the centerline.';
  } else {
    message = `Y Origin is the ${isBottomYOrigin ? 'bottom' : 'top'} edge.`;
  }

  if (isBottomYOrigin) {
    message = `${message} The positive direction is up, the negative direction is down.`;
  } else {
    message = `${message} The positive direction is down, the negative direction is up.`;
  }

  const yOriginBottomSegment: ISegment = {
    data: { someData: 'Started from the bottom!' },
    id: 'segment-y-origin',
    className: 'segment-y-origin',
    contentGenerator: () => <span>{message}</span>,
    x1: canvasDimensions.canvasWidth / 3,
    x2: canvasDimensions.canvasWidth * 0.75,
    y1: 0,
    y2: canvasDimensions.canvasHeight / 3,
  };
  return (
    <Panel className='segment-canvas-story-panel'>
      <div className='flex-row'>
        <CheckboxGroup
          onChange={(items) => {
            setIsBottomYOrigin(
              items.find((i) => i.key === 'yBottom')?.value || false
            );
          }}
          isExclusive
          items={[
            {
              value: isBottomYOrigin,
              label: 'Y-Origin is Bottom',
              key: 'yBottom',
            },
            { value: !isBottomYOrigin, label: 'Y-Origin is Top', key: 'yTop' },
          ]}
        />
        <CheckboxGroup
          onChange={(items) => {
            setYIsCenterline(
              items.find((i) => i.key === 'yCenterline')?.value || false
            );
          }}
          isExclusive
          items={[
            {
              value: yIsCenterline,
              label: 'Y-Origin is Centerline',
              key: 'yCenterline',
            },
            {
              value: !yIsCenterline,
              label: 'Y-Origin is Edge',
              key: 'yEdge',
            },
          ]}
        />
      </div>

      <SegmentCanvas
        layers={[
          { segments: [extentsOutlineSegment, insetOutlineSegment] },
          { segments: [yOriginBottomSegment] },
        ]}
        drawingParams={{
          ...canvasDimensions,
          yIsCenterline,
          yOriginDirection: isBottomYOrigin ? 'bottom' : 'top',
        }}
        maxZoom={4}
        minZoom={0.1}
        minHeight={canvasDimensions.canvasHeight}
      ></SegmentCanvas>
    </Panel>
  );
};
