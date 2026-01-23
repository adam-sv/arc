import TitleTypes from './Types';
import TitleAlignments from './Alignments';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Title',
    label: 'Title',
    data: {
      path: 'title',
      component: '',
      redirect: 'Title/types',
    },
  },
  {
    id: 'Title:types',
    label: 'Types',
    parentId: 'Title',
    data: {
      path: 'title/types',
      component: TitleTypes,
      title: 'Title Types',
      renderVertically: true,
      codeBlocks: ['/static/src/demo-app/routes/examples/title/Types.tsx'],
    },
  },
  {
    id: 'Title:alignments',
    label: 'Alignments',
    parentId: 'Title',
    data: {
      path: 'title/alignments',
      component: TitleAlignments,
      title: 'Title Alignments',
      renderVertically: true,
      codeBlocks: ['/static/src/demo-app/routes/examples/title/Alignments.tsx'],
    },
  },
];
