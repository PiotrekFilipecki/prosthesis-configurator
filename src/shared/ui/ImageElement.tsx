import type { CSSProperties, PropsWithChildren } from 'react';
import React from 'react';
import type {
  PersonalizeElement,
  ProsthesisType
} from '../../types/personalize';

const IMAGE_PATH = `${process.env.PUBLIC_URL}/images`;

interface ImageElementProps extends PersonalizeElement {
  type: ProsthesisType;
  hover?: boolean;
  active?: boolean;
}

const imgStyle = ({ width, x, y }: PersonalizeElement): CSSProperties => ({
  top: `${y}vw`,
  left: `${x}vw`,
  width: `${width}vw`
});

const ImageElementComponent: React.FC<ImageElementProps> = (props) => (
  <div className="image-element" style={imgStyle(props)}>
    <img
      src={`${IMAGE_PATH}/${props.type}/${props.path}/${props.selectedFinishing}/${props.selectedColor}.png`}
      className={`
        ${props.hover ? 'image-hover' : ''}
        ${props.active ? 'image-active' : ''}`}
      alt=""
    />
  </div>
);

export const ImageElement = React.memo(ImageElementComponent);

export const ImagesWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="image-wrapper right-render">{children}</div>
);

export const ImagesWrapperLeft: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="image-wrapper left-render">{children}</div>
);
