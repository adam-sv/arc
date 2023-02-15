import { DraggableButtons } from './DraggableButtons';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'DragDrop',
    label: 'Draggable and Droppable',
    parentId: null,
    data: {
      path: '/dragabble',
      component: '',
      redirect: '/checkbox/simple',
    },
  },
  {
    id: 'DragDrop:Buttons',
    label: 'Draggable Buttons',
    parentId: 'DragDrop',
    data: {
      path: '/drag-drop/buttons',
      component: DraggableButtons,
      title: 'Draggable Buttons',
      codeBlocks: [
        '/src/routes/examples/drag-drop/DraggableButtons.tsx',
        '/src/routes/examples/drag-drop/style.scss',
      ],
    },
  },
];
