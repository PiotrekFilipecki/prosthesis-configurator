import type { PropsWithChildren } from 'react';
import React from 'react';

interface StepItemProps {
  active: boolean;
  label: string;
}

interface StepsTitleProps {
  title: string;
}

export const StepsWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="steps-wrapper">{children}</div>
);

export const StepItem: React.FC<StepItemProps> = ({ active, label }) => (
  <div className={`step ${active ? 'step-active' : ''}`}>{label}</div>
);

export const StepsTitle: React.FC<StepsTitleProps> = ({ title }) => (
  <div className="steps-title">
    <h1>{title}</h1>
  </div>
);
