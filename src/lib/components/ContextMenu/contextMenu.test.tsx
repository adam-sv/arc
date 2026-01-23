import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ContextMenu } from '.';

const ContextMenuTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        data-testid={'contextmenu'}
        onContextMenu={() => {
          setIsOpen(true);
        }}
      ></div>
      <ContextMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        items={[{ label: 'hello' }, { label: 'hiiii' }]}
        position={{ x: 0, y: 0 }}
      />
    </div>
  );
};

describe('Context Menu Test', () => {
  it('opens when you right click', async () => {
    render(<ContextMenuTest />);
    const opener = screen.getByTestId('contextmenu');
    fireEvent.contextMenu(opener);
    const modal = document.getElementsByClassName('ArcModal')[0];
    await waitFor(() => {
      expect(modal).toHaveClass('ArcModal-open');
    });
  });
});
