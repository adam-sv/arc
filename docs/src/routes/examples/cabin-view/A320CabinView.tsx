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
  x2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.interior.length,
  y1: 0,
  y2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.interior.width,
};

const unclippedSegment: ISegment = {
  data: { someData: 'I am an unclipped segment!' },
  id: 'segment-unclipped',
  className: 'segment-unclipped',
  contentGenerator: () => <span>Unclipped Segment</span>,
  x1: -1 * CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.interior.noseOffset,
  x2: 0,
  y1: 0,
  y2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.exterior.width,
};

const yOriginBottomSegment: ISegment = {
  data: { someData: 'Started from the bottom!' },
  id: 'segment-y-orign-bottom',
  className: 'segment-unclipped',
  contentGenerator: () => <span>Y-origin is the bottom!</span>,
  x1: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.interior.noseOffset,
  x2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.interior.length / 3,
  y1: 0,
  y2: CABIN_VIEW_AIRCRAFT_DIMENSIONS.A320.exterior.width / 2,
};

const layers: ICabinViewSegmentLayer[] = [
  {
    shouldApplyClipPath: false,
    segments: [unclippedSegment, yOriginBottomSegment],
  },
  {
    shouldApplyClipPath: true,
    segments: [planformOutline],
  },
];

const A320CabinViewStory = (): JSX.Element => {
  return (
    <Panel className='cabin-view-story-panel'>
      <CabinView layers={layers} aircraftType='A320' />
    </Panel>
  );
};

export default A320CabinViewStory;
