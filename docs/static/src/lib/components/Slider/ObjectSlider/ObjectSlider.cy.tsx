import { ObjectSlider } from './index';
import { ObjectSliderOption } from '@adam-sv/arc';

const options: ObjectSliderOption<number>[] = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];

describe('<ObjectSlider />', () => {
  // renders
  it('renders', () => {
    cy.mount(<ObjectSlider title='Hello' options={options} />);
  });
});
