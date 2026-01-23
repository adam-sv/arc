import React, { useState } from 'react';
import {
  fireEvent,
  getAllByTestId,
  queryAllByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form } from './Form';

interface IFormTest {
  testVar: { testVar: string };
}
const FormTests = ({ testVar }: IFormTest) => {
  return (
    <Form
      layout={[
        {
          type: 'text',
          id: 'text',
          componentProps: { placeholder: 'textPlaceholder' },
        },
      ]}
      onSubmit={(values, hooks) => {
        if (values.get('text')) {
          testVar.testVar = values.get('text');
        }
      }}
    />
  );
};

describe('Form Tests', () => {
  const testVar = { testVar: '' };
  it('waits for form updates before allowing submit', async () => {
    const user = userEvent.setup();

    render(<FormTests testVar={testVar} />);
    const submit = screen.getByText('Submit');
    expect(submit).toBeDisabled();
    const textInput = screen.getByPlaceholderText('textPlaceholder');
    await user.type(textInput, 'aaaaaa');
    waitFor(() => {
      expect(submit).not.toBeDisabled();
    });
  });

  it('Returns the values of its layout items on submit', async () => {
    const user = userEvent.setup();
    render(<FormTests testVar={testVar} />);
    const submit = screen.getByText('Submit');
    expect(submit).toBeDisabled();
    const textInput = screen.getByPlaceholderText('textPlaceholder');
    await user.type(textInput, 'aaaaaa');
    await user.click(submit);
    await waitFor(() => {
      expect(testVar.testVar).toEqual('aaaaaa');
    });
  });
});
