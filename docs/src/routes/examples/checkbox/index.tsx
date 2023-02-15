import { SimpleCheckboxExamples } from './SimpleCheckbox';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'CheckboxGroup',
    label: 'CheckboxGroup',
    parentId: null,
    data: {
      path: '/checkbox',
      component: '',
      redirect: '/checkbox/simple',
    },
  },
  {
    id: 'CheckboxGroup:Simple',
    label: 'Simple',
    parentId: 'CheckboxGroup',
    data: {
      path: '/checkbox/simple',
      component: SimpleCheckboxExamples,
      title: 'Simple Checkbox',
      codeBlocks: ['/src/routes/examples/checkbox/SimpleCheckbox.tsx'],
    },
  },
];
