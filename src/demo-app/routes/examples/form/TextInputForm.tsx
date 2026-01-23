// An example dedicated to understanding how to serialzie and deserialize object list

import { Button, Form, Panel } from '@adam-sv/arc';
import { FormField } from '@adam-sv/arc';
import { FormValues } from '@adam-sv/arc';
import { useState } from 'react';

const storageName = 'arc-stories:text-input-form-field';

const asObj = (formState: FormValues): Record<string, unknown> => {
  return Object.fromEntries(formState);
};

const saveValues = (data: FormValues) => {
  const obj = Object.fromEntries(data);
  localStorage.setItem(storageName, JSON.stringify(obj));
};

const loadValues = (): FormValues => {
  const savedString = localStorage.getItem(storageName);
  if (!savedString) return new Map();
  const asObj = JSON.parse(savedString) as unknown as Record<string, string>;
  return new Map(Object.entries(asObj));
};

const fields = [
  {
    type: 'text',
    id: 'flower',
    initialValue: 'Rose',
    componentProps: {
      label: 'Flower',
    },
  },
  {
    type: 'text',
    id: 'city',
    componentProps: {
      label: 'City',
    },
  },
  {
    type: 'text',
    id: 'boba',
    initialValue: 'Jasmine',
    componentProps: {
      label: 'Milk Tea',
      disabled: true,
    },
  },
] as FormField[];

type FullyLoadedForm = Array<FormField & { initialValue?: unknown }>;

const TextInputForm = (): React.JSX.Element => {
  const [prevFormState, setPrevFormState] = useState<FormValues>(loadValues());
  const [reloadForm, setReloadForm] = useState<number>(0);

  // need to add in initialValues from the form state into the "fields layout"
  const fullFormLayout = fields.map((field) => ({
    ...field,
    ...(prevFormState.has(field.id)
      ? { initialValue: prevFormState.get(field.id) as unknown }
      : {}),
  })) as FullyLoadedForm;

  return (
    <Panel>
      <Form
        // need to have a key here to tell form its information is no longer valid and should reset
        key={reloadForm}
        title='ARC Built-in Form Renderer - Text Input'
        layout={fullFormLayout}
        onChange={(something: unknown) => {
          console.info('A change!', something);
        }}
        onSubmit={(data) => {
          // send data to "server"
          saveValues(data);
          // for debugging purposes here, keep "previous form state" up to date what whatever we saved last
          setPrevFormState(loadValues());
          // don't need to reset the form with setReloadForm here since transient values still exist in form fields
        }}
      />
      <pre>Previous: {JSON.stringify(asObj(prevFormState), null, 2)}</pre>
      <Button
        onClick={() => {
          localStorage.removeItem(storageName);
          setPrevFormState(loadValues());
          setReloadForm((prev) => prev + 1);
        }}
      >
        Reset Storage
      </Button>
    </Panel>
  );
};

export default TextInputForm;
