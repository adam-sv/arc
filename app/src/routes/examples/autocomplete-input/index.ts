import DefaultAutocompleteInput from './DefaultAutocompleteInput';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'AutcompleteInput',
    label: 'AutcompleteInput',
    parentId: null,
    data: {
      path: '/autocomplete-input',
      component: '',
      redirect: '/autocomplete-input/default',
    },
  },
  {
    id: 'AutcompleteInput:default',
    label: 'Default',
    parentId: 'AutcompleteInput',
    data: {
      path: '/autocomplete-input/default',
      component: DefaultAutocompleteInput,
      title: 'Autcomplete Input - Default Size',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/autocomplete-input/DefaultAutocompleteInput.tsx',
        '/src/routes/examples/autocomplete-input/animals.ts',
      ],
    },
  },
];
