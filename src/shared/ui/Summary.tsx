import type { PropsWithChildren } from 'react';
import React from 'react';

interface SummaryLineProps {
  center?: boolean;
  title: string;
  content: string;
}

export const SummaryLine: React.FC<SummaryLineProps> = ({
  center = false,
  content,
  title
}) => (
  <div
    className={`summary-line
      ${center ? 'summary-line-center' : ''}
    `}
  >
    <div className="title">{title}</div>
    <div className="content">{content}</div>
  </div>
);

export const SummaryOverlay: React.FC = () => (
  <div className="summary-overlay">
    <div className="loader-spiner">Generating pdf...</div>
    <p>Generating pdf...</p>
  </div>
);

export const SummaryWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="summary-wrapper">{children}</div>
);
