import React from 'react';
import { Accordion, MonoIcon, Panel } from '@adam-sv/arc';
import { accordionItems } from './items';
import './styles.scss';

export default function CustomButtonAndRotation(): JSX.Element {
  return (
    <Panel>
      <Accordion
        className='ArcCustom'
        items={accordionItems}
        onExpansionChanged={() => {
          console.info('React to possibly new DOM positions');
        }}
        customButton={<MonoIcon.ArrowDown />}
      />
    </Panel>
  );
}
