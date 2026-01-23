import { Accordion, MatIcon, Panel } from '@adam-sv/arc';
import { accordionItems } from './items';
import './styles.scss';

export default function CustomButtonAndRotation() {
  return (
    <Panel>
      <Accordion
        className='ArcCustom'
        items={accordionItems}
        onExpansionChanged={() => {
          console.info('React to possibly new DOM positions');
        }}
        customButton={<MatIcon.ArrowDown />}
      />
    </Panel>
  );
}
