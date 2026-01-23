// dependencies
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router';
// import reportWebVitals from './reportWebVitals';
// internals
import App from './app';
// style sheets
import '../lib/styles';
import './index.scss';
import './routes/examples/style.scss';

export const AppRootElementId = '@adam-sv/arc--docs-app';
export const getAppRootElement = (): Element | null =>
  document.getElementById(AppRootElementId);

const rootNode = document.getElementById('root');
if (rootNode) {
  const root = ReactDOM.createRoot(rootNode);
  root.render(
    <StrictMode>
      {import.meta.env.VITE_USE_HASH_ROUTER ? (
        <HashRouter>
          <App />
        </HashRouter>
      ) : (
        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL || ''}>
          <App />
        </BrowserRouter>
      )}
    </StrictMode>
  );
}
