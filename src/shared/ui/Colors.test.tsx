import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { ColorBox, ColorsWrapper } from './Colors';

describe('Colors components', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('ColorBox', () => {
    it('renders with background color and calls onClick', () => {
      const handleClick = jest.fn();
      act(() => {
        ReactDOM.render(
          <ColorBox color="black" hex="#1b1b1b" active={false} onClick={handleClick} />,
          container
        );
      });
      const box = container.querySelector('.color-box');
      expect(box).toBeTruthy();
      expect((box as HTMLElement).style.backgroundColor).toMatch(/27|#1b1b1b/i);
      act(() => {
        (box as HTMLElement).click();
      });
      expect(handleClick).toHaveBeenCalledWith('black');
    });

    it('has active class when active', () => {
      act(() => {
        ReactDOM.render(
          <ColorBox color="black" hex="#1b1b1b" active={true} onClick={() => {}} />,
          container
        );
      });
      expect(container.querySelector('.color-box.active')).toBeTruthy();
    });
  });

  describe('ColorsWrapper', () => {
    it('renders children', () => {
      act(() => {
        ReactDOM.render(
          <ColorsWrapper>
            <span data-testid="child">Child</span>
          </ColorsWrapper>,
          container
        );
      });
      expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Child');
      expect(container.querySelector('.colors-wrapper')).toBeTruthy();
    });
  });
});
