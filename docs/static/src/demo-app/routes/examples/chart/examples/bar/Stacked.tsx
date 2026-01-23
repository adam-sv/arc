import {
  BarChart,
  Panel,
  IBarChartDatum,
  NumberUtils,
  generatePseudoRandomId,
} from '@adam-sv/arc';
import '../style.scss';
const { getRandomInt } = NumberUtils;
import { v4 as uuidv4 } from 'uuid';

const sampleData: IBarChartDatum[] = new Array(50)
  .fill(0)
  .map((alwaysZero, index) => ({
    id: generatePseudoRandomId(),
    data: {
      index,
      randomString: uuidv4(),
    },
    label: `Datum #${index}`,
    categoryIdentifier: `Category-${index % 5}`,
    value: getRandomInt(10, 100),
    className: `category-${index % 5}`,
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));

export const Component = () => (
  <Panel className='StackedBarChart'>
    <BarChart
      data={sampleData}
      stackedBars
      minimumWidth={100}
      minimumHeight={200}
      orientation={'horizontal'}
      minValue={0}
    />
  </Panel>
);

export default Component;
