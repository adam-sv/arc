import { DraggableButtons } from './DraggableButtons';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'DragDrop',
    label: 'Draggable and Droppable',
    data: {
      path: 'dragabble',
      component: '',
      redirect: 'drag-drop/buttons',
    },
  },
  {
    id: 'DragDrop:Buttons',
    label: 'Draggable Buttons',
    parentId: 'DragDrop',
    data: {
      path: 'drag-drop/buttons',
      component: DraggableButtons,
      title: 'Draggable Buttons',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/drag-drop/DraggableButtons.tsx',
        '/static/src/demo-app/routes/examples/drag-drop/style.scss',
      ],
    },
  },
];
