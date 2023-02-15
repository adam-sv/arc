// dependencies
import {
  FormLayoutItem,
  IFormAccordionSection,
  IFormCustomComponentProps,
} from '@adam-sv/arc';
// internals
import { getAppRootElement } from 'src/app';
import { IFormFieldCustom } from '@adam-sv/arc';

const dropdownItems = [
  { label: 'Cow', value: 'cow' },
  { label: 'Horse', value: 'horse' },
  { label: 'Parrot', value: 'parrot' },
];

function ExampleCustomComponent(props: IFormCustomComponentProps): JSX.Element {
  const { field, updateField } = props;
  return (
    <div onClick={() => updateField(field.id, 'My Field')}>
      {(props.field as IFormFieldCustom).customComponentProps?.label}
    </div>
  );
}

const getFormFields = (): FormLayoutItem[] => [
  {
    type: 'text',
    id: 'id',
    componentProps: {
      label: 'id',
      info: 'The info is configurable here.',
    },
    initialValue: 'Sample id',
  },
  {
    type: 'text',
    id: 'city',
    componentProps: { label: 'City of Residence' },
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
    initialValue: dropdownItems[0].value,
    componentProps: { label: 'Favorite Animal', items: dropdownItems },
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
