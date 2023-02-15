import { Accordion, Panel } from '@adam-sv/arc';
import { sampleForm } from './items';

export default function LeftSideHorizontalAccordion(): JSX.Element {
  return (
    <Panel>
      <Accordion
        items={[
          {
            id: 'HorizontalAccordion',
            label: 'Sample Form',
            children: [sampleForm],
          },
        ]}
        onExpansionChanged={() => {
          console.info('React to possibly new DOM positions');
        }}
        horizontal={'left'}
      />
    </Panel>
  );
}
