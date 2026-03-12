import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('renders and shows current language code', () => {
    act(() => {
      ReactDOM.render(<LanguageSwitcher />, container);
    });
    const btn = container.querySelector('button');
    expect(btn).toBeTruthy();
    expect(btn?.textContent).toMatch(/EN|PL/);
  });

  it('toggles language on click', () => {
    act(() => {
      ReactDOM.render(<LanguageSwitcher />, container);
    });
    const btn = container.querySelector('button');
    const initialLang = btn?.textContent;
    act(() => {
      (btn as HTMLButtonElement).click();
    });
    expect(container.querySelector('button')?.textContent).not.toBe(initialLang);
  });
});
