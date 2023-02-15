import { getRandomInt } from '@adam-sv/arc';
import {
  BarChart,
  generatePseudoRandomId,
  Panel,
  IBarChartDatum,
} from '@adam-sv/arc';

const sampleData: IBarChartDatum[] = new Array(10)
  .fill(0)
  .map((zero: number, index: number) => ({
    id: generatePseudoRandomId(),
    data: {
      index,
      randomString: (Math.random() + 1).toString(36).substring(7),
    },
    label: `Datum #${index}`,
    value: getRandomInt(0, 100),
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));

export default (
  <Panel className='large' style={{ overflow: 'unset' }}>
    <BarChart
      data={sampleData}
      barOpts={{ maxBarThickness: 10 }}
      resizeTopBottomAxis
      resizeLeftRightAxis
      disableMouseTracking
    />
  </Panel>
);
