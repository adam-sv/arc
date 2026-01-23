import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import SpinnerStory from './SpinnerStory';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Spinner',
    label: 'Spinner',
    data: {
      path: 'spinner',
      component: '',
      redirect: 'spinner/default',
    },
  },
  {
    id: 'Spinner Default',
    label: 'Spinner',
    parentId: 'Spinner',
    data: {
      path: 'spinner/default',
      component: SpinnerStory,
      title: 'Spinner',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/spinner/SpinnerStory.tsx',
      ],
      renderVertically: true,
    },
  },
];
