import { BarChartOrientation, Button, getRandomInt } from '@adam-sv/arc';
import {
  BarChart,
  generatePseudoRandomId,
  Panel,
  IBarChartDatum,
} from '@adam-sv/arc';
import { useState } from 'react';
import './grouped.scss';

const sampleData: IBarChartDatum[] = new Array(50)
  .fill(0)
  .map((zero: number, index: number) => ({
    id: generatePseudoRandomId(),
    data: {
      index,
      randomString: (Math.random() + 1).toString(36).substring(7),
    },
    label: `Datum #${index}`,
    categoryIdentifier: `Category: ${index % 5}`,
    value: getRandomInt(0, 100),
    className: `category-${index % 5}`,
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));

const Component = (): JSX.Element => {
  const [horizontalToggle, setHorizontalToggle] = useState<boolean>(false);

  return (
    <Panel className='GroupedBarChart' style={{ overflow: 'unset' }}>
      <Button
        className='horizontal-toggle'
        onClick={() => setHorizontalToggle(!horizontalToggle)}
      >
        {horizontalToggle ? 'Toggle Vertical' : 'Toggle Horizontal'}
      </Button>
      <BarChart
        key={horizontalToggle ? 'horiz' : 'verti'}
        data={sampleData}
        barOpts={{
          minBarThickness: 5,
          maxBarThickness: 10,
          orientation: horizontalToggle
            ? BarChartOrientation.horizontal
            : BarChartOrientation.vertical,
        }}
        independentAxis={{ label: 'Grouped Label' }}
        dependentAxis={{ label: 'Gropued label Dependent' }}
        disableMouseTracking
      ></BarChart>
    </Panel>
  );
};

export default Component;
