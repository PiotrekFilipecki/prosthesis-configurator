import React, { Component } from 'react';
import PersonalizeContainer from './containers/PersonalizeContainer';
import MeasurmentContainer from './containers/MeasurmentContainer';
import SummaryContainer from './containers/SummaryContainer';
import TypeContainer from './containers/TypeContainer';
import SideContainer from './containers/SideContainer';
import { connect } from 'react-redux';
import {
  assetsLoaded,
  nextStep,
  prevStep,
  nextBarStep,
  prevBarStep,
  restartPersonalization
} from './actions/index';
import loadAssets from './imagesList';

import { Button, BackSummaryButton, ButtonsWrapper } from './component/Buttons';
import { StepItem, StepsWrapper, StepsTitle } from './component/Steps';
import personalize from './reducers/personalize';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import configLogo from './configLogo.png';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
  return {
    assetsLoaded: () => dispatch(assetsLoaded()),
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    nextBarStep: () => dispatch(nextBarStep()),
    prevBarStep: () => dispatch(prevBarStep()),
    restartPersonalization: () => dispatch(restartPersonalization())
  };
};

const RenderSide = (props, state) => {
  if (props) {
    return <PersonalizeContainer />;
  } else {
    return <div>left</div>;
  }
};
class App extends Component {
  constructor(props) {
    super(props);

    this.renderSteps = this.renderSteps.bind(this);
  }

  componentDidMount() {
    loadAssets().then(assets => {
      // this.setState({assets, loaded: true})
      this.props.assetsLoaded();
    });
  }

  renderSteps() {
    const { app } = this.props;
    return Object.keys(app.steps).map((key, i) => (
      <StepItem
        key={`step_${i}`}
        label={app.steps[key].label}
        active={app.step === app.steps[key].id}
      />
    ));
  }

  renderProgressBarSteps() {
    const { app } = this.props;
    return Object.keys(app.steps).map(i => app.steps[i].barPercent);
  }

  // renderProgressBarStep() {
  //   <Step>
  //   {({ accomplished, index, position }) => (
  //     <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>

  //     </div>
  //   )}
  // </Step>
  // }

  renderStepsButton() {}

  renderStepsView(stepId) {
    switch (stepId) {
      case 1:
        return <SideContainer />;
      case 2:
        return <TypeContainer />;
      case 3:
        return <RenderSide />;
      case 4:
        return <MeasurmentContainer />;
      case 5:
        return <SummaryContainer />;
      default:
        return;
    }
  }

  render() {
    const { app, details, personalize } = this.props;

    return !this.props.assetsLoaded ? (
      <div className="loader-spiner">Loading...</div>
    ) : (
      <div className="app-wrapper">
        <img className="logo" src={configLogo} alt="Glaze Prosthetics" />
        <header className="app-header">
          {/* <StepsTitle title={app.steps[app.step].title} /> */}
          <StepsWrapper>{this.renderSteps()}</StepsWrapper>
          <ProgressBar
            percent={app.steps[app.step].barPercent}
            filledBackground="#FC4A1A"
          />
        </header>
        {/* {app.step === 3 && (
          <div>Model: {personalize.model_names[personalize.active_type].name}</div>
        )} */}

        <main className="app-main last-step">
          {this.renderStepsView(app.step)}
        </main>
        <div className={`${app.step === 5 ? 'summary-buttons' : 'buttons'}`}>
          <ButtonsWrapper>
            {app.step > 1 && app.step < 5 && (
              <Button
                onClick={() => {
                  if (app.step === 3) {
                    this.props.restartPersonalization();
                  }
                  this.props.prevStep();
                }}
                label={'< Back'}
              />
            )}

            {app.step === 5 && (
              <BackSummaryButton
                onClick={this.props.prevStep}
                label={'< Back'}
              />
            )}

            {app.step < 5 && (
              <Button
                onClick={this.props.nextStep}
                disabled={
                  (app.step === 4 && !details.formValid) ||
                  (app.step === 2 && !personalize.active_type) ||
                  (app.step === 1 && !details.side)
                }
                label={'Continue'}
              />
            )}
          </ButtonsWrapper>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
