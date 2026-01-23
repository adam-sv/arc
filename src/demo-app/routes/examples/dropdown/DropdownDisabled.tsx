import { useState } from 'react';
import { Dropdown, Panel } from '@adam-sv/arc';
import items from './items';

export default function DropdownDisabled(): React.JSX.Element {
  const [selectedValue, setSelectedValue] = useState(items[0].value);

  return (
    <Panel style={{ gap: 10 }}>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          The <span className='prop'>disabled</span> or{' '}
          <span className='prop'>readOnly</span> state prevents the user from
          mutating the value.
        </p>
        <p>
          The component remains WYSIWYG, so you can expect it to behave
          intuitively during usage in a Form etc.
        </p>
        <p>
          Individual items can also be <span className='prop'>disabled</span> to
          make only specific options selectable.
        </p>
      </section>
      <Dropdown
        label='Default'
        items={items}
        value={selectedValue}
        onChange={(item) => {
          setSelectedValue(item.value);
        }}
      />
      <Dropdown
        label='Disabled'
        items={items}
        value={items[1].value}
        disabled
      />
    </Panel>
  );
}
