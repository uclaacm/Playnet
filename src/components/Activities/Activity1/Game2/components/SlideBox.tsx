import React, { useState, useEffect } from 'react';

import { PlaynetColors, SlideBoxStyles } from '../../../../shared/PlaynetConstants';

interface SlideBoxProps {
  handleClickAndReturnIsCorrect: () => boolean;
  imgSrc?: string;
  text?: string;
  style?: SlideBoxStyles;
}

function SlideBox(props: SlideBoxProps): JSX.Element {
  const imgSrc = props.imgSrc;

  const [border, setBorder] = useState(PlaynetColors.BLACK);
  const classStyle = (props.style === undefined ? SlideBoxStyles.LARGE_PERCENT_BASED : props.style);

  useEffect(() => {
    setBorder(PlaynetColors.BLACK);
  }, [imgSrc, props.text]);


  const handleHover = (color: PlaynetColors) => {
    if (border === PlaynetColors.INCORRECT_RED) return;
    setBorder(color);
  };

  const handleClick = () => {
    if (props.handleClickAndReturnIsCorrect()) {
      setBorder(PlaynetColors.INCORRECT_RED);
    } else {
      setBorder(PlaynetColors.HOVER_GREEN);
    }
  };

  return (
    <div
      className={classStyle}
      style={{ borderColor: border }}
      onClick={handleClick}
      onMouseOver={() => handleHover(PlaynetColors.HOVER_GREEN)}
      onMouseLeave={() => handleHover(PlaynetColors.BLACK)}
    >
      {imgSrc !== undefined ? <img src={imgSrc} /> : <span>{props.text}</span>}
    </div>
  );
}

export default SlideBox;
