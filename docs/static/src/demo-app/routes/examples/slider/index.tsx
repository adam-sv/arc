import NumberSlider from './NumberSlider';
import RangeSlider from './RangeSlider';
import VerticalSliderStory from './VerticalSlider';
import DisabledSliderStory from './DisabledSlider';
import ObjectSlider from './ObjectSlider';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Slider',
    label: 'Slider',
    data: {
      path: 'slider',
      component: '',
      redirect: 'slider/number',
    },
  },
  {
    id: 'Slider:Object',
    label: 'Object Slider',
    parentId: 'Slider',
    data: {
      path: 'slider/object',
      component: ObjectSlider,
      title: 'Object Slider',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/slider/ObjectSlider.tsx',
      ],
    },
  },
  {
    id: 'Slider:Number',
    label: 'Number Slider',
    parentId: 'Slider',
    data: {
      path: 'slider/number',
      component: NumberSlider,
      title: 'Discrete Number Slider with Initial Value',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/slider/NumberSlider.tsx',
      ],
    },
  },
  {
    id: 'Slider:Range',
    label: 'Range Slider',
    parentId: 'Slider',
    data: {
      path: 'slider/range',
      component: RangeSlider,
      title: 'Number Range Slider with Custom Interval',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/slider/RangeSlider.tsx',
      ],
    },
  },
  {
    id: 'Slider:Vertical',
    label: 'Vertical Sliders',
    parentId: 'Slider',
    data: {
      path: 'slider/vertical',
      component: VerticalSliderStory,
      title: 'Vertical Sliders',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/slider/VerticalSlider.tsx',
      ],
    },
  },
  {
    id: 'Slider:Disabled',
    label: 'Disabled Sliders',
    parentId: 'Slider',
    data: {
      path: 'slider/disabled',
      component: DisabledSliderStory,
      title: 'Disabled Sliders',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/slider/DisabledSlider.tsx',
      ],
    },
  },
];
