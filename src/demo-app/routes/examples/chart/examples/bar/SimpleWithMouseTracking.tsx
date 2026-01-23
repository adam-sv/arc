import {
  BarChart,
  generatePseudoRandomId,
  Panel,
  IBarChartDatum,
  NumberUtils,
} from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';
import type { JSX } from 'react';

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

const SimpleWithMouseTracking = (): JSX.Element => {
  return (
    <Panel className='large' style={{ overflow: 'unset' }}>
      <BarChart
        data={sampleData}
        mouseOverTargetElement={
          document.getElementById('@adam-sv/arc--docs-app') ?? undefined
        }
        minimumWidth={100}
        minimumHeight={200}
        orientation={'horizontal'}
      ></BarChart>
    </Panel>
  );
};

export default SimpleWithMouseTracking;
