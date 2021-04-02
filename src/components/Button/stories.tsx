// dependencies
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

// internals
import { ButtonTypes } from '@adam-sv/arc';
import { Button } from '.';

[
  'default',
  'success',
  'secondary',
  'tertiary',
  'warning',
  'danger',
  'error',
].forEach(styleType => {
  storiesOf('Form/Button/Types', module).add(`type "${styleType}"`, () => {
    return (
      <Button
        onClick={action(`${styleType}-button-click`)}
        type={styleType as ButtonTypes.ButtonType}
        text={`${styleType.charAt(0).toUpperCase()}${styleType.slice(
          1
        )} Button`}
      />
    );
  });
});

storiesOf('Form/Button/Sizes', module).add('Default', () => (
  <Button onClick={action('onClick')} text="Default Size" />
));
storiesOf('Form/Button/Sizes', module).add('Compact', () => (
  <Button
    onClick={action('onClick')}
    text="Compact Size"
    componentSize="compact"
  />
));
storiesOf('Form/Button/Sizes', module).add('Large', () => (
  <Button onClick={action('onClick')} text="Large Size" componentSize="large" />
));

storiesOf('Form/Button/Children', module).add('Custom children', () => (
  <Button onClick={action(`custom-button-click`)} type="default">
    <div
      className="my-custom-button-content"
      style={{ background: 'purple', padding: '5px 10px', borderRadius: 4 }}
    >
      Hello World!
    </div>
  </Button>
));
