// import React from 'react';
import ConfirmModal from './Confirm';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'ConfirmModal',
    label: 'Confirm Modal',
    parentId: null,
    data: {
      path: '/confirm-modal',
      component: '',
      redirect: '/confirm-modal/default',
    },
  },
  {
    id: 'ConfirmModal:Default',
    label: 'Default',
    parentId: 'ConfirmModal',
    data: {
      path: '/confirm-modal/default',
      component: ConfirmModal,
      title: 'Default',
      codeBlocks: ['/src/routes/examples/confirm-modal/Confirm.tsx'],
    },
  },
];
