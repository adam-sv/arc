import Default from './Default';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'MultiTextInput',
    label: 'MultiText Input',
    parentId: null,
    data: {
      path: '/multitext-input',
      component: '',
      redirect: '/multitext-input/defualt/',
    },
  },
  {
    id: 'MultiTextInput:Default',
    label: 'Default',
    parentId: 'MultiTextInput',
    data: {
      path: '/multitext-input/default',
      component: Default,
      title: 'Default',
      codeBlocks: ['/src/routes/examples/multitext-input/Default.tsx'],
    },
  },
];
