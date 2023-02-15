// dependencies
import React, { useLayoutEffect, useState } from 'react';
// internals
import {
  AutocompleteInput,
  cn,
  generatePseudoRandomId,
  MonoIcon,
  TextInput,
} from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { AutocompleteSearch, ITextInputProps } from '@adam-sv/arc';

export type MultitextItem = string;

export interface IMultitextInputProps extends ITextInputProps {
  items?: MultitextItem[];
  itemsDidUpdate?: (items: MultitextItem[]) => unknown;
  autocompleteSearch?: AutocompleteSearch;
  alwaysShowDelete?: boolean;
  listLabel?: string;
  delineator?: string; // defaults to space
  // if the event is undefined, it's because the user "clicked" on an autocomplete suggestion
  onChange?: (
    value: string | number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => unknown | undefined;
}

export const getAutcompleteListItem = (autocompleteEntry: string) => (
  <li>{autocompleteEntry}</li>
);

export const MultitextInput = (props: IMultitextInputProps) => {
  const {
    className,
    overrideDefaultClassName,
    autocompleteSearch,
    value,
    alwaysShowDelete,
    itemsDidUpdate,
    onChange,
    delineator,
    ...rest
  } = props;

  const updateInputValue = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | undefined,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    if (onChange) onChange(newInputValue, event);
  };

  const [multitextItems, setMultitextItems] = useState<MultitextItem[]>([]);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value
  );

  useLayoutEffect(() => {
    if (props.items && multitextItems !== props.items) {
      setMultitextItems(props.items);
    }
  }, [props.items, multitextItems]);

  useLayoutEffect(() => {
    if (props.value && inputValue !== props.value) {
      setInputValue(props.value);
      if (onChange) onChange(props.value, undefined);
    }
  }, [props.value, inputValue, onChange]);

  const deleteMultitextItem = (item: MultitextItem) => {
    const filtered = multitextItems.filter((i: MultitextItem) => {
      if (i === item) return false;
      return true;
    });

    setMultitextItems(filtered);
    if (itemsDidUpdate) itemsDidUpdate(filtered);
  };

  const onKeyDown: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const isDelineator = event.key === (delineator || ' ');
    if (isDelineator && inputValue) {
      event.preventDefault();
      event.stopPropagation();
      addMultitextItem(`${inputValue}`);
    }
  };

  const addMultitextItem = (item: MultitextItem) => {
    const newItems = [...multitextItems, item];
    setMultitextItems(newItems);
    if (itemsDidUpdate) itemsDidUpdate(newItems);
    updateInputValue(undefined, '');
  };

  const inputElement = autocompleteSearch ? (
    <AutocompleteInput
      {...rest}
      autocompleteSearch={autocompleteSearch}
      className={cn(
        !overrideDefaultClassName && 'ArcMultitextInput',
        className
      )}
      overrideDefaultClassName={overrideDefaultClassName}
      value={inputValue}
      onChange={(value, e) => updateInputValue(e, `${value}`)}
      autocompleteEntryWasSelected={addMultitextItem}
      onKeyDown={onKeyDown}
    />
  ) : (
    <TextInput
      {...rest}
      placeholder={rest.placeholder || 'Type to add items...'}
      className={cn(
        !overrideDefaultClassName && 'ArcMultitextInput',
        className
      )}
      value={inputValue}
      overrideDefaultClassName={overrideDefaultClassName}
      onKeyDown={onKeyDown}
      onChange={(value, e) => updateInputValue(e, `${value}`)}
    />
  );

  const multitextElements = multitextItems.map((i: MultitextItem) => {
    return (
      <li key={`multitext-input-${i}-${generatePseudoRandomId()}`}>
        &bull;&nbsp;{i}
        <div
          className={`delete${alwaysShowDelete ? ' disable-hover' : ''}`}
          onClick={() => deleteMultitextItem(i)}
        >
          <MonoIcon.Delete />
        </div>
      </li>
    );
  });

  return (
    <div
      className={cn(
        !overrideDefaultClassName && 'ArcMultitextInput',
        className
      )}
    >
      {(multitextElements?.length && props.listLabel && (
        <h5>{props.listLabel}</h5>
      )) ||
        ''}
      <ul>{multitextElements}</ul>
      {inputElement}
    </div>
  );
};
