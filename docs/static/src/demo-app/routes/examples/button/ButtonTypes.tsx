import { Button, ButtonType, Panel } from '@adam-sv/arc';
import './style.scss';
import type { JSX } from 'react';

const ButtonTypes = (): JSX.Element => {
  const types: ButtonType[] = [
    'default',
    'success',
    'secondary',
    'tertiary',
    'warning',
    'danger',
    'error',
  ];
  return (
    <Panel className={'ButtonExamplesContainer'}>
      {types.map((type) => {
        return (
          <Button
            key={type}
            type={type}
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
