import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { Modal } from '.';
const ModalTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='ModalTest'>
      <div
        data-testid={'ArcModalTest-button'}
        onClick={() => {
          setIsOpen(true);
        }}
      ></div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

describe('Modal Test', () => {
  it('has the modal closed by default', () => {
    render(<ModalTest />);
    const modal = document.getElementsByClassName('ArcModal')[0];
    expect(modal).not.toHaveClass('ArcModal-open');
  });

  it('opens when its isOpen prop is true and closes when its button is clicked', async () => {
    const user = userEvent.setup();
    render(<ModalTest />);

    const modal = document.getElementsByClassName('ArcModal')[0];
    //open modal
    const button = screen.getByTestId('ArcModalTest-button');

    await user.click(button);

    await waitFor(() => {
      expect(modal).toHaveClass('ArcModal-open');
    });
    //close modal
    const background = document.getElementsByClassName(
      'ArcModal-background-click-target'
    )[0];
    await user.click(background);
    await waitFor(() => {
      expect(modal).not.toHaveClass('ArcModal-open');
    });
  });
});
