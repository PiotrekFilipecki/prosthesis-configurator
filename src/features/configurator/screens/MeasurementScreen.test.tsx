import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import store from '../../../store';
import MeasurementScreen from './MeasurementScreen';

describe('MeasurementScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <MeasurementScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelector('.measurment')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders form wrappers for measurements and order info', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider>
            <MeasurementScreen />
          </ThemeProvider>
        </Provider>,
        div
      );
    });
    expect(div.querySelectorAll('.form-wrapper')).toHaveLength(2);
    expect(div.querySelector('.measurment-image')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });
});
