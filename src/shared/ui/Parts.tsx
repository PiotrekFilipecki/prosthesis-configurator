import type { PropsWithChildren } from 'react';
import React from 'react';
import type { PersonalizeElement } from '../../types/personalize';

interface PartsBoxProps {
  active: boolean;
  part: PersonalizeElement;
  onClick: (partId: string) => void;
  onMouseOver: (partId: number) => void;
  onMouseOut: () => void;
}

export const PartsWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="parts-wrapper">{children}</div>
);

export const PartsBox: React.FC<PartsBoxProps> = ({
  active,
  onClick,
  onMouseOut,
  onMouseOver,
  part
}) => (
  <div
    className={`parts-box ${active ? 'active' : ''}`}
    onClick={() => onClick(part.path)}
    onMouseOver={() => onMouseOver(part.id)}
    onMouseOut={onMouseOut}
  >
    {part.name}
  </div>
);
