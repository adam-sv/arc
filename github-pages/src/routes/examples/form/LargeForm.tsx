import { Panel, Form } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';
import getFormFields from './sample-fields';

const LargeForm = (): JSX.Element => (
  <Panel>
    <Form
      title='ARC Built-in Form Renderer - Large'
      layout={getFormFields()}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
      componentSize='large'
    />
  </Panel>
);

export default LargeForm;
