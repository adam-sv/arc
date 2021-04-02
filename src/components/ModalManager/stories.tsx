import * as React from 'react';

import { StoryContainer as Story } from 'src/utils/StoryContainer';

import {
  IARCProps,
  IModalStateInterface,
  ModalManager,
  useExtensionManager,
} from '@adam-sv/arc';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import type { CSSProperties } from 'react';

const { createContext, useContext } = React;

// the "register" pattern is for sharing state between components
// usually the application state component and a context
// for app-wide access to state (aka: useSdk)

// Overhead: Setup useSdk -----------------------------------------------------

interface IExtensionInterface {
  modal?: IModalStateInterface;
}

function useAppState() {
  const extensionManager = useExtensionManager<IExtensionInterface>();
  return { ...extensionManager };
}

type ContextType = ReturnType<typeof useAppState> | undefined;
const context = createContext<ContextType>(undefined);

function Provider({ children }: IARCProps) {
  return <context.Provider value={useAppState()}>{children}</context.Provider>;
}

function useSdk() {
  const value = useContext<ContextType>(context);

  if (!value) {
    throw new Error('useSdk called from outside of useSdk.Provider subtree');
  }

  return value;
}

// Demo -----------------------------------------------------------------------

const App = () => {
  const { registerExtension, unregisterExtension } = useSdk();

  return (
    <div>
      <Demo />
      <ModalManager
        onRegister={registerExtension}
        onUnregister={unregisterExtension}
      />
    </div>
  );
};

const Demo = () => {
  const { extension } = useSdk();

  const handleAlertButtonClick = () => {
    extension.modal.alert('Message').then(action('handleConfirmButtonClick'));
  };

  const handleConfirmButtonClick = () => {
    extension.modal
      .confirm('Message')
      .then(action('handleConfirmButtonClick'))
      .catch(action('handleConfirmButtonClick'));
  };

  const handleCustomButtonClick = () => {
    extension.modal
      .showCustom<string, number>(({ resolve, reject }) => (
        <div>
          custom content
          <button onClick={() => resolve('A')}>resolve A</button>
          <button onClick={() => resolve('B')}>resolve B</button>
          <button onClick={() => reject(0)}>reject</button>
        </div>
      ))
      .then(action('handleCustomButtonClick'))
      .catch(action('handleCustomButtonClick'));
  };

  return (
    <div>
      <button onClick={handleAlertButtonClick}>Alert</button>
      <button onClick={handleConfirmButtonClick}>Confirm</button>
      <button onClick={handleCustomButtonClick}>Custom</button>
    </div>
  );
};

const style = { '--theme-surface': '#fff', '--theme-surface-contrast': '#000' };
storiesOf('Extension/ModalManager', module).add('Default', () => (
  <Story style={style as CSSProperties}>
    <Provider>
      <App />
    </Provider>
  </Story>
));
