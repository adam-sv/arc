import { GanttChart, Panel, IGanttChartDatum } from '@adam-sv/arc';
import '../style.scss';
import type { JSX } from 'react';

function SmartEdgesGanttChart(): JSX.Element {
  function generateData(entries: number): IGanttChartDatum<never, number>[] {
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

  return (
    <Panel style={{ padding: 0 }}>
      <GanttChart
        data={generateData(10)}
        barOpts={{ height: 50, padding: 5 }}
        edges={[
          { from: 0, to: 2 },
          { from: 2, to: 4 },
          { from: 2, to: 5 },
          { from: 5, to: 9 },
        ]}
        edgeMode='smart'
        axisSettings={{
          left: { label: 'Gantt Axis Left', size: 100, preventResize: true },
          bottom: { label: 'Gantt Axis Bottom' },
        }}
        zoomSettings={{
          value: 1.2,
        }}
      />
    </Panel>
  );
}

export default SmartEdgesGanttChart;
