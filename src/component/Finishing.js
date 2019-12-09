import React from 'react'

export const FinishingWrapper = (props) => {
  return (
    <div className="box-wrapper finishing-wrapper">
      {props.children}
    </div>
  )
};

export const FinishingBox = props => {
  return (
    <div className={`box finishing-box ${props.active ? 'active' : ''}`} onClick={() => props.onClick(props.finishing)} >
      {props.finishing}
    </div>
  )
};
