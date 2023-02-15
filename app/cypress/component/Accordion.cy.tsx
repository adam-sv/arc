import { Accordion, IAccordionItem } from '@adam-sv/arc';
import '../../src/lib/styles/index';
import '../../src/lib/components/Accordion/style.scss';

const accordionItems: IAccordionItem[] = [
  {
    id: 1,
    label: 'One',
    children: <div>Hello</div>,
  },
  {
    id: 2,
    label: 'Two',
    children: [<div key={0}>Hello</div>, <div key={1}>Hello again</div>],
  },
  {
    id: 3,
    label: 'Three Wow a Long Title I Wonder Why',
    children: <div>Hello for the final time</div>,
  },
];

context('Accordion', () => {
  describe('Accordion', () => {
    it('mounts, and respects isInitiallyExpandedFlag - all expanded', () => {
      cy.mount(
        <Accordion
          items={accordionItems.map((item) => ({
            ...item,
            isInitiallyExpanded: true,
          }))}
        ></Accordion>
      );

      const children = cy.get('.ArcAccordion').children();
      children.should('have.length', 3).should('have.class', 'item');

      const firstChild = cy.get('.ArcAccordion').children().first();
      firstChild.get('.children').should('have.class', 'expanded');
      firstChild.contains('Hello').should('be.visible');

      const secondChild = cy.get('.ArcAccordion').children().eq(1);
      secondChild.get('.children').should('have.class', 'expanded');
      secondChild.contains('Hello again').should('be.visible');

      const thirdChild = cy.get('.ArcAccordion').children().eq(2);
      thirdChild.get('.children').should('have.class', 'expanded');
      thirdChild.contains('Hello for the final time').should('be.visible');
    });

    it('mounts, and respects isInitiallyExpandedFlag - all collapsed', () => {
      cy.mount(
        <Accordion
          items={accordionItems.map((item) => ({
            ...item,
            isInitiallyExpanded: false,
          }))}
        ></Accordion>
      );

      const children = cy.get('.ArcAccordion').children();
      children.should('have.length', 3).should('have.class', 'item');

      const firstChild = cy.get('.ArcAccordion').children().first();
      firstChild.get('.children').should('not.have.class', 'expanded');
      firstChild.get('.children').should('have.class', 'collapsed');
      firstChild.contains('Hello').should('not.be.visible');

      const secondChild = cy.get('.ArcAccordion').children().eq(1);
      secondChild.get('.children').should('not.have.class', 'expanded');
      secondChild.get('.children').should('have.class', 'collapsed');
      secondChild.contains('Hello again').should('not.be.visible');

      const thirdChild = cy.get('.ArcAccordion').children().eq(2);
      thirdChild.get('.children').should('not.have.class', 'expanded');
      thirdChild.get('.children').should('have.class', 'collapsed');
      thirdChild.contains('Hello for the final time').should('not.be.visible');
    });

    it('mounts, and respects isInitiallyExpandedFlag - one collapsed', () => {
      const mixedItems: IAccordionItem[] = [...accordionItems];
      mixedItems[1].isInitiallyExpanded = false;

      cy.mount(
        <Accordion
          items={accordionItems.map((item, index) => ({
            ...item,
            isInitiallyExpanded: !(index % 2),
          }))}
        ></Accordion>
      );

      const children = cy.get('.ArcAccordion').children();
      children.should('have.length', 3).should('have.class', 'item');

      const firstChild = cy.get('.ArcAccordion').children().first();
      firstChild.get('.children').should('have.class', 'expanded');
      firstChild.contains('Hello').should('be.visible');

      const secondChild = cy.get('.ArcAccordion').children().eq(1);
      secondChild.get('.children').should('have.class', 'collapsed');
      secondChild.contains('Hello again').should('not.be.visible');

      const thirdChild = cy.get('.ArcAccordion').children().eq(2);
      thirdChild.get('.children').should('have.class', 'expanded');
      thirdChild.contains('Hello for the final time').should('be.visible');
    });

    it('expands each item without affecting other items', () => {
      cy.mount(
        <Accordion
          items={accordionItems.map((item) => ({
            ...item,
            isInitiallyExpanded: false,
          }))}
        ></Accordion>
      );
      // click first header
      cy.get('.ArcAccordion > .item:first > .header').click();
      // check that it's now closed
      cy.get('.ArcAccordion > .item:first > .children')
        .should('not.have.class', 'collapsed')
        .should('have.class', 'expanded')
        .contains('Hello')
        .should('be.visible');
      // check that the second child is still closed
      cy.get('.ArcAccordion > .item:nth-child(2) > .children')
        .contains('Hello again')
        .should('not.be.visible');
      // check that the third child is still closed
      cy.get('.ArcAccordion > .item:nth-child(3) > .children')
        .contains('Hello for the final time')
        .should('not.be.visible');

      // click the second header
      cy.get('.ArcAccordion > .item:nth-child(2) > .header').click();
      // check that it's now closed
      cy.get('.ArcAccordion > .item:nth-child(2) > .children')
        .should('not.have.class', 'collapsed')
        .should('have.class', 'expanded')
        .contains('Hello again')
        .should('be.visible');
      // check that the first child is still open
      cy.get('.ArcAccordion > .item:nth-child(1) > .children')
        .contains('Hello')
        .should('be.visible');
      // check that the third child is still closed
      cy.get('.ArcAccordion > .item:nth-child(3) > .children')
        .contains('Hello for the final time')
        .should('not.be.visible');

      // click the third header
      cy.get('.ArcAccordion > .item:nth-child(3) > .header').click();
      // check that it's now closed
      cy.get('.ArcAccordion > .item:nth-child(3) > .children')
        .should('not.have.class', 'collapsed')
        .should('have.class', 'expanded')
        .contains('Hello for the final time')
        .should('be.visible');
      // check that the first child is still open
      cy.get('.ArcAccordion > .item:nth-child(1) > .children')
        .contains('Hello')
        .should('be.visible');
      // check that the second child is still open
      cy.get('.ArcAccordion > .item:nth-child(2) > .children')
        .contains('Hello again')
        .should('be.visible');
    });

    it('collapses each item without affecting other items', () => {
      cy.mount(
        <Accordion
          items={accordionItems.map((item) => ({
            ...item,
            isInitiallyExpanded: true,
          }))}
        ></Accordion>
      );
      // click first header
      cy.get('.ArcAccordion > .item:first > .header').click();
      // check that it's now closed
      cy.get('.ArcAccordion > .item:first > .children')
        .should('not.have.class', 'expanded')
        .should('have.class', 'collapsed')
        .contains('Hello')
        .should('not.be.visible');
      // check that the second child is still open
      cy.get('.ArcAccordion > .item:nth-child(2) > .children')
        .contains('Hello again')
        .should('be.visible');
      // check that the third child is still open
      cy.get('.ArcAccordion > .item:nth-child(3) > .children')
        .contains('Hello for the final time')
        .should('be.visible');

      // click the second header
      cy.get('.ArcAccordion > .item:nth-child(2) > .header').click();
      // check that it's now closed
      cy.get('.ArcAccordion > .item:nth-child(2) > .children')
        .should('not.have.class', 'expanded')
        .should('have.class', 'collapsed')
        .contains('Hello again')
        .should('not.be.visible');
      // check that the first child is still closed
      cy.get('.ArcAccordion > .item:nth-child(1) > .children')
        .contains('Hello')
        .should('not.be.visible');
      // check that the third child is still open
      cy.get('.ArcAccordion > .item:nth-child(3) > .children')
        .contains('Hello for the final time')
        .should('be.visible');

      // click the third header
      cy.get('.ArcAccordion > .item:nth-child(3) > .header').click();
      // check that it's now closed
      cy.get('.ArcAccordion > .item:nth-child(3) > .children')
        .should('not.have.class', 'expanded')
        .should('have.class', 'collapsed')
        .contains('Hello for the final time')
        .should('not.be.visible');
      // check that the first child is still closed
      cy.get('.ArcAccordion > .item:nth-child(1) > .children')
        .contains('Hello')
        .should('not.be.visible');
      // check that the second child is still closed
      cy.get('.ArcAccordion > .item:nth-child(2) > .children')
        .contains('Hello again')
        .should('not.be.visible');
    });
  });
});
