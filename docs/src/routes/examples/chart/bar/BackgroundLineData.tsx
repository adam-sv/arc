import { BarChart, Panel } from '@adam-sv/arc';

import {
  sampleData,
  sampleLineData,
  sampleLineData1,
  sampleLineData2,
} from './BackgroundData';

export default (
  <Panel className='large'>
    <BarChart
      data={sampleData}
      continuousLines={{
        dataArray: [
          {
            data: sampleLineData,
            color: 'var(--primary)',
            fillAreaUndercurve: true,
          },
          {
            data: sampleLineData1,
            color: 'var(--warning)',
          },
          {
            data: sampleLineData2,
            color: 'var(--success)',
            renderInfrontOfBars: true,
          },
        ],
        //thegrpah only goes from 19-30 with a step of 1 but for the scale to be created properly
        // the domaine needs to be 1 step farther last value
        independentDomain: [19, 30],
        independentDomainIncrementStep: 1,
      }}
      independentAxis={{ label: 'Independent Axis Label' }}
      dependentAxis={{ label: 'Dependent Axis Label' }}
      disableMouseTracking

    ></BarChart>
  </Panel>
);
