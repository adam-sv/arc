import { DefaultTreeBrowser } from './DefaultTreeBrowser';
import { CompactTreeBrowser } from './CompactTreeBrowser';
import { LargeTreeBrowser } from './LargeTreeBrowser';
import { InlineWithFolderTreeBrowser } from './InlineWithFolderTreeBrowser';
import { ModalTreeBrowser } from './ModalTreeBrowser';
import { PlaygroundTreeBrowser } from './PlaygroundTreeBrowser';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'TreeBrowser',
    label: 'TreeBrowser',
    parentId: null,
    data: {
      path: '/tree-browser',
      component: '',
      redirect: '/tree-browser/default',
    },
  },
  {
    id: 'TreeBrowser:Default',
    label: 'Default',
    parentId: 'TreeBrowser',
    data: {
      path: '/tree-browser/default',
      component: DefaultTreeBrowser,
      title: 'Default Tree Browser',
      codeBlocks: ['/src/routes/examples/tree-browser/DefaultTreeBrowser.tsx'],
    },
  },
  {
    id: 'TreeBrowser:Compact',
    label: 'Compact',
    parentId: 'TreeBrowser',
    data: {
      path: '/tree-browser/compact',
      component: CompactTreeBrowser,
      title: 'Compact Tree Browser',
      codeBlocks: ['/src/routes/examples/tree-browser/CompactTreeBrowser.tsx'],
    },
  },
  {
    id: 'TreeBrowser:Large',
    label: 'Large',
    parentId: 'TreeBrowser',
    data: {
      path: '/tree-browser/large',
      component: LargeTreeBrowser,
      title: 'Large Tree Browser',
      codeBlocks: ['/src/routes/examples/tree-browser/LargeTreeBrowser.tsx'],
    },
  },
  {
    id: 'TreeBrowser:InlineWithFolder',
    label: 'Inline with Folder Selection',
    parentId: 'TreeBrowser',
    data: {
      path: '/tree-browser/inline-with-folder',
      component: InlineWithFolderTreeBrowser,
      title: 'Allows Folder Selection',
      codeBlocks: [
        '/src/routes/examples/tree-browser/InlineWithFolderTreeBrowser.tsx',
      ],
    },
  },
  {
    id: 'TreeBrowser:Modal',
    label: 'Input / Modal',
    parentId: 'TreeBrowser',
    data: {
      path: '/tree-browser/modal',
      component: ModalTreeBrowser,
      title: 'InputSkeleton / Modal Form',
      codeBlocks: ['/src/routes/examples/tree-browser/ModalTreeBrowser.tsx'],
    },
  },
  {
    id: 'TreeBrowser:Playground',
    label: 'Playground',
    parentId: 'TreeBrowser',
    data: {
      path: '/tree-browser/playground',
      component: PlaygroundTreeBrowser,
      title: 'Playground Tree Browser',
      codeBlocks: [
        '/src/routes/examples/tree-browser/PlaygroundTreeBrowser.tsx',
      ],
    },
  },
];
