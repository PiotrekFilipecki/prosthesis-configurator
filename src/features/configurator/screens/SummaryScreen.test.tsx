import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import store from '../../../store';
import SummaryScreen from './SummaryScreen';

describe('SummaryScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <SummaryScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.summary')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders summary sections and download button', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <SummaryScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.summary-image')).toBeTruthy();
    expect(div.querySelector('.summary-order-info')).toBeTruthy();
    expect(div.querySelector('.summary-measurements')).toBeTruthy();
    expect(div.textContent).toMatch(/Download PDF|Pobierz PDF/);
    expect(div.textContent).toMatch(/Model/);
    ReactDOM.unmountComponentAtNode(div);
  });
});
