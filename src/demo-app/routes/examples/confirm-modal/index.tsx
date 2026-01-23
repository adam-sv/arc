//
import ConfirmModal from './Confirm';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'ConfirmModal',
    label: 'Confirm Modal',
    data: {
      path: 'confirm-modal',
      component: '',
      redirect: 'confirm-modal/default',
    },
  },
  {
    id: 'ConfirmModal:Default',
    label: 'Default',
    parentId: 'ConfirmModal',
    data: {
      path: 'confirm-modal/default',
      component: ConfirmModal,
      title: 'Default',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/confirm-modal/Confirm.tsx',
      ],
    },
  },
];
