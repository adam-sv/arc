import { FormLayoutItem } from '@adam-sv/arc';
import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';

const formFields: FormLayoutItem[] = [
  {
    type: 'numberslider',
    id: 'numberslider',
    componentProps: {
      max: 10,
      title: 'Number Slider',
      valueUnitLabel: 'geese',
      valueUnitLabelSingular: 'goose',
    },
    initialValue: 4,
  },
  {
    type: 'rangeslider',
    id: 'rangeslider',
    componentProps: {
      min: 1,
      max: 100,
      title: 'Range Slider',
      valueUnitLabel: 'days',
    },
    initialValue: [24, 78],
  },
  {
    type: 'objectslider',
    id: 'objectslider',
    componentProps: {
      title: 'Object Slider',
      options: [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
      ],
    },
    initialValue: 3,
  },
];

export default (
  <Panel>
    <Form
      title='ARC Slider Form'
      layout={formFields}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
    />
  </Panel>
);
