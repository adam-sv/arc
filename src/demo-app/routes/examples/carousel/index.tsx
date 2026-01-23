import SimpleCarousel from './SimpleCarousel';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Carousel',
    label: 'Carousel',
    data: {
      path: 'carousel',
      component: '',
      redirect: 'carousel/simple',
    },
  },
  {
    id: 'Carousel:simple',
    label: 'Simple',
    parentId: 'Carousel',
    data: {
      path: 'carousel/simple',
      component: SimpleCarousel,
      title: 'Simple Carousel',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/carousel/SimpleCarousel.tsx',
      ],
    },
  },
];
