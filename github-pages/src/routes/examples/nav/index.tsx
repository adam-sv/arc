// stories
import { DefaultNav } from './DefaultNav';
import { TabbedNav } from './TabbedNav';
// types
import type { ITreeNode } from '@adam-sv/arc';
import type { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Nav',
    label: 'Nav',
    parentId: null,
    data: {
      path: '/nav',
      component: '',
      redirect: '/nav/default',
    },
  },
  {
    id: 'Nav:Default',
    label: 'Default',
    parentId: 'Nav',
    data: {
      path: '/nav/default',
      component: DefaultNav,
      title: 'Default Nav',
      codeBlocks: ['/src/routes/examples/nav/DefaultNav.tsx'],
    },
  },
  {
    id: 'Nav:Tabbed',
    label: 'Tabbed',
    parentId: 'Nav',
    data: {
      path: '/nav/tabbed',
      component: TabbedNav,
      title: 'Tabbed Nav',
      codeBlocks: ['/src/routes/examples/nav/TabbedNav.tsx'],
    },
  },
];
