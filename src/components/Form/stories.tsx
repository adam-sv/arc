// dependencies
import { Form, Title } from '@adam-sv/arc';
import { action as userAction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { StoryContainer as Story } from '../../utils/StoryContainer';

// types
import type { FormFields, FormResourceState, FormRows } from '@adam-sv/arc';
import type { IFormAccordionSection } from './types';
import { IFormCustomComponentProps } from './mappings/custom';

const formStoryStyle = {
  width: '700px',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};

const dropdownItems = [
  { label: 'Cow', value: 'cow' },
  { label: 'Horse', value: 'horse' },
  { label: 'Parrot', value: 'parrot' },
];
const formFields: FormFields = [
  [
    {
      type: 'text',
      name: 'name',
      componentProps: {
        label: 'Name',
        info: 'The info is configurable here.',
      },
      initialValue: 'Sample Name',
    },
    {
      type: 'text',
      name: 'city',
      componentProps: { label: 'City of Residence' },
    },
    {
      type: 'text',
      name: 'country',
      componentProps: { label: 'Country of Residence' },
    },
  ],
  {
    section: 'more',
    label: 'More Info',
    titleComponentProps: { textAlign: 'center' },
  },
  {
    type: 'dropdown',
    name: 'favorite_animal',
    initialValue: dropdownItems[0],
    componentProps: { label: 'Favorite Animal', items: dropdownItems },
  },
  {
    type: 'textarea',
    name: 'description',
    componentProps: {
      label: 'Description',
      info: 'Add any other important info here.',
    },
  },
  {
    type: 'treebrowser',
    name: 'favorite_tree_node',
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
      possiblyUnloadedValue: 'This node isnt real!'
    },
  },
  {
    type: 'accordion',
    name: 'accordion',
    componentProps: {
      sections: [
        {
          label: 'Title Of Nested Section',
          fields: [
            { type: 'text', name: 'accordion_input', componentProps: { label: 'Nested Iput' } },
            { type: 'dropdown', name: 'accordion_dropdown', componentProps: {
              label: 'Nested Dropdown',
              items: dropdownItems,
            } },
          ],
        },
      ] as IFormAccordionSection[],
    },
  },
  {
    type: 'objectlist',
    name: 'faq',
    componentProps: {
      fields: [
        { name: 'question', type: 'text', componentProps: { label: 'Question' } },
        { name: 'answer', type: 'textarea', componentProps: { label: 'Answer' } },
      ],
      itemLabel: 'Question',
      label: 'Your FAQ',
      newItemButtonProps: {
        text: '(+) Add Question & Answer',
      },
    },
  },
  {
    type: 'custom',
    name: 'my_field',
    component: CustomComponent,
    customComponentProps: {
      label: 'Test The Label Man!',
    },
  },
];
function CustomComponent(props:IFormCustomComponentProps) {
  const { field, updateField } = props;
  return (
    <div onClick={() => updateField(field.name, 'My Field')}>
      {props.field.customComponentProps.label}
    </div>
  );
}
const fakeAsyncOnSubmit = (data, hooks) => {
  console.log('Form submitted', data);

  const { setFormResourceState, setLoadingMessage } = hooks;
  setFormResourceState('loading' as FormResourceState);
  setLoadingMessage('Some async trip...');

  setTimeout(() => {
    setFormResourceState('success' as FormResourceState);
    setLoadingMessage('Some success message!');
  }, 2000);

  setTimeout(() => setFormResourceState('default' as FormResourceState), 4000);
};

storiesOf('Form/Form/Defaults', module)
  .add('Mobile', () => {
    return (
      <Story style={{ ...formStoryStyle, width: '300px' }}>
        <Form
          title="ARC Built-in Form Renderer - Mobile"
          description="Check out this mobile layout"
          fields={formFields}
          onChange={userAction('onChange')}
          onSubmit={fakeAsyncOnSubmit}
        />
      </Story>
    );
  })
  .add('Desktop', () => {
    return (
      <Story style={formStoryStyle}>
        <Form
          title="ARC Built-in Form Renderer - Desktop"
          fields={formFields}
          onChange={userAction('onChange')}
          onSubmit={fakeAsyncOnSubmit}
        />
      </Story>
    );
  });

storiesOf('Form/Form/Sizes', module)
  .add('Default', () => (
    <Story style={formStoryStyle}>
      <Form
        title="ARC Built-in Form Renderer - Desktop"
        fields={formFields}
        onChange={userAction('onChange')}
        onSubmit={fakeAsyncOnSubmit}
        componentSize="default"
      />
    </Story>
  ))
  .add('Compact', () => (
    <Story style={formStoryStyle}>
      <Form
        title="ARC Built-in Form Renderer - Desktop"
        fields={formFields}
        onChange={userAction('onChange')}
        onSubmit={fakeAsyncOnSubmit}
        componentSize="compact"
      />
    </Story>
  ))
  .add('Large', () => (
    <Story style={formStoryStyle}>
      <Form
        title="ARC Built-in Form Renderer - Desktop"
        fields={formFields}
        onChange={userAction('onChange')}
        onSubmit={fakeAsyncOnSubmit}
        componentSize="large"
      />
    </Story>
  ));

storiesOf('Form/Form/Packing', module)
  .add('Default', () => (
    <Story style={formStoryStyle}>
      <Form
        title="ARC Built-in Form Renderer - Desktop"
        fields={formFields}
        onChange={userAction('onChange')}
        onSubmit={fakeAsyncOnSubmit}
      />
    </Story>
  ))
  .add('Tight Packing', () => (
    <Story style={formStoryStyle}>
      <Form
        title="ARC Built-in Form Renderer - Desktop"
        fields={formFields}
        onChange={userAction('onChange')}
        onSubmit={fakeAsyncOnSubmit}
        tightPack
      />
    </Story>
  ))
  .add('Airtight Packing', () => (
    <Story style={formStoryStyle}>
      <Form
        title="ARC Built-in Form Renderer - Desktop"
        fields={formFields}
        onChange={userAction('onChange')}
        onSubmit={fakeAsyncOnSubmit}
        airTightPack
      />
    </Story>
  ));

storiesOf('Form/Form/Customizations', module).add('Custom renderer', () => (
  <Story style={formStoryStyle}>
    <Form
      title="My Custom Renderer"
      fields={formFields}
      onChange={userAction('onChange')}
      onSubmit={fakeAsyncOnSubmit}
      renderOptions={{ useCustomRenderBody: true }}
    >
      {(rows: FormRows) => (
        <div className="MyCustomForm">
          <Title
            titleType={4}
            text="Ok This Implementation Is Not Really Ready Ill Admit"
          />
          {rows.map(row => (
            <div>{row.length}</div>
          ))}
        </div>
      )}
    </Form>
  </Story>
));
