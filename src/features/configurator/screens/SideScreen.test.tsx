import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import store from '../../../store';
import SideScreen from './SideScreen';

describe('SideScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <SideScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.side-wrapper')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders left and right side options', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <SideScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.side-box')).toBeTruthy();
    expect(div.querySelectorAll('.side-box')).toHaveLength(2);
    expect(div.textContent).toMatch(/Right|Prawa/);
    expect(div.textContent).toMatch(/Left|Lewa/);
    ReactDOM.unmountComponentAtNode(div);
  });
});
