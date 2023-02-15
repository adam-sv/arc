describe('Form', () => {
  it('is able to be navigated to', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.ArcLeftNavigation').contains('Examples').click();
    cy.get('.example-explorer').children('.ArcTree').contains('Form').click();
    cy.location('pathname').should('include', 'form');
  });

  it('can select from dropdown and clear changes', () => {
    cy.visit('http://localhost:3000/examples/form/default');
    cy.get('.ArcDropdown > select').first().should('have.value', 0);
    cy.get('.ArcDropdown > select').first().select(1).should('have.value', 1);
    cy.get('.ArcButton').contains('Clear Changes').click();
    cy.get('.ArcDropdown > select').first().should('have.value', 0);
  });
});
