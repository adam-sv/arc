import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';
import getFormFields from './sample-fields';

const CompactForm = (): JSX.Element => (
  <Panel>
    <Form
      title='ARC Built-in Form Renderer - Compact'
      layout={getFormFields()}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
      componentSize='compact'
    />
  </Panel>
);

export default CompactForm;
