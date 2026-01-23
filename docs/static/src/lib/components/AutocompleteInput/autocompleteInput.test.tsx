import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutocompleteInput } from '.';

const autoCompleteInputs = ['a', 'aa', 'aaa', 'b', 'c', 'd', 'de'];

describe('Autocomplete Input', () => {
  it('displays text input', () => {
    render(
      <AutocompleteInput
        autocompleteSearch={(value) => {
          return autoCompleteInputs.filter((i) => i.includes(value));
        }}
        onChange={() => {}}
      />
    );
    const summary = screen.getByTestId('ArcAutocompleteInput-summary');
    expect(summary.children[0]).toHaveClass('ArcTextInput');
  });

  it('displays the results of the autoCompleteSearch prop', async () => {
    const user = userEvent.setup();
    render(
      <AutocompleteInput
        autocompleteSearch={(value) => {
          return autoCompleteInputs.filter((i) => i.includes(value));
        }}
        onChange={() => {}}
      />
    );
    const input = screen.getByRole('textbox');

    await user.type(input, 'a');

    //this allows suffucent time to update the state so that the entries will be present
    //explanation: https://dev.to/il3ven/fix-warning-in-react-update-was-not-wrapped-in-act-bk6
    await waitFor(() => {
      expect(screen.getByTestId('autocomplete-entries')).toBeInTheDocument();
    });

    for (let i = 0; i < 3; i++) {
      expect(screen.getByTestId(`autocomplete-entry-${i}`)).toBeInTheDocument();
    }
  });

  it('doesn`t display anything if there are no matching results', async () => {
    const user = userEvent.setup();
    render(
      <AutocompleteInput
        autocompleteSearch={(value) => {
          return autoCompleteInputs.filter((i) => i.includes(value));
        }}
        onChange={() => {}}
      />
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'z');
    //since there needs time for the state to potentially update
    await waitFor(
      () => {
        expect(screen.queryByTestId('autocomplete-entries')).toBeNull();
      },
      { timeout: 500 }
    );
  });
});
