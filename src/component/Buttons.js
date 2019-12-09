import React from 'react';
export const Button = props => {
  return (
    <button
      className={`button ${props.disabled ? 'disabled' : ''} ${props.className}`}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    >
      {props.children}
      {props.label}
    </button>
  );
};

export const BackSummaryButton = props => {
  return (
    <button className="button summary-back" onClick={() => props.onClick()}>
      {props.label}
    </button>
  );
};

export const ButtonsWrapper = props => {
  return <div className="buttons-wrapper">{props.children}</div>;
};
