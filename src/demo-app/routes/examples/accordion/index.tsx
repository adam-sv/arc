import SimpleAccordion from './SimpleAccordion';
import MaxOneAccordion from './MaxOneAccordion';
import RightSideAccordion from './RightSideAccordion';
import LeftSideHorizontalAccordion from './LeftSideHorizontalAccordion';
import HorizontalAndVerticalExpansion from './HorizontalAndVerticalExpansion';
import CustomButtonAndRotation from './CustomButtonAndRotation';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Accordion',
    label: 'Accordion',
    data: {
      path: 'accordion',
      component: '',
      redirect: 'accordion/simple',
    },
  },
  {
    id: 'Accordion:simple',
    label: 'Simple',
    parentId: 'Accordion',
    data: {
      path: 'accordion/simple',
      component: SimpleAccordion,
      title: 'Simple Accordion',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/accordion/SimpleAccordion.tsx',
        '/static/src/demo-app/routes/examples/accordion/items.tsx',
      ],
    },
  },
  {
    id: 'Accordion:max-one',
    label: 'Only 1 Child Expands',
    parentId: 'Accordion',
    data: {
      path: 'accordion/max-one',
      component: MaxOneAccordion,
      title: 'Only 1 Child Expanded At A Time',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/accordion/MaxOneAccordion.tsx',
        '/static/src/demo-app/routes/examples/accordion/items.tsx',
      ],
    },
  },
  {
    id: 'Accordion:right-side',
    label: 'Right Side',
    parentId: 'Accordion',
    data: {
      path: 'accordion/right-side',
      component: RightSideAccordion,
      title: 'Right-side Accordion',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/accordion/RightSideAccordion.tsx',
        '/static/src/demo-app/routes/examples/accordion/items.tsx',
      ],
    },
  },
  {
    id: 'Accordion:left-side:horizontal',
    label: 'Left Side Horizontal',
    parentId: 'Accordion',
    data: {
      path: 'accordion/left-side-horizontal',
      component: LeftSideHorizontalAccordion,
      title: 'Left-side Horizontal Accordion',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/accordion/LeftSideHorizontalAccordion.tsx',
      ],
    },
  },
  {
    id: 'Accordion:Horizontal:HeightandWidthExpansion',
    label: 'Horizontal Height and Width Expansion',
    parentId: 'Accordion',
    data: {
      path: 'accordion/horizontalHeightAndWidthExpansion',
      component: HorizontalAndVerticalExpansion,
      title: 'Horizontal Height and Width Expansion',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/accordion/HorizontalAndVerticalExpansion.tsx',
      ],
    },
  },
  {
    id: 'Accordion:CustomButton',
    label: 'Custom Button and Rotation',
    parentId: 'Accordion',
    data: {
      path: 'accordion/customButtonAndRotation',
      component: CustomButtonAndRotation,
      title: 'Custom Button and Rotation',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/accordion/CustomButtonAndRotation.tsx',
      ],
    },
  },
];
