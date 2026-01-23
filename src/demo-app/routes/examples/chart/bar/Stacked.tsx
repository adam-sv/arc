import { NumberUtils } from '@adam-sv/arc';
import { BarChart, Panel, IBarChartDatum } from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

import './grouped.scss';

const groupedData = new Array(5).fill(0).map((_, i) => {
  const data: IBarChartDatum[] = [];
  for (let j = 0; j < 4; j++) {
    data.push({
      id: `${i}`,
      data: {
        index: 0,
        randomString: uuidv4(),
      },
      label: `Category-${i}`,
      value: NumberUtils.getRandomInt(0, 100),
      className: `position-${j}`,
    });
  }
  return data;
});

const sampleData = groupedData.flat();

const MAGIC_ROOT_ID = '@adam-sv/arc--docs-app';

export default (
  <Panel className='StackedBarChart'>
    <BarChart
      data={sampleData}
      barOpts={{ maxBarThickness: 10 }}
      stackedBars
      minimumWidth={100}
      minimumHeight={200}
      mouseOverTargetElement={
        document.getElementById(MAGIC_ROOT_ID) ?? undefined
      }
    />
  </Panel>
);
