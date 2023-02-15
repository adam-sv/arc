import { Panel, Toggle } from '@adam-sv/arc';

export default (
  <Panel>
    <Toggle
      label={'Vertical'}
      labelPosition={'vertical'}
      onChange={(value) => console.info({ value })}
    />
  </Panel>
);
