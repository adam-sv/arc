import { useState } from 'react';
import { Dropdown } from '@adam-sv/arc';
import items from './items';

export default function DropdownWithInfo(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(items[0].value);

  return (
    <Dropdown
      onChange={(item) => {
        console.info('A change!', { item });
        setSelectedValue(item.value);
      }}
      label='Numbers'
      items={items}
      info='While the labels are strings, the value is a number'
      value={selectedValue}
    />
  );
}
