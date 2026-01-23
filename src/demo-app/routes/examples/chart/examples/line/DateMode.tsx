import { NumberUtils, ILineChartProps, LineChart } from '@adam-sv/arc';
const { getRandomInt } = NumberUtils;

import '../style.scss';

const SimpleLineChart = () => {
  return (
    <LineChart
      data={generateData()}
      axisSettings={{
        left: { label: 'Line Axis Left' },
        bottom: { label: 'Line Axis Bottom' },
      }}
      dateMode
    />
  );
};

const generateData = () => {
  const data: ILineChartProps['data'] = { line1: [], line2: [] };
  for (let i = 0; i < 10; i++) {
    data['line1'].push({
      time: new Date().getTime() + i * 24 * 60 * 60 * 1000,
      value: getRandomInt(10, 100),
      className: 'ChartBase-LineChart-Line1',
    });
    data['line2'].push({
      time: new Date().getTime() + i * 24 * 60 * 60 * 1000,
      value: getRandomInt(10, 100),
      className: 'ChartBase-LineChart-Line2',
    });
  }
  return data;
};

export default SimpleLineChart;
