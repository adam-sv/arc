import AlertModal from './Alert';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'AlertModal',
    label: 'AlertModal',
    data: {
      path: 'alert-modal',
      component: '',
      redirect: 'alert-modal/default',
    },
  },
  {
    id: 'AlertModal:Default',
    label: 'Default',
    parentId: 'AlertModal',
    data: {
      path: 'alert-modal/default',
      component: AlertModal,
      title: 'Default',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/alert-modal/Alert.tsx',
      ],
    },
  },
];
