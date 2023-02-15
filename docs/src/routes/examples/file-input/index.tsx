import DefaultFileInput from './DefaultFileInput';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'FileInput',
    label: 'FileInput',
    parentId: null,
    data: {
      path: '/file-input',
      component: '',
      redirect: '/file-input/default',
    },
  },
  {
    id: 'FileInput:Default',
    label: 'Default',
    parentId: 'FileInput',
    data: {
      path: '/file-input/default',
      component: DefaultFileInput,
      title: 'Default File Input',
      codeBlocks: ['/src/routes/examples/file-input/DefaultFileInput.tsx'],
    },
  },
];
