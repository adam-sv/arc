import { ILineChartProps, LineChart } from '@adam-sv/arc';

import '../style.scss';

const NoMouseTracking = () => {
  return (
    <LineChart
      data={generateData()}
      axisSettings={{
        left: { label: 'Line Axis Left' },
        bottom: { label: 'Line Axis Bottom' },
      }}
      disableMouseTracking
    />
  );
};

const generateData = () => {
  const data: ILineChartProps['data'] = { line1: [], line2: [] };
  for (let i = 0; i < 10; i++) {
    data['line1'].push({
      time: i * 10,
      value: Math.random() * 100,
      className: 'ChartBase-LineChart-Line1',
    });
    data['line2'].push({
      time: i * 10,
      value: Math.random() * 100,
      className: 'ChartBase-LineChart-Line2',
    });
  }
  return data;
};

export default NoMouseTracking;
