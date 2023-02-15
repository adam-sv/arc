import DefaultBackground from './Default';
import DarkThemedBackground from './DarkThemed';
import LightThemedBackground from './LightThemed';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Background',
    label: 'Background',
    parentId: null,
    data: {
      path: '/background',
      component: '',
      redirect: '/background/default',
    },
  },
  {
    id: 'Background:Default',
    label: 'Default',
    parentId: 'Background',
    data: {
      path: '/background/default',
      component: DefaultBackground,
      title: 'Background, No Theme (Inherits)',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/background/default.tsx'],
    },
  },
  {
    id: 'Background:DarkThemed',
    label: 'Dark Themed',
    parentId: 'Background',
    data: {
      path: '/background/dark-themed',
      component: DarkThemedBackground,
      title: 'Background, Dark Themed Explicitly',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/background/DarkThemed.tsx'],
    },
  },
  {
    id: 'Background:LightThemed',
    label: 'Light Themed',
    parentId: 'Background',
    data: {
      path: '/background/light-themed',
      component: LightThemedBackground,
      title: 'Background, Light Themed Explicitly',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/background/LightThemed.tsx'],
    },
  },
];
