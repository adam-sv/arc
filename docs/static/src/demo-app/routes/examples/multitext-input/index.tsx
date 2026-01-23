import Default from './Default';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'MultiTextInput',
    label: 'MultiText Input',
    data: {
      path: 'multitext-input',
      component: '',
      redirect: 'multitext-input/default',
    },
  },
  {
    id: 'MultiTextInput:Default',
    label: 'Default',
    parentId: 'MultiTextInput',
    data: {
      path: 'multitext-input/default',
      component: Default,
      title: 'Default',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/multitext-input/Default.tsx',
      ],
    },
  },
];
