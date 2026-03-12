import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { Button, BackSummaryButton, ButtonsWrapper } from './Buttons';

describe('Buttons components', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Button', () => {
    it('renders with label and calls onClick', () => {
      const handleClick = jest.fn();
      act(() => {
        ReactDOM.render(<Button onClick={handleClick} label="Continue" />, container);
      });
      const btn = container.querySelector('button');
      expect(btn?.textContent).toContain('Continue');
      act(() => {
        btn?.click();
      });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders children when provided', () => {
      act(() => {
        ReactDOM.render(
          <Button onClick={() => {}} label="Download">
            <span data-testid="icon">icon</span>
          </Button>,
          container
        );
      });
      expect(container.querySelector('[data-testid="icon"]')?.textContent).toBe('icon');
    });

    it('is disabled when disabled prop is true', () => {
      act(() => {
        ReactDOM.render(<Button onClick={() => {}} label="Continue" disabled />, container);
      });
      expect((container.querySelector('button') as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe('BackSummaryButton', () => {
    it('renders with label and calls onClick', () => {
      const handleClick = jest.fn();
      act(() => {
        ReactDOM.render(<BackSummaryButton onClick={handleClick} label="< Back" />, container);
      });
      const btn = container.querySelector('button');
      expect(btn?.textContent).toContain('< Back');
      act(() => {
        btn?.click();
      });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('ButtonsWrapper', () => {
    it('renders children', () => {
      act(() => {
        ReactDOM.render(
          <ButtonsWrapper>
            <button type="button">Child</button>
          </ButtonsWrapper>,
          container
        );
      });
      expect(container.querySelector('button')?.textContent).toBe('Child');
    });
  });
});
