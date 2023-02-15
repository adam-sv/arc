import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';
import getFormFields from './sample-fields';

const DefaultForm = (): JSX.Element => (
  <Panel>
    <Form
      title='ARC Built-in Form Renderer - Default'
      layout={getFormFields()}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
    />
  </Panel>
);

export default DefaultForm;
