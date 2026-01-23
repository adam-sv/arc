import { useState, type JSX } from 'react';
import {
  CheckboxGroup,
  Panel,
  ParallelAxisChart,
  ParallelAxisChartDatum,
} from '@adam-sv/arc';
import type { ICheckBoxGroupItem } from '@adam-sv/arc';
import { getData } from './getData';

const DEFAULT_CHECKBOXES = [
  { value: false, label: 'ID', key: 'id' },
  { value: true, label: 'Alpha', key: 'alpha' },
  { value: true, label: 'Beta', key: 'beta' },
  { value: true, label: 'Gamma', key: 'gamma' },
  { value: false, label: 'Delta', key: 'delta' },
  { value: false, label: 'Epsilon', key: 'epsilon' },
];

export function SelectableColumnsParallelAxisChartStory(): JSX.Element {
  const [filteredParallelAxisChartData, setFilteredParallelAxisChartData] =
    useState<ParallelAxisChartDatum[]>([]);

  const [checkboxItems, setCheckboxItems] =
    useState<ICheckBoxGroupItem[]>(DEFAULT_CHECKBOXES);

  const [data] = useState<ParallelAxisChartDatum[]>(getData());

  const parallelAxisChartColumns = [
    {
      label: 'ID',
      key: 'id',
      numTicks: data.length,
    },
    {
      label: 'Alpha',
      key: 'alpha',
      numTicks: 11,
    },

    {
      label: 'Beta',
      key: 'beta',
      numTicks: 2,
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
  ].filter((c) => checkboxItems.some((i) => i.value && i.key === c.key));

  return (
    <Panel style={{ flex: '1 1 auto' }}>
      <span>
        {filteredParallelAxisChartData.length} datapoints pass the filters.
      </span>
      <CheckboxGroup
        onChange={setCheckboxItems}
        items={checkboxItems}
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      />
      <ParallelAxisChart
        data={data}
        didFilterData={setFilteredParallelAxisChartData}
        columns={parallelAxisChartColumns}
      />
    </Panel>
  );
}
