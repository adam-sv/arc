describe('BarChart', () => {
  it('is able to be navigated to', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.ArcLeftNavigation').contains('Examples').click();
    cy.get('.example-explorer')
      .children('.ArcTree')
      .contains('Bar Chart')
      .click();
    cy.location('pathname').should('include', 'chart').should('include', 'bar');
  });

  it('renders all bars and category labels of the grouped example', () => {
    cy.visit('http://localhost:3000/examples/chart/bar/grouped');
    cy.get('.GroupedBarChart .ArcBarChart')
      .find('.ArcBarChart-bar')
      .should('have.length', 50);

    cy.get('.GroupedBarChart .ArcBarChart')
      .find('.ArcBarChart-independentAxis-tickLabel')
      .should('have.length', 5);
  });

  it('renders all bars and category labels of the grouped example after switching to horizontal', () => {
    cy.visit('http://localhost:3000/examples/chart/bar/grouped');
    cy.get('.GroupedBarChart .ArcButton.horizontal-toggle').click();

    cy.get('.GroupedBarChart .ArcBarChart')
      .find('.ArcBarChart-bar')
      .should('have.length', 50);

    cy.get('.GroupedBarChart .ArcBarChart')
      .find('.ArcBarChart-independentAxis-tickLabel')
      .should('have.length', 5);
  });
});
