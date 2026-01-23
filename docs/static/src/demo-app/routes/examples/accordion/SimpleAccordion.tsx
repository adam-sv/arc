import { Accordion, Panel } from '@adam-sv/arc';
import { accordionItems } from './items';
import type { JSX } from 'react';

export default function SimpleAccordion(): JSX.Element {
  return (
    <Panel>
      <Accordion
        items={accordionItems}
        onExpansionChanged={() => {
          console.info('React to possibly new DOM positions');
        }}
      />
    </Panel>
  );
}
