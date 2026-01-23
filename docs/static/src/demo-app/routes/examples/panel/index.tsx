import { DefaultPanelStory } from './DefaultPanelStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Panel',
    label: 'Panel',
    data: {
      path: 'panel',
      component: '',
      redirect: 'panel/default',
    },
  },
  {
    id: 'Panel:Default',
    label: 'Default',
    parentId: 'Panel',
    data: {
      path: 'panel/default',
      component: DefaultPanelStory,
      title: 'Panel Default',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/panel/DefaultPanelStory.tsx',
      ],
    },
  },
];
