import React, { useCallback } from 'react';
import { selectSide } from '../actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectDetails } from '../selectors';
import type { Side } from '../types/details';

const getSideImagePath = (side: Exclude<Side, null>): string =>
  `${process.env.PUBLIC_URL}/images/${side === 'R' ? 'right' : 'left'}.png`;

const SideContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectDetails);

  const handleSelectSide = useCallback(
    (side: Exclude<Side, null>) => {
      dispatch(selectSide(side));
    },
    [dispatch]
  );

  return (
    <div className="col-wrapper type">
      <div className="side-wrapper">
        <div className="col-wrapper">
          <div
            className={`col col--center side-box ${details.side === 'R' ? 'active' : ''}`}
            onClick={() => handleSelectSide('R')}
          >
            <img src={getSideImagePath('R')} alt="Right prosthetic" />
            <h4 className="right-header">Right</h4>
          </div>
          <div
            className={`col col--center side-box ${details.side === 'L' ? 'active' : ''}`}
            onClick={() => handleSelectSide('L')}
          >
            <img src={getSideImagePath('L')} alt="Left prosthetic" />
            <h4 className="left-header">Left</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideContainer;
