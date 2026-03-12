import React, { useCallback, useEffect, useMemo } from 'react';
import {
  colorIds,
  finishingKeys,
  onMouseOut,
  onMouseOver,
  selectActivePart,
  selectColor,
  selectDetails,
  selectFinishing,
  selectPart,
  selectPersonalize,
  selectPersonalizeElements,
  startPersonalization
} from '../model';
import { getObjectEntries } from '../../../shared/lib/object';
import {
  ColorBox,
  ColorsWrapper,
  FinishingBox,
  FinishingWrapper,
  ImageElement,
  ImagesWrapper,
  ImagesWrapperLeft,
  PartsBox,
  PartsWrapper
} from '../../../shared/ui';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const PersonalizeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectDetails);
  const personalize = useAppSelector(selectPersonalize);
  const personalizeElements = useAppSelector(selectPersonalizeElements);
  const activePart = useAppSelector(selectActivePart);

  useEffect(() => {
    dispatch(startPersonalization());
  }, [dispatch, personalize.active_type]);

  const handleSelectColor = useCallback(
    (color: (typeof colorIds)[number]) => {
      dispatch(selectColor(color));
    },
    [dispatch]
  );

  const handleSelectFinishing = useCallback(
    (finishing: (typeof personalize.finishing)[keyof typeof personalize.finishing]) => {
      dispatch(selectFinishing(finishing));
    },
    [dispatch]
  );

  const handleSelectPart = useCallback(
    (partId: string) => {
      dispatch(selectPart(partId));
    },
    [dispatch]
  );

  const handleMouseOver = useCallback(
    (partId: number) => {
      dispatch(onMouseOver(partId));
    },
    [dispatch]
  );

  const handleMouseOut = useCallback(() => {
    dispatch(onMouseOut());
  }, [dispatch]);

  const colors = useMemo(
    () =>
      colorIds.map((colorId) => (
        <ColorBox
          key={colorId}
          onClick={handleSelectColor}
          color={colorId}
          hex={personalize.colors[colorId].hex}
          active={activePart?.selectedColor === colorId}
        />
      )),
    [activePart, handleSelectColor, personalize.colors]
  );

  const finishingOptions = useMemo(
    () =>
      finishingKeys.map((finishingKey) => {
        const finishingValue = personalize.finishing[finishingKey];

        return (
          <FinishingBox
            key={finishingKey}
            onClick={handleSelectFinishing}
            finishing={finishingValue}
            active={activePart?.selectedFinishing === finishingValue}
          />
        );
      }),
    [activePart, handleSelectFinishing, personalize.finishing]
  );

  const parts = useMemo(
    () =>
      getObjectEntries(personalizeElements).map(([key, part]) => (
        <PartsBox
          key={key}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleSelectPart}
          part={part}
          active={personalize.active === key}
        />
      )),
    [
      handleMouseOut,
      handleMouseOver,
      handleSelectPart,
      personalize.active,
      personalizeElements
    ]
  );

  const images = useMemo(
    () =>
      getObjectEntries(personalizeElements).map(([key, part]) => (
        <ImageElement
          key={`img_el_${key}`}
          {...part}
          type={personalize.active_type}
          hover={personalize.hover === part.id}
          active={personalize.active === key}
        />
      )),
    [personalize.active, personalize.active_type, personalize.hover, personalizeElements]
  );

  return (
    <div className="col-wrapper personalize">
      <div className="col-2 render-wrapper">
        {details.side === 'L' ? (
          <ImagesWrapperLeft>{images}</ImagesWrapperLeft>
        ) : (
          <ImagesWrapper>{images}</ImagesWrapper>
        )}

        <PartsWrapper>{parts}</PartsWrapper>
      </div>
      <div className="col-1">
        <div className="finishing-interface__wrapper">
          <ColorsWrapper>
            <div className="pallete-wrapper">{colors}</div>
            <FinishingWrapper>{finishingOptions}</FinishingWrapper>
          </ColorsWrapper>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeScreen;
