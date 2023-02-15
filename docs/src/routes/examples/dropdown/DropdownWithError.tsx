import { useState } from 'react';
import { Dropdown } from '@adam-sv/arc';
import items from './items';

export default function DropdownWithError(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(items[0].value);

  return (
    <Dropdown
      onChange={(item) => {
        console.info('A change!', { item });
        setSelectedValue(item.value);
      }}
      label='Four Numbers'
      error='Error Message'
      items={items}
      value={selectedValue}
    />
  );
}
