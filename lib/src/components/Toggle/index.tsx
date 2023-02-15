import React, { useState } from 'react';
import { cn, IARCProps } from '@adam-sv/arc';
import './style.scss';

export interface IToggleProps extends IARCProps {
  label: string;
  labelPosition: 'horizontal' | 'vertical';
  value?: boolean;
  onChange: (value: boolean) => unknown;
}

export const Toggle = ({
  className,
  id,
  label,
  labelPosition,
  value,
  onChange,
  style,
}: IToggleProps): JSX.Element => {
  const [toggled, setToggled] = useState(value || false);

  const handleUserChange = () => {
    setToggled(!toggled);
    onChange(!toggled);
  };

  return (
    <div
      className={cn(
        'ArcToggleContainer',
        className,
        labelPosition === 'horizontal'
          ? 'ArcToggleContainer-Horizontal'
          : 'ArcToggleContainer-Vertical'
      )}
      id={id}
      style={style}
    >
      <div className={cn('ArcToggle-Label')}>{label}</div>
      <div
        className={cn(
          'ArcToggle',
          labelPosition === 'horizontal'
            ? 'ArcToggle-Horizontal'
            : 'ArcToggle-Vertical',
          toggled ? 'ArcToggle-Toggled' : ''
        )}
        onClick={handleUserChange}
        tabIndex={0}
        onKeyUp={(e) => {
          if (e.key === ' ' || e.keyCode === 32) {
            handleUserChange();
          }
        }}
      >
        <div
          className={cn(
            'ArcToggle-Button',
            toggled ? 'ArcToggle-Button-Toggled' : ''
          )}
        ></div>
      </div>
    </div>
  );
};
