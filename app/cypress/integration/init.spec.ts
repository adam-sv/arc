describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });

  it('opens the app', () => {
    cy.visit('http://localhost:3000/');
  });

  it('opens the examples page', () => {
    cy.visit('http://localhost:3000/examples');
  });

  it('navigates to accordion examples', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.ArcLeftNavigation').contains('Examples').click();
    cy.location('pathname').should('include', 'examples');
    cy.get('.example-explorer')
      .children('.ArcTree')
      .contains('Accordion')
      .click();
    cy.location('pathname').should('include', 'accordion');
  });
});
