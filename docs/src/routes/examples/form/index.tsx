import CompactForm from './CompactForm';
import DefaultForm from './DefaultForm';
import LargeForm from './LargeForm';
import AirTightPackedForm from './AirTightPackedForm';
import TightPackedForm from './TightPackedForm';
import DateForm from './DateForm';
import SliderForm from './SliderForm';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Form',
    label: 'Form',
    parentId: null,
    data: {
      path: '/form',
      component: '',
      redirect: '/form/default',
    },
  },
  {
    id: 'Form:default',
    label: 'Default',
    parentId: 'Form',
    data: {
      path: '/form/default',
      component: DefaultForm,
      title: 'Default Form',
      codeBlocks: [
        '/src/routes/examples/form/DefaultForm.tsx',
        '/src/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:compact',
    label: 'Compact',
    parentId: 'Form',
    data: {
      path: '/form/compact',
      component: CompactForm,
      title: 'Compact Form',
      codeBlocks: [
        '/src/routes/examples/form/CompactForm.tsx',
        '/src/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:large',
    label: 'Large',
    parentId: 'Form',
    data: {
      path: '/form/large',
      component: LargeForm,
      title: 'Large Form',
      codeBlocks: [
        '/src/routes/examples/form/LargeForm.tsx',
        '/src/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:tight',
    label: 'Tight Packed',
    parentId: 'Form',
    data: {
      path: '/form/tight',
      component: TightPackedForm,
      title: 'Tight-packed Form',
      codeBlocks: [
        '/src/routes/examples/form/TightPackedForm.tsx',
        '/src/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:airtight',
    label: 'AirTight Packed',
    parentId: 'Form',
    data: {
      path: '/form/airtight',
      component: AirTightPackedForm,
      title: 'Air-Tight-packed Form',
      codeBlocks: [
        '/src/routes/examples/form/AirTightPackedForm.tsx',
        '/src/routes/examples/form/sample-fields.tsx',
      ],
    },
  },
  {
    id: 'Form:date',
    label: 'DateForm',
    parentId: 'Form',
    data: {
      path: '/form/date',
      component: DateForm,
      title: 'Date Form',
      codeBlocks: ['/src/routes/examples/form/DateForm.tsx'],
    },
  },
  {
    id: 'Form:slider',
    label: 'SliderForm',
    parentId: 'Form',
    data: {
      path: '/form/slider',
      component: SliderForm,
      title: 'Slider Form',
      codeBlocks: ['/src/routes/examples/form/SliderForm.tsx'],
    },
  },
];
