// import React from 'react';
import AlertModal from './Alert';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'AlertModal',
    label: 'AlertModal',
    parentId: null,
    data: {
      path: '/alert-modal',
      component: '',
      redirect: '/alert-modal/default',
    },
  },
  {
    id: 'AlertModal:Default',
    label: 'Default',
    parentId: 'AlertModal',
    data: {
      path: '/alert-modal/default',
      component: AlertModal,
      title: 'Default',
      codeBlocks: ['/src/routes/examples/alert-modal/Alert.tsx'],
    },
  },
];
