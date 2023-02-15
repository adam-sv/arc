import { DefaultFloatingPanelStory } from './DefaultStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'FloatingPanel',
    label: 'Floating Panel',
    parentId: null,
    data: {
      path: '/floating-panel',
      component: '',
      redirect: '/floating-panel/default',
    },
  },
  {
    id: 'FloatingPanel:Default',
    label: 'Default',
    parentId: 'Floating Panel',
    data: {
      path: '/floating-panel/default',
      component: DefaultFloatingPanelStory,
      title: 'Default',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/floating-panel/DefaultStory.tsx'],
    },
  },
];
