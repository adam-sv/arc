import { ITreeNode } from '@adam-sv/arc';
import ButtonTypes from './ButtonTypes';
import ButtonSizes from './ButtonSizes';
import LinkButtons from './LinkButtons';
import { ButtonChildren } from './ButtonChildren';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Button',
    label: 'Button',
    parentId: null,
    data: {
      path: '/button',
      component: '',
      redirect: '/button/types',
    },
  },
  {
    id: 'Button:types',
    label: 'Types',
    parentId: 'Button',
    data: {
      path: '/Button/types',
      component: ButtonTypes,
      title: 'Button Types',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/button/ButtonTypes.tsx'],
    },
  },
  {
    id: 'Button:sizes',
    label: 'Sizes',
    parentId: 'Button',
    data: {
      path: '/Button/sizes',
      component: ButtonSizes,
      title: 'Button Sizes',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/button/ButtonSizes.tsx'],
    },
  },
  {
    id: 'Button:to',
    label: 'Link Button',
    parentId: 'Button',
    data: {
      path: '/Button/link',
      component: LinkButtons,
      title: 'Button Link',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/button/LinkButtons.tsx'],
    },
  },
  {
    id: 'Button:children',
    label: 'Custom Children',
    parentId: 'Button',
    data: {
      path: '/Button/children',
      component: ButtonChildren,
      title: 'Button w/ Custom Children',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/button/ButtonChildren.tsx'],
    },
  },
];
