// dependencies
import type {
  FormLayoutItem,
  IFormAccordionSection,
  IFormCustomComponentProps,
  IFormFieldCustom,
} from '@adam-sv/arc';
// internals
import { getAppRootElement } from 'arc-demo-app';
import type { JSX } from 'react';

const dropdownItems = [
  { label: 'Cow', value: 'cow' },
  { label: 'Horse', value: 'horse' },
  { label: 'Parrot', value: 'parrot' },
  {
    label:
      'Some absurdly long selection item name. I mean why would you ever go this long?',
    value: 'snaaaaaake',
  },
];

function ExampleCustomComponent(props: IFormCustomComponentProps): JSX.Element {
  const { field, updateField } = props;
  return (
    <div
      onClick={() => {
        updateField(field.id, 'My Field');
      }}
    >
      {(props.field as IFormFieldCustom).customComponentProps.label}
    </div>
  );
}

const getFormFields = (): FormLayoutItem[] => [
  {
    type: 'text',
    id: 'id',
    componentProps: {
      label: 'id',
      name: 'id',
      info: 'The info is configurable here.',
    },
    initialValue: 'Sample id',
  },
  {
    type: 'text',
    id: 'city',
    componentProps: { label: 'City of Residence', name: 'city_of_residence' },
  },
  {
    type: 'text',
    id: 'country',
    componentProps: { label: 'Country of Residence' },
  },
  {
    section: 'more',
    sectionTitle: 'More Info',
    titleComponentProps: { textAlign: 'center' },
  },
  {
    type: 'dropdown',
    id: 'favorite_animal',
    componentProps: {
      label: 'Favorite Animal',
      items: dropdownItems,
      placeholder: 'Select an Animal',
      info: 'Some help text. This text will be very long to test the overflow nature of the info popover component. Ideally all text should be visible and not be truncated by the component.',
    },
  },
  {
    type: 'dropdown',
    id: 'favorite_snack',
    initialValue: 'milk tea',
    componentProps: {
      label: 'Favorite Snack Disabled',
      items: [{ label: 'Milk Tea', value: 'milk tea' }],
      disabled: true,
      info: 'Adding disabled prevents selection from the UI but its value still gets submitted with a form.',
    },
  },
  {
    type: 'numberslider',
    id: 'animal_count',
    initialValue: 10,
    componentProps: {
      title: 'Animal Count',
      interval: 5,
      min: 0,
      max: 100,
    },
  },
  {
    type: 'textarea',
    id: 'description',
    componentProps: {
      label: 'Description',
      info: 'Add any other important info here.',
      placeholder: 'Leave a description...',
      rows: 6,
    },
  },
  {
    type: 'treebrowser',
    id: 'favorite_tree_node',
    componentProps: {
      label: 'Favorite Tree Node',
      trees: [
        {
          nodes: [
            { id: 1, label: 'One' },
            { id: 2, label: 'Two', parentId: 1 },
            { id: 3, label: 'Three' },
            { id: 4, label: 'Four', parentId: 3 },
            { id: 5, label: 'Five', parentId: 4 },
            { id: 6, label: 'Six', parentId: 3 },
          ],
        },
      ],
      useAsModal: true,
      info: 'Does info work on TreeBrowser?',
      possiblyUnloadedValue: 'This node isnt real!',
      portalTargetElement: getAppRootElement(),
    },
  },
  {
    type: 'accordion',
    id: 'accordion',
    componentProps: {
      sections: [
        {
          label: 'Title Of Nested Section',
          fields: [
            {
              type: 'text',
              id: 'accordion_input',
              componentProps: { label: 'Nested Iput' },
            },
            {
              type: 'dropdown',
              id: 'accordion_dropdown',
              componentProps: {
                label: 'Nested Dropdown',
                items: dropdownItems,
              },
            },
          ],
        },
      ] as IFormAccordionSection[],
    },
  },
  {
    type: 'objectlist',
    id: 'faq',
    componentProps: {
      fields: [
        {
          id: 'question',
          type: 'text',
          componentProps: { label: 'Question' },
        },
        {
          id: 'answer',
          type: 'textarea',
          componentProps: { label: 'Answer' },
        },
      ],
      itemLabel: 'Question',
      titleText: 'Your FAQ',
      titleType: 3,
      newItemButtonProps: {
        children: '(+) Add Question & Answer',
      },
    },
  },
  {
    type: 'custom',
    id: 'my_field',
    component: ExampleCustomComponent,
    customComponentProps: {
      label: 'A trivial Form "custom" type component rendered this text',
    },
  },
];

export default getFormFields;
