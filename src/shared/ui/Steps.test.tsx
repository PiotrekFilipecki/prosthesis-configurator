import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { StepItem, StepsWrapper, StepsTitle } from './Steps';

describe('Steps components', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('StepItem', () => {
    it('renders label', () => {
      act(() => {
        ReactDOM.render(<StepItem label="Side" active={false} />, container);
      });
      expect(container.textContent).toContain('Side');
    });

    it('has step-active class when active', () => {
      act(() => {
        ReactDOM.render(<StepItem label="Side" active={true} />, container);
      });
      expect(container.querySelector('.step-active')).toBeTruthy();
    });
  });

  describe('StepsWrapper', () => {
    it('renders children', () => {
      act(() => {
        ReactDOM.render(
          <StepsWrapper>
            <span data-testid="child">Child</span>
          </StepsWrapper>,
          container
        );
      });
      expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Child');
      expect(container.querySelector('.steps-wrapper')).toBeTruthy();
    });
  });

  describe('StepsTitle', () => {
    it('renders title', () => {
      act(() => {
        ReactDOM.render(<StepsTitle title="Configure your prosthesis" />, container);
      });
      expect(container.textContent).toContain('Configure your prosthesis');
    });
  });
});
