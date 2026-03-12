import React, { useCallback, useMemo } from 'react';
import { onInputMeasurment, onInputOrderInfo } from '../actions';
import { getObjectEntries } from '../shared/lib/object';
import {
  FormField,
  FormFieldOrder,
  FormWrapper,
  ImageElement,
  ImagesWrapper,
  ImagesWrapperLeft
} from '../shared/ui';
import {
  selectDetails,
  selectPersonalize,
  selectPersonalizeElements
} from '../selectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  measurementFieldIds,
  orderInfoFieldIds,
  type MeasurementFieldId,
  type OrderInfoFieldId
} from '../types/details';

const MeasurmentContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectDetails);
  const personalize = useAppSelector(selectPersonalize);
  const personalizeElements = useAppSelector(selectPersonalizeElements);

  const handleMeasurementChange = useCallback(
    (id: MeasurementFieldId, input: string) => {
      dispatch(onInputMeasurment({ id, input }));
    },
    [dispatch]
  );

  const handleOrderInfoChange = useCallback(
    (id: OrderInfoFieldId, input: string) => {
      dispatch(onInputOrderInfo({ id, input }));
    },
    [dispatch]
  );

  const measurementFields = useMemo(
    () =>
      measurementFieldIds.map((fieldId) => (
        <FormField
          units
          key={fieldId}
          id={fieldId}
          type="text"
          label={details.measurments[fieldId].label}
          onChange={handleMeasurementChange}
          touched={details.measurments[fieldId].touched}
          valid={details.measurments[fieldId].valid}
          value={details.measurments[fieldId].value}
        />
      )),
    [details.measurments, handleMeasurementChange]
  );

  const orderInfoFields = useMemo(
    () =>
      orderInfoFieldIds.map((fieldId) => (
        <FormFieldOrder
          key={fieldId}
          id={fieldId}
          type="text"
          label={details.orderInfo[fieldId].label}
          onChange={handleOrderInfoChange}
          touched={details.orderInfo[fieldId].touched}
          valid={details.orderInfo[fieldId].valid}
          value={details.orderInfo[fieldId].value}
        />
      )),
    [details.orderInfo, handleOrderInfoChange]
  );

  const images = useMemo(
    () =>
      getObjectEntries(personalizeElements).map(([key, part]) => (
        <ImageElement
          key={`img_el_${key}`}
          {...part}
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
};

export default MeasurmentContainer;
