import React, { useState, useEffect } from 'react';

interface SlideBoxProps {
  handleClick ?: () => void;
  imgSrc ?: string;
}

function SlideBox(props: SlideBoxProps): JSX.Element {
  const BLACK = 'black';
  const HOVER_GREEN = '#1CC64B';
  const INCORRECT_RED = '#FF0000';

  const imgSrc = props.imgSrc;

  const [border, setBorder] = useState(BLACK);

  useEffect (() => {
    setBorder(BLACK);
  }, [imgSrc]);

  const handleHover = (color : string) => {
    let newBorder = (border === INCORRECT_RED) ? INCORRECT_RED : color;

    setBorder(newBorder);
  };

  const handleClick = () => {
    props.handleClick && props.handleClick();

    setBorder(INCORRECT_RED);
  };

  return (
    <div
      className={'choice-container'}
      style={{borderColor: border}}
      onClick={handleClick}
      onMouseOver={() => handleHover(HOVER_GREEN)}
      onMouseLeave={() => handleHover(BLACK)}
    >
      <img src={imgSrc ? imgSrc : 'error: missing image'}/>
    </div>
  );
}

export default SlideBox;
