import {
  Table,
  IColumnDefinition,
  generatePseudoRandomId,
  Panel,
} from '@adam-sv/arc';

interface ISampleDatum {
  index: number;
  id: string;
  name: string;
  createdAt: Date;
  randomString: string;
}

const sampleData: ISampleDatum[] = new Array(1000)
  .fill(0)
  .map((zero: number, index: number) => ({
    index,
    id: generatePseudoRandomId(),
    randomString: (Math.random() + 1).toString(36).substring(7),
    name: `Datum #${index}`,
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));

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
