import A320CabinViewStory from './A320CabinView';
import A321CabinViewStory from './A321CabinView';
import A350CabinViewStory from './A350CabinView';
import CustomCabinViewStory from './CustomCabinView';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'CabinView',
    label: 'CabinView',
    parentId: null,
    data: {
      path: '/cabin-view',
      component: '',
      redirect: '/cabin-view/number',
    },
  },
  {
    id: 'CabinView:A320',
    label: 'A320',
    parentId: 'CabinView',
    data: {
      path: '/cabin-view/a320',
      component: A320CabinViewStory,
      title: 'Cabin View - A320',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/cabin-view/A320CabinView.tsx',
        '/src/routes/examples/cabin-view/style.scss',
      ],
    },
  },
  {
    id: 'CabinView:A321',
    label: 'A321',
    parentId: 'CabinView',
    data: {
      path: '/cabin-view/a321',
      component: A321CabinViewStory,
      title: 'Cabin View - A321',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/cabin-view/A321CabinView.tsx',
        '/src/routes/examples/cabin-view/style.scss',
      ],
    },
  },
  {
    id: 'CabinView:A350',
    label: 'A350',
    parentId: 'CabinView',
    data: {
      path: '/cabin-view/a350',
      component: A350CabinViewStory,
      title: 'Cabin View - A350',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/cabin-view/A350CabinView.tsx',
        '/src/routes/examples/cabin-view/style.scss',
      ],
    },
  },
  {
    id: 'CabinView:Custom',
    label: 'Custom',
    parentId: 'CabinView',
    data: {
      path: '/cabin-view/custom',
      component: CustomCabinViewStory,
      title: 'Cabin View - Custom',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/cabin-view/CustomCabinView.tsx',
        '/src/routes/examples/cabin-view/style.scss',
      ],
    },
  },
];
