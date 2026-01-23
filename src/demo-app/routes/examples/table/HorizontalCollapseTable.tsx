import { Table, IColumnDefinition, Panel } from '@adam-sv/arc';
import { getSampleData, ISampleDatum } from './sample-data';

const sampleData = getSampleData(1000);

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
    title: 'Random String 1',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.randomString,
    sortKeyGenerator: (rowDatum) => rowDatum.randomString,
    title: 'Random String 2',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.randomString,
    sortKeyGenerator: (rowDatum) => rowDatum.randomString,
    title: 'Random String 3',
  },
  {
    cellContentGenerator: (cellModel) =>
      cellModel.datum.createdAt.toLocaleString(),
    sortKeyGenerator: (rowDatum) => rowDatum.createdAt.getTime(),
    title: 'Created At',
  },
];

export default (
  <Panel style={{ width: '400px' }}>
    <Table
      className='horizontal-collapse'
      data={sampleData}
      columnDefinitions={columnDefs}
      highlightOnHover='vertical horizontal'
    />
  </Panel>
);
