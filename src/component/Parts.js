import React from 'react'

export const PartsWrapper = (props) => {
  return (
    <div className="parts-wrapper">
      {props.children}
    </div>
  )
}

export const PartsBox = props => {
  return (
    <div className={`parts-box ${props.active ? 'active' : ''}`}
      onClick={() => props.onClick(props.part.path)}
      onMouseOver={() => props.onMouseOver(props.part.id)}
      onMouseOut={() => props.onMouseOut()}
    >
     {props.part.name}
    </div>
  )
};
