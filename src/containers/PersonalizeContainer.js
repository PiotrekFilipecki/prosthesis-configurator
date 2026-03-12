import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorsWrapper, ColorBox } from '../component/Colors';
import { FinishingWrapper, FinishingBox } from '../component/Finishing';
import { PartsWrapper, PartsBox } from '../component/Parts';
import {
  ImagesWrapper,
  ImagesWrapperLeft,
  ImageElement
} from '../component/ImageElement';

import {
  selectColor,
  selectFinishing,
  selectPart,
  onMouseOver,
  onMouseOut,
  startPersonalization
} from '../actions/index';
import {
  selectDetails,
  selectPersonalize,
  selectPersonalizeElements
} from '../selectors';

function PersonalizeContainer() {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const personalize = useSelector(selectPersonalize);
  const personalizeElements = useSelector(selectPersonalizeElements);

  useEffect(() => {
    // Reinitialize the active part when the user switches prosthetic type.
    dispatch(startPersonalization());
  }, [dispatch, personalize.active_type]);

  const handleSelectColor = useCallback(
    (color) => {
      dispatch(selectColor(color));
    },
    [dispatch]
  );

  const handleSelectFinishing = useCallback(
    (finishing) => {
      dispatch(selectFinishing(finishing));
    },
    [dispatch]
  );

  const handleSelectPart = useCallback(
    (partId) => {
      dispatch(selectPart(partId));
    },
    [dispatch]
  );

  const handleMouseOver = useCallback(
    (partId) => {
      dispatch(onMouseOver(partId));
    },
    [dispatch]
  );

  const handleMouseOut = useCallback(() => {
    dispatch(onMouseOut());
  }, [dispatch]);

  const colors = useMemo(
    () =>
      Object.keys(personalize.colors).map((key, index) => (
      <ColorBox
        key={`color_${index}`}
        onClick={handleSelectColor}
        color={key}
        hex={personalize.colors[key].hex}
        active={
          personalize.active &&
          personalize.type[personalize.active_type][personalize.active].selectedColor === key
        }
      />
      )),
    [handleSelectColor, personalize.colors]
  );

  const finishingOptions = useMemo(
    () =>
      Object.keys(personalize.finishing).map((key, index) => (
      <FinishingBox
        key={`finishing_${index}`}
        onClick={handleSelectFinishing}
        finishing={personalize.finishing[key]}
        active={
          personalize.active &&
          personalize.type[personalize.active_type][personalize.active]
            .selectedFinishing === personalize.finishing[key]
        }
      />
      )),
    [handleSelectFinishing, personalize]
  );

  const parts = useMemo(
    () =>
      Object.keys(personalizeElements).map((key, index) => (
        <PartsBox
          key={`parts_${index}`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleSelectPart}
          part={personalizeElements[key]}
          active={personalize.active === key}
        />
      )),
    [handleMouseOut, handleMouseOver, handleSelectPart, personalize.active, personalizeElements]
  );

  const images = useMemo(
    () =>
      Object.keys(personalizeElements).map((key, index) => (
        <ImageElement
          key={`img_el_${index}`}
          {...personalizeElements[key]}
          type={personalize.active_type}
          hover={personalize.hover === personalizeElements[key].id}
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
}

export default PersonalizeContainer;
