import React, { Component } from 'react';
// import { images } from '../imagesList';
import { connect } from 'react-redux';

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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    selectColor: param => dispatch(selectColor(param)),
    selectFinishing: param => dispatch(selectFinishing(param)),
    onMouseOver: param => dispatch(onMouseOver(param)),
    onMouseOut: param => dispatch(onMouseOut(param)),
    selectPart: param => dispatch(selectPart(param)),
    startPersonalization: () => dispatch(startPersonalization())
  };
};

class PersonalizeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.renderColors = this.renderColors.bind(this);
    this.renderFinishing = this.renderFinishing.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderParts = this.renderParts.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
    this.onSelectFinishing = this.onSelectFinishing.bind(this);
    this.onSelectPart = this.onSelectPart.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);

  }

  componentDidMount() {
    this.props.startPersonalization();
  }

  componentDidUpdate(prev) {
    if (prev.personalize.active_type !== this.props.personalize.active_type) {
      this.props.startPersonalization();
    }
  }

  /**
   * Handles
   */
  onSelectColor(color) {
    this.props.selectColor(color);
  }

  onSelectFinishing(finishing) {
    this.props.selectFinishing(finishing);
  }

  onSelectPart(id) {
    this.props.selectPart(id);
  }

  onMouseOver(id) {
    this.props.onMouseOver(id);
  }

  onMouseOut(id) {
    this.props.onMouseOut();
  }
  /**
   * Renders
   */
  renderColors() {
    const { personalize } = this.props;
    return Object.keys(personalize.colors).map((key, i) => (
      <ColorBox
        key={`color_${i}`}
        onClick={this.onSelectColor}
        color={key}
        hex={personalize.colors[key].hex}
        /*  active={personalize.active && personalize.type[personalize.active_type][personalize.active].selectedColor === personalize.colors[key]} */
      />
    ));
  }

  renderFinishing() {
    const { personalize } = this.props;
    return Object.keys(personalize.finishing).map((key, i) => (
      <FinishingBox
        key={`finishing_${i}`}
        onClick={this.onSelectFinishing}
        finishing={personalize.finishing[key]}
        active={
          personalize.active &&
          personalize.type[personalize.active_type][personalize.active]
            .selectedFinishing === personalize.finishing[key]
        }
      />
    ));
  }

  renderParts() {
    const { personalize } = this.props;
    return Object.keys(personalize.type[personalize.active_type]).map(
      (key, i) => (
        <PartsBox
          key={`parts_${i}`}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onClick={this.onSelectPart}
          part={personalize.type[personalize.active_type][key]}
          active={personalize.active === key}
        />
      )
    );
  }

  renderImages() {
    const { personalize } = this.props;
    return Object.keys(personalize.type[personalize.active_type]).map(
      (key, i) => (
        <ImageElement
          key={`img_el_${i}`}
          {...personalize.type[personalize.active_type][key]}
          type={personalize.active_type}
          hover={
            personalize.hover ===
            personalize.type[personalize.active_type][key].id
          }
          active={
            personalize.active ===
            personalize.type[personalize.active_type][key].id
          }
        />
      )
    );
  }

  render() {
    // if (this.props.details.side === "L") {
    //   console.log('left');
    //   document.querySelector('.image-wrapper').classList.add('left-render');
    // } else {
    //   console.log('right');
    // }
    return (
      <div className="col-wrapper personalize">
        <div className="col-2 render-wrapper">
          {/* wyswietlanie renderu dla lewej/prawej w zaleznosci od wybranej strony - przemyslec jak zrobic lepiej*/}
          {this.props.details.side === 'L' ? (
            <ImagesWrapperLeft>{this.renderImages()}</ImagesWrapperLeft>
          ) : (
            <ImagesWrapper>{this.renderImages()}</ImagesWrapper>
          )}

          <PartsWrapper>{this.renderParts()}</PartsWrapper>
          {/* <p>
            Choose element of the prosthetic and adjust colours and finishing.
          </p>
          <hr /> */}
        </div>
        <div className="col-1">
          <div className="finishing-interface__wrapper">
            <ColorsWrapper>
              {/* <h3>Color</h3> */}
              <div className="pallete-wrapper">{this.renderColors()}</div>
              <FinishingWrapper>{this.renderFinishing()}</FinishingWrapper>
            </ColorsWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalizeContainer);
