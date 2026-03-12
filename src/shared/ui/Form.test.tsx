import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { FormField, FormFieldOrder, FormWrapper } from './Form';

describe('Form components', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('FormField', () => {
    it('renders label and input', () => {
      act(() => {
        ReactDOM.render(
          <FormField
            id="mes_1"
            label="Wrist circumference"
            type="text"
            value=""
            valid={true}
            touched={false}
            onChange={() => {}}
          />,
          container
        );
      });
      expect(container.querySelector('label[for="mes_1"]')?.textContent).toBe('Wrist circumference');
      expect(container.querySelector('#mes_1')).toBeTruthy();
    });

    it('shows error when touched and invalid', () => {
      act(() => {
        ReactDOM.render(
          <FormField
            id="mes_1"
            label="Test"
            type="text"
            value="invalid"
            valid={false}
            touched={true}
            onChange={() => {}}
          />,
          container
        );
      });
      expect(container.textContent).toMatch(/0-200 cm|0 do 200 cm/);
    });

    it('shows units when units prop is true', () => {
      act(() => {
        ReactDOM.render(
          <FormField
            id="mes_1"
            label="Test"
            type="text"
            value=""
            valid={true}
            touched={false}
            units
            onChange={() => {}}
          />,
          container
        );
      });
      expect(container.textContent).toContain('cm');
    });
  });

  describe('FormFieldOrder', () => {
    it('renders label and input', () => {
      act(() => {
        ReactDOM.render(
          <FormFieldOrder
            id="mes_7"
            label="Patient Name"
            type="text"
            value=""
            valid={true}
            touched={false}
            onChange={() => {}}
          />,
          container
        );
      });
      expect(container.querySelector('label[for="mes_7"]')?.textContent).toBe('Patient Name');
    });

    it('shows error when touched and invalid', () => {
      act(() => {
        ReactDOM.render(
          <FormFieldOrder
            id="mes_7"
            label="Test"
            type="text"
            value=""
            valid={false}
            touched={true}
            onChange={() => {}}
          />,
          container
        );
      });
      expect(container.textContent).toMatch(/required|wymagane/i);
    });
  });

  describe('FormWrapper', () => {
    it('renders children inside form', () => {
      act(() => {
        ReactDOM.render(
          <FormWrapper>
            <span data-testid="child">Child</span>
          </FormWrapper>,
          container
        );
      });
      expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Child');
      expect(container.querySelector('form')).toBeTruthy();
    });
  });
});
