import DefaultTree from './DefaultTree';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Tree',
    label: 'Tree',
    parentId: null,
    data: {
      path: '/tree',
      component: '',
      redirect: '/tree/default',
    },
  },
  {
    id: 'Tree:Default',
    label: 'Default',
    parentId: 'Tree',
    data: {
      path: '/tree/default',
      component: DefaultTree,
      title: 'Default Tree',
      codeBlocks: ['/src/routes/examples/tree/DefaultTree.tsx'],
    },
  },
];
