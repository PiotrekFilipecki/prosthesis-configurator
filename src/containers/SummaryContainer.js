import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  SummaryLine,
  SummaryOverlay
} from '../component/Summary';
import { Button, ButtonsWrapper } from '../component/Buttons';
import {
  ImagesWrapper,
  ImagesWrapperLeft,
  ImageElement
} from '../component/ImageElement';
import downloadIco from '../component/download-pdf.svg';
import {
  selectDetails,
  selectPersonalize,
  selectPersonalizeElements
} from '../selectors';

function SummaryContainer() {
  const details = useSelector(selectDetails);
  const personalize = useSelector(selectPersonalize);
  const personalizeElements = useSelector(selectPersonalizeElements);
  const summaryImageRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleGeneratePdf = useCallback(async () => {
    setShowOverlay(true);

    try {
      // Lazy-load PDF dependencies so tests and initial render stay lightweight.
      const { generateSummaryPdf } = await import('../helpers/generateSummaryPdf');
      await generateSummaryPdf({
        targetElement: summaryImageRef.current,
        details,
        personalize
      });
    } finally {
      setShowOverlay(false);
    }
  }, [details, personalize]);

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
    <div className="col-wrapper summary">
      <div className=" summary-image summary-col-3">
        <SummaryLine
          title={'Model'}
          center
          content={`${
            personalize.model_names[personalize.active_type].name
          } - ${details.side === 'L' ? 'Left' : 'Right'}`}
        />

        <div ref={summaryImageRef}>
          {details.side === 'L' ? (
            <ImagesWrapperLeft>{images}</ImagesWrapperLeft>
          ) : (
            <ImagesWrapper>{images}</ImagesWrapper>
          )}
        </div>

        <div className="summary-color-details">
          {Object.keys(personalizeElements).map((key) => (
            <p key={key}>
              <strong>{personalizeElements[key].name}: </strong>
              {personalizeElements[key].selectedColor}{' '}
              {personalizeElements[key].selectedFinishing}
            </p>
          ))}
        </div>
      </div>

      <div className="summary-order-info summary-col-2">
        {Object.keys(details.orderInfo).map((key) => (
          <SummaryLine
            key={key}
            title={details.orderInfo[key].label}
            content={`${details.orderInfo[key].value}`}
          />
        ))}
        <div className="date">Date: {new Date().toISOString().split('T')[0]}</div>
      </div>

      <div className="summary-measurements summary-col-1">
        {Object.keys(details.measurments).map((key) => (
          <SummaryLine
            key={key}
            title={details.measurments[key].label}
            content={`${details.measurments[key].value} ${details.measurments[key].unit}`}
          />
        ))}
      </div>

      <ButtonsWrapper>
        <Button
          onClick={handleGeneratePdf}
          label={'Download PDF'}
          className="btn-download-pdf"
        >
          <img src={downloadIco} alt="" />
        </Button>
      </ButtonsWrapper>
      {showOverlay && <SummaryOverlay />}
    </div>
  );
}

export default SummaryContainer;
