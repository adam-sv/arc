import {
  THEMES,
  Background,
  ThemeUtils,
  LeftNavigation,
  MatIcon,
} from '@adam-sv/arc';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import Examples, { getRoutes } from './routes/examples';
import { ThemeRoute } from './routes/theme';
import { AppRootElementId } from '.';

const navItems = [
  {
    icon: <MatIcon.Grid />,
    label: 'Examples',
    url: '/examples',
  },
  {
    icon: <MatIcon.Edit />,
    label: 'Theme',
    url: '/theme',
  },
];

const Component = (): React.JSX.Element => {
  const [themeHexes, setThemeHexes] = useState<ThemeUtils.IThemeInputHexes>(
    THEMES.DEFAULT
  );

  const routes = getRoutes();

  return (
    <Background
      className='App ARC-theme-default'
      themeInputHexes={themeHexes}
      id={AppRootElementId}
    >
      <LeftNavigation items={navItems} />
      <div className='route-container'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/examples' />} />
          <Route path='examples' element={<Examples />}>
            {routes}
          </Route>
          <Route
            path='theme'
            element={
              <ThemeRoute
                inputHexes={themeHexes}
                didGenerateThemeHexes={setThemeHexes}
              />
            }
          />
        </Routes>
      </div>
    </Background>
  );
};

export default Component;
