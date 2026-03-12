import type { PropsWithChildren } from 'react';
import React from 'react';
import type { FinishingValue } from '../types/personalize';

interface FinishingBoxProps {
  active: boolean;
  finishing: FinishingValue;
  onClick: (finishing: FinishingValue) => void;
}

export const FinishingWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="box-wrapper finishing-wrapper">{children}</div>
);

export const FinishingBox: React.FC<FinishingBoxProps> = ({
  active,
  finishing,
  onClick
}) => (
  <div
    className={`box finishing-box ${active ? 'active' : ''}`}
    onClick={() => onClick(finishing)}
  >
    {finishing}
  </div>
);
