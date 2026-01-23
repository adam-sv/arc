import { useState } from 'react';
import { Dropdown, Panel } from '@adam-sv/arc';
import items from './items';

export default function DropdownDisabled(): React.JSX.Element {
  const [selectedValue, setSelectedValue] = useState<number>();
  const [anotherValue, setAnotherValue] = useState<number>(items[2].value);
  const [otherValue, setOtherValue] = useState<number>();

  return (
    <Panel style={{ gap: 10 }}>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          Use the <span className='prop'>placeholder</span> prop to display a
          non-selectable hint or prompt.
        </p>
        <p>
          The <span className='prop'>placeholder</span> will appear in the value
          field until the user makes a selection.
        </p>
      </section>
      <Dropdown
        label='Placeholder & no Value'
        items={items}
        value={selectedValue}
        placeholder='Select a number'
        onChange={(item) => {
          setSelectedValue(item.value);
        }}
      />
      <Dropdown
        label='Placeholder & Value'
        items={items}
        value={anotherValue}
        onChange={(item) => {
          setAnotherValue(item.value);
        }}
      />
      <Dropdown
        label='No Placeholder or Value'
        items={items}
        info={'Defaults to first item that is not disabled'}
        value={otherValue}
        onChange={(item) => {
          setOtherValue(item.value);
        }}
      />
    </Panel>
  );
}
