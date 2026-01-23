import { SimpleCheckboxExamples } from './SimpleCheckbox';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'CheckboxGroup',
    label: 'CheckboxGroup',
    data: {
      path: 'checkbox',
      component: '',
      redirect: 'checkbox/simple',
    },
  },
  {
    id: 'CheckboxGroup:Simple',
    label: 'Simple',
    parentId: 'CheckboxGroup',
    data: {
      path: 'checkbox/simple',
      component: SimpleCheckboxExamples,
      title: 'Simple Checkbox',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/checkbox/SimpleCheckbox.tsx',
      ],
    },
  },
];
