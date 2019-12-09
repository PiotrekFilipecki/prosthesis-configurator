import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Button, ButtonsWrapper } from '../component/Buttons'
import {selectType} from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    selectType: (param) => dispatch(selectType(param)),
  }
};

class TypeContainer extends Component {
  render() {
    const {app, personalize} = this.props;
    return (
      <div className="col-wrapper type">


        <div className="type-wrapper">
          <h2 className="above-header">Above Elbow</h2>
          <h2 className="below-header">Below Elbow</h2>
          <div className="col-wrapper">
            <div className={`col type-box col--center ${personalize.active_type === 'smart_arm' ? 'active' : ''}`} onClick={() => this.props.selectType('smart_arm')} >
              <img src={process.env.PUBLIC_URL + '/images/smart_arm/render.png'} alt="" />
              <h4>Glaze Smart</h4>
            </div>
            <div className={`col type-box col--center ${personalize.active_type === 'sport_arm' ? 'active' : ''}`}  onClick={() => this.props.selectType('sport_arm')} >
              <img src={process.env.PUBLIC_URL + '/images/sport_arm/render.png'} alt="" />
              <h4>Glaze Sport</h4>
            </div>
            <div className={`col type-box col--center ${personalize.active_type === 'smart_forearm' ? 'active' : ''}`}  onClick={() => this.props.selectType('smart_forearm')} >
              <img src={process.env.PUBLIC_URL + '/images/smart_forearm/render.png'} alt="" />
              <h4>Glaze Smart</h4>
            </div>
            {/* <div className={`col type-box col--center ${personalize.active_type === 'smart_forearm_new' ? 'active' : ''}`}  onClick={() => this.props.selectType('smart_forearm_new')} >
              <img src={process.env.PUBLIC_URL + '/images/smart_forearm_new/render.png'} alt="" />
              <h4>Smart forearm NEW</h4>
            </div> */}
            <div className={`col type-box col--center ${personalize.active_type === 'sport_forearm' ? 'active' : ''}`} onClick={() => this.props.selectType('sport_forearm')} >
              <img src={process.env.PUBLIC_URL + '/images/sport_forearm/render.png'} alt="" />
              <h4>Glaze Sport</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state, mapDispatchToProps)(TypeContainer);
