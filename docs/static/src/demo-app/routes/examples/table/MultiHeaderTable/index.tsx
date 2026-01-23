import { Table, IColumnDefinition, Panel } from '@adam-sv/arc';
import { useEffect, useState } from 'react';
import { getSampleData, ISampleDatum } from '../sample-data';
import MultiHeader from './MultiHeader';
import './style.scss';

const sampleData = getSampleData(1000);

const getColumns = (
  selectedMultiHeaderColumn: IColumnDefinition<ISampleDatum>,
  setSelectedMultiHeaderColumn: (
    shouldShowAnother: IColumnDefinition<ISampleDatum>
  ) => void,
  multiHeaderColumns: IColumnDefinition<ISampleDatum>[]
): IColumnDefinition<ISampleDatum>[] => {
  const multiHeaderDataKey =
    selectedMultiHeaderColumn.title === 'Another Random String'
      ? 'anotherRandomString'
      : 'randomString'; // defaults to randomString

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
      cellContentGenerator: (cellModel) => cellModel.datum[multiHeaderDataKey],
      sortKeyGenerator: (rowDatum) => rowDatum[multiHeaderDataKey],
      title: 'Random String Multiheader',
      headerClassName: 'multi-select-header',
      headerContentGenerator: () => (
        <MultiHeader
          selectedColumn={selectedMultiHeaderColumn}
          didSelectColumn={setSelectedMultiHeaderColumn}
          columns={multiHeaderColumns}
        />
      ),
    },
    {
      cellContentGenerator: (cellModel) =>
        cellModel.datum.createdAt.toLocaleString(),
      sortKeyGenerator: (rowDatum) => rowDatum.createdAt.getTime(),
      title: 'Created At',
    },
  ];
  return columnDefs;
};

const randomStringColumn: IColumnDefinition<ISampleDatum> = {
  cellContentGenerator: (cellModel) => cellModel.datum.randomString,
  sortKeyGenerator: (rowDatum) => rowDatum.randomString,
  title: 'Random String',
};

const anotherRandomStringColumn: IColumnDefinition<ISampleDatum> = {
  cellContentGenerator: (cellModel) => cellModel.datum.anotherRandomString,
  sortKeyGenerator: (rowDatum) => rowDatum.anotherRandomString,
  title: 'Another Random String',
};

const MultiHeaderTableStory = () => {
  const [multiHeaderColumns] = useState<IColumnDefinition<ISampleDatum>[]>([
    randomStringColumn,
    anotherRandomStringColumn,
  ]);
  const [selectedMultiHeaderColumn, setSelectedMultiHeaderColumn] = useState<
    IColumnDefinition<ISampleDatum>
  >(multiHeaderColumns[0]);
  const [columns, setColumns] = useState<IColumnDefinition<ISampleDatum>[]>([]);

  useEffect(() => {
    setColumns(
      getColumns(
        selectedMultiHeaderColumn,
        setSelectedMultiHeaderColumn,
        multiHeaderColumns
      )
    );
  }, [selectedMultiHeaderColumn, multiHeaderColumns]);

  return (
    <Panel>
      <Table data={sampleData} columnDefinitions={columns} />
    </Panel>
  );
};

export default MultiHeaderTableStory;
