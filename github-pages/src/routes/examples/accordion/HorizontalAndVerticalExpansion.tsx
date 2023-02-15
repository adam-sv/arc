import { Accordion, Panel } from '@adam-sv/arc';
import { sampleForm } from './items';

export default function HorizontalAndVerticalExpansion(): JSX.Element {
  return (
    <Panel>
      <Accordion
        items={[
          {
            id: 'HorizontalAccordionExpandHieghtAndWidth',
            label: 'Sample Form',
            children: [sampleForm],
          },
        ]}
        onExpansionChanged={() => {
          console.info('React to possibly new DOM positions');
        }}
        horizontal={'right'}
        expandHeightAndWidth={true}
      />
    </Panel>
  );
}
