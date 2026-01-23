import { Table, IColumnDefinition, Panel, ContextMenu } from '@adam-sv/arc';
import { useState } from 'react';
import { getSampleData, ISampleDatum } from './sample-data';
import { IRow } from '@adam-sv/arc';
import './style.scss';

const columnDefs: IColumnDefinition<ISampleDatum>[] = [
  {
    cellContentGenerator: (cellModel) => cellModel.datum.index,
    sortKeyGenerator: (rowDatum) => rowDatum.index,
    title: 'Index',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.id,
    sortKeyGenerator: (rowDatum) => rowDatum.id,
    title: 'Psuedorandom ID',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.name,
    sortKeyGenerator: (rowDatum) => rowDatum.name,
    title: 'Name',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.randomString,
    sortKeyGenerator: (rowDatum) => rowDatum.randomString,
    title: 'Random String',
  },
  {
    cellContentGenerator: (cellModel) =>
      cellModel.datum.createdAt.toLocaleString(),
    sortKeyGenerator: (rowDatum) => rowDatum.createdAt.getTime(),
    title: 'Created At',
  },
];

export const TableContextMenuStory = () => {
  const [sampleData] = useState(getSampleData(1000));
  const [contextCoords, setContextCoords] = useState({ x: 0, y: 0 });
  const [contextOpen, setContextOpen] = useState(false);
  const [contextContent, setContextContent] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<IRow<ISampleDatum>>();
  return (
    <Panel>
      <Table
        data={sampleData}
        columnDefinitions={columnDefs}
        highlightOnHover='horizontal'
        onClickRowContextMenu={({ event, rowModel }) => {
          event.stopPropagation();
          event.preventDefault();
          setContextOpen(true);
          setContextContent(rowModel.datum.name);
          setContextCoords({ x: event.clientX, y: event.clientY });
        }}
        onClickRow={(rowModel) => {
          setSelectedRow(rowModel.rowModel);
        }}
        rowClassNameGenerator={(rowModel: IRow<ISampleDatum>) =>
          rowModel.rowIndex === selectedRow?.rowIndex ? 'selected-row' : ''
        }
      />
      <ContextMenu
        isOpen={contextOpen}
        position={contextCoords}
        setIsOpen={setContextOpen}
        items={[
          { label: `Edit ${contextContent}` },
          { label: `View ${contextContent}` },
          { label: `Delete ${contextContent}` },
        ]}
      />
    </Panel>
  );
};
