import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { FinishingBox, FinishingWrapper } from './Finishing';

describe('Finishing components', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('FinishingBox', () => {
    it('renders finishing value and calls onClick', () => {
      const handleClick = jest.fn();
      act(() => {
        ReactDOM.render(
          <FinishingBox finishing="glossy" active={false} onClick={handleClick} />,
          container
        );
      });
      const box = container.querySelector('.finishing-box');
      expect(box?.textContent).toContain('glossy');
      act(() => {
        (box as HTMLElement).click();
      });
      expect(handleClick).toHaveBeenCalledWith('glossy');
    });

    it('has active class when active', () => {
      act(() => {
        ReactDOM.render(
          <FinishingBox finishing="matte" active={true} onClick={() => {}} />,
          container
        );
      });
      expect(container.querySelector('.finishing-box.active')).toBeTruthy();
    });
  });

  describe('FinishingWrapper', () => {
    it('renders children', () => {
      act(() => {
        ReactDOM.render(
          <FinishingWrapper>
            <span data-testid="child">Child</span>
          </FinishingWrapper>,
          container
        );
      });
      expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Child');
      expect(container.querySelector('.finishing-wrapper')).toBeTruthy();
    });
  });
});
