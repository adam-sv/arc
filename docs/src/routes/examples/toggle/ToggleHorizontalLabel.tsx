import { Panel, Toggle } from '@adam-sv/arc';

export default (
  <Panel>
    <Toggle
      label={'Horizontal'}
      labelPosition={'horizontal'}
      onChange={(value) => console.info({ value })}
    />
  </Panel>
);
