import React from 'react';
import {
  Panel,
  MonoIcon,
  Table,
  IColumnDefinition,
  MonoIconKey,
} from '@adam-sv/arc';
import './style.scss';

interface IMonoIconDatum {
  key: MonoIconKey;
  element: JSX.Element;
}

const columnDefs: IColumnDefinition<IMonoIconDatum>[] = [
  {
    cellContentGenerator: (cellModel) => cellModel.datum.key,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Key',
  },
  {
    cellContentGenerator: (cellModel) => cellModel.datum.element,
    sortKeyGenerator: (rowDatum) => rowDatum.key,
    title: 'Icon',
  },
];

export const MonoIconStory = (): JSX.Element => {
  const iconKeys = Object.keys(MonoIcon) as MonoIconKey[];
  const iconData: IMonoIconDatum[] = iconKeys.map((key) => {
    const ElementTag = MonoIcon[key];
    return { key, element: <ElementTag /> };
  });
  return (
    <Panel className='monoicon-story-panel'>
      <Table data={iconData} columnDefinitions={columnDefs} />
    </Panel>
  );
};
