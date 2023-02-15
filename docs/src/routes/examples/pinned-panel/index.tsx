import { DefaultPinnedPanelStory } from './DefaultStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'PinnedPanel',
    label: 'Pinned Panel',
    parentId: null,
    data: {
      path: '/pinned-panel',
      component: '',
      redirect: '/pinned-panel/default',
    },
  },
  {
    id: 'PinnedPanel:Default',
    label: 'Default',
    parentId: 'PinnedPanel',
    data: {
      path: '/pinned-panel/default',
      component: DefaultPinnedPanelStory,
      title: 'Default',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/pinned-panel/DefaultStory.tsx'],
    },
  },
];
