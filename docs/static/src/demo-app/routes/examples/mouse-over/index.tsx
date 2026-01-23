import MouseOverExample from './mouseover';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'MouseOver',
    label: 'Mouse Over',
    data: {
      path: 'mouse-over',
      component: '',
      redirect: 'mouse-over/default',
    },
  },
  {
    id: 'MouseOver:Default',
    label: 'Mouse Over',
    parentId: 'MouseOver',
    data: {
      path: 'mouse-over/default',
      component: MouseOverExample,
      title: 'Mouse Over',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/mouse-over/mouseover.tsx',
      ],
      renderVertically: true,
    },
  },
];
