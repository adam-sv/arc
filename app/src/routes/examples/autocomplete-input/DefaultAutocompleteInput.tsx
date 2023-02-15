import { useState } from 'react';
import { AutocompleteInput, Panel } from '@adam-sv/arc';
import animals from './animals';

const autocompleteSearch = (searchTerm: string) =>
  animals.filter((animal: string) =>
    animal.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

export default function DefaultAutocompleteInput(): JSX.Element {
  const [value, setValue] = useState<string | number>('');

  // Beware: AutocompleteInput needs to render in a reasonable-height parent
  return (
    <Panel style={{ minHeight: '250px' }}>
      <AutocompleteInput
        onChange={(val: string | number) => setValue(val)}
        autocompleteSearch={autocompleteSearch}
        label='Animals'
        placeholder='Search for an animal...'
        componentSize='default' // same as not passing
        info='Sample info for user'
        error='Required'
      />
      <div
        style={{ flex: '1 1 auto', display: 'grid', placeContent: 'center' }}
      >
        <i>Current value:</i>
        <b>{value}</b>
      </div>
    </Panel>
  );
}
