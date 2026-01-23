import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

const ButtonTest = ({ disabled }: { disabled?: boolean }) => {
  const [buttonWasClicked, setButtonWasClicked] = useState(false);

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={() => {
          setButtonWasClicked(true);
        }}
      />
      {buttonWasClicked && <div data-testid={'ButtonState'}>Clicked!</div>}
    </div>
  );
};

describe('Button tests', () => {
  it('calls on click invoke call back when clicked', async () => {
    const user = userEvent.setup();
    render(<ButtonTest />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByTestId('ButtonState')).toBeInTheDocument();
    });
  });

  it('does not invoke call back when clicked and button is disabled', async () => {
    const user = userEvent.setup();
    render(<ButtonTest disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    await waitFor(
      () => {
        expect(screen.queryByTestId('ButtonState')).toBeNull();
      },
      { timeout: 200 }
    );
  });
});
