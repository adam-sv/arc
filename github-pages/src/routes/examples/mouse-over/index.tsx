import MouseOverExample from './mouseover';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'MouseOver',
    label: 'Mouse Over',
    parentId: null,
    data: {
      path: '/mouse-over',
      component: '',
      redirect: '/mouse-over/default',
    },
  },
  {
    id: 'MouseOver:Default',
    label: 'Mouse Over',
    parentId: 'MouseOver',
    data: {
      path: '/mouse-over/default',
      component: MouseOverExample,
      title: 'Mouse Over',
      codeBlocks: ['/src/routes/examples/mouse-over/mouseover.tsx'],
      renderVertically: true,
    },
  },
];
