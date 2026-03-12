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
import { stepIds } from './types/app';
import type { StepId } from './types/app';
import configLogo from './configLogo.png';
import { ProgressBar } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

type TransitionDirection = 'forward' | 'backward';
type TransitionPhase = 'idle' | 'exit' | 'enter';

function getAdjacentStep(stepId: StepId, direction: TransitionDirection): StepId {
  const offset = direction === 'forward' ? 1 : -1;
  const currentIndex = stepIds.indexOf(stepId);
  const nextStepId = stepIds[currentIndex + offset];

  return nextStepId ?? stepId;
}

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
  const appHeaderRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const stepTransitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isStepTransitioningRef = useRef(false);
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const stepStageRef = useRef<HTMLDivElement>(null);
  const stepPanelRef = useRef<HTMLDivElement>(null);
  const stepMaskRef = useRef<HTMLDivElement>(null);
  const [isMinimumLoaderTimeElapsed, setIsMinimumLoaderTimeElapsed] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [displayedStep, setDisplayedStep] = useState<StepId>(app.step);
  const [pendingStep, setPendingStep] = useState<StepId | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('forward');
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle');
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);

  const supportsClipPath = useCallback(
    () =>
      typeof window.CSS !== 'undefined' &&
      (window.CSS.supports('clip-path', 'inset(0% 0% 0% 0%)') ||
        window.CSS.supports('-webkit-clip-path', 'inset(0% 0% 0% 0%)')),
    []
  );

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
        supportsClipPath()
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
  }, [isIntroComplete, isMinimumLoaderTimeElapsed, personalize.assetsLoaded, supportsClipPath]);

  useEffect(() => {
    if (!isStepTransitioning && displayedStep !== app.step) {
      setDisplayedStep(app.step);
    }
  }, [app.step, displayedStep, isStepTransitioning]);

  useEffect(() => {
    if (transitionPhase !== 'exit' || pendingStep === null) {
      return;
    }

    const stageElement = stepStageRef.current;
    const panelElement = stepPanelRef.current;
    const headerElement = appHeaderRef.current;
    const progressElement = progressWrapperRef.current;
    const maskElement = stepMaskRef.current;
    const isForward = transitionDirection === 'forward';
    const clipPathEnabled = supportsClipPath();

    if (!stageElement || !panelElement || !headerElement || !progressElement || !maskElement) {
      if (transitionDirection === 'backward' && displayedStep === 3) {
        dispatch(restartPersonalization());
      }

      dispatch(transitionDirection === 'forward' ? nextStep() : prevStep());
      setDisplayedStep(pendingStep);
      setTransitionPhase('enter');
      return;
    }

    gsap.set(stageElement, {
      pointerEvents: 'none'
    });
    gsap.set(maskElement, clipPathEnabled
      ? {
          autoAlpha: 1,
          clipPath: isForward ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'
        }
      : {
          autoAlpha: 0
        });

    stepTransitionTimelineRef.current?.kill();
    stepTransitionTimelineRef.current = gsap.timeline({
      defaults: {
        ease: 'power2.inOut'
      },
      onComplete: () => {
        if (transitionDirection === 'backward' && displayedStep === 3) {
          dispatch(restartPersonalization());
        }

        dispatch(transitionDirection === 'forward' ? nextStep() : prevStep());
        setDisplayedStep(pendingStep);
        setTransitionPhase('enter');
      }
    });

    stepTransitionTimelineRef.current
      .to(
        panelElement,
        {
          x: isForward ? -72 : 72,
          autoAlpha: 0,
          duration: 0.34,
          ease: 'power2.in'
        },
        0
      )
      .to(
        headerElement,
        {
          y: isForward ? -10 : 10,
          autoAlpha: 0.88,
          duration: 0.26
        },
        0
      )
      .to(
        progressElement,
        {
          y: isForward ? -6 : 6,
          autoAlpha: 0.78,
          duration: 0.26
        },
        0.02
      )
      .to(
        maskElement,
        clipPathEnabled
          ? {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.42,
              ease: 'power3.inOut'
            }
          : {
              autoAlpha: 0.2,
              duration: 0.2
            },
        0.06
      );

    return () => {
      stepTransitionTimelineRef.current?.kill();
    };
  }, [dispatch, displayedStep, pendingStep, supportsClipPath, transitionDirection, transitionPhase]);

  useEffect(() => {
    if (transitionPhase !== 'enter') {
      return;
    }

    const stageElement = stepStageRef.current;
    const panelElement = stepPanelRef.current;
    const headerElement = appHeaderRef.current;
    const progressElement = progressWrapperRef.current;
    const maskElement = stepMaskRef.current;
    const isForward = transitionDirection === 'forward';
    const clipPathEnabled = supportsClipPath();

    if (!stageElement || !panelElement || !headerElement || !progressElement || !maskElement) {
      setPendingStep(null);
      setTransitionPhase('idle');
      setIsStepTransitioning(false);
      isStepTransitioningRef.current = false;
      return;
    }

    gsap.set(stageElement, {
      pointerEvents: 'none'
    });
    gsap.set(panelElement, {
      x: isForward ? 72 : -72,
      autoAlpha: 0
    });
    gsap.set(headerElement, {
      y: isForward ? 10 : -10,
      autoAlpha: 0.88
    });
    gsap.set(progressElement, {
      y: isForward ? 6 : -6,
      autoAlpha: 0.78
    });
    gsap.set(maskElement, clipPathEnabled
      ? {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)'
        }
      : {
          autoAlpha: 0.2
        });

    stepTransitionTimelineRef.current?.kill();
    stepTransitionTimelineRef.current = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      },
      onComplete: () => {
        gsap.set(stageElement, { clearProps: 'pointerEvents' });
        gsap.set([panelElement, headerElement, progressElement, maskElement], { clearProps: 'all' });
        setPendingStep(null);
        setTransitionPhase('idle');
        setIsStepTransitioning(false);
        isStepTransitioningRef.current = false;
      }
    });

    stepTransitionTimelineRef.current
      .to(
        panelElement,
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.46
        },
        0.04
      )
      .to(
        headerElement,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.34
        },
        0.08
      )
      .to(
        progressElement,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.34
        },
        0.12
      )
      .to(
        maskElement,
        clipPathEnabled
          ? {
              clipPath: isForward ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
              duration: 0.56,
              ease: 'power4.out'
            }
          : {
              autoAlpha: 0,
              duration: 0.2
            },
        0
      );

    return () => {
      stepTransitionTimelineRef.current?.kill();
    };
  }, [supportsClipPath, transitionDirection, transitionPhase]);

  const stepItems = useMemo(
    () =>
      Object.values(app.steps).map((step) => (
        <StepItem key={step.id} label={step.label} active={app.step === step.id} />
      )),
    [app.step, app.steps]
  );

  const startStepTransition = useCallback(
    (direction: TransitionDirection) => {
      if (isStepTransitioningRef.current || isStepTransitioning) {
        return;
      }

      const nextDisplayedStep = getAdjacentStep(displayedStep, direction);

      if (nextDisplayedStep === displayedStep) {
        return;
      }

      isStepTransitioningRef.current = true;
      setTransitionDirection(direction);
      setPendingStep(nextDisplayedStep);
      setIsStepTransitioning(true);
      setTransitionPhase('exit');
    },
    [displayedStep, isStepTransitioning]
  );

  const handlePreviousStep = useCallback(() => {
    startStepTransition('backward');
  }, [startStepTransition]);

  const handleNextStep = useCallback(() => {
    if (displayedStep === 4 && !details.formValid) {
      dispatch(touchAllFields());
      return;
    }

    startStepTransition('forward');
  }, [details.formValid, dispatch, displayedStep, startStepTransition]);

  const isContinueDisabled =
    isStepTransitioning ||
    (displayedStep === 2 && !personalize.active_type) ||
    (displayedStep === 1 && !details.side);

  return (
    <>
      {!isIntroComplete && <StartupLoader rootRef={loaderRef} logoSrc={configLogo} />}

      {personalize.assetsLoaded && (
        <div
          ref={appWrapperRef}
          className={`app-wrapper${!isIntroComplete ? ' app-wrapper--intro-hidden' : ''}`}
        >
          <img className="logo" src={configLogo} alt="Glaze Prosthetics" />
          <header ref={appHeaderRef} className="app-header">
            <StepsWrapper>{stepItems}</StepsWrapper>
            <div ref={progressWrapperRef} className="app-progress">
              <ProgressBar percent={app.steps[app.step].barPercent} filledBackground="#FC4A1A" />
            </div>
          </header>
          <main className="app-main last-step">
            <div
              ref={stepStageRef}
              className={`step-stage${isStepTransitioning ? ' step-stage--transitioning' : ''}`}
              data-direction={transitionDirection}
            >
              <div ref={stepMaskRef} className="step-stage__mask" aria-hidden="true" />
              <div
                key={displayedStep}
                ref={stepPanelRef}
                className={`step-panel step-panel--${transitionPhase}`}
                data-step={displayedStep}
              >
                {renderStepView(displayedStep)}
              </div>
            </div>
          </main>
          <div className={displayedStep === 5 ? 'summary-buttons' : 'buttons'}>
            <ButtonsWrapper>
              {displayedStep > 1 && displayedStep < 5 && (
                <Button onClick={handlePreviousStep} disabled={isStepTransitioning} label="< Back" />
              )}

              {displayedStep === 5 && (
                <BackSummaryButton
                  onClick={handlePreviousStep}
                  disabled={isStepTransitioning}
                  label="< Back"
                />
              )}

              {displayedStep < 5 && (
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
