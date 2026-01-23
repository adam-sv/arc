import { Dropdown } from './index';

describe('<Dropdown />', () => {
  // renders
  it('renders', () => {
    cy.mount(
      <Dropdown
        items={[
          { label: 'Zero', value: 0 },
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 },
          { label: 'Three', value: 3 },
        ]}
      />
    );
  });
});
