import { getRandomInt } from '@adam-sv/arc';
import { BarChart, Panel, IBarChartDatum } from '@adam-sv/arc';

import './grouped.scss';

const groupedData = new Array(5).fill(0).map((_, i) => {
  const data: IBarChartDatum[] = [];
  for (let j = 0; j < 4; j++) {
    data.push({
      id: i,
      data: {
        index: 0,
        randomString: (Math.random() + 1).toString(36).substring(7),
      },
      label: `Category-${i}`,
      value: getRandomInt(0, 100),
      className: `position-${j}`,
    });
  }
  return data;
});

const sampleData = groupedData.flat();

export default (
  <Panel className='StackedBarChart'>
    <BarChart
      data={sampleData}
      barOpts={{ maxBarThickness: 10 }}
      stacked
      mouseOverTargetElement={
        document.getElementById('@adam-sv/arc--docs-app') ?? undefined
      }
    />
  </Panel>
);
