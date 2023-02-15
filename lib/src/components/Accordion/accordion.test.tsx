import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, IAccordionItem } from './index';

const accordionItems: IAccordionItem[] = [
  {
    id: 1,
    label: 'One',
    children: <div>Hello</div>,
    isInitiallyExpanded: true,
  },
  {
    id: 2,
    label: 'Two',
    children: [<div key={0}>Hello</div>, <div key={1}>Hello again</div>],
    isInitiallyExpanded: true,
  },
  {
    id: 3,
    label: 'Three Wow a Long Title I Wonder Why',
    children: <div>Hello for the final time</div>,
    isInitiallyExpanded: true,
  },
];

describe('Simple Accordion', () => {
  it('opens the accordion panels by default', () => {
    render(<Accordion items={accordionItems}></Accordion>);
    const button0 = screen.getByTestId('accordion-control-button-0');
    const button1 = screen.getByTestId('accordion-control-button-1');
    expect(button0).toHaveClass('expanded');
    expect(button1).toHaveClass('expanded');
  });

  it('collapsing one panel leaves others open', async () => {
    const user = userEvent.setup();
    render(<Accordion items={accordionItems}></Accordion>);
    const button0 = screen.getByTestId('accordion-control-button-0');
    const button1 = screen.getByTestId('accordion-control-button-1');
    expect(button0).toHaveClass('expanded');
    expect(button1).toHaveClass('expanded');
    await user.click(button0);
    expect(button0).not.toHaveClass('expanded');
    expect(button1).toHaveClass('expanded');
  });
});

describe('Max One Accordion', () => {
  it('opens one panel by default', () => {
    render(
      <Accordion items={accordionItems} onlyOneItemCanBeExpanded></Accordion>
    );
    const button0 = screen.getByTestId('accordion-control-button-0');
    const button1 = screen.getByTestId('accordion-control-button-1');
    expect(button0).toHaveClass('expanded');
    expect(button1).not.toHaveClass('expanded');
  });

  it("collapsing active panel doesn't affect other panels", async () => {
    const user = userEvent.setup();
    render(
      <Accordion items={accordionItems} onlyOneItemCanBeExpanded></Accordion>
    );
    const button0 = screen.getByTestId('accordion-control-button-0');
    const button1 = screen.getByTestId('accordion-control-button-1');
    await user.click(button0);
    expect(button0).not.toHaveClass('expanded');
    expect(button1).not.toHaveClass('expanded');
  });

  it('opening a new panel closes active panel', async () => {
    const user = userEvent.setup();
    render(
      <Accordion items={accordionItems} onlyOneItemCanBeExpanded></Accordion>
    );
    const button0 = screen.getByTestId('accordion-control-button-0');
    const button1 = screen.getByTestId('accordion-control-button-1');
    await user.click(button1);
    expect(button0).not.toHaveClass('expanded');
    expect(button1).toHaveClass('expanded');
  });
});
