import React, { useState } from 'react';
import { Panel, TextInput } from '@adam-sv/arc';

const handleTextInputChange = (
  value: string | number,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.info({ e, value });
};

export default function TextInputExamples(): JSX.Element {
  const [value, setValue] = useState('Initial Value Provided');

  return (
    <Panel style={{ maxWidth: 600 }}>
      <TextInput
        info='Users may want more details than you can fit in the label'
        label='My Text Input'
        onChange={(val) => setValue(`${val}`)}
        placeholder='User types here...'
        type='text'
        value={value}
      />
      <TextInput
        info='Users may want more details than you can fit in the label'
        label='My Text Input'
        onChange={handleTextInputChange}
        placeholder='User types here...'
        type='text'
      />
      <TextInput
        info='Use the small triangle at the bottom right to grow or shrink the text area'
        label='Text Area'
        onChange={handleTextInputChange}
        placeholder='Giant text accepted...'
        type='textarea'
      />
      <TextInput
        label={'Password'}
        onChange={handleTextInputChange}
        type={'password'}
      />
      <TextInput
        label={'integer'}
        onChange={handleTextInputChange}
        type={'integer'}
      />
      <TextInput
        label={'float'}
        onChange={handleTextInputChange}
        type={'float'}
      />
      <TextInput
        buttonProps={{
          children: 'A Button',
          type: 'default',
          onClick: () => {
            console.info('Button was Clicked');
          },
        }}
        label={'With Button Props'}
        onChange={handleTextInputChange}
      />
    </Panel>
  );
}
