import { useState, type JSX } from 'react';
import {
  BarChart,
  Button,
  generatePseudoRandomId,
  NumberUtils,
  Panel,
} from '@adam-sv/arc';
import '../style.scss';
import type { IBarChartDatum } from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

const sampleUnevenData = () => {
  const data: IBarChartDatum[] = [];
  const nums = [1, 2, 3, 4, 5];
  nums.forEach((num) => {
    for (let i = 0; i < num; i++) {
      data.push(createData(num));
    }
  });
  return data;
};

const createData = (index: number) => {
  return {
    id: generatePseudoRandomId(),
    data: {
      index,
      randomString: uuidv4(),
    },
    label: `Datum #${index}`,
    categoryIdentifier: `Category: ${index}`,
    value: NumberUtils.getRandomInt(0, 100),
    className: `category-${index % 5}`,
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  };
};

const Component = (): JSX.Element => {
  const [horizontalToggle, setHorizontalToggle] = useState<boolean>(true);

  return (
    <Panel className='GroupedBarChart' style={{ overflow: 'unset' }}>
      <Button
        className='horizontal-toggle'
        onClick={() => {
          setHorizontalToggle(!horizontalToggle);
        }}
      >
        {horizontalToggle ? 'Toggle Vertical' : 'Toggle Horizontal'}
      </Button>
      <BarChart
        minimumWidth={100}
        minimumHeight={200}
        barOpts={{ minBarThickness: 10 }}
        orientation={horizontalToggle ? 'horizontal' : 'vertical'}
        key={horizontalToggle ? 'horizontal' : 'vertical'}
        data={sampleUnevenData()}
      ></BarChart>
    </Panel>
  );
};

export default Component;

