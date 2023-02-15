import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn, TextInput, debounce } from '@adam-sv/arc';
import './style.scss';
import type { ITextInputProps } from '@adam-sv/arc';

export type AutocompleteSearch = (
  searchTerm: string
) => string[] | Promise<string[]>;

export interface IAutocompleteInputProps extends ITextInputProps {
  autocompleteSearch: AutocompleteSearch;
  autocompleteEntryWasSelected?: (entry: string) => unknown;
  // if the event is undefined, it's because the user "clicked" on an autocomplete suggestion
  onChange: (
    value: string | number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => unknown | undefined;
}

export const AutocompleteInput = (props: IAutocompleteInputProps) => {
  const {
    autocompleteEntryWasSelected,
    autocompleteSearch,
    className,
    id,
    onChange,
    onFocus,
    onBlur,
    style,
    value,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDetailsElement>(null);
  const [autocompleteEntries, setAutocompleteEntries] = useState<string[]>([]);
  const [showAutocompleteEntries, setShowAutocompleteEntries] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value
  );

  useLayoutEffect(() => {
    if (props.value !== undefined && inputValue !== props.value) {
      setInputValue(props.value);
      if (!props.value) setAutocompleteEntries([]);
    }
  }, [props.value, inputValue]);

  const onChangeHandler = async ({
    event,
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    value: string | number;
  }) => {
    setInputValue(value);
    const searchValue = `${value}`;
    const entries = searchValue?.length
      ? await autocompleteSearch(searchValue)
      : undefined;
    if (entries?.length) {
      setAutocompleteEntries(entries);
      setShowAutocompleteEntries(true);
    } else {
      setAutocompleteEntries([]);
      setShowAutocompleteEntries(false);
    }
    if (onChange) onChange(value, event);
  };

  const debouncedChangeHandler = debounce(onChangeHandler, 10);

  const getAutcompleteListItem = (
    autocompleteEntry: string,
    index: number
  ): JSX.Element => {
    const didSelect = () => {
      setInputValue(autocompleteEntry);
      if (onChange) onChange(autocompleteEntry, undefined);
      if (autocompleteEntryWasSelected)
        autocompleteEntryWasSelected(autocompleteEntry);
      setAutocompleteEntries([]);
      setShowAutocompleteEntries(false);
    };
    return (
      <li
        onClick={didSelect}
        onKeyUp={(e) => {
          if (e.key === ' ') {
            didSelect();
          }
        }}
        key={`autocomplete-entry-${index}`}
      >
        <a href='#'>{autocompleteEntry}</a>
      </li>
    );
  };

  const didFocus = (ev: React.FocusEvent<HTMLDetailsElement, Element>) => {
    setShowAutocompleteEntries(true);
    if (onFocus) onFocus(ev);
  };

  const didBlur = (ev: React.FocusEvent<HTMLDetailsElement, Element>) => {
    // if the related target is not contained within this autocomplete, trigger blur
    if (
      containerRef?.current &&
      !containerRef.current.contains(ev.relatedTarget)
    ) {
      setTimeout(() => {
        setShowAutocompleteEntries(false);
        if (onBlur) onBlur(ev);
      }, 300);
    }
  };

  return (
    <details
      className={cn('ArcAutocompleteInput', className)}
      id={id}
      open={showAutocompleteEntries}
      onBlur={didBlur}
      onFocus={didFocus}
      ref={containerRef}
      style={style}
    >
      <summary tabIndex={-1}>
        <TextInput
          {...rest}
          onChange={(value, event) => debouncedChangeHandler({ event, value })}
          value={inputValue}
        />
      </summary>
      {(autocompleteEntries?.length && (
        <ul className='autocomplete-entries'>
          {autocompleteEntries.map(getAutcompleteListItem).slice(0, 5)}
        </ul>
      )) ||
        ''}
    </details>
  );
};
