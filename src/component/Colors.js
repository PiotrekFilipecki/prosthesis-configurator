import React from 'react'

export const ColorBox = (props) => {
  return (
    <div onClick={() => props.onClick(props.color)} className={`color-box ${props.active ? 'active' : ''}`} style={{backgroundColor: props.hex}}>
      {/* <span className="color" style={{backgroundColor: props.hex}}></span> */}
      {/* <p>{ props.color }</p> */}
    </div>
  )
}

export const ColorsWrapper = props => {
  return (
    <div className="box-wrapper colors-wrapper">
      {props.children}
    </div>
  )
}
