import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    document.documentElement.setAttribute('data-theme', 'light');
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('renders within ThemeProvider', () => {
    act(() => {
      ReactDOM.render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>,
        container
      );
    });
    const btn = container.querySelector('button');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('aria-label')).toMatch(/dark mode/i);
  });

  it('toggles theme on click', () => {
    act(() => {
      ReactDOM.render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>,
        container
      );
    });
    const btn = container.querySelector('button');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    act(() => {
      btn?.click();
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
