import React, { useState, useEffect } from 'react';

import { PlaynetColors, AnswerChoiceBoxStyles } from './PlaynetConstants';

interface AnswerChoiceBoxProps {
  handleClick: () => void;
  setHover?: (isHover: boolean) => void;
  imgSrc?: string;
  text?: string;
  style?: AnswerChoiceBoxStyles;
  id?: string;
  isCorrect: boolean;
  roundId?: number;
}

function AnswerChoiceBox(props: AnswerChoiceBoxProps): JSX.Element {
  const {
    setHover, imgSrc, id, text, isCorrect, roundId,
  } = props;

  const [border, setBorder] = useState(PlaynetColors.BLACK);
  const classStyle = (props.style === undefined ? AnswerChoiceBoxStyles.LARGE_PERCENT_BASED : props.style);

  useEffect(() => {
    setBorder(PlaynetColors.BLACK);
  }, [imgSrc, text, roundId]);

  const handleHoverOver = () => {
    if (border === PlaynetColors.INCORRECT_RED) return;
    setBorder(PlaynetColors.HOVER_GREEN);
    setHover && setHover(true);
  };

  const handleHoverOff = () => {
    if (border === PlaynetColors.INCORRECT_RED) return;
    setBorder(PlaynetColors.BLACK);
    setHover && setHover(false);
  };

  const handleClick = () => {
    isCorrect ? setBorder(PlaynetColors.HOVER_GREEN) : setBorder(PlaynetColors.INCORRECT_RED);
    props.handleClick();
  };

  return (
    <div
      className={`${classStyle} no-background-repeat`}
      id={id}
      style={{ borderColor: border }}
      onClick={handleClick}
      onMouseOver={() => handleHoverOver()}
      onMouseLeave={() => handleHoverOff()}
    >
      {imgSrc && <img src={imgSrc} />}
      {text && <span>{props.text}</span>}
    </div>
  );
}

export default AnswerChoiceBox;
