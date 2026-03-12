import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  selectPersonalize,
  selectType,
  type ProsthesisType
} from '../model';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

interface TypeOption {
  id: ProsthesisType;
  image: string;
  labelKey: string;
}

const TYPE_OPTIONS: TypeOption[] = [
  { id: 'smart_arm', image: '/images/smart_arm/render.png', labelKey: 'type.glazeSmart' },
  { id: 'sport_arm', image: '/images/sport_arm/render.png', labelKey: 'type.glazeSport' },
  { id: 'smart_forearm', image: '/images/smart_forearm/render.png', labelKey: 'type.glazeSmart' },
  { id: 'sport_forearm', image: '/images/sport_forearm/render.png', labelKey: 'type.glazeSport' }
];

const TypeScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const personalize = useAppSelector(selectPersonalize);

  const handleSelectType = useCallback(
    (type: ProsthesisType) => {
      dispatch(selectType(type));
    },
    [dispatch]
  );

  return (
    <div className="col-wrapper type">
      <div className="type-wrapper">
        <h2 className="above-header">{t('type.aboveElbow')}</h2>
        <h2 className="below-header">{t('type.belowElbow')}</h2>
        <div className="col-wrapper">
          {TYPE_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`col type-box col--center ${
                personalize.active_type === option.id ? 'active' : ''
              }`}
              onClick={() => handleSelectType(option.id)}
            >
              <img src={`${process.env.PUBLIC_URL}${option.image}`} alt={t(option.labelKey)} />
              <h4>{t(option.labelKey)}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeScreen;
