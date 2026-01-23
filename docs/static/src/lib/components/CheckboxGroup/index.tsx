import { generatePseudoRandomId } from '@adam-sv/arc';
import { cn, IARCProps } from '@adam-sv/arc';
import React, { useLayoutEffect, useState, type JSX } from 'react';
import './style.scss';

export type ICheckBoxGroupItem = {
  label?: string;
  value: boolean;
  key: string;
};

export interface ICheckboxGroupProps extends IARCProps {
  items: ICheckBoxGroupItem[];
  onChange?: (
    items: ICheckBoxGroupItem[],
    clickedItem: ICheckBoxGroupItem | undefined,
    event: React.ChangeEvent<HTMLInputElement>
  ) => unknown;
  isExclusive?: boolean;
  checkboxType?: 'checkbox' | 'button';
  domRef?: React.RefObject<HTMLDivElement | null>;
}

export const getAutcompleteListItem = (
  autocompleteEntry: string
): JSX.Element => <li>{autocompleteEntry}</li>;

export const CheckboxGroup = (props: ICheckboxGroupProps): JSX.Element => {
  const {
    className,
    onChange,
    isExclusive,
    style,
    overrideDefaultClassName,
    checkboxType,
    domRef,
  } = props;

  const [groupItems, setGroupItems] = useState<ICheckBoxGroupItem[]>([]);

  useLayoutEffect(() => {
    if (props.items && groupItems !== props.items) {
      setGroupItems(props.items);
    }
  }, [props.items, groupItems]);

  const inputElements = groupItems.map((m: ICheckBoxGroupItem, i) => {
    const checkboxId = `ArcCheckboxGroup-${m.key}-${generatePseudoRandomId()}`;
    return (
      <div
        className={cn(
          m.value && 'ArcCheckboxGroup-item-checked',
          'ArcCheckboxGroup-item',
          className
        )}
        data-testid={`checkbox-item-${i}`}
        key={`checkbox-item-${m.key}`}
      >
        <input
          id={checkboxId}
          name={m.key}
          checked={m.value}
          type='checkbox'
          onChange={(ev) => {
            onChangeHandler(ev, m.key);
          }}
        />
        <label htmlFor={checkboxId}>{m.label || m.key}</label>
      </div>
    );
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValue = event.target.checked;
    let clickedItem;
    const newGroupItems: ICheckBoxGroupItem[] = [...groupItems].reduce<
      ICheckBoxGroupItem[]
    >((acc: ICheckBoxGroupItem[], cur: ICheckBoxGroupItem) => {
      if (cur.key === key) {
        cur.value = newValue;
        clickedItem = cur;
      } else if (isExclusive) cur.value = false;
      return [...acc, cur];
    }, []);
    setGroupItems(newGroupItems);
    if (onChange) onChange(newGroupItems, clickedItem, event);
  };

  return (
    <div
      className={cn(
        !overrideDefaultClassName && 'ArcCheckboxGroup',
        `ArcCheckboxGroup-${checkboxType || 'checkbox'}-type`,
        className
      )}
      style={style}
      ref={domRef}
    >
      {inputElements}
    </div>
  );
};
