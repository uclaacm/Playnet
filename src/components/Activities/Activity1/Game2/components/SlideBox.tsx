import React, { useState, useEffect } from 'react';

import { PlaynetColors } from '../../../../shared/PlaynetConstants';

interface SlideBoxProps {
  handleClick: () => void;
  imgSrc: string;
}

function SlideBox(props: SlideBoxProps): JSX.Element {
  const imgSrc = props.imgSrc;

  const [border, setBorder] = useState(PlaynetColors.BLACK);

  useEffect (() => {
    setBorder(PlaynetColors.BLACK);
  }, [imgSrc]);

  const handleHover = (color : PlaynetColors) => {
    if (border === PlaynetColors.INCORRECT_RED) return;
    setBorder(color);
  };

  const handleClick = () => {
    props.handleClick();
    setBorder(PlaynetColors.INCORRECT_RED);
  };

  return (
    <div
      className={'choice-container'}
      style={{borderColor: border}}
      onClick={handleClick}
      onMouseOver={() => handleHover(PlaynetColors.HOVER_GREEN)}
      onMouseLeave={() => handleHover(PlaynetColors.BLACK)}
    >
      <img src={imgSrc ? imgSrc : 'error: missing image'}/>
    </div>
  );
}

export default SlideBox;
