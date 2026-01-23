import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { Nav } from '.';

const NavTest = () => {
  const [selectedId, setSelectedId] = useState('a');
  return (
    <Nav
      items={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
      ]}
      onChange={(item) => {
        setSelectedId(item.id);
      }}
      selectedId={selectedId}
    />
  );
};

describe('Nav tests', () => {
  it('Has the selected class on the nav item that is selected', () => {
    render(<NavTest />);

    const navItems = document.getElementsByClassName('ArcNav-Item');
    const itemA = navItems[0];
    const itemB = navItems[1];

    expect(itemA).toHaveClass('ArcNav-Item-selected');
    expect(itemB).not.toHaveClass('ArcNav-Item-selected');
  });

  it('calls the on change when a nav item is clicked', async () => {
    const user = userEvent.setup();

    render(<NavTest />);

    const navItems = document.getElementsByClassName('ArcNav-Item');
    const itemA = navItems[0];
    const itemB = navItems[1];

    await user.click(itemB);

    await waitFor(() => {
      expect(itemB).toHaveClass('ArcNav-Item-selected');
      expect(itemA).not.toHaveClass('ArcNav-Item-selected');
    });
  });
});
