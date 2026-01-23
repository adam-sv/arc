import { NumberSlider } from './index';

describe('<NumberSlider />', () => {
  // renders
  it('renders', () => {
    cy.mount(<NumberSlider title='Hello' max={3} />);
  });
});
