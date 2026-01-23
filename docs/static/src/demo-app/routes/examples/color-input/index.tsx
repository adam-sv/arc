import { DefaultColorInput } from './DefaultColorInput';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'ColorInput',
    label: 'Color Input',
    data: {
      path: 'color-input',
      component: '',
      redirect: 'color-input/default',
    },
  },
  {
    id: 'ColorInput:Default',
    label: 'Default',
    parentId: 'ColorInput',
    data: {
      path: 'color-input/default',
      component: DefaultColorInput,
      title: 'Default',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/color-input/DefaultColorInput.tsx',
      ],
    },
  },
];
