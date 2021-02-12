import React, { useState } from 'react';

interface SlideBoxProps {
  handleClick ?: () => void;
  imgSrc ?: string;
}

function SlideBox(props: SlideBoxProps): JSX.Element {
  const [border, setBorder] = useState('black');

  const HOVER_GREEN = '#1CC64B';
  const INCORRECT_RED = '#FF0000';

  const handleHover = (color : string) => {
    let newBorder = INCORRECT_RED;
    if (border !== INCORRECT_RED) {
      newBorder = color;
    }

    setBorder(newBorder);
  };

  const handleClick = () => {
    props.handleClick && props.handleClick();

    // setBorder(INCORRECT_RED);
  };

  return (
    <div
      onClick={handleClick}
      onMouseOver={() => handleHover(HOVER_GREEN)}
      onMouseLeave={() => handleHover('black')}
    >
      <div
        style={{borderColor: border}}
        className={'choice-container'}
      >
        <img src={props.imgSrc ? props.imgSrc : 'error: missing image'}/>
      </div>
    </div>
  );
}

export default SlideBox;