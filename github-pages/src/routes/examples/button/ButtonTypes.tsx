import React from 'react';
import { Button, ButtonType, Panel } from '@adam-sv/arc';
import './style.scss';

const ButtonTypes = (): JSX.Element => {
  return (
    <Panel className={'ButtonExamplesContainer'}>
      {[
        'default',
        'success',
        'secondary',
        'tertiary',
        'warning',
        'danger',
        'error',
      ].map((type) => {
        return (
          <Button
            key={type}
            type={type as ButtonType}
            onClick={() => {
              console.info(`Type ${type} Button Clicked!`);
            }}
          >{`${type.charAt(0).toUpperCase()}${type.slice(1)} Button`}</Button>
        );
      })}
    </Panel>
  );
};

export default ButtonTypes;
