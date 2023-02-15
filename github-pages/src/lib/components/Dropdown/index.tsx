import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn, getSizeClassName } from '@adam-sv/arc';
import './style.scss';
import type { DropdownValue, IDropdownItem, IDropdownProps } from './types';
import { InputSkeleton } from '../InputSkeleton';
import { MonoIcon } from '@adam-sv/arc';

export function Dropdown<T = DropdownValue>({
  className,
  componentSize,
  error,
  equalityCheck,
  label,
  id,
  info,
  items,
  onChange,
  overrideDefaultClassName,
  placeholder,
  style,
  value,
}: IDropdownProps<T>): JSX.Element {
  const ref = useRef<HTMLSelectElement>(null);
  const [idForLabel] = useState(Math.random().toString(16).slice(2, 11));
  const [isFocused, setFocused] = useState<boolean>(false);
  const [previouslySelectedIndex, setPreviouslySelectedIndex] =
    useState<number>(-1);

  const didChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setPreviouslySelectedIndex(index);
    if (onChange) onChange(items[index]);
  };

  // determine index of selected item
  let selectedIndex = items.findIndex((i: IDropdownItem<T>) =>
    value && equalityCheck ? equalityCheck(i.value, value) : i.value === value
  );
  if (selectedIndex < 0) selectedIndex = 0; // default to first item

  // if selected index has changed, track the change
  useLayoutEffect(() => {
    if (selectedIndex !== previouslySelectedIndex) {
      setPreviouslySelectedIndex(selectedIndex);
      if (onChange) onChange(items[selectedIndex]);
    }
  }, [onChange, selectedIndex, previouslySelectedIndex, items]);

  let dropdownValue;
  if (selectedIndex > -1) {
    dropdownValue = items[selectedIndex]?.label;
  }

  if (!dropdownValue) {
    dropdownValue = placeholder || '-';
  }

  // if I tried to put pointer-events: none in CSS, InfoIcon becomes useless
  // so ew had to manually wire some clicks to the dropdown ref
  return (
    <InputSkeleton
      className={cn(
        !overrideDefaultClassName && 'ArcDropdown',
        className,
        componentSize && getSizeClassName(componentSize),
        isFocused && 'focused',
        error && 'error'
      )}
      id={id}
      labelHtmlFor={idForLabel}
      label={label}
      error={error}
      info={info}
      componentSize={componentSize}
      buttonProps={{
        children: <MonoIcon.ArrowDown />,
        onClick: () => null,
        type: 'custom',
      }}
      onFocusSkeleton={() => ref.current?.focus()}
      onBlurSkeleton={() => ref.current?.blur()}
      style={style}
    >
      <div className='ArcDropdown-value-row'>{dropdownValue}</div>

      <select
        id={idForLabel}
        value={selectedIndex}
        onChange={didChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={ref}
      >
        {items.map((opt: IDropdownItem<T>, i: number) => (
          <option value={i} key={`dropdown-opt-${i}`} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </InputSkeleton>
  );
}
