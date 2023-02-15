import { Dropdown, OverheadView } from '@adam-sv/arc';
import { useOverheadViewDirection } from './useOverheadViewDirection';
import './style.scss';
import type { ISegmentInput } from '@adam-sv/arc';
const segments: ISegmentInput[] = [
  {
    id: '1',
    data: {
      title: 'a',
    },
    x1: 400,
    y1: 0,
    width: 4000,
    length: 4142,
  },
  {
    id: '2',
    data: {
      title: 'b',
    },
    x1: 30900,
    y1: 0,
    width: 4000,
    length: 4142,
  },
  {
    id: '3',
    data: {
      title: 'c',
    },
    x1: 34900 / 2 - 400,
    y1: 0,
    width: 400,
    length: 4142,
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
