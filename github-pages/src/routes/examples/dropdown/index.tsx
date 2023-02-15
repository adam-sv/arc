import CompactSizeDropdown from './CompactSizeDropdown';
import LargeSizeDropdown from './LargeSizeDropdown';
import DefaultSizeDropdown from './DefaultSizeDropdown';
import DropdownWithError from './DropdownWithError';
import DropdownWithInfo from './DropdownWithInfo';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Dropdown',
    label: 'Dropdown',
    parentId: null,
    data: {
      path: '/dropdown',
      component: '',
      redirect: '/dropdown/error',
    },
  },
  {
    id: 'Dropdown:Sizes',
    label: 'Sizes',
    parentId: 'Dropdown',
    data: {
      path: '/dropdown/sizes',
      component: '',
      redirect: '/dropdown/sizes/default',
    },
  },
  {
    id: 'Dropdown:Sizes:compact',
    label: 'Compact',
    parentId: 'Dropdown:Sizes',
    data: {
      path: '/dropdown/sizes/compact',
      component: CompactSizeDropdown,
      title: 'Compact Size Dropdown',
      codeBlocks: [
        '/src/routes/examples/dropdown/CompactSizeDropdown.tsx',
        '/src/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:Sizes:default',
    label: 'Default',
    parentId: 'Dropdown:Sizes',
    data: {
      path: '/dropdown/sizes/default',
      title: 'Default Size Dropdown',
      component: DefaultSizeDropdown,
      codeBlocks: [
        '/src/routes/examples/dropdown/DefaultSizeDropdown.tsx',
        '/src/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:Sizes:large',
    label: 'Large',
    parentId: 'Dropdown:Sizes',
    data: {
      path: '/dropdown/sizes/large',
      component: LargeSizeDropdown,
      title: 'Large Size Dropdown',
      codeBlocks: [
        '/src/routes/examples/dropdown/LargeSizeDropdown.tsx',
        '/src/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:error',
    label: 'Error Message',
    parentId: 'Dropdown',
    data: {
      path: '/dropdown/error',
      component: DropdownWithError,
      title: 'Dropdown with Error Message',
      codeBlocks: [
        '/src/routes/examples/dropdown/DropdownWithError.tsx',
        '/src/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:info',
    label: 'Info Prop',
    parentId: 'Dropdown',
    data: {
      path: '/dropdown/info',
      component: DropdownWithInfo,
      title: 'Dropdown with Info Message',
      codeBlocks: [
        '/src/routes/examples/dropdown/DropdownWithInfo.tsx',
        '/src/routes/examples/dropdown/items.ts',
      ],
    },
  },
];
