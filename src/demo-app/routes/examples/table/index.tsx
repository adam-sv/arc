import { SimpleTableStory } from './SimpleTable';
import HorizontalCollapseTable from './HorizontalCollapseTable';
import MultiHeaderTableStory from './MultiHeaderTable';
import NoBreakTable from './NoBreakTable';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import { TableContextMenuStory } from './RightClickTable';
import { DefaultSortTableStory } from './DefaultSortTable';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Table',
    label: 'Table',
    data: {
      path: 'table',
      component: '',
      redirect: 'table/simple',
    },
  },
  {
    id: 'Table:simple',
    label: 'Simple Table',
    parentId: 'Table',
    data: {
      path: 'table/simple',
      component: SimpleTableStory,
      title: 'Simple Table',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/table/SimpleTable.tsx',
        '/static/src/demo-app/routes/examples/table/sample-data.ts',
      ],
    },
  },
  {
    id: 'Table:context-menu',
    label: 'Table Row Context Menu',
    parentId: 'Table',
    data: {
      path: 'table/context-menu',
      component: TableContextMenuStory,
      title: 'Table Row Context Menu',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/table/RightClickTable.tsx',
        '/static/src/demo-app/routes/examples/table/sample-data.ts',
      ],
    },
  },
  {
    id: 'Table:horizontal-collapse',
    label: 'Horizontal Collapse Table',
    parentId: 'Table',
    data: {
      path: 'table/horizontal-collapse',
      component: HorizontalCollapseTable,
      title: 'Horizontal Collapse Table',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/table/HorizontalCollapseTable.tsx',
        '/static/src/demo-app/routes/examples/table/sample-data.ts',
      ],
    },
  },
  {
    id: 'Table:no-break',
    label: 'No Break Table',
    parentId: 'Table',
    data: {
      path: 'table/no-break',
      component: NoBreakTable,
      title: 'No Break Table',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/table/NoBreakTable.tsx',
        '/static/src/demo-app/routes/examples/table/sample-data.ts',
      ],
    },
  },
  {
    id: 'Table:multi-header',
    label: 'Multi-Header Table',
    parentId: 'Table',
    data: {
      path: 'table/multi-header',
      component: MultiHeaderTableStory,
      title: 'Table with a multi-header column',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/table/MultiHeaderTable/index.tsx',
        '/static/src/demo-app/routes/examples/table/MultiHeaderTable/MultiHeader.tsx',
        '/static/src/demo-app/routes/examples/table/MultiHeaderTable/style.scss',
        '/static/src/demo-app/routes/examples/table/sample-data.ts',
      ],
    },
  },
  {
    id: 'Table:default-sort',
    label: 'Default Sort Table',
    parentId: 'Table',
    data: {
      path: 'table/default-sort',
      component: DefaultSortTableStory,
      title: 'Table with default sort options set',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/table/DefaultSortTableStory.tsx',
      ],
    },
  },
];
