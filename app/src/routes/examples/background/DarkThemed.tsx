import React from 'react';
import { THEMES } from '@adam-sv/arc';
import { Background } from '@adam-sv/arc';
import './styles.scss';

export default (
  <Background
    className={'BackgroundContainer'}
    themeProps={THEMES.DARK}
    style={{ height: '100%', minHeight: 200, width: '100%' }}
  />
);
