import {
  IBarChartDatum,
  generatePseudoRandomId,
  NumberUtils,
  Panel,
  BarChart,
} from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

const sampleData: IBarChartDatum[] = new Array(10)
  .fill(0)
  .map((alwaysZero, index) => ({
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
      axisSettings={{
        left: { preventResize: true },
        bottom: { preventResize: true },
      }}
    />
  </Panel>
);
