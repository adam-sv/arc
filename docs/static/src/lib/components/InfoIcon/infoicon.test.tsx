import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InfoIcon } from '.';

describe('infoicon tests', () => {
  it('displays tool tip when hovered over', async () => {
    const alwaysOnClass = 'ArcPanel';
    const hiddenClass = 'fade';

    const user = userEvent.setup();
    const someUniqueText = 'MyTooltip';
    // First, the Info text should be invisible
    // HOWEVER, this is hard to test without CSS!
    // Instead, for now, we check if the classses 'ArcPanel' and 'fade' are present, since that is what makes the opacity 0
    render(<InfoIcon text={someUniqueText} />);
    expect(screen.getByText(someUniqueText)).toHaveClass(
      alwaysOnClass,
      hiddenClass
    );

    const infoicon = screen.getByTestId('ArcInfoIcon');
    await user.hover(infoicon);
    await waitFor(() => {
      const toolTipRef = screen.getByText(someUniqueText);
      expect(toolTipRef).toHaveClass(alwaysOnClass);
      expect(toolTipRef).not.toHaveClass(hiddenClass);
    });
  });
});
