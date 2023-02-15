import SimpleAccordion from './SimpleAccordion';
import MaxOneAccordion from './MaxOneAccordion';
import RightSideAccordion from './RightSideAccordion';
import LeftSideHorizontalAccordion from './LeftSideHorizontalAccordion';
import HorizontalAndVerticalExpansion from './HorizontalAndVerticalExpansion';
import CustomButtonAndRotation from './CustomButtonAndRotation';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Accordion',
    label: 'Accordion',
    parentId: null,
    data: {
      path: '/accordion',
      component: '',
      redirect: '/accordion/simple',
    },
  },
  {
    id: 'Accordion:simple',
    label: 'Simple',
    parentId: 'Accordion',
    data: {
      path: '/accordion/simple',
      component: SimpleAccordion,
      title: 'Simple Accordion',
      codeBlocks: [
        '/src/routes/examples/accordion/SimpleAccordion.tsx',
        '/src/routes/examples/accordion/items.tsx',
      ],
    },
  },
  {
    id: 'Accordion:max-one',
    label: 'Only 1 Child Expands',
    parentId: 'Accordion',
    data: {
      path: '/accordion/max-one',
      component: MaxOneAccordion,
      title: 'Only 1 Child Expanded At A Time',
      codeBlocks: [
        '/src/routes/examples/accordion/MaxOneAccordion.tsx',
        '/src/routes/examples/accordion/items.tsx',
      ],
    },
  },
  {
    id: 'Accordion:right-side',
    label: 'Right Side',
    parentId: 'Accordion',
    data: {
      path: '/acordion/right-side',
      component: RightSideAccordion,
      title: 'Right-side Accordion',
      codeBlocks: [
        '/src/routes/examples/accordion/RightSideAccordion.tsx',
        '/src/routes/examples/accordion/items.tsx',
      ],
    },
  },
  {
    id: 'Accordion:left-side:horizontal',
    label: 'Left Side Horizontal',
    parentId: 'Accordion',
    data: {
      path: '/acordion/left-side-horizontal',
      component: LeftSideHorizontalAccordion,
      title: 'Left-side Horizontal Accordion',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/accordion/LeftSideHorizontalAccordion.tsx',
      ],
    },
  },
  {
    id: 'Accordion:Horizontal:HeightandWidthExpansion',
    label: 'Horizontal Height and Width Expansion',
    parentId: 'Accordion',
    data: {
      path: '/acordion/horizontalHeightAndWidthExpansion',
      component: HorizontalAndVerticalExpansion,
      title: 'Horizontal Height and Width Expansion',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/accordion/HorizontalAndVerticalExpansion.tsx',
      ],
    },
  },
  {
    id: 'Accordion:CustomButton',
    label: 'Custom Button and Rotation',
    parentId: 'Accordion',
    data: {
      path: '/acordion/customButtonAndRotation',
      component: CustomButtonAndRotation,
      title: 'Custom Button and Rotation',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/accordion/CustomButtonAndRotation.tsx',
      ],
    },
  },
];
