import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import App from './App';
import store from './store';
import './scss/main.css';

const rootElement = document.getElementById('creatorApp');

if (!rootElement) {
  throw new Error('Root element "creatorApp" was not found.');
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  rootElement
);
