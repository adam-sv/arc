import DefaultAutocompleteInput from './DefaultAutocompleteInput';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'AutocompleteInput',
    label: 'AutocompleteInput',
    data: {
      path: 'autocomplete-input',
      component: '',
      redirect: 'autocomplete-input/default',
    },
  },
  {
    id: 'AutocompleteInput:default',
    label: 'Default',
    parentId: 'AutocompleteInput',
    data: {
      path: 'autocomplete-input/default',
      component: DefaultAutocompleteInput,
      title: 'Autocomplete Input - Default Size',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/autocomplete-input/DefaultAutocompleteInput.tsx',
        '/static/src/demo-app/routes/examples/autocomplete-input/animals.ts',
      ],
    },
  },
];
