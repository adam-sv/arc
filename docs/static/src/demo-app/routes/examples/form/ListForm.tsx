// An example dedicated to understanding how to serialzie and deserialize object list

import { Button, Form, Panel } from '@adam-sv/arc';
import type { FormField, FormValues } from '@adam-sv/arc';
import { useState, type JSX } from 'react';

const storageName = 'arc-stories:list-form';

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
    type: 'list',
    id: 'bookList',
    componentProps: {
      field: {
        id: 'book',
        type: 'text',
        componentProps: { label: 'Book' },
        required: true,
      },
      itemLabel: 'Book',
      titleText: 'Your Books to read',
      titleType: 3,
      newItemButtonProps: {
        children: '(+) Add a book',
      },
    },
  },
  {
    type: 'list',
    id: 'numberList',
    componentProps: {
      field: {
        id: 'number',
        type: 'integer',
        componentProps: { label: 'Number' },
        required: true,
      },
      itemLabel: 'Number',
      titleText: 'Numbers that you like',
      titleType: 3,
      newItemButtonProps: {
        children: '(+) Add a number',
      },
    },
  },
  {
    type: 'list',
    id: 'treeList',
    componentProps: {
      field: {
        type: 'treebrowser',
        id: 'favorite_tree_node',
        componentProps: {
          label: 'Favorite Tree Node',
          trees: [
            {
              nodes: [
                { id: 1, label: 'One', parentId: null },
                { id: 2, label: 'Two', parentId: 1 },
                { id: 3, label: 'Three', parentId: null },
                { id: 4, label: 'Four', parentId: 3 },
                { id: 5, label: 'Five', parentId: 4 },
                { id: 6, label: 'Six', parentId: 3 },
              ],
            },
          ],
          useAsModal: true,
          info: 'Does info work on TreeBrowser?',
          possiblyUnloadedValue: 'This node isnt real!',
        },
      },
      itemLabel: 'Tree',
      titleText: 'Tree Node that you like',
      titleType: 3,
      newItemButtonProps: {
        children: '(+) Choose another node',
      },
    },
  },
] as FormField[];

type FullyLoadedForm = Array<FormField & { initialValue?: unknown }>;

const ListForm = (): JSX.Element => {
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
        Book List length:{' '}
        {((prevFormState.get('bookList') as Array<string>) ?? []).length}
      </div>
      <div>
        Number List length:{' '}
        {((prevFormState.get('numberList') as Array<string>) ?? []).length}
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

export default ListForm;
