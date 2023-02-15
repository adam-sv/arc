import { Dropdown, OverheadView } from '@adam-sv/arc';
import { useOverheadViewDirection } from './useOverheadViewDirection';
import './style.scss';
const AIRCRAFT_WIDTH = 4142;
import type { ISegmentInput } from '@adam-sv/arc';
const segments: ISegmentInput[] = [
  {
    id: '1',
    data: {
      title: 'a',
    },
    x1: 400,
    y1: 0,
    x2: 4400,
    y2: AIRCRAFT_WIDTH / 2,
    yIsCenterline: true,
  },
  {
    id: '2',
    data: {
      title: 'b',
    },
    x1: 30900,
    y1: -1000,
    x2: 34900,
    y2: 500,
    yIsCenterline: true,
  },
  {
    id: '3',
    data: {
      title: 'c',
    },
    x1: 20000,
    y1: AIRCRAFT_WIDTH / -2,
    x2: 30000,
    y2: 0,
    yIsCenterline: true,
  },
];

export default function OverheadViewStory(): JSX.Element {
  const [direction, setDirection, dropdownItems] = useOverheadViewDirection();
  return (
    <div className='OverheadViewStory'>
      <Dropdown
        label='Visualization Direction'
        items={dropdownItems}
        onChange={(item) => setDirection(item.value)}
        value={direction}
      />
      <OverheadView
        coordinates={{
          actualLengthDimension: 34900,
          actualWidthDimension: 4142,
          xOriginOffset: 0,
          direction,
        }}
        segments={segments}
      />
    </div>
  );
}
