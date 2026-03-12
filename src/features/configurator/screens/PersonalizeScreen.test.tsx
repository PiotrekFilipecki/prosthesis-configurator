import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import store from '../../../store';
import PersonalizeScreen from './PersonalizeScreen';

describe('PersonalizeScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <PersonalizeScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.personalize')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders colors and finishing elements', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <PersonalizeScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.colors-wrapper')).toBeTruthy();
    expect(div.querySelector('.finishing-wrapper')).toBeTruthy();
    expect(div.querySelector('.render-wrapper')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });
});
