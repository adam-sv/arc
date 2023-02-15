import React, { useEffect, useState } from 'react';
import { cn, SegmentCanvas } from '@adam-sv/arc';
import './style.scss';
import { CabinViewAircraftMask } from './mask';
import type {
  ICabinViewAircraftDimensions,
  CabinViewAircraftHardcodedType,
  ICabinViewProps,
  ICabinViewSegmentLayer,
  CabinViewDirection,
} from '@adam-sv/arc';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const MIN_HEIGHT = 400;

export const CABIN_VIEW_AIRCRAFT_DIMENSIONS: Record<
  CabinViewAircraftHardcodedType,
  ICabinViewAircraftDimensions
> = {
  A320: {
    interior: {
      noseOffset: 200,
      length: 1083,
      width: 145,
    },
    exterior: {
      width: 145,
      length: 1333,
    },
  },
  A350: {
    interior: {
      noseOffset: 200,
      length: 2021,
      width: 230,
    },
    exterior: {
      width: 230,
      length: 2321,
    },
  },
  A321: {
    interior: {
      noseOffset: 200,
      length: 1361,
      width: 145,
    },
    exterior: {
      width: 145,
      length: 1661,
    },
  },
};

const getFullHeight = (
  isVertical: boolean,
  aircraftDimensions: ICabinViewAircraftDimensions | undefined
) => {
  return isVertical
    ? aircraftDimensions?.exterior.length || 0
    : aircraftDimensions?.exterior.width || 0;
};

const getFullWidth = (
  isVertical: boolean,
  aircraftDimensions: ICabinViewAircraftDimensions | undefined
) => {
  return isVertical
    ? aircraftDimensions?.exterior.width || 0
    : aircraftDimensions?.exterior.length || 0;
};

export function CabinView(props: ICabinViewProps): JSX.Element {
  const {
    className,
    id,
    layers,
    style,
    suppressBackground,
    aircraftType = 'A320',
    minZoom,
    maxZoom,
  } = props;
  const [processedLayers, setProcessedLayers] = useState<
    ICabinViewSegmentLayer[]
  >([]);
  const [clipPathId] = useState(Math.random().toString(36).slice(2, 11));
  const direction: CabinViewDirection = props.direction || 'left';
  const isVertical = direction === 'up' || direction === 'down';
  const aircraftDimensions =
    props.aircraftDimensions ||
    (['A320', 'A321', 'A350'].includes(aircraftType)
      ? CABIN_VIEW_AIRCRAFT_DIMENSIONS[
          aircraftType as CabinViewAircraftHardcodedType
        ]
      : undefined);

  useEffect(() => {
    const clipPathStyle = clipPathId ? { clipPath: `url(#${clipPathId})` } : {};
    let didAddBackgroundRect = false;

    setProcessedLayers(
      layers.map((l: ICabinViewSegmentLayer) => {
        const layer = { ...l };
        layer.segments = layer.segments.map((s) => ({
          ...s,
          originOffset: aircraftDimensions
            ? { x: aircraftDimensions.interior.noseOffset }
            : undefined,
        }));
        if (l.shouldApplyClipPath) {
          // apply clip path if required
          layer.groupStyle = { ...layer.groupStyle, ...clipPathStyle };

          if (!didAddBackgroundRect) {
            // add a background rect to provide clipped shading in the shape of the aircraft
            layer.backgroundRenderer = (canvasRect, chartContainerSizing) => (
              <rect
                x={0}
                y={0}
                className='clipped-background-shade'
                height={chartContainerSizing.chartSize.height}
                width={chartContainerSizing.chartSize.width}
              ></rect>
            );
            // either of these solutions works
            // layer.segments = [
            //   {
            //     className: cn('clipped-background-shade'),
            //     id: 'clipped-background-shade',
            //     x1: 0,
            //     x2: getFullWidth(isVertical, aircraftDimensions),
            //     y1: 0,
            //     y2: getFullHeight(isVertical, aircraftDimensions),
            //   },
            //   ...layer.segments,
            // ];
            didAddBackgroundRect = true;
          }
        }
        return layer;
      })
    );
  }, [layers, aircraftDimensions, clipPathId, isVertical]);

  if (!aircraftDimensions) return <span>Error: no aircraft dimensions</span>;

  return (
    <SegmentCanvas
      className={cn('ArcCabinView', className)}
      id={id}
      style={style}
      layers={processedLayers}
      drawingParams={{
        canvasHeight: getFullHeight(isVertical, aircraftDimensions),
        canvasWidth: getFullWidth(isVertical, aircraftDimensions),
        yOriginDirection: 'bottom',
      }}
      maxZoom={maxZoom === undefined ? MAX_ZOOM : maxZoom}
      minZoom={minZoom === undefined ? MIN_ZOOM : minZoom}
      minHeight={MIN_HEIGHT}
      backgroundRenderer={
        suppressBackground
          ? undefined
          : (coords, chartContainerSizing) => (
              <clipPath
                // this clip path can live anywhere, it just made some sense to put it here
                clipPathUnits='objectBoundingBox'
                id={clipPathId}
              >
                <CabinViewAircraftMask
                  length={aircraftDimensions.exterior.length}
                  noseCurveLength={
                    aircraftDimensions.interior.noseOffset * 1.25
                  } // arbitrarily hardcoded for the time being
                  tailCurveLength={aircraftDimensions.exterior.length * 0.1} // arbitrarily hardcoded for the time being
                  noseOffsetLength={aircraftDimensions.interior.noseOffset}
                  cabinLength={aircraftDimensions.interior.length}
                />
              </clipPath>
            )
      }
    ></SegmentCanvas>
  );
}
