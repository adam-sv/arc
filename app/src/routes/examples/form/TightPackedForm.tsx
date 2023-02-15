import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';
import getFormFields from './sample-fields';

const TightPackedForm = (): JSX.Element => (
  <Panel>
    <Form
      title='ARC Built-in Form Renderer - Tight Packed'
      layout={getFormFields()}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
      tightPack
    />
  </Panel>
);

export default TightPackedForm;
