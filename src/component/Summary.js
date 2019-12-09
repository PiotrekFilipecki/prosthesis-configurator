import React from 'react';

export const SummaryLine = props => {
  return (
    <div
      className={`summary-line
        ${props.center ? 'summary-line-center' : ''}
      `}
    >
      <div className="title">{props.title}</div>
      <div className="content">{props.content}</div>
    </div>
  );
};

export const SummaryOverlay = props => {
  return (
    <div className="summary-overlay">
      <div class="loader-spiner">Generating pdf...</div>
      <p>Generating pdf...</p>
    </div>
  );
};

export const SummaryWrapper = props => {
  return <div className="summary-wrapper">{props.children}</div>;
};
