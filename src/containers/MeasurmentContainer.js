import React, { Component } from 'react';
import { connect } from 'react-redux';
// import  { images } from '../imagesList';
import { FormField, FormFieldOrder, FormWrapper } from '../component/Form';
import { onInputMeasurment, onInputOrderInfo } from '../actions/index';
import {
  ImagesWrapper,
  ImagesWrapperLeft,
  ImageElement
} from '../component/ImageElement';

// const mapStateToProps = (state) => ({ }) const mapDispatchToProps = { }

const mapDispatchToProps = dispatch => {
  return {
    onInput: param => dispatch(onInputMeasurment(param)),
    onInputOrder: param => dispatch(onInputOrderInfo(param))
  };
};

class MeasurmentContainer extends Component {
  constructor(props) {
    super(props);

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onOrderFormChangeInput = this.onOrderFormChangeInput.bind(this);
    this.renderOrderInfoForm = this.renderOrderInfoForm.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  onChangeInput(id, input) {
    this.props.onInput({ id, input });
  }

  onOrderFormChangeInput(id, input) {
    this.props.onInputOrder({ id, input });
  }

  renderForm() {
    const { details } = this.props;
    return Object.keys(details.measurments).map((key, i) => (
      <FormField
        units
        key={key}
        id={key}
        type="text"
        label={details.measurments[key].label}
        onChange={this.onChangeInput}
        touched={details.measurments[key].touched}
        valid={details.measurments[key].valid}
        value={details.measurments[key].value}
      />
    ));
  }

  renderOrderInfoForm() {
    const { details } = this.props;
    return Object.keys(details.orderInfo).map((key, i) => (
      <FormFieldOrder
        key={key}
        id={key}
        type="text"
        label={`${details.orderInfo[key].label}`}
        onChange={this.onOrderFormChangeInput}
        touched={details.orderInfo[key].touched}
        value={details.orderInfo[key].value}
      />
    ));
  }

  renderImages() {
    const { personalize } = this.props;
    return Object.keys(personalize.type[personalize.active_type]).map(
      (key, i) => (
        <ImageElement
          key={`img_el_${i}`}
          {...personalize.type[personalize.active_type][key]}
          type={personalize.active_type}
          // hover={personalize.hover === personalize.type[personalize.active_type][key].id}
          // active={personalize.active === personalize.type[personalize.active_type][key].id}
        />
      )
    );
  }

  render() {
    return (
      <div className="col-wrapper measurment">
        <div className=" measurment-image measurment-col-3">
          {this.props.details.side === 'L' ? (
            <ImagesWrapperLeft>{this.renderImages()}</ImagesWrapperLeft>
          ) : (
            <ImagesWrapper>{this.renderImages()}</ImagesWrapper>
          )}
        </div>
        <div className=" measurment-col-1">
          <FormWrapper>{this.renderForm()}</FormWrapper>
        </div>
        <div className="measurment-col-1">
          <FormWrapper>{this.renderOrderInfoForm()}</FormWrapper>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(MeasurmentContainer);
