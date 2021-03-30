import React, { useState, useEffect } from 'react';

import { PlaynetColors, AnswerChoiceBoxStyles } from './PlaynetConstants';

interface AnswerChoiceBoxProps {
  handleClickAndReturnIsCorrect: () => boolean;
  imgSrc?: string;
  text?: string;
  style?: AnswerChoiceBoxStyles;
  backgroundImg?: string;
}

function AnswerChoiceBox(props: AnswerChoiceBoxProps): JSX.Element {
  const {imgSrc, backgroundImg} = props;

  const [border, setBorder] = useState(PlaynetColors.BLACK);
  const classStyle = (props.style === undefined ? AnswerChoiceBoxStyles.LARGE_PERCENT_BASED : props.style);

  useEffect(() => {
    setBorder(PlaynetColors.BLACK);
  }, [imgSrc, props.text]);


  const handleHover = (color: PlaynetColors) => {
    if (border === PlaynetColors.INCORRECT_RED) return;
    setBorder(color);
  };

  const handleClick = () => {
    if (!props.handleClickAndReturnIsCorrect()) {
      setBorder(PlaynetColors.INCORRECT_RED);
    } else {
      setBorder(PlaynetColors.HOVER_GREEN);
    }
  };

  return (
    <div
      className={`${classStyle} no-background-repeat`}
      id={backgroundImg}
      style={{ borderColor: border }}
      onClick={handleClick}
      onMouseOver={() => handleHover(PlaynetColors.HOVER_GREEN)}
      onMouseLeave={() => handleHover(PlaynetColors.BLACK)}
    >
      {imgSrc !== undefined ? <img src={imgSrc}/> : <span>{props.text}</span>}
    </div>
  );
}

export default AnswerChoiceBox;
