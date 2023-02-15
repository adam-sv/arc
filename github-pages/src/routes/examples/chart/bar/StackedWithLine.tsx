import { getRandomInt, ISecondaryLineDatum } from '@adam-sv/arc';
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
const lineData: ISecondaryLineDatum[] = new Array(5).fill(0).map((_, i) => {
  return {
    id: i,
    data: {
      index: 0,
      randomString: (Math.random() + 1).toString(36).substring(7),
    },
    label: `Category-${i}`,
    value: getRandomInt(0, 100),
    dataLabels: true,
  };
});

export default (
  <Panel className='StackedBarChart'>
    <BarChart
      data={sampleData}
      barOpts={{ maxBarThickness: 10 }}
      stacked
      secondaryLineData={{
        data: lineData,
        dependentDomain: [0, 105],
        percentLine: 90,
        renderAxis: true,
        axisLabel: 'Alt Axis Label',
      }}
      independentAxis={{ label: 'Independent Axis Label' }}
      dependentAxis={{ label: 'Dependent Axis Label' }}
      disableMouseTracking
      legend={[
        { label: 'item1', color: 'var(--secondary)' },
        { label: 'item2', className: 'ArcLegendItem-2' },
        { label: 'item3', className: 'ArcLegendItem-3' },
        { label: 'item4', className: 'ArcLegendItem-4' },
      ]}
    />
  </Panel>
);
