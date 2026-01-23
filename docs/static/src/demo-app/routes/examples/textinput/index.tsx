import TextInputExamples from './Examples';
import TextInputSizes from './Sizes';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'TextInput',
    label: 'TextInput',
    data: {
      path: 'textinput',
      component: '',
      redirect: 'textinput/examples',
    },
  },
  {
    id: 'TextInput:Examples',
    label: 'Examples',
    parentId: 'TextInput',
    data: {
      path: 'textinput/examples',
      component: TextInputExamples,
      title: 'TextInput - Examples',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/textinput/Examples.tsx',
      ],
    },
  },
  {
    id: 'TextInput:Sizes',
    label: 'Sizes',
    parentId: 'TextInput',
    data: {
      path: 'textinput/sizes',
      component: TextInputSizes,
      title: 'TextInput - Sizes',
      renderVertically: true,
      codeBlocks: ['/static/src/demo-app/routes/examples/textinput/Sizes.tsx'],
    },
  },
];
