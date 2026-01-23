import Default from './Default';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'MenuList',
    label: 'Menu List',
    data: {
      path: 'menulist',
      component: '',
      redirect: 'menulist/default',
    },
  },
  {
    id: 'MenuList:Default',
    label: 'Default',
    parentId: 'MenuList',
    data: {
      path: 'menulist/default',
      component: Default,
      title: 'Default Menu List',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/menu-list/Default.tsx',
      ],
    },
  },
];
