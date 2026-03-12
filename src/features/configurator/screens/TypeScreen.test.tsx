import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import store from '../../../store';
import TypeScreen from './TypeScreen';

describe('TypeScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <TypeScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.type-wrapper')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders type options', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <TypeScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelectorAll('.type-box')).toHaveLength(4);
    expect(div.textContent).toMatch(/Above Elbow|Powyżej łokcia/);
    expect(div.textContent).toMatch(/Below Elbow|Poniżej łokcia/);
    expect(div.textContent).toMatch(/Glaze Smart/);
    expect(div.textContent).toMatch(/Glaze Sport/);
    ReactDOM.unmountComponentAtNode(div);
  });
});
