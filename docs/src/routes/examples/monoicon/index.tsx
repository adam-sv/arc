import { MonoIconStory } from './MonoIconStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'MonoIcon',
    label: 'MonoIcon',
    parentId: null,
    data: {
      path: '/monoicon',
      component: '',
      redirect: '/monoicon/default',
    },
  },
  {
    id: 'MonoIcon:Default',
    label: 'Default',
    parentId: 'MonoIcon',
    data: {
      path: '/monoicon/default',
      component: MonoIconStory,
      title: 'MonoIcons',
      renderVertically: false,
      codeBlocks: [
        '/src/routes/examples/monoicon/MonoIconStory.tsx',
        '/src/routes/examples/monoicon/style.scss',
      ],
    },
  },
];
