// import React from 'react';
import { ModalExample } from './ModalExample';
import { PopoverExample } from './PopoverExample';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Modal',
    label: 'Modal',
    parentId: null,
    data: {
      path: '/modal',
      component: '',
      redirect: '/modal/default',
    },
  },
  {
    id: 'Modal:Default',
    label: 'Modal Example',
    parentId: 'Modal',
    data: {
      path: '/modal/default',
      component: ModalExample,
      title: 'Modal Example',
      codeBlocks: ['/src/routes/examples/modal/ModalExample.tsx'],
    },
  },
  {
    id: 'Modal:Popover',
    label: 'Popover Example',
    parentId: 'Modal',
    data: {
      path: '/modal/popover',
      component: PopoverExample,
      title: 'Popover Example',
      codeBlocks: ['/src/routes/examples/modal/PopoverExample.tsx'],
    },
  },
];
