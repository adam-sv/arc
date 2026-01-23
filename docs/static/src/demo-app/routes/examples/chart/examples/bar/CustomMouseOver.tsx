import {
  IBarChartDatum,
  generatePseudoRandomId,
  NumberUtils,
  Panel,
  BarChart,
} from '@adam-sv/arc';
const { getRandomInt } = NumberUtils;
import { v4 as uuidv4 } from 'uuid';

const sampleData: IBarChartDatum[] = new Array(10)
  .fill(0)
  .map((zero: number, index: number) => ({
    id: generatePseudoRandomId(),
    data: {
      index,
      randomString: uuidv4(),
    },
    label: `Datum #${index}`,
    value: getRandomInt(0, 100),
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));
// making a comment

export default (
  <Panel className='large' style={{ overflow: 'unset' }}>
    <BarChart
      data={sampleData}
      minimumWidth={100}
      minimumHeight={200}
      orientation={'horizontal'}
      axisSettings={{
        left: { preventResize: true },
        bottom: { preventResize: true },
      }}
      customMouseOver={mouseOverContent}
    />
  </Panel>
);

function mouseOverContent(bar: IBarChartDatum<{ randomString: string }>) {
  return (
    <div>
      {bar.categoryIdentifier && <div>Category: {bar.categoryIdentifier}</div>}
      <div>Label: {bar.label}</div>
      <div>Value: {bar.value}</div>

      <div>Bar Data: {bar.data?.randomString}</div>
    </div>
  );
}
