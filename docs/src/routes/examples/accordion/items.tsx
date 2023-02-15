import { Form, IAccordionItem } from '@adam-sv/arc';
const isInitiallyExpanded = true;

export const accordionItems: IAccordionItem[] = [
  {
    id: 1,
    label: 'One',
    children: <div>Hello</div>,
    isInitiallyExpanded,
  },
  {
    id: 2,
    label: 'Two',
    children: [<div key={0}>Hello</div>, <div key={1}>Hello again</div>],
    isInitiallyExpanded,
  },
  {
    id: 3,
    label: 'Three Wow a Long Title I Wonder Why',
    children: <div>Hello for the final time</div>,
    isInitiallyExpanded,
  },
];

export const sampleForm = (
  <Form
    className='ArcAccordionStoryForm'
    title='Sample Form'
    layout={[
      {
        type: 'text',
        id: 'username',
        componentProps: { label: 'Username', type: 'text' },
      },
    ]}
    onSubmit={(data) => {
      console.info('Form data:', { data });
    }}
  />
);
