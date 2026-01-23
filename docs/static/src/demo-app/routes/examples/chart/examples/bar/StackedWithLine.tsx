import {
  BarChart,
  Panel,
  IBarChartDatum,
  NumberUtils,
  generatePseudoRandomId,
  IBarChartSecondaryLineData,
} from '@adam-sv/arc';
import '../style.scss';
import { v4 as uuidv4 } from 'uuid';

const { getRandomInt } = NumberUtils;
const sampleData: IBarChartDatum[] = new Array(50)
  .fill(0)
  .map((zero: number, index: number) => ({
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

const lineData: IBarChartSecondaryLineData['data'] = new Array(5)
  .fill(0)
  .map((_, i) => {
    const value = getRandomInt(0, 100);
    return {
      id: `Datum #${i}`,
      label: `Category-${i % 5}`,
      value,
      displayValue: `${value}%`,
    };
  });

export default (
  <Panel className='StackedBarChart'>
    <BarChart
      data={sampleData}
      stackedBars
      minimumWidth={100}
      minimumHeight={200}
      orientation={'horizontal'}
      minValue={0}
      lineData={{
        data: lineData,
        minValue: 0,
        maxValue: 105,
        dataPoints: true,
        axisSettings: {
          label: 'Bar Alt Axis',
          size: 100,
          preventResize: true,
        },
        textOffset: { horizontal: 13, vertical: 0 },
        horizontalLine: 95,
        // displayGrid: true,
      }}
    />
  </Panel>
);
