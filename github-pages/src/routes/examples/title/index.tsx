import TitleTypes from './Types';
import TitleAlignments from './Alignments';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Title',
    label: 'Title',
    parentId: null,
    data: {
      path: '/title',
      component: '',
      redirect: '/Title/types',
    },
  },
  {
    id: 'Title:types',
    label: 'Types',
    parentId: 'Title',
    data: {
      path: '/title/types',
      component: TitleTypes,
      title: 'Title Types',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/title/Types.tsx'],
    },
  },
  {
    id: 'Title:alignments',
    label: 'Alignments',
    parentId: 'Title',
    data: {
      path: '/title/alignments',
      component: TitleAlignments,
      title: 'Title Alignments',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/title/Alignments.tsx'],
    },
  },
];
