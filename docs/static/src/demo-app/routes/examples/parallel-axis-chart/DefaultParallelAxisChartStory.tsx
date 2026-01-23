import { useState, type JSX } from 'react';
import {
  IParallelAxisChartColumn,
  Panel,
  ParallelAxisChart,
  ParallelAxisChartDatum,
  Table,
} from '@adam-sv/arc';
import { IColumnDefinition } from '@adam-sv/arc';
import { getData } from './getData';

export function DefaultParallelAxisChartStory(): JSX.Element {
  const [filteredParallelAxisChartData, setFilteredParallelAxisChartData] =
    useState<ParallelAxisChartDatum[]>([]);

  const [data] = useState<ParallelAxisChartDatum[]>(getData());

  const parallelAxisChartColumns: IParallelAxisChartColumn[] = [
    {
      label: 'ID',
      key: 'id',
      numTicks: data.length,
      showChangeOnTopAndBottomTick: false,
    },
    {
      label: 'Alpha',
      key: 'alpha',
      numTicks: 11,
      interval: 0.5,
      showChangeOnTopAndBottomTick: false,
    },
    {
      label: 'Beta',
      key: 'beta',
      numTicks: 2,
      interval: 2,
    },
    {
      label: 'Gamma',
      key: 'gamma',
      numTicks: 2,
    },
    {
      label: 'Delta',
      key: 'delta',
      numTicks: 2,
    },
    {
      label: 'Epsilon',
      key: 'epsilon',
      numTicks: 2,
    },
  ];

  const tableColumns: IColumnDefinition<ParallelAxisChartDatum>[] = [
    {
      cellContentGenerator: (cellModel) => cellModel.datum.id,
      sortKeyGenerator: (rowDatum) => rowDatum.id,
      title: 'ID',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.values['alpha'],
      sortKeyGenerator: (rowDatum) => rowDatum.values['alpha'],
      title: 'Alpha',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.values['beta'],
      sortKeyGenerator: (rowDatum) => rowDatum.values['beta'],
      title: 'Beta',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.values['gamma'],
      sortKeyGenerator: (rowDatum) => rowDatum.values['gamma'],
      title: 'Gamma',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.values['delta'],
      sortKeyGenerator: (rowDatum) => rowDatum.values['delta'],
      title: 'Delta',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.values['epsilon'],
      sortKeyGenerator: (rowDatum) => rowDatum.values['epsilon'],
      title: 'Epsilon',
    },
  ];

  return (
    <Panel className='parallel-axis-chart-default-story-panel'>
      <ParallelAxisChart
        data={data}
        didFilterData={setFilteredParallelAxisChartData}
        columns={parallelAxisChartColumns}
      />
      <div className='table-block'>
        <h3>Filtered Data</h3>
        <Table
          data={filteredParallelAxisChartData}
          columnDefinitions={tableColumns}
        />
      </div>
    </Panel>
  );
}
