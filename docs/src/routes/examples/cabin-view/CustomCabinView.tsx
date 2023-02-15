import { cn, CabinView, Panel } from '@adam-sv/arc';
import type {
  ISegment,
  ICabinViewSegmentLayer,
  ICabinViewAircraftDimensions,
} from '@adam-sv/arc';
import './style.scss';

const customDimensions: ICabinViewAircraftDimensions = {
  interior: {
    noseOffset: 200,
    width: 220,
    length: 1200,
  },
  exterior: {
    width: 220,
    length: 1500,
  },
};

const planformOutline: ISegment = {
  data: { someData: 'I am some data!' },
  className: cn('segment-planform-outline'),
  contentGenerator: () => <span>Clipped Planform Outline</span>,
  id: 'segment-planform-outline',
  x1: 0,
  x2: customDimensions.interior.length,
  y1: 0,
  y2: customDimensions.interior.width,
};

const unclippedSegment: ISegment = {
  data: { someData: 'I am an unclipped segment!' },
  id: 'segment-unclipped',
  className: 'segment-unclipped',
  contentGenerator: () => <span>Unclipped Segment</span>,
  x1: -1 * customDimensions.interior.noseOffset,
  x2: 0,
  y1: 0,
  y2: customDimensions.exterior.width,
};

const yOriginBottomSegment: ISegment = {
  data: { someData: 'Started from the bottom!' },
  id: 'segment-y-orign-bottom',
  className: 'segment-unclipped',
  contentGenerator: () => <span>Y-origin is the bottom!</span>,
  x1: customDimensions.interior.noseOffset,
  x2: customDimensions.interior.length / 3,
  y1: 0,
  y2: customDimensions.exterior.width / 2,
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

const CustomCabinViewStory = (): JSX.Element => {
  return (
    <Panel className='cabin-view-story-panel'>
      <CabinView
        layers={layers}
        aircraftType='Custom'
        aircraftDimensions={customDimensions}
      />
    </Panel>
  );
};

export default CustomCabinViewStory;
