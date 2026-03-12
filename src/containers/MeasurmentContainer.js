import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormField, FormFieldOrder, FormWrapper } from '../component/Form';
import { onInputMeasurment, onInputOrderInfo } from '../actions/index';
import {
  ImagesWrapper,
  ImagesWrapperLeft,
  ImageElement
} from '../component/ImageElement';
import {
  selectDetails,
  selectPersonalize,
  selectPersonalizeElements
} from '../selectors';

function MeasurmentContainer() {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const personalize = useSelector(selectPersonalize);
  const personalizeElements = useSelector(selectPersonalizeElements);

  const handleMeasurementChange = useCallback(
    (id, input) => {
      dispatch(onInputMeasurment({ id, input }));
    },
    [dispatch]
  );

  const handleOrderInfoChange = useCallback(
    (id, input) => {
      dispatch(onInputOrderInfo({ id, input }));
    },
    [dispatch]
  );

  const measurementFields = useMemo(
    () =>
      Object.keys(details.measurments).map((key) => (
      <FormField
        units
        key={key}
        id={key}
        type="text"
        label={details.measurments[key].label}
        onChange={handleMeasurementChange}
        touched={details.measurments[key].touched}
        valid={details.measurments[key].valid}
        value={details.measurments[key].value}
      />
      )),
    [details.measurments, handleMeasurementChange]
  );

  const orderInfoFields = useMemo(
    () =>
      Object.keys(details.orderInfo).map((key) => (
      <FormFieldOrder
        key={key}
        id={key}
        type="text"
        label={`${details.orderInfo[key].label}`}
        onChange={handleOrderInfoChange}
        touched={details.orderInfo[key].touched}
        valid={details.orderInfo[key].valid}
        value={details.orderInfo[key].value}
      />
      )),
    [details.orderInfo, handleOrderInfoChange]
  );

  const images = useMemo(
    () =>
      Object.keys(personalizeElements).map((key) => (
        <ImageElement
          key={`img_el_${key}`}
          {...personalizeElements[key]}
          type={personalize.active_type}
        />
      )),
    [personalize.active_type, personalizeElements]
  );

  return (
    <div className="col-wrapper measurment">
      <div className=" measurment-image measurment-col-3">
        {details.side === 'L' ? (
          <ImagesWrapperLeft>{images}</ImagesWrapperLeft>
        ) : (
          <ImagesWrapper>{images}</ImagesWrapper>
        )}
      </div>
      <div className=" measurment-col-1">
        <FormWrapper>{measurementFields}</FormWrapper>
      </div>
      <div className="measurment-col-1">
        <FormWrapper>{orderInfoFields}</FormWrapper>
      </div>
    </div>
  );
}

export default MeasurmentContainer;
