import { Button } from './index';
import { BrowserRouter } from 'react-router';

describe('<Button />', () => {
  // renders
  it('renders', () => {
    cy.mount(<Button>Hello</Button>);
  });
  it('renders a button with type class', () => {
    cy.mount(<Button type='success'>Hello</Button>);
  });
  it('renders a button with a size', () => {
    cy.mount(<Button componentSize='large'>Hello</Button>);
  });
  it('renders a button of a different html type', () => {
    cy.mount(<Button htmlType='reset'>Hello</Button>);
  });
  // actions
  it('can click on default button', () => {
    cy.mount(<Button>click me</Button>);
    cy.get('button').click();
  });
  it('can click on disabled button', () => {
    cy.mount(<Button disabled>click me</Button>);
    cy.get('button').should('be.disabled');
  });
  it('can click on button with custom event', () => {
    cy.mount(<Button onClick={() => undefined}>click me</Button>);
    cy.get('button').click();
  });
  it('can render an external link button', () => {
    cy.mount(<Button to='https://example.com'>click me</Button>);
    cy.get('a').contains('click me');
  });
  it('can render an internal link button', () => {
    cy.mount(
      <BrowserRouter>
        <Button to='/bbq'>click me</Button>
      </BrowserRouter>
    );
    cy.get('a').click();
  });
});
