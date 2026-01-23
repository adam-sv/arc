import { NumberUtils } from '@adam-sv/arc';
import {
  BarChart,
  generatePseudoRandomId,
  Panel,
  IBarChartDatum,
} from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

const sampleData: IBarChartDatum[] = new Array(10)
  .fill(0)
  .map((zero: number, index: number) => ({
    id: generatePseudoRandomId(),
    data: {
      index,
      randomString: uuidv4(),
    },
    label: `Datum #${index}`,
    value: NumberUtils.getRandomInt(0, 100),
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));

export default (
  <Panel className='large' style={{ overflow: 'unset' }}>
    <BarChart
      data={sampleData}
      minimumWidth={100}
      minimumHeight={200}
      orientation={'horizontal'}
      disableMouseTracking
    />
  </Panel>
);
