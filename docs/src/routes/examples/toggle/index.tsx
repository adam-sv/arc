import ToggleHorizontalLabel from './ToggleHorizontalLabel';
import ToggleVerticalLabel from './ToggleVerticalLabel';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Toggle',
    label: 'Toggle',
    parentId: null,
    data: {
      path: '/toggle',
      component: '',
      redirect: '/toggle/horizontal',
    },
  },
  {
    id: 'Toggle:horizontal',
    label: 'Toggle Horizontal',
    parentId: 'Toggle',
    data: {
      path: '/toggle/horizontal',
      component: ToggleHorizontalLabel,
      title: 'Toggle Horizontal',
      codeBlocks: ['/src/routes/examples/toggle/ToggleHorizontalLabel.tsx'],
    },
  },
  {
    id: 'Toggle:vertical',
    label: 'Toggle Vertical',
    parentId: 'Toggle',
    data: {
      path: '/toggle/vertical',
      component: ToggleVerticalLabel,
      title: 'Toggle Vertical',
      codeBlocks: ['/src/routes/examples/toggle/ToggleVerticalLabel.tsx'],
    },
  },
];
