// dependencies
import React, { useState } from 'react';
// internals
import { cn, getSizeClassName, InfoIcon } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { IDropdownItem, IDropdownProps } from './types';
export type { IDropdownItem, IDropdownProps };

export function Dropdown(props: IDropdownProps) {
  // state
  const [isFocused, setFocused] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<number>(-1);

  // let's destructure the props here
  const { className, error, label, items, onChange, placeholder, selected } = props;

  // because the item's value is its index, we will read the value we clicked on and
  // find it manually in the array. This is why we don't directly call onChange
  const handleOnChange = makeOnChangeHandler(items, onChange, setSelectedValue);

  // let's find the index of the selected item
  // we default to -1, so when it doesnt change, the "default" value should have value set to -1
  let selectedIndex = -1;
  if (selected) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].value === selected.value) {
        selectedIndex = i;
      }
    }
  }
  // since we might not have a selected item, we might not have a selected value,
  // so we use this bool for readability
  const hasSelectedValue = (selectedIndex > -1);

  let dropdownValue;
  if (selected) {
    dropdownValue = selected.label;
  } else if (selectedValue >= 0 && selectedValue < items.length) {
    try {
      dropdownValue = items[selectedValue].label;
    } catch (e) {
      // noop
    }
  }

  if (!dropdownValue) {
    dropdownValue = placeholder || '-';
  }

  return (
    <div className={cn(
      !props.overrideDefaultClassName && 'ArcDropdown',
      props.className,
      props.componentSize && getSizeClassName(props.componentSize),
      isFocused && 'focused',
      error && 'error',
    )}>
      <select
        defaultValue={selectedIndex}
        onChange={handleOnChange}
        onFocus={e => setFocused(true)}
        onBlur={e => setFocused(false)}
      >
        {!hasSelectedValue &&
          <option className="placeholder" value={-1} key="placeholder" disabled>
            {placeholder || '-'}
          </option>
        }
        {items.map((opt: IDropdownItem, i: number) =>
          <option value={i} key={opt.value}>
            {opt.label}
          </option>
        )}
      </select>
      <div className="ArcDropdown-content-column">
        {(label || error) &&
          <div className="ArcDropdown-label-row">
            {label && <label htmlFor={props.labelFor}>
              {label}
            </label>}
            {error && <label className="ArcDropdown-error-label">
              {error}
            </label>}
          </div>
        }
        <div className="ArcDropdown-content-row ArcDropdown-no-value">
          <InfoIcon>{props.info}</InfoIcon>
          {dropdownValue}
        </div>
      </div>
      <div className="ArcDropdown-controls-column">
        <div className="arrow" />
      </div>
    </div>
  );
}

// ok, so let's discuss the algorithm a bit
// the Dropdown numbers its inputs
// the Dropdown knows the index of the selected input
//  (using === equality; the IDropdownItems you pass need either:
//     * value as a primary value
//     * selected prop is a reference to the items prop array
//  )
// therefore, we just make some raw assumptions here dog, we built the indexing
function makeOnChangeHandler(
  items: IDropdownItem[],
  onChange: (data: any) => void,
  setSelectedValue: (index: number) => void,
) {
  return e => {
    try {
      const index = parseInt(e.target.value, 10);
      setSelectedValue(index);
      if (typeof onChange === 'function') {
        onChange(items[index]);
      }
    } catch (e) {
      // this should never happen, unless e.target.value was the placeholder value,
      // which should never happen, but also requires no action if it does, because nothing changed
    }
  };
}
