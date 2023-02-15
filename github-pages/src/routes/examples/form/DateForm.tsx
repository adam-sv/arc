import { FormField, ITemporalInputProps } from '@adam-sv/arc';
import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';

const formFields: FormField[] = [
  'date',
  'time',
  'datetime-local',
  'month',
  'week',
].map((key: string) => ({
  type: 'date',
  id: key,
  componentProps: {
    label: key.toUpperCase(),
    type: key,
  } as ITemporalInputProps,
}));

export default (
  <Panel>
    <Form
      title='ARC DateForm'
      layout={formFields}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
    />
  </Panel>
);
