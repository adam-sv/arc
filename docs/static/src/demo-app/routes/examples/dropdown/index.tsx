import CompactSizeDropdown from './CompactSizeDropdown';
import LargeSizeDropdown from './LargeSizeDropdown';
import DefaultSizeDropdown from './DefaultSizeDropdown';
import DropdownWithError from './DropdownWithError';
import DropdownWithInfo from './DropdownWithInfo';
import DropdownDisabled from './DropdownDisabled';
import DropdownWithPlaceholder from './DropdownWithPlaceholder';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Dropdown',
    label: 'Dropdown',
    data: {
      path: 'dropdown',
      component: '',
      redirect: 'dropdown/sizes/default',
    },
  },
  {
    id: 'Dropdown:Sizes',
    label: 'Sizes',
    parentId: 'Dropdown',
    data: {
      path: 'dropdown/sizes',
      component: '',
      redirect: 'dropdown/sizes/default',
    },
  },
  {
    id: 'Dropdown:Sizes:compact',
    label: 'Compact',
    parentId: 'Dropdown:Sizes',
    data: {
      path: 'dropdown/sizes/compact',
      component: CompactSizeDropdown,
      title: 'Compact Size Dropdown',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/CompactSizeDropdown.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:Sizes:default',
    label: 'Default',
    parentId: 'Dropdown:Sizes',
    data: {
      path: 'dropdown/sizes/default',
      title: 'Default Size Dropdown',
      component: DefaultSizeDropdown,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/DefaultSizeDropdown.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:Sizes:large',
    label: 'Large',
    parentId: 'Dropdown:Sizes',
    data: {
      path: 'dropdown/sizes/large',
      component: LargeSizeDropdown,
      title: 'Large Size Dropdown',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/LargeSizeDropdown.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:error',
    label: 'Error Message',
    parentId: 'Dropdown',
    data: {
      path: 'dropdown/error',
      component: DropdownWithError,
      title: 'Dropdown with Error Message',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/DropdownWithError.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:disabled',
    label: 'Disabled/Readonly',
    parentId: 'Dropdown',
    data: {
      path: 'dropdown/disabled',
      title: 'Dropdown with Disabled/Readonly Prop',
      component: DropdownDisabled,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/DropdownDisabled.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:info',
    label: 'Info Prop',
    parentId: 'Dropdown',
    data: {
      path: 'dropdown/info',
      component: DropdownWithInfo,
      title: 'Dropdown with Info Message',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/DropdownWithInfo.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
  {
    id: 'Dropdown:placeholder',
    label: 'Placeholder',
    parentId: 'Dropdown',
    data: {
      path: 'dropdown/placeholder',
      title: 'Dropdown with Placeholder Prop',
      component: DropdownWithPlaceholder,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/dropdown/DropdownWithPlaceholder.tsx',
        '/static/src/demo-app/routes/examples/dropdown/items.ts',
      ],
    },
  },
];
