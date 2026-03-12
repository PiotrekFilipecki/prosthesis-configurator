import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, ButtonsWrapper } from '../component/Buttons';
import {
  ImageElement,
  ImagesWrapper,
  ImagesWrapperLeft
} from '../component/ImageElement';
import { SummaryLine, SummaryOverlay } from '../component/Summary';
import downloadIco from '../component/download-pdf.svg';
import { getObjectEntries } from '../helpers/object';
import {
  selectDetails,
  selectPersonalize,
  selectPersonalizeElements
} from '../selectors';
import { useAppSelector } from '../store/hooks';
import { measurementFieldIds, orderInfoFieldIds } from '../types/details';

const getCurrentDate = (): string => new Date().toISOString().split('T')[0] ?? '';

const SummaryContainer: React.FC = () => {
  const details = useAppSelector(selectDetails);
  const personalize = useAppSelector(selectPersonalize);
  const personalizeElements = useAppSelector(selectPersonalizeElements);
  const summaryImageRef = useRef<HTMLDivElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleGeneratePdf = useCallback(async () => {
    const targetElement = summaryImageRef.current;

    if (!targetElement) {
      return;
    }

    setShowOverlay(true);

    try {
      const { generateSummaryPdf } = await import('../helpers/generateSummaryPdf');
      await generateSummaryPdf({
        targetElement,
        details,
        personalize
      });
    } finally {
      setShowOverlay(false);
    }
  }, [details, personalize]);

  const images = useMemo(
    () =>
      getObjectEntries(personalizeElements).map(([key, part]) => (
        <ImageElement key={`img_el_${key}`} {...part} type={personalize.active_type} />
      )),
    [personalize.active_type, personalizeElements]
  );

  return (
    <div className="col-wrapper summary">
      <div className=" summary-image summary-col-3">
        <SummaryLine
          title="Model"
          center
          content={`${personalize.model_names[personalize.active_type].name} - ${
            details.side === 'L' ? 'Left' : 'Right'
          }`}
        />

        <div ref={summaryImageRef}>
          {details.side === 'L' ? (
            <ImagesWrapperLeft>{images}</ImagesWrapperLeft>
          ) : (
            <ImagesWrapper>{images}</ImagesWrapper>
          )}
        </div>

        <div className="summary-color-details">
          {getObjectEntries(personalizeElements).map(([key, element]) => (
            <p key={key}>
              <strong>{element.name}: </strong>
              {element.selectedColor} {element.selectedFinishing}
            </p>
          ))}
        </div>
      </div>

      <div className="summary-order-info summary-col-2">
        {orderInfoFieldIds.map((fieldId) => (
          <SummaryLine
            key={fieldId}
            title={details.orderInfo[fieldId].label}
            content={details.orderInfo[fieldId].value}
          />
        ))}
        <div className="date">Date: {getCurrentDate()}</div>
      </div>

      <div className="summary-measurements summary-col-1">
        {measurementFieldIds.map((fieldId) => (
          <SummaryLine
            key={fieldId}
            title={details.measurments[fieldId].label}
            content={`${details.measurments[fieldId].value} ${details.measurments[fieldId].unit}`}
          />
        ))}
      </div>

      <ButtonsWrapper>
        <Button onClick={handleGeneratePdf} label="Download PDF" className="btn-download-pdf">
          <img src={downloadIco} alt="" />
        </Button>
      </ButtonsWrapper>
      {showOverlay && <SummaryOverlay />}
    </div>
  );
};

export default SummaryContainer;
