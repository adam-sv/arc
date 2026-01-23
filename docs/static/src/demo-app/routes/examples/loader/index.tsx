import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import LoaderStory from './LoaderStory';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Loader',
    label: 'Loader',
    data: {
      path: 'loader',
      component: '',
      redirect: 'loader/default',
    },
  },
  {
    id: 'Loader Default',
    label: 'Loader',
    parentId: 'Loader',
    data: {
      path: 'loader/default',
      component: LoaderStory,
      title: 'Loader',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/loader/LoaderStory.tsx',
      ],
      renderVertically: true,
    },
  },
];
