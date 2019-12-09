import React from 'react';
const IMAGE_PATH = process.env.PUBLIC_URL + '/images';

/**
 *
 * @param {*} props
 * position: {
 *  x: Xpx, y: Ypx
 * }
 * image: Image
 */
export const ImageElement = props => {
  return (
    <div
      className='image-element'
      style={imgStyle(props)}>
      <img src={`${IMAGE_PATH}/${props.type}/${props.path}/${props.selectedFinishing}/${props.selectedColor}.png`}
          className={`
            ${props.hover ? 'image-hover' : ''}
            ${props.active ? 'image-active' : ''}`
          } alt="" />
    </div>
  )
}

export const ImagesWrapper = props => {
  return (
    <div className="image-wrapper right-render" >
      {props.children}
    </div>
  )
}

export const ImagesWrapperLeft = props => {

  console.log(props, 'hehe');
  return (
    <div className="image-wrapper left-render" >
      {props.children}
    </div>
  )
}

//className={`${props.details.side === 'L' ? 'image-wrapper render-left' : 'image-wrapper'}`}//
function imgStyle(props) {
  const style = {
    top: `${props.y}vw`,
    left: `${props.x}vw`,
    width: `${props.width}vw`
  };

  return style;
}
