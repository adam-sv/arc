import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { MultitextInput } from '.';

describe('Multitext Input', () => {
  it('adds text when user presses delineator (defaults to space)', async () => {
    const user = userEvent.setup();
    render(<MultitextInput />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'a ');
    await waitFor(() => {
      expect(screen.getByTestId('multitext-input-a')).toBeInTheDocument();
    });
  });

  it('removes text when user clicks the delete icon', async () => {
    const user = userEvent.setup();
    render(<MultitextInput />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'a ');
    await waitFor(() => {
      expect(screen.getByTestId('multitext-input-a')).toBeInTheDocument();
    });
    const deleteBtn = screen.getByTestId('multitext-input-a-delete');
    await user.click(deleteBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('multitext-input-a')).toBeNull();
    });
  });

  it('does not allow input when readOnly or disabled is passed in', async () => {
    const user = userEvent.setup();

    render(<MultitextInput readOnly />);
    const inputReadOnly = screen.getByRole('textbox');
    expect(inputReadOnly).toHaveAttribute('readOnly');
    await user.type(inputReadOnly, 'test ');
    expect(screen.queryByTestId('multitext-input-test')).toBeNull();
  });
});
