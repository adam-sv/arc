import { useState } from 'react';
import { Dropdown } from '@adam-sv/arc';
import items from './items';

export default function DefaultSizeDropdown(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(items[0].value);

  return (
    <Dropdown
      componentSize='large'
      onChange={(item) => {
        console.info('A change!', { item });
        setSelectedValue(item.value);
      }}
      label='Large Size'
      items={items}
      info='This is a large rendering of an Input.'
      value={selectedValue}
    />
  );
}
