import { Panel, Toggle } from '@adam-sv/arc';
import { useState, type JSX } from 'react';
import { Loader } from 'src/lib/components/Loader';

export default function LoaderStory(): JSX.Element {
  const [error, setError] = useState(false);
  return (
    <Panel>
      <Toggle
        value={error}
        onChange={setError}
        label='Error'
        labelPosition='vertical'
      />
      <Loader
        error={error}
        userMessage={error ? 'Something went wrong' : undefined}
      />
    </Panel>
  );
}
