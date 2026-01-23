import { Table, IColumnDefinition, Panel } from '@adam-sv/arc';

export interface ISampleDatum {
  index: number;
  name: string;
}

const columnDefs: IColumnDefinition<ISampleDatum>[] = [
  {
    cellContentGenerator: (cellModel) => cellModel.datum.index,
    sortKeyGenerator: (rowDatum) => rowDatum.index,
    title: 'Index',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.name,
    sortKeyGenerator: (rowDatum) => rowDatum.name.toLowerCase(),
    title: 'Name - default sort',
  },
];

const sampleData = [
  'Aardvark',
  'abyssinian',
  'Achrioptera Manga',
  'Aardwolf',
  'acadian Flycatcher',
  'Abyssinian Guinea Pig',
  'Ackie Monitor',
  'Alpaca',
  'addax',
  'axolotl',
  'Albatross',
].map((name, index) => ({ index, name }));

export const DefaultSortTableStory = () => {
  return (
    <Panel>
      <Table
        data={sampleData}
        columnDefinitions={columnDefs}
        highlightOnHover='vertical horizontal'
        defaultSortBy={{
          columnTitle: 'Name - default sort',
          direction: 'desc',
        }}
        onTableSortChanged={(key, direction) => {
          console.info('table sort changed!', { key, direction });
        }}
      />
    </Panel>
  );
};
