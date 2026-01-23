import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AlertModal } from '.';

const AlertModalEx = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='AlertModalEx'>
      <div
        data-testid={'ArcModalEx-button'}
        onClick={() => {
          setIsOpen(true);
        }}
      ></div>
      <AlertModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={'Alert Modal Opended'}
      />
    </div>
  );
};

describe('Alert Modal', () => {
  it('has the modal closed by default', () => {
    render(<AlertModalEx />);
    const modal = document.getElementsByClassName('ArcModal')[0];
    expect(modal).not.toHaveClass('ArcModal-open');
  });

  it('opens when its isOpen prop is true and closes when its button is clicked', async () => {
    const user = userEvent.setup();
    render(<AlertModalEx />);
    //open modal
    const button = screen.getByTestId('ArcModalEx-button');
    const modal = document.getElementsByClassName('ArcModal')[0];

    await user.click(button);

    await waitFor(() => {
      expect(modal).toHaveClass('ArcModal-open');
    });
    //close modal
    const alertButton = screen.getByTestId('ArcAlertModal-button');
    await user.click(alertButton.children[0]);

    await waitFor(() => {
      expect(modal).not.toHaveClass('ArcModal-open');
    });
  });
});
