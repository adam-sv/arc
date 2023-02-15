describe('Navigation', () => {
  it('loads at baseUrl', () => {
    cy.visit('/');
  });

  it('loads examples page by default', () => {
    cy.visit('/');
    cy.url().should('include', '/examples');
    cy.get('.ArcLeftNavigation-links')
      .children()
      .eq(0)
      .should('be.visible')
      .should('have.class', 'is-selected');
  });

  it('loads theme page when you click the second nav link', () => {
    cy.visit('/');
    cy.get('.ArcLeftNavigation-links')
      .children()
      .eq(1)
      .should('be.visible')
      .click()
      .should('have.class', 'is-selected');

    cy.url().should('include', '/theme');
  });
});
