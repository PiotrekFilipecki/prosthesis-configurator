import React from 'react';

export const StepsWrapper = (props) => {
  return (
    <div className="steps-wrapper">
      {props.children}
    </div>
    
  )
}

export const StepItem = props => {
  return (
    <div className={`step ${props.active ? 'step-active':''}`}>
      {props.label}
    </div>
  )
};

export const StepsTitle = props => {
  return (
    <div className="steps-title">
      <h1>{props.title}</h1>
    </div>
  );
}
