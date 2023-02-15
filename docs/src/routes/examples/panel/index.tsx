import { DefaultPanelStory } from './DefaultPanelStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Panel',
    label: 'Panel',
    parentId: null,
    data: {
      path: '/panel',
      component: '',
      redirect: '/panel/default',
    },
  },
  {
    id: 'Panel:Default',
    label: 'Default',
    parentId: 'Panel',
    data: {
      path: '/panel/default',
      component: DefaultPanelStory,
      title: 'Panel Default',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/panel/DefaultPanelStory.tsx'],
    },
  },
];
