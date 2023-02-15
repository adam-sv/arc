import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';
import getFormFields from './sample-fields';

const AirTightPackedForm = (): JSX.Element => (
  <Panel>
    <Form
      title='ARC Built-in Form Renderer - AirTight Packed'
      layout={getFormFields()}
      onChange={(something: unknown) => console.info('A change!', something)}
      onSubmit={fakeAsyncOnSubmit}
      airTightPack
    />
  </Panel>
);

export default AirTightPackedForm;
