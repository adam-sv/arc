import {
  cn,
  CabinView,
  Panel,
  CABIN_VIEW_AIRCRAFT_DIMENSIONS,
} from '@adam-sv/arc';
import type { ISegment, ICabinViewSegmentLayer } from '@adam-sv/arc';
import './style.scss';

const planformOutline: ISegment = {
  data: { someData: 'I am some data!' },
  className: cn('segment-planform-outline'),
  contentGenerator: () => <span>Clipped Planform Outline</span>,
  id: 'segment-planform-outline',
  x1: 0,
  x2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.interior.length,
  y1: 0,
  y2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.interior.width,
};

const unclippedSegment: ISegment = {
  data: { someData: 'I am an unclipped segment!' },
  id: 'segment-unclipped',
  className: 'segment-unclipped',
  contentGenerator: () => <span>Clipped Segment</span>,
  x1: -1 * CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.interior.noseOffset,
  x2: 0,
  y1: 0,
  y2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.exterior.width,
};

const yOriginBottomSegment: ISegment = {
  data: { someData: 'Started from the bottom!' },
  id: 'segment-y-orign-bottom',
  className: 'segment-unclipped',
  contentGenerator: () => <span>Y-origin is the bottom!</span>,
  x1: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.interior.noseOffset,
  x2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.interior.length / 3,
  y1: 0,
  y2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A321.exterior.width / 2,
};

const layers: ICabinViewSegmentLayer[] = [
  {
    shouldApplyClipPath: false,
    segments: [yOriginBottomSegment],
  },
  {
    shouldApplyClipPath: true,
    segments: [planformOutline, unclippedSegment],
  },
];

const A321CabinViewStory = (): JSX.Element => {
  return (
    <Panel className='cabin-view-story-panel'>
      <CabinView layers={layers} aircraftType='A321' />
    </Panel>
  );
};

export default A321CabinViewStory;
