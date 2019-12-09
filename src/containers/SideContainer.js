import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Button, ButtonsWrapper } from '../component/Buttons'
import {selectSide} from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    selectSide: (param) => dispatch(selectSide(param)),
  }
};

class SideContainer extends Component {
  render() {
    const {app, details} = this.props;
    return (
      <div className="col-wrapper type">

        {/* <div className="col-1">
          <p>Choose the side of your prosthetic.</p>
        </div> */}
        <div className="side-wrapper">
          <div className="col-wrapper">
           <div className={`col col--center side-box ${details.side === 'R' ? 'active' : ''}`} onClick={() => this.props.selectSide('R')}>
              <img src={process.env.PUBLIC_URL + '/images/right.png'} alt="" />
              <h4 className="right-header">Right</h4>
            </div>
            <div className={`col col--center side-box ${details.side === 'L' ? 'active' : ''}`} onClick={() => this.props.selectSide('L')} >
              <img src={process.env.PUBLIC_URL + '/images/left.png'} alt="" />
              <h4 className="left-header">Left</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state, mapDispatchToProps)(SideContainer);
