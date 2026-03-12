import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSide } from '../actions/index';
import { selectDetails } from '../selectors';

function SideContainer() {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);

  const handleSelectSide = useCallback(
    (side) => {
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
            <img src={process.env.PUBLIC_URL + '/images/right.png'} alt="Right prosthetic" />
            <h4 className="right-header">Right</h4>
          </div>
          <div
            className={`col col--center side-box ${details.side === 'L' ? 'active' : ''}`}
            onClick={() => handleSelectSide('L')}
          >
            <img src={process.env.PUBLIC_URL + '/images/left.png'} alt="Left prosthetic" />
            <h4 className="left-header">Left</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideContainer;
