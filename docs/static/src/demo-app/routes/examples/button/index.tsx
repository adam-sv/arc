import { ITreeNode } from '@adam-sv/arc';
import ButtonTypes from './ButtonTypes';
import ButtonSizes from './ButtonSizes';
import LinkButtons from './LinkButtons';
import { ButtonChildren } from './ButtonChildren';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Button',
    label: 'Button',
    data: {
      path: 'button',
      component: '',
      redirect: 'button/types',
    },
  },
  {
    id: 'Button:types',
    label: 'Types',
    parentId: 'Button',
    data: {
      path: 'button/types',
      component: ButtonTypes,
      title: 'Button Types',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/button/ButtonTypes.tsx',
      ],
    },
  },
  {
    id: 'Button:sizes',
    label: 'Sizes',
    parentId: 'Button',
    data: {
      path: 'button/sizes',
      component: ButtonSizes,
      title: 'Button Sizes',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/button/ButtonSizes.tsx',
      ],
    },
  },
  {
    id: 'Button:to',
    label: 'Link Button',
    parentId: 'Button',
    data: {
      path: 'button/link',
      component: LinkButtons,
      title: 'Button Link',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/button/LinkButtons.tsx',
      ],
    },
  },
  {
    id: 'Button:children',
    label: 'Custom Children',
    parentId: 'Button',
    data: {
      path: 'button/children',
      component: ButtonChildren,
      title: 'Button w/ Custom Children',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/button/ButtonChildren.tsx',
      ],
    },
  },
];
