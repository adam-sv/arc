import SimpleTable from './SimpleTable';
import HorizontalCollapseTable from './HorizontalCollapseTable';
import NoBreakTable from './NoBreakTable';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Table',
    label: 'Table',
    parentId: null,
    data: {
      path: '/table',
      component: '',
      redirect: '/table/simple',
    },
  },
  {
    id: 'Table:simple',
    label: 'Simple Table',
    parentId: 'Table',
    data: {
      path: '/table/simple',
      component: SimpleTable,
      title: 'Simple Table',
      codeBlocks: ['/src/routes/examples/table/SimpleTable.tsx'],
    },
  },
  {
    id: 'Table:horizontal-collapse',
    label: 'Horizontal Collapse Table',
    parentId: 'Table',
    data: {
      path: '/table/horizontal-collapse',
      component: HorizontalCollapseTable,
      title: 'Horizontal Collapse Table',
      codeBlocks: ['/src/routes/examples/table/HorizontalCollapseTable.tsx'],
    },
  },
  {
    id: 'Table:no-break',
    label: 'No Break Table',
    parentId: 'Table',
    data: {
      path: '/table/no-break',
      component: NoBreakTable,
      title: 'No Break Table',
      codeBlocks: ['/src/routes/examples/table/NoBreakTable.tsx'],
    },
  },
];
