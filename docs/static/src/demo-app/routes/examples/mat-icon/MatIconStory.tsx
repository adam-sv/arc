import { iconNameMap, IMatIconKey, MatIcon } from 'src/lib/components/MatIcon';
import { Panel, Table, IColumnDefinition } from '@adam-sv/arc';

interface IMatIconDatum {
  key: keyof typeof MatIcon;
  default: React.JSX.Element;
  light: React.JSX.Element;
  lighter: React.JSX.Element;
  filled: React.JSX.Element;
}

const columnDefs: IColumnDefinition<IMatIconDatum>[] = [
  {
    cellContentGenerator: (cellModel) => cellModel.datum.key,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Key',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.default,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Default',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.light,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Light',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.lighter,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Lighter',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.filled,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Filled',
  },
];

export const MatIconStory = (): React.JSX.Element => {
  const iconKeys = Object.keys(iconNameMap) as IMatIconKey[];

  const iconData: IMatIconDatum[] = iconKeys.map((iconKey, index) => {
    const ElementTag = MatIcon[iconKey];

    return {
      key: iconKeys[index],
      default: <ElementTag />,
      light: <ElementTag weight='light' />,
      lighter: <ElementTag weight='lighter' />,
      filled: <ElementTag filled />,
    };
  });

  return (
    <Panel className='maticon-story-panel' style={{ flexDirection: 'row' }}>
      <Table data={iconData} columnDefinitions={columnDefs} />
    </Panel>
  );
};
