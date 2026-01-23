import { DefaultFloatingPanelStory } from './DefaultStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'FloatingPanel',
    label: 'Floating Panel',
    data: {
      path: 'floating-panel',
      component: '',
      redirect: 'floating-panel/default',
    },
  },
  {
    id: 'FloatingPanel:Default',
    label: 'Default',
    parentId: 'FloatingPanel',
    data: {
      path: 'floating-panel/default',
      component: DefaultFloatingPanelStory,
      title: 'Default',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/floating-panel/DefaultStory.tsx',
      ],
    },
  },
];
