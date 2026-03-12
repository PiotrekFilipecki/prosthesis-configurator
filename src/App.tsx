import React, { useCallback, useEffect, useMemo } from 'react';
import { assetsLoaded, nextStep, prevStep, restartPersonalization } from './actions';
import MeasurmentContainer from './containers/MeasurmentContainer';
import PersonalizeContainer from './containers/PersonalizeContainer';
import SideContainer from './containers/SideContainer';
import SummaryContainer from './containers/SummaryContainer';
import TypeContainer from './containers/TypeContainer';
import loadAssets from './imagesList';
import { selectApp, selectDetails, selectPersonalize } from './selectors';
import { BackSummaryButton, Button, ButtonsWrapper, StepItem, StepsWrapper } from './shared/ui';
import { useAppDispatch, useAppSelector } from './store/hooks';
import type { StepId } from './types/app';
import configLogo from './configLogo.png';
import { ProgressBar } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

function renderStepView(stepId: StepId): JSX.Element | null {
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

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp);
  const details = useAppSelector(selectDetails);
  const personalize = useAppSelector(selectPersonalize);

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
      Object.values(app.steps).map((step) => (
        <StepItem key={step.id} label={step.label} active={app.step === step.id} />
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
        <ProgressBar percent={app.steps[app.step].barPercent} filledBackground="#FC4A1A" />
      </header>
      <main className="app-main last-step">{renderStepView(app.step)}</main>
      <div className={app.step === 5 ? 'summary-buttons' : 'buttons'}>
        <ButtonsWrapper>
          {app.step > 1 && app.step < 5 && (
            <Button onClick={handlePreviousStep} label="< Back" />
          )}

          {app.step === 5 && (
            <BackSummaryButton onClick={handlePreviousStep} label="< Back" />
          )}

          {app.step < 5 && (
            <Button onClick={handleNextStep} disabled={isContinueDisabled} label="Continue" />
          )}
        </ButtonsWrapper>
      </div>
    </div>
  );
};

export default App;
