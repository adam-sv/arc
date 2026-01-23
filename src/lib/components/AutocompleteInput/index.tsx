import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn, TextInput, debounce, MatIcon } from '@adam-sv/arc';
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
  ) => unknown;
  displayClear?: boolean;
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
    displayClear,
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
    if (value !== undefined && inputValue !== value) {
      setInputValue(value);
      if (!value) setAutocompleteEntries([]);
    }
  }, [value, inputValue]);

  const resetAutocompleteEntries = () => {
    setAutocompleteEntries([]);
    setShowAutocompleteEntries(false);
  };

  const onChangeHandler = async ({
    event,
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    value: string | number;
  }) => {
    setInputValue(value);
    const searchValue = `${value}`;
    const entries = searchValue.length
      ? await autocompleteSearch(searchValue)
      : undefined;
    if (entries?.length) {
      setAutocompleteEntries(entries);
      setShowAutocompleteEntries(true);
    } else {
      resetAutocompleteEntries();
    }
    onChange(value, event);
  };

  const debouncedChangeHandler = debounce(onChangeHandler, 10);

  const didSelect = (autocompleteEntry?: string) => {
    if (autocompleteEntry != undefined) {
      setInputValue(autocompleteEntry);
      onChange(autocompleteEntry, undefined);
      if (autocompleteEntryWasSelected)
        autocompleteEntryWasSelected(autocompleteEntry);
    }
    resetAutocompleteEntries();
  };

  const getAutcompleteListItem = (
    autocompleteEntry: string,
    index: number
  ): React.JSX.Element => {
    return (
      <li
        tabIndex={0}
        onClick={() => {
          didSelect(autocompleteEntry);
        }}
        onKeyUp={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            didSelect(autocompleteEntry);
          }
        }}
        id={`autocomplete-entry-${index}`}
        data-testid={`autocomplete-entry-${index}`}
        key={`autocomplete-entry-${index}`}
      >
        {autocompleteEntry}
      </li>
    );
  };

  const didFocus = (ev: React.FocusEvent<HTMLDetailsElement>) => {
    setShowAutocompleteEntries(true);
    if (onFocus) onFocus(ev);
  };

  const didBlur = (ev: React.FocusEvent<HTMLDetailsElement>) => {
    // if the related target is not contained within this autocomplete, trigger blur
    if (
      containerRef.current &&
      !containerRef.current.contains(ev.relatedTarget)
    ) {
      setTimeout(() => {
        setShowAutocompleteEntries(false);
        if (onBlur) onBlur(ev);
      }, 300);
    }
  };

  const onClear = () => {
    didSelect('');
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
      <summary
        className={cn(displayClear && 'displayClear')}
        tabIndex={-1}
        data-testid={'ArcAutocompleteInput-summary'}
      >
        {displayClear && <ClearButton value={inputValue} onClick={onClear} />}
        <TextInput
          {...rest}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              resetAutocompleteEntries();
            }
          }}
          onChange={(value, event) => debouncedChangeHandler({ event, value })}
          value={inputValue}
        />
      </summary>
      {Boolean(autocompleteEntries.length) && (
        <ul
          className='autocomplete-entries'
          data-testid={'autocomplete-entries'}
        >
          {autocompleteEntries.map(getAutcompleteListItem).slice(0, 5)}
        </ul>
      )}
    </details>
  );
};

// TO-DO: => this could live in TextInput
const ClearButton = ({
  onClick,
  value,
}: {
  onClick: () => void;
  value?: string | number;
}) => {
  if (!value) return null;
  return (
    <span className='ArcAutocompleteInput-clear' onClick={onClick}>
      <MatIcon.Close weight='lighter' />
    </span>
  );
};
