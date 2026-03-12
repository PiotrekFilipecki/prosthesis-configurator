import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

interface BaseButtonProps {
  onClick: () => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<PropsWithChildren<BaseButtonProps>> = ({
  children,
  className = '',
  disabled = false,
  label,
  onClick
}) => (
  <button
    className={`button ${disabled ? 'disabled' : ''} ${className}`.trim()}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
    {label}
  </button>
);

export const BackSummaryButton: React.FC<BaseButtonProps> = ({ label, onClick }) => (
  <button className="button summary-back" type="button" onClick={onClick}>
    {label}
  </button>
);

export const ButtonsWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="buttons-wrapper">{children}</div>
);
