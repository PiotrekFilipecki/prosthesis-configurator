import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { selectDetails, selectSide, type Side } from '../model';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const getSideImagePath = (side: Exclude<Side, null>): string =>
  `${process.env.PUBLIC_URL}/images/${side === 'R' ? 'right' : 'left'}.png`;

const SideScreen: React.FC = () => {
  const { t } = useTranslation();
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
            <img src={getSideImagePath('R')} alt={t('side.rightAlt')} />
            <h4 className="right-header">{t('side.right')}</h4>
          </div>
          <div
            className={`col col--center side-box ${details.side === 'L' ? 'active' : ''}`}
            onClick={() => handleSelectSide('L')}
          >
            <img src={getSideImagePath('L')} alt={t('side.leftAlt')} />
            <h4 className="left-header">{t('side.left')}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideScreen;
