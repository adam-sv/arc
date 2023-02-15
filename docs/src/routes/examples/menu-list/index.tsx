import Default from './Default';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'MenuList',
    label: 'Menu List',
    parentId: null,
    data: {
      path: '/menulist',
      component: '',
      redirect: '/Menulist/default',
    },
  },
  {
    id: 'MenuList:Default',
    label: 'Default',
    parentId: 'MenuList',
    data: {
      path: '/MenuList/default',
      component: Default,
      title: 'Default Menu List',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/menu-list/Default.tsx'],
    },
  },
];
