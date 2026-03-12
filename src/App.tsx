import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  assetsLoaded,
  nextStep,
  prevStep,
  restartPersonalization,
  touchAllFields
} from './features/configurator/model';
import {
  MeasurementScreen,
  PersonalizeScreen,
  SideScreen,
  SummaryScreen,
  TypeScreen
} from './features/configurator';
import loadAssets from './imagesList';
import {
  selectApp,
  selectDetails,
  selectPersonalize
} from './features/configurator/model';
import { BackSummaryButton, Button, ButtonsWrapper, StartupLoader, StepItem, StepsWrapper } from './shared/ui';
import { useAppDispatch, useAppSelector } from './store/hooks';
import type { StepId } from './types/app';
import configLogo from './configLogo.png';
import { ProgressBar } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

function renderStepView(stepId: StepId): JSX.Element | null {
  switch (stepId) {
    case 1:
      return <SideScreen />;
    case 2:
      return <TypeScreen />;
    case 3:
      return <PersonalizeScreen />;
    case 4:
      return <MeasurementScreen />;
    case 5:
      return <SummaryScreen />;
    default:
      return null;
  }
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp);
  const details = useAppSelector(selectDetails);
  const personalize = useAppSelector(selectPersonalize);
  const appWrapperRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMinimumLoaderTimeElapsed, setIsMinimumLoaderTimeElapsed] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMinimumLoaderTimeElapsed(true);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!personalize.assetsLoaded || !isMinimumLoaderTimeElapsed || isIntroComplete) {
      return;
    }

    const loaderElement = loaderRef.current;
    const appElement = appWrapperRef.current;

    if (!loaderElement || !appElement) {
      setIsIntroComplete(true);
      return;
    }

    const animatedElements = loaderElement.querySelectorAll('.startup-loader__animate');
    const progressElement = loaderElement.querySelector('.startup-loader__progress-bar');
    const supportsClipPath =
      typeof window.CSS !== 'undefined' &&
      (window.CSS.supports('clip-path', 'inset(0% 0% 0% 0%)') ||
        window.CSS.supports('-webkit-clip-path', 'inset(0% 0% 0% 0%)'));

    gsap.set(appElement, {
      autoAlpha: 0,
      y: 32,
      scale: 0.985
    });

    if (progressElement) {
      gsap.set(progressElement, {
        scaleX: 0,
        transformOrigin: 'left center'
      });
    }

    introTimelineRef.current?.kill();
    introTimelineRef.current = gsap.timeline({
      defaults: {
        ease: 'power3.inOut'
      },
      onComplete: () => {
        setIsIntroComplete(true);
      }
    });

    introTimelineRef.current
      .fromTo(
        animatedElements,
        {
          autoAlpha: 0,
          y: 28
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08
        }
      )
      .to(
        progressElement,
        {
          scaleX: 1,
          duration: 0.7,
          ease: 'power2.out'
        },
        0.18
      )
      .to(
        animatedElements,
        {
          autoAlpha: 0,
          y: -18,
          duration: 0.36,
          stagger: 0.05
        },
        1.05
      )
      .to(
        loaderElement,
        supportsClipPath
          ? {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.05,
              ease: 'power4.inOut'
            }
          : {
              autoAlpha: 0,
              yPercent: -12,
              duration: 0.8
            },
        1.18
      )
      .to(
        appElement,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out'
        },
        1.24
      );

    return () => {
      introTimelineRef.current?.kill();
    };
  }, [isIntroComplete, isMinimumLoaderTimeElapsed, personalize.assetsLoaded]);

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
    if (app.step === 4 && !details.formValid) {
      dispatch(touchAllFields());
      return;
    }
    dispatch(nextStep());
  }, [app.step, details.formValid, dispatch]);

  const isContinueDisabled =
    (app.step === 2 && !personalize.active_type) ||
    (app.step === 1 && !details.side);

  return (
    <>
      {!isIntroComplete && <StartupLoader rootRef={loaderRef} logoSrc={configLogo} />}

      {personalize.assetsLoaded && (
        <div
          ref={appWrapperRef}
          className={`app-wrapper${!isIntroComplete ? ' app-wrapper--intro-hidden' : ''}`}
        >
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
      )}
    </>
  );
};

export default App;
