import { MonoIconStory } from './MonoIconStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'MonoIcon',
    label: 'MonoIcon',
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
        '/static/src/demo-app/routes/examples/monoicon/MonoIconStory.tsx',
        '/static/src/demo-app/routes/examples/monoicon/style.scss',
      ],
    },
  },
];
