import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmModal } from '.';

const ConfirmModalTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [cancleClicked, setCancleClicked] = useState(false);

  return (
    <div>
      <div
        data-testid={'confirmModalContainer'}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      ></div>
      <ConfirmModal
        text={'confirm modal'}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          setConfirmClicked(true);
        }}
        onCancel={() => {
          setCancleClicked(true);
        }}
      />
      {confirmClicked && 'confirmed'}
      {cancleClicked && 'cancled'}
    </div>
  );
};

describe('ConfirmModal Test', () => {
  it('opens when its isOpen prop is true', async () => {
    const user = userEvent.setup();
    render(<ConfirmModalTest />);
    const container = screen.getByTestId('confirmModalContainer');
    const modal = document.getElementsByClassName('ArcModal')[0];
    await user.click(container);
    await waitFor(() => {
      expect(modal).toHaveClass('ArcModal-open');
    });
  });

  it('calls its on confirm call back when clicked and then closes', async () => {
    const user = userEvent.setup();
    render(<ConfirmModalTest />);
    expect(screen.queryByText('confirmed')).toBeNull();
    const container = screen.getByTestId('confirmModalContainer');
    const modal = document.getElementsByClassName('ArcModal')[0];
    await user.click(container);
    await waitFor(() => {
      expect(modal).toHaveClass('ArcModal-open');
    });
    const confirmButton = screen.getByText('Yes');
    await user.click(confirmButton);
    await waitFor(() => {
      expect(screen.getByText('confirmed')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(modal).not.toHaveClass('ArcModal-open');
    });
  });

  it('calls its on cancle call back when clicked and then closes', async () => {
    const user = userEvent.setup();
    render(<ConfirmModalTest />);
    const container = screen.getByTestId('confirmModalContainer');
    const modal = document.getElementsByClassName('ArcModal')[0];
    await user.click(container);
    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
    const cancleButton = screen.getByText('No');
    await user.click(cancleButton);
    await waitFor(() => {
      expect(screen.getByText('cancled')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(modal).not.toHaveClass('ArcModal-open');
    });
  });
});
