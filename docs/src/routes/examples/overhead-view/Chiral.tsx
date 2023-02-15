import { Dropdown, OverheadView } from '@adam-sv/arc';
import { useOverheadViewDirection } from './useOverheadViewDirection';
import './style.scss';

import type { ISegmentInput } from '@adam-sv/arc';
const segments: ISegmentInput[] = [
  {
    id: '1',
    isLhs: true,
    x: 0,
    length: 10000,
    midlineOffset: 400,
    data: {
      title: 'a',
    },
  },
  {
    id: '2',
    isLhs: false,
    x: 24900,
    length: 10000,
    midlineOffset: -400,
    data: {
      title: 'b',
    },
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
