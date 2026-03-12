import type { PropsWithChildren } from 'react';
import React from 'react';
import type { ColorId } from '../types/personalize';

interface ColorBoxProps {
  onClick: (color: ColorId) => void;
  color: ColorId;
  active: boolean;
  hex: string;
}

export const ColorBox: React.FC<ColorBoxProps> = ({ active, color, hex, onClick }) => (
  <div
    onClick={() => onClick(color)}
    className={`color-box ${active ? 'active' : ''}`}
    style={{ backgroundColor: hex }}
  />
);

export const ColorsWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="box-wrapper colors-wrapper">{children}</div>
);
