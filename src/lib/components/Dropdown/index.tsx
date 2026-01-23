import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { cn, getSizeClassName, MatIcon } from '@adam-sv/arc';
import './style.scss';
import type { DropdownValue, IDropdownItem, IDropdownProps } from './types';
import { InputSkeleton } from '../InputSkeleton';
import { v4 as uuidv4 } from 'uuid';

/**
 * Dropdown component for selecting a value from a list of items.
 *
 * @template T - The type of the value for each dropdown item.
 * @property {IDropdownProps<T>} props - The props for the Dropdown component.
 * @property {string} [props.className] - Additional class names to apply to the component.
 * @property {string} [props.componentSize] - Size modifier for the component (e.g., 'default' | 'compact' | 'large').
 * @property {string} [props.error] - Error message to display.
 * @property {(a: T, b: T) => boolean} [props.equalityCheck] - Custom function to check equality between values.
 * @property {string} [props.label] - Label for the dropdown.
 * @property {string} [props.id] - ID for the InputSkeleton wrapper.
 * @property {string} [props.info] - Info message to display.
 * @property {IDropdownItem<T>[]} props.items - Array of dropdown items to display.
 * @property {(item: IDropdownItem<T>) => void} [props.onChange] - Callback fired when the selected item changes.
 * @property {boolean} [props.overrideDefaultClassName] - If true, does not apply the default class name.
 * @property {string} [props.placeholder] - Placeholder text to display when no value is selected.
 * @property {React.CSSProperties} [props.style] - Inline styles to apply to the component.
 * @property {T} [props.value] - The currently selected value.
 * @property {React.RefObject<HTMLSelectElement>} [props.selectRef] - Ref for the underlying select element.
 * @property {React.RefObject<HTMLDivElement>} [props.skeletonRef] - Ref for the InputSkeleton wrapper.
 * @property {boolean} [props.disabled] - If true, disables the dropdown.
 * @returns {React.JSX.Element} The rendered Dropdown component.

 * @remarks
 * - Supports disabled items and placeholder text.
 */
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
  selectRef,
  skeletonRef,
  disabled,
}: IDropdownProps<T>): React.JSX.Element {
  const localSelectRef = useRef<HTMLSelectElement>(null);
  const safeSelectRef = selectRef || localSelectRef;

  const idForLabel = useMemo(() => uuidv4(), []);
  const [previouslySelectedIndex, setPreviouslySelectedIndex] =
    useState<number>(-1);

  const didChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setPreviouslySelectedIndex(index);
    if (onChange) onChange(items[index]);
  };

  // determine index of selected item
  let selectedIndex = items.findIndex((i: IDropdownItem<T>) => {
    if (i.disabled) return false;
    return value && equalityCheck
      ? equalityCheck(i.value, value)
      : i.value === value;
  });
  if (selectedIndex < 0 && !placeholder) {
    selectedIndex = items.findIndex((item) => !item.disabled); // default to first non-disabled item
  }

  // if selected index has changed, track the change
  useLayoutEffect(() => {
    if (selectedIndex !== previouslySelectedIndex) {
      setPreviouslySelectedIndex(selectedIndex);
    }
  }, [selectedIndex, previouslySelectedIndex, items]);

  const dropdownValue = items[selectedIndex]?.label || placeholder;

  // if I tried to put pointer-events: none in CSS, InfoIcon becomes useless
  // so ew had to manually wire some clicks to the dropdown ref
  return (
    <InputSkeleton
      className={cn(
        !overrideDefaultClassName && 'ArcDropdown',
        className,
        componentSize && getSizeClassName(componentSize),
        error && 'error'
      )}
      skeletonRef={skeletonRef}
      id={id}
      labelHtmlFor={idForLabel}
      label={label}
      error={error}
      info={info}
      componentSize={componentSize}
      buttonProps={{
        children: <MatIcon.ArrowDown />,
        onClick: () => null,
        type: 'custom',
      }}
      onFocusSkeleton={() => {
        if (
          safeSelectRef.current &&
          !safeSelectRef.current.contains(document.activeElement) // :WHEW: necessary to prevent native select hogging focus over customized options
        ) {
          safeSelectRef.current.focus();
        }
      }}
      onBlurSkeleton={() => safeSelectRef.current?.blur()}
      style={style}
      disabled={disabled}
    >
      <div
        className='ArcDropdown-value-row'
        data-testid={'ArcDropdown-value-row'}
      >
        {dropdownValue}
      </div>

      <select
        id={idForLabel}
        value={selectedIndex}
        onChange={didChange}
        ref={safeSelectRef}
        disabled={disabled}
      >
        {placeholder && (
          <option className='placeholder' value={-1} disabled hidden>
            {placeholder}
          </option>
        )}
        {items.map((opt: IDropdownItem<T>, i: number) => (
          <option value={i} key={`dropdown-opt-${i}`} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </InputSkeleton>
  );
}
