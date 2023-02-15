import React from 'react';
import { Gantt, Panel, IGanttDatum } from '@adam-sv/arc';

function generateData(entries: number): IGanttDatum[] {
  const data = [];
  const now = Date.now();
  const fixedFactor = 2 * 60 * 60 * 1000;
  const maxPastFixedFactor = 5 * 60 * 60 * 1000;

  for (let i = 0; i < entries; i++) {
    data.push({
      id: i,
      label: `Row ${i}`,
      start: new Date(now + i * fixedFactor),
      finish: new Date(
        now + i * fixedFactor + (Math.random() + 0.05) * maxPastFixedFactor
      ),
    });
  }
  return data;
}

const SimpleGanttChartWithMouseTracking = (): JSX.Element => {
  return (
    <Panel className='large' style={{ overflow: 'unset' }}>
      <Gantt
        key='default'
        data={generateData(10)}
        barOpts={{
          height: 12,
          padding: 10,
        }}
        xOpts={{
          nice: true,
          label: 'X Label',
          tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
          tickCount: 8,
        }}
        yOpts={{}}
        mouseOverStyle={{ minWidth: '200px' }}
        mouseOverTargetElement={
          document.getElementById('@adam-sv/arc--docs-app') ?? undefined
        }
      />
    </Panel>
  );
};

export default SimpleGanttChartWithMouseTracking;
