import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

it('renders without crashing', async () => {
  const div = document.createElement('div');

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });

  ReactDOM.unmountComponentAtNode(div);
});
