declare module 'react-step-progress-bar' {
  import type { FC, ReactNode } from 'react';

  export interface ProgressBarProps {
    percent: number;
    filledBackground?: string;
    children?: ReactNode;
  }

  export const ProgressBar: FC<ProgressBarProps>;
}
