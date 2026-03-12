import type { PropsWithChildren } from 'react';
import React from 'react';
import type {
  MeasurementFieldId,
  OrderInfoFieldId
} from '../types/details';

const getInputValue = (value: string | undefined | null): string => value ?? '';

interface SharedFieldProps<TId extends string> {
  id: TId;
  label: string;
  type: string;
  value: string;
  valid: boolean;
  touched: boolean;
  onChange: (id: TId, value: string) => void;
}

interface FormFieldProps extends SharedFieldProps<MeasurementFieldId> {
  units?: boolean;
}

interface FormFieldOrderProps extends SharedFieldProps<OrderInfoFieldId> {}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  onChange,
  touched,
  type,
  units = false,
  valid,
  value
}) => (
  <div className="custom-form__wrapper">
    <label htmlFor={id} className="custom-form__label">
      {label}
    </label>
    <input
      type={type}
      className="custom-form__input"
      id={id}
      value={getInputValue(value)}
      onChange={(event) => onChange(id, event.target.value)}
    />
    {units && <span>&nbsp;cm</span>}
    {touched && !valid && (
      <p className="error">This field is required. Please provide data in cm.</p>
    )}
  </div>
);

export const FormFieldOrder: React.FC<FormFieldOrderProps> = ({
  id,
  label,
  onChange,
  touched,
  type,
  valid,
  value
}) => (
  <div className="custom-form__wrapper">
    <label htmlFor={id} className="custom-form__label">
      {label}
    </label>
    <input
      type={type}
      className="custom-form__input"
      id={id}
      value={getInputValue(value)}
      onChange={(event) => onChange(id, event.target.value)}
    />
    {touched && !valid && <p className="error">This field is required.</p>}
  </div>
);

export const FormWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="form-wrapper">
    <form className="custom-form" noValidate>
      {children}
    </form>
  </div>
);
