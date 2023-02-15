// dependencies
import { useState } from 'react';
// types
import type { IDropdownItem } from '@adam-sv/arc';
import type { IOverheadViewDirection } from '@adam-sv/arc';

export function useOverheadViewDirection(): [
  IOverheadViewDirection,
  React.Dispatch<React.SetStateAction<IOverheadViewDirection>>,
  IDropdownItem<IOverheadViewDirection>[]
] {
  const [direction, setDirection] = useState<IOverheadViewDirection>('left');
  const dropdownItems: IDropdownItem<IOverheadViewDirection>[] = [
    { label: 'Left', value: 'left' },
    { label: 'Up', value: 'up' },
    { label: 'Right', value: 'right' },
    { label: 'Down', value: 'down' },
  ];

  return [direction, setDirection, dropdownItems];
}
