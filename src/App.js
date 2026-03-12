import React, { useCallback, useEffect, useMemo } from 'react';
import PersonalizeContainer from './containers/PersonalizeContainer';
import MeasurmentContainer from './containers/MeasurmentContainer';
import SummaryContainer from './containers/SummaryContainer';
import TypeContainer from './containers/TypeContainer';
import SideContainer from './containers/SideContainer';
import { useDispatch, useSelector } from 'react-redux';
import { assetsLoaded, nextStep, prevStep, restartPersonalization } from './actions/index';
import loadAssets from './imagesList';
import { Button, BackSummaryButton, ButtonsWrapper } from './component/Buttons';
import { StepItem, StepsWrapper } from './component/Steps';
import 'react-step-progress-bar/styles.css';
import { ProgressBar } from 'react-step-progress-bar';
import configLogo from './configLogo.png';
import { selectApp, selectDetails, selectPersonalize } from './selectors';

function renderStepView(stepId) {
  switch (stepId) {
    case 1:
      return <SideContainer />;
    case 2:
      return <TypeContainer />;
    case 3:
      return <PersonalizeContainer />;
    case 4:
      return <MeasurmentContainer />;
    case 5:
      return <SummaryContainer />;
    default:
      return null;
  }
}

function App() {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const details = useSelector(selectDetails);
  const personalize = useSelector(selectPersonalize);

  useEffect(() => {
    let isMounted = true;

    loadAssets()
      .catch(() => null)
      .finally(() => {
        if (isMounted) {
          dispatch(assetsLoaded());
        }
      });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const stepItems = useMemo(
    () =>
      Object.keys(app.steps).map((key, index) => (
      <StepItem
        key={`step_${index}`}
        label={app.steps[key].label}
        active={app.step === app.steps[key].id}
      />
      )),
    [app.step, app.steps]
  );

  const handlePreviousStep = useCallback(() => {
    if (app.step === 3) {
      dispatch(restartPersonalization());
    }

    dispatch(prevStep());
  }, [app.step, dispatch]);

  const handleNextStep = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  const isContinueDisabled =
    (app.step === 4 && !details.formValid) ||
    (app.step === 2 && !personalize.active_type) ||
    (app.step === 1 && !details.side);

  return !personalize.assetsLoaded ? (
      <div className="loader-spiner">Loading...</div>
    ) : (
      <div className="app-wrapper">
        <img className="logo" src={configLogo} alt="Glaze Prosthetics" />
        <header className="app-header">
          <StepsWrapper>{stepItems}</StepsWrapper>
          <ProgressBar
            percent={app.steps[app.step].barPercent}
            filledBackground="#FC4A1A"
          />
        </header>
        <main className="app-main last-step">
          {renderStepView(app.step)}
        </main>
        <div className={`${app.step === 5 ? 'summary-buttons' : 'buttons'}`}>
          <ButtonsWrapper>
            {app.step > 1 && app.step < 5 && (
              <Button
                onClick={handlePreviousStep}
                label={'< Back'}
              />
            )}

            {app.step === 5 && (
              <BackSummaryButton
                onClick={handlePreviousStep}
                label={'< Back'}
              />
            )}

            {app.step < 5 && (
              <Button
                onClick={handleNextStep}
                disabled={isContinueDisabled}
                label={'Continue'}
              />
            )}
          </ButtonsWrapper>
        </div>
      </div>
  );
}

export default App;
