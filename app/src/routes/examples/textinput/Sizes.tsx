import { Panel, TextInput } from '@adam-sv/arc';

export default function TextInputSizes(): JSX.Element {
  const logChange = (val: string | number) =>
    console.info('TextInput value:', val);

  return (
    <Panel style={{ maxWidth: 600 }}>
      <TextInput
        componentSize='default' // same as not passing
        info='This is a default rendering of an Input.'
        label='Default Size'
        onChange={logChange}
        placeholder='TextInput Hint...'
      />
      <TextInput
        componentSize='compact'
        info='This is a Compact rendering of an Input.'
        label='Compact Size'
        onChange={logChange}
        placeholder='TextInput Hint...'
      />
      <TextInput
        componentSize='large'
        info='This is a Large rendering of an Input.'
        label='Large Size'
        onChange={logChange}
        placeholder='TextInput Hint...'
      />
    </Panel>
  );
}
