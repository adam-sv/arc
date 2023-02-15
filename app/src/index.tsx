// dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
// internals
import App from './app';
// style sheets
import './index.scss';
import './lib/styles';
import './routes/examples/style.scss';

const rootNode = document.getElementById('root');
if (rootNode) {
  const root = ReactDOM.createRoot(rootNode);
  root.render(
    <React.StrictMode>
      {process.env.REACT_APP_USE_HASH_ROUTER ? (
        <HashRouter>
          <App />
        </HashRouter>
      ) : (
        <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
          <App />
        </BrowserRouter>
      )}
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
