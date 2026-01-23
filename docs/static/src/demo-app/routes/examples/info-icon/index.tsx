import { DefaultInfoIcon } from './DefaultInfoIcon';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'InfoIcon',
    label: 'Info Icon',
    data: {
      path: 'info-icon',
      component: '',
      redirect: 'info-icon/default',
    },
  },
  {
    id: 'InfoIcon:Default',
    label: 'Default',
    parentId: 'InfoIcon',
    data: {
      path: 'info-icon/default',
      component: DefaultInfoIcon,
      title: 'Default',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/info-icon/DefaultInfoIcon.tsx',
      ],
    },
  },
];
