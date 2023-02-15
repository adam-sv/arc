import { Route, Switch, Redirect } from 'react-router-dom';
import Examples from './routes/examples';
import Theme from './routes/theme';
import { Background, ThemeUtils, LeftNavigation, MonoIcon } from './lib';
import { useState } from 'react';
import { THEMES } from '@adam-sv/arc';

const navItems = [
  {
    Icon: MonoIcon.Grid,
    label: 'Examples',
    url: '/examples',
  },
  {
    Icon: MonoIcon.Edit,
    label: 'Theme',
    url: '/theme',
  },
];

export const AppRootElementId = '@adam-sv/arc--docs-app';
export const getAppRootElement = (): Element | null =>
  document.getElementById(AppRootElementId);

const Component = (): JSX.Element => {
  const [themeProps, setThemeProps] = useState<ThemeUtils.IThemeProps>(
    THEMES.DEFAULT
  );

  return (
    <Background
      className='App ARC-theme-default'
      themeProps={themeProps}
      id={AppRootElementId}
    >
      <LeftNavigation items={navItems} />
      <div className='route-container'>
        <Switch>
          <Redirect exact from='/' to='/examples' />
          <Route path='/examples'>
            <Examples />
          </Route>
          <Route path='/theme'>
            <Theme themeProps={themeProps} setThemeProps={setThemeProps} />
          </Route>
        </Switch>
      </div>
    </Background>
  );
};

export default Component;
