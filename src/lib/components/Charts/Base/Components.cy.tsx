import { ChartLabel, Left } from './components';

describe('<Chart Components />', () => {
  // renders
  it('Left', () => {
    cy.mount(<Left clipTypes={{ top: 'diag', bottom: 'long' }} />);
  });

  it('ChartLabel', () => {
    cy.mount(<ChartLabel side='left'>hi</ChartLabel>);
  });
});
