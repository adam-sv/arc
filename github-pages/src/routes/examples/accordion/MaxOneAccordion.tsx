import { Accordion, Panel } from '@adam-sv/arc';
import { accordionItems } from './items';

export default function MaxOneAccordion(): JSX.Element {
  return (
    <Panel>
      <Accordion
        items={accordionItems}
        onExpansionChanged={() => {
          console.info('React to possibly new DOM positions');
        }}
        onlyOneItemCanBeExpanded
      />
    </Panel>
  );
}
