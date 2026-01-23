import { THEMES } from '@adam-sv/arc';
import { Background } from '@adam-sv/arc';
import './styles.scss';

export default (
  <Background
    className={'BackgroundContainer'}
    themeInputHexes={THEMES.DEFAULT}
    style={{ height: '100%', minHeight: 200, width: '100%' }}
  />
);
