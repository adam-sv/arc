import { useState } from 'react';
import { Dropdown } from '@adam-sv/arc';
import items from './items';

export default function CompactSizeDropdown(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(items[0].value);

  return (
    <Dropdown
      componentSize='compact'
      onChange={(item) => {
        console.info('A change!', { item });
        setSelectedValue(item.value);
      }}
      label='Compact Size'
      items={items}
      info='This is a compact rendering of an Input.'
      value={selectedValue}
    />
  );
}
