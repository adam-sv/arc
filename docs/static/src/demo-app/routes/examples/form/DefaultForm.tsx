import { Form, Panel } from '@adam-sv/arc';
import { fakeAsyncOnSubmit } from './helpers';
import getFormFields from './sample-fields';
import type { FormValues, IFormHooks } from '@adam-sv/arc';
import type { JSX } from 'react';

const DefaultForm = (): JSX.Element => (
  <Panel>
    <Form
      title='ARC Built-in Form Renderer - Default'
      layout={getFormFields()}
      onChange={(
        formValues: FormValues,
        hooks: IFormHooks,
        changedFields: string[]
      ) => {
        console.info('A change!', { formValues, hooks, changedFields });
      }}
      onSubmit={fakeAsyncOnSubmit}
      submitButtonText='Save'
    />
  </Panel>
);

export default DefaultForm;
