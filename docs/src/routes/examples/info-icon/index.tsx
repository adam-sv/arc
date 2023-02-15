import { DefaultInfoIcon } from './DefaultInfoIcon';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'InfoIcon',
    label: 'Info Icon',
    parentId: null,
    data: {
      path: '/info-icon',
      component: '',
      redirect: '/info-icon/defualt/',
    },
  },
  {
    id: 'InfoIcon:Default',
    label: 'Default',
    parentId: 'InfoIcon',
    data: {
      path: '/info-icon/default',
      component: DefaultInfoIcon,
      title: 'Default',
      codeBlocks: ['/src/routes/examples/info-icon/DefaultInfoIcon.tsx'],
    },
  },
];
