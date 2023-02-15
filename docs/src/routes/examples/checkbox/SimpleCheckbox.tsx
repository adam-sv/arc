import React from 'react';
import { CheckboxGroup, Panel, Title } from '@adam-sv/arc';

export const SimpleCheckboxExamples = (): JSX.Element => {
  return (
    <Panel>
      <Title titleType={4}>MultiSelect CheckboxGroup</Title>
      <CheckboxGroup
        onChange={(e, items) => {
          console.info({ e, items });
        }}
        items={[
          { value: false, label: 'Checkbox 1', key: 'test1' },
          { value: false, label: 'Checkbox 2', key: 'test2' },
        ]}
      />
      <Title titleType={4}>Exclusive Select CheckboxGroup</Title>
      <CheckboxGroup
        onChange={(e, items, clickedItem) => {
          console.info({ e, items, clickedItem });
        }}
        items={[
          { value: false, label: 'Checkbox 1', key: 'test1' },
          { value: false, label: 'Checkbox 2', key: 'test2' },
        ]}
        isExclusive
      />
      <Title titleType={4}>Button-styled Checkboxes</Title>
      <CheckboxGroup
        onChange={(e, items) => {
          console.info({ e, items });
        }}
        checkboxType='button'
        items={[
          { value: false, label: 'Checkbox 1', key: 'test1' },
          { value: false, label: 'Checkbox 2', key: 'test2' },
        ]}
      />
    </Panel>
  );
};
