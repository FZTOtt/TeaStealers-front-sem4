import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/styles.scss'
import { Provider } from 'react-redux';
import store from '@redux/store';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

