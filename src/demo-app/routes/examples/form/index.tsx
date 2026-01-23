import CompactForm from './CompactForm';
import DefaultForm from './DefaultForm';
import LargeForm from './LargeForm';
import AirTightPackedForm from './AirTightPackedForm';
import TightPackedForm from './TightPackedForm';
import DateForm from './DateForm';
import SliderForm from './SliderForm';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import ObjectListForm from './ObjectListForm';
import ListForm from './ListForm';
import TextInputForm from './TextInputForm';
import TreeBrowserForm from './TreeBrowserForm';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Form',
    label: 'Form',
    data: {
      path: 'form',
      component: '',
      redirect: 'form/default',
    },
  },
  {
    id: 'Form:default',
    label: 'Default',
    parentId: 'Form',
    data: {
      path: 'form/default',
      component: DefaultForm,
      title: 'Default Form',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/form/DefaultForm.tsx',
        '/static/src/demo-app/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:compact',
    label: 'Compact',
    parentId: 'Form',
    data: {
      path: 'form/compact',
      component: CompactForm,
      title: 'Compact Form',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/form/CompactForm.tsx',
        '/static/src/demo-app/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:large',
    label: 'Large',
    parentId: 'Form',
    data: {
      path: 'form/large',
      component: LargeForm,
      title: 'Large Form',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/form/LargeForm.tsx',
        '/static/src/demo-app/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:tight',
    label: 'Tight Packed',
    parentId: 'Form',
    data: {
      path: 'form/tight',
      component: TightPackedForm,
      title: 'Tight-packed Form',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/form/TightPackedForm.tsx',
        '/static/src/demo-app/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:airtight',
    label: 'AirTight Packed',
    parentId: 'Form',
    data: {
      path: 'form/airtight',
      component: AirTightPackedForm,
      title: 'Air-Tight-packed Form',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/form/AirTightPackedForm.tsx',
        '/static/src/demo-app/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:fields',
    label: 'Form Fields',
    parentId: 'Form',
    data: {
      path: 'form/fields',
      component: '',
      redirect: 'form/fields/text',
    },
  },
  {
    id: 'Text Input Form Field',
    label: 'Text',
    parentId: 'Form:fields',
    data: {
      path: 'form/fields/text',
      component: TextInputForm,
      title: 'Text Form Field',
      codeBlocks: ['/static/src/demo-app/routes/examples/form/ListForm.tsx'],
    },
  },
  {
    id: 'TreeBrowser Input Form Field',
    label: 'TreeBrowser',
    parentId: 'Form:fields',
    data: {
      path: 'form/fields/tree-browser',
      component: TreeBrowserForm,
      title: 'TreeBrowser Form Field',
      codeBlocks: ['/static/src/demo-app/routes/examples/form/ListForm.tsx'],
    },
  },
  {
    id: 'Form:date',
    label: 'Date',
    parentId: 'Form:fields',
    data: {
      path: 'form/fields/date',
      component: DateForm,
      title: 'Date Form Field',
      codeBlocks: ['/static/src/demo-app/routes/examples/form/DateForm.tsx'],
    },
  },
  {
    id: 'Form:slider',
    label: 'Slider',
    parentId: 'Form:fields',
    data: {
      path: 'form/fields/slider',
      component: SliderForm,
      title: 'Slider Form Field',
      codeBlocks: ['/static/src/demo-app/routes/examples/form/SliderForm.tsx'],
    },
  },
  {
    id: 'Object List Form',
    label: 'ObjectList',
    parentId: 'Form:fields',
    data: {
      path: 'form/fields/objectlist',
      component: ObjectListForm,
      title: 'Object List Form Field',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/form/ObjectListForm.tsx',
      ],
    },
  },
  {
    id: 'List Form',
    label: 'List',
    parentId: 'Form:fields',
    data: {
      path: 'form/fields/list',
      component: ListForm,
      title: 'List Form Field',
      codeBlocks: ['/static/src/demo-app/routes/examples/form/ListForm.tsx'],
    },
  },
];
