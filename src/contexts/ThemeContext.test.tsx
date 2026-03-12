import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { ThemeProvider, useTheme } from './ThemeContext';

function TestConsumer() {
  const { theme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={() => setTheme('dark')}>
        Set Dark
      </button>
      <button type="button" onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button type="button" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    localStorage.clear();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('provides default light theme', () => {
    act(() => {
      ReactDOM.render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
        container
      );
    });
    expect(container.querySelector('[data-testid="theme"]')?.textContent).toBe('light');
  });

  it('setTheme updates theme', () => {
    act(() => {
      ReactDOM.render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
        container
      );
    });
    act(() => {
      (container.querySelector('button') as HTMLButtonElement).click();
    });
    expect(container.querySelector('[data-testid="theme"]')?.textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggleTheme switches between light and dark', () => {
    act(() => {
      ReactDOM.render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
        container
      );
    });
    const toggleBtn = Array.from(container.querySelectorAll('button')).find(
      (b) => b.textContent === 'Toggle'
    );
    act(() => {
      (toggleBtn as HTMLButtonElement).click();
    });
    expect(container.querySelector('[data-testid="theme"]')?.textContent).toBe('dark');
    act(() => {
      (toggleBtn as HTMLButtonElement).click();
    });
    expect(container.querySelector('[data-testid="theme"]')?.textContent).toBe('light');
  });

  it('persists theme to localStorage', () => {
    act(() => {
      ReactDOM.render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
        container
      );
    });
    act(() => {
      (container.querySelector('button') as HTMLButtonElement).click();
    });
    expect(localStorage.getItem('prosthesis-configurator-theme')).toBe('dark');
  });
});
