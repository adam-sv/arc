import { DefaultColorInput } from './DefaultColorInput';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'ColorInput',
    label: 'Color Input',
    parentId: null,
    data: {
      path: '/color-input',
      component: '',
      redirect: '/color-input/defualt/',
    },
  },
  {
    id: 'ColorInput:Default',
    label: 'Default',
    parentId: 'ColorInput',
    data: {
      path: '/color-input/default',
      component: DefaultColorInput,
      title: 'Default',
      codeBlocks: ['/src/routes/examples/color-input/DefaultColorInput.tsx'],
    },
  },
];
