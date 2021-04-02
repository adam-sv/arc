import { storiesOf } from '@storybook/react';
import { LoremIpsum } from 'lorem-ipsum';
import React from 'react';
import { Table } from '.';
import { IColumnDefinition } from '@adam-sv/arc';
import { getRandomInt } from '../../util';
import { StoryContainer as Story } from '../../utils/StoryContainer';

interface IExampleData {
  s: boolean;
  name: string;
  description: string;
  date: Date;
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const dataGenerator = (numEntries): IExampleData[] => {
  return new Array(numEntries).fill(0).map((zero, index) => {
    return {
      s: Math.random() >= 0.5,
      name: `Item ${index + 1}`,
      description: lorem.generateSentences(getRandomInt(0, 100)),
      date: new Date(Date.now() + Math.random() * 60 * 1000),
    } as IExampleData;
  });
};

const columnDefinitions: IColumnDefinition<IExampleData>[] = [
  {
    title: 'Selected',
    key: 'selected',
    width: '100px',
    sortKey: 's',
    // sortFunction: (a, b) => {
    //   if ((a as IExampleData).s) return -1;
    //   if ((b as IExampleData).s) return 1;
    //   return 0;
    // },
    cellContentGenerator: cell => `${(cell.datum as IExampleData).s}`,
  },
  {
    title: 'Name',
    key: 'name',
    sortKey: 'name',
    cellContentGenerator: cell => (cell.datum as IExampleData).name,
  },
  {
    title: 'Description',
    key: 'description',
    sortKey: 'description',
    pinned: 'scrollable',
    width: '100vw',
    cellContentGenerator: cell => (cell.datum as IExampleData).description,
    className: 'description',
  },
  {
    title: 'Created',
    key: 'created',
    sortKey: 'date',
    pinned: 'right',
    cellContentGenerator: cell =>
      `${(cell.datum as IExampleData).date.toLocaleTimeString()}`,
  },
];

storiesOf('General/Table', module)
  .add('One item', () => (
    <Story>
      <Table<IExampleData>
        data={dataGenerator(1)}
        columnDefinitions={columnDefinitions}
        highlightOnHover={'horizontal vertical'}
      />
    </Story>
  ))
  .add('3 pages 10 length', () => (
    <Story>
      <Table
        data={dataGenerator(30)}
        columnDefinitions={columnDefinitions}
      />
    </Story>
  ))
  .add('2.5 pages 10 length', () => (
    <Story>
      <Table<IExampleData>
        data={[...dataGenerator(25)]}
        columnDefinitions={columnDefinitions}
        highlightOnHover={'horizontal vertical'}
      />
    </Story>
  ))
  .add('Big', () => (
    <Story>
      <Table<IExampleData>
        data={[...dataGenerator(250)]}
        columnDefinitions={columnDefinitions}
        highlightOnHover={'horizontal vertical'}
      />
    </Story>
  ))
  .add('Massive', () => (
    <Story>
      <Table<IExampleData>
        data={[...dataGenerator(2500)]}
        columnDefinitions={columnDefinitions}
        highlightOnHover={'horizontal vertical'}
      />
    </Story>
  ));