// const data = {
//   'Architecture & Integration': [
//     {
//       value: 1000,
//       label: 'Architecture & Integration: Saving Initial Year 2028',
//       categoryIdentifier: 'Architecture & Integration',
//       data: { type: 'Saving Initial', year: '2028' },
//       className: 'BarChartBar-3 BarChartBar-initial',
//     },
//     {
//       value: 1000,
//       label: 'Architecture & Integration: Saving Reviewed Year 2028',
//       categoryIdentifier: 'Architecture & Integration',
//       data: { type: 'Saving Reviewed', year: '2028' },
//       className: 'BarChartBar-3 BarChartBar-avoidance',
//     },
//     {
//       value: 1000,
//       label: 'Architecture & Integration: Avoidance Initial Year 2028',
//       categoryIdentifier: 'Architecture & Integration',
//       data: { type: 'Avoidance Initial', year: '2028' },
//       className: 'BarChartBar-3 BarChartBar-initial',
//     },
//     {
//       value: 1000,
//       label: 'Architecture & Integration: Avoidance Reviewed Year 2028',
//       categoryIdentifier: 'Architecture & Integration',
//       data: { type: 'Avoidance Reviewed', year: '2028' },
//       className: 'BarChartBar-3 BarChartBar-avoidance',
//     },
//     {
//       value: 1000,
//       label: 'Architecture & Integration: Effort Initial Year 2028',
//       categoryIdentifier: 'Architecture & Integration',
//       data: { type: 'Effort Initial', year: '2028' },
//       className: 'BarChartBar-3 BarChartBar-initial',
//     },
//     {
//       value: 1000,
//       label: 'Architecture & Integration: Effort Reviewed Year 2028',
//       categoryIdentifier: 'Architecture & Integration',
//       data: { type: 'Effort Reviewed', year: '2028' },
//       className: 'BarChartBar-3 BarChartBar-avoidance',
//     },
//   ],
//   'Business Management': [
//     {
//       value: 300,
//       label: 'Business Management: Saving Initial Year 2023',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Saving Initial', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-initial',
//     },
//     {
//       value: 350,
//       label: 'Business Management: Saving Reviewed Year 2023',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Saving Reviewed', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-avoidance',
//     },
//     {
//       value: 400,
//       label: 'Business Management: Saving Initial Year 2024',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Saving Initial', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-initial',
//     },
//     {
//       value: 450,
//       label: 'Business Management: Saving Reviewed Year 2024',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Saving Reviewed', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-avoidance',
//     },
//     {
//       value: 100,
//       label: 'Business Management: Saving Initial Year 2025',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Saving Initial', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-initial',
//     },
//     {
//       value: 50,
//       label: 'Business Management: Saving Reviewed Year 2025',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Saving Reviewed', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-avoidance',
//     },
//     {
//       value: 100,
//       label: 'Business Management: Avoidance Initial Year 2023',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Avoidance Initial', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-initial',
//     },
//     {
//       value: 200,
//       label: 'Business Management: Avoidance Reviewed Year 2023',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Avoidance Reviewed', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-avoidance',
//     },
//     {
//       value: 200,
//       label: 'Business Management: Avoidance Initial Year 2024',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Avoidance Initial', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-initial',
//     },
//     {
//       value: 250,
//       label: 'Business Management: Avoidance Reviewed Year 2024',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Avoidance Reviewed', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-avoidance',
//     },
//     {
//       value: 400,
//       label: 'Business Management: Avoidance Initial Year 2025',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Avoidance Initial', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-initial',
//     },
//     {
//       value: 450,
//       label: 'Business Management: Avoidance Reviewed Year 2025',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Avoidance Reviewed', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-avoidance',
//     },
//     {
//       value: 150,
//       label: 'Business Management: Effort Initial Year 2023',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Effort Initial', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-initial',
//     },
//     {
//       value: 250,
//       label: 'Business Management: Effort Reviewed Year 2023',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Effort Reviewed', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-avoidance',
//     },
//     {
//       value: 300,
//       label: 'Business Management: Effort Initial Year 2024',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Effort Initial', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-initial',
//     },
//     {
//       value: 350,
//       label: 'Business Management: Effort Reviewed Year 2024',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Effort Reviewed', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-avoidance',
//     },
//     {
//       value: 350,
//       label: 'Business Management: Effort Initial Year 2025',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Effort Initial', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-initial',
//     },
//     {
//       value: 300,
//       label: 'Business Management: Effort Reviewed Year 2025',
//       categoryIdentifier: 'Business Management',
//       data: { type: 'Effort Reviewed', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-avoidance',
//     },
//   ],
//   'Structure Design': [
//     {
//       value: 200,
//       label: 'Structure Design: Saving Initial Year 2023',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Saving Initial', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-initial',
//     },
//     {
//       value: 100,
//       label: 'Structure Design: Saving Reviewed Year 2023',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Saving Reviewed', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-avoidance',
//     },
//     {
//       value: 500,
//       label: 'Structure Design: Saving Initial Year 2024',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Saving Initial', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-initial',
//     },
//     {
//       value: 600,
//       label: 'Structure Design: Saving Reviewed Year 2024',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Saving Reviewed', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-avoidance',
//     },
//     {
//       value: 5,
//       label: 'Structure Design: Saving Initial Year 2025',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Saving Initial', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-initial',
//     },
//     {
//       value: 6,
//       label: 'Structure Design: Saving Reviewed Year 2025',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Saving Reviewed', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-avoidance',
//     },
//     {
//       value: 600,
//       label: 'Structure Design: Avoidance Initial Year 2023',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Avoidance Initial', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-initial',
//     },
//     {
//       value: 500,
//       label: 'Structure Design: Avoidance Reviewed Year 2023',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Avoidance Reviewed', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-avoidance',
//     },
//     {
//       value: 100,
//       label: 'Structure Design: Avoidance Initial Year 2024',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Avoidance Initial', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-initial',
//     },
//     {
//       value: 200,
//       label: 'Structure Design: Avoidance Reviewed Year 2024',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Avoidance Reviewed', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-avoidance',
//     },
//     {
//       value: 1,
//       label: 'Structure Design: Avoidance Initial Year 2025',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Avoidance Initial', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-initial',
//     },
//     {
//       value: 2,
//       label: 'Structure Design: Avoidance Reviewed Year 2025',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Avoidance Reviewed', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-avoidance',
//     },
//     {
//       value: 400,
//       label: 'Structure Design: Effort Initial Year 2023',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Effort Initial', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-initial',
//     },
//     {
//       value: 300,
//       label: 'Structure Design: Effort Reviewed Year 2023',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Effort Reviewed', year: '2023' },
//       className: 'BarChartBar-0 BarChartBar-avoidance',
//     },
//     {
//       value: 300,
//       label: 'Structure Design: Effort Initial Year 2024',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Effort Initial', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-initial',
//     },
//     {
//       value: 400,
//       label: 'Structure Design: Effort Reviewed Year 2024',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Effort Reviewed', year: '2024' },
//       className: 'BarChartBar-1 BarChartBar-avoidance',
//     },
//     {
//       value: 30,
//       label: 'Structure Design: Effort Initial Year 2025',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Effort Initial', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-initial',
//     },
//     {
//       value: 40,
//       label: 'Structure Design: Effort Reviewed Year 2025',
//       categoryIdentifier: 'Structure Design',
//       data: { type: 'Effort Reviewed', year: '2025' },
//       className: 'BarChartBar-2 BarChartBar-avoidance',
//     },
//   ],
// };
