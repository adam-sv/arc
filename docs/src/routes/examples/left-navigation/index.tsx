import Open from './Open';
import Closed from './Closed';
import TopContent from './TopContent';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'LeftNavigation',
    label: 'Left Navigation',
    parentId: null,
    data: {
      path: '/left-navigation',
      component: '',
      redirect: '/confirm-modal/closed/',
    },
  },
  {
    id: 'LeftNavigation:Closed',
    label: 'Left Navigation Closed',
    parentId: 'LeftNavigation',
    data: {
      path: '/left-navigation/closed',
      component: Closed,
      title: 'Closed',
      codeBlocks: ['/src/routes/examples/left-navigation/Closed.tsx'],
    },
  },
  {
    id: 'LeftNavigation:Open',
    label: 'Left Navigation Open',
    parentId: 'LeftNavigation',
    data: {
      path: '/left-navigation/open',
      component: Open,
      title: 'Open',
      codeBlocks: ['/src/routes/examples/left-navigation/Open.tsx'],
    },
  },
  {
    id: 'LeftNavigation:TopContent',
    label: 'Left Navigation Top Content',
    parentId: 'LeftNavigation',
    data: {
      path: '/left-navigation/top_content',
      component: TopContent,
      title: 'Top Content',
      codeBlocks: ['/src/routes/examples/left-navigation/TopContent.tsx'],
    },
  },
];
