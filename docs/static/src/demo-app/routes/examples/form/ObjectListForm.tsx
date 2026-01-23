// An example dedicated to understanding how to serialize and deserialize object list

import { Button, Form, Panel } from '@adam-sv/arc';
import type { FormField, FormValues } from '@adam-sv/arc';
import { useState, type JSX } from 'react';

const storageName = 'arc-stories:object-list-form';

const asObj = (formState: FormValues): Record<string, unknown> => {
  return Object.fromEntries(formState);
};

const saveValues = (data: FormValues) => {
  const obj = Object.fromEntries(data);
  localStorage.setItem(storageName, JSON.stringify(obj));
};

type ObjectList = Array<Record<string, unknown>>;

const loadValues = (): FormValues => {
  const savedString = localStorage.getItem(storageName);
  if (!savedString) return new Map();
  const asObj = JSON.parse(savedString) as unknown as Record<
    string,
    ObjectList
  >;
  return new Map(Object.entries(asObj));
};

const listFields = [
  {
    type: 'objectlist',
    id: 'shoppingList',
    componentProps: {
      fields: [
        {
          id: 'item',
          type: 'text',
          componentProps: { label: 'Item' },
          required: true,
        },
        {
          id: 'quantity',
          type: 'integer',
          componentProps: { label: 'Quantity' },
        },
      ],
      itemLabel: 'Item',
      titleText: 'Your Shopping Items',
      titleType: 3,
      newItemButtonProps: {
        children: '(+) Add shopping list item',
      },
    },
  },
] as FormField[];

type FullyLoadedForm = Array<FormField & { initialValue?: unknown }>;

const ObjectListForm = (): JSX.Element => {
  const [prevFormState, setPrevFormState] = useState<FormValues>(loadValues());
  const [reloadForm, setReloadForm] = useState<number>(0);

  // need to add in initialValues from the form state into the "fields layout"
  const fullFormLayout = listFields.map((field) => ({
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
        title='ARC Built-in Form Renderer - List'
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
      <div>
        List length:{' '}
        {((prevFormState.get('shoppingList') as Array<unknown>) ?? []).length}
      </div>
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

export default ObjectListForm;
