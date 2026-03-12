import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectType } from '../actions/index';
import { selectPersonalize } from '../selectors';

const TYPE_OPTIONS = [
  {
    id: 'smart_arm',
    image: '/images/smart_arm/render.png',
    label: 'Glaze Smart'
  },
  {
    id: 'sport_arm',
    image: '/images/sport_arm/render.png',
    label: 'Glaze Sport'
  },
  {
    id: 'smart_forearm',
    image: '/images/smart_forearm/render.png',
    label: 'Glaze Smart'
  },
  {
    id: 'sport_forearm',
    image: '/images/sport_forearm/render.png',
    label: 'Glaze Sport'
  }
];

function TypeContainer() {
  const dispatch = useDispatch();
  const personalize = useSelector(selectPersonalize);

  const handleSelectType = useCallback(
    (type) => {
      dispatch(selectType(type));
    },
    [dispatch]
  );

  return (
    <div className="col-wrapper type">
      <div className="type-wrapper">
        <h2 className="above-header">Above Elbow</h2>
        <h2 className="below-header">Below Elbow</h2>
        <div className="col-wrapper">
          {TYPE_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`col type-box col--center ${
                personalize.active_type === option.id ? 'active' : ''
              }`}
              onClick={() => handleSelectType(option.id)}
            >
              <img src={`${process.env.PUBLIC_URL}${option.image}`} alt={option.label} />
              <h4>{option.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TypeContainer;
