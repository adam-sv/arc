import { ContextMenuExample } from './ContextMenu';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
// style
import './style.scss';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'ContextMenu',
    label: 'ContextMenu',
    data: {
      path: 'context-menu',
      component: '',
      redirect: 'context-menu/default',
    },
  },
  {
    id: 'ContextMenu:Default',
    label: 'Default',
    parentId: 'ContextMenu',
    data: {
      path: 'context-menu/default',
      component: ContextMenuExample,
      title: 'Default',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/context-menu/ContextMenu.tsx',
      ],
    },
  },
];
