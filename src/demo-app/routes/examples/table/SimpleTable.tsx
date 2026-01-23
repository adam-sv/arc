import { Table, IColumnDefinition, Panel } from '@adam-sv/arc';
import { useState } from 'react';
import { getSampleData, ISampleDatum } from './sample-data';
import type { ICell } from '@adam-sv/arc';
import './style.scss';

export const SimpleTableStory = () => {
  const [sampleData] = useState(getSampleData(1000));
  const [selectedCell, setSelectedCell] = useState<ICell<ISampleDatum>>();

  const selected = (cellModel: ICell<ISampleDatum>) =>
    selectedCell && cellModel.rowIndex === selectedCell.rowIndex
      ? 'selected'
      : '';

  const columnDefs: IColumnDefinition<ISampleDatum>[] = [
    {
      cellContentGenerator: (cellModel) => cellModel.datum.index,
      cellClassNameGenerator: selected,
      sortKeyGenerator: (rowDatum) => rowDatum.index,
      title: 'Index',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.id,
      cellClassNameGenerator: selected,
      sortKeyGenerator: (rowDatum) => rowDatum.id,
      title: 'Psuedorandom ID',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.name,
      cellClassNameGenerator: selected,
      sortKeyGenerator: (rowDatum) => rowDatum.name,
      title: 'Name',
    },
    {
      cellContentGenerator: (cellModel) => cellModel.datum.randomString,
      cellClassNameGenerator: selected,
      sortKeyGenerator: (rowDatum) => rowDatum.randomString,
      title: 'Random String',
    },
    {
      cellContentGenerator: (cellModel) =>
        cellModel.datum.createdAt.toLocaleString(),
      cellClassNameGenerator: selected,
      sortKeyGenerator: (rowDatum) => rowDatum.createdAt.getTime(),
      title: 'Created At',
    },
  ];

  return (
    <Panel>
      <Table
        data={sampleData}
        columnDefinitions={columnDefs}
        highlightOnHover='vertical horizontal'
        onClickCell={(cell) => {
          setSelectedCell(cell.cellModel);
        }}
      />
    </Panel>
  );
};
