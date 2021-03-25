import React, { useContext, useState } from 'react';

import '../../../styles/CompressionGame.scss';

import { CarouselContext } from '../../../shared/Carousel';
import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';
import FillInBlankGamePage from './FillInBlankGamePage';

export interface CompressionGamePageComponents {
  choices: string[];
  correctChoice: number;
  gif: JSX.Element;
  answerDisplayWords: string[];
  answerDisplayStyles: AnswerDisplayStyles[];
  answerSlotIndex: number;
}

interface CompressionGameProps {
  slides: CompressionGamePageComponents[];
  setTimeElapsed: (gameNum: number, slideNum: number, time: number) => void;
  gameNum: number;
}

function CompressionGame(props: CompressionGameProps): JSX.Element {
  const context = useContext(CarouselContext);
  const [i, setSlide] = useState(0);

  const advanceGame = () => {
    if (i === props.slides.length - 1) {
      context.next();
      return;
    }
    setSlide(i + 1);
  };

  return (
    <FillInBlankGamePage
      pageInfo={props.slides[i]}
      setTimeElapsed={props.setTimeElapsed}
      advanceGame={advanceGame}
      gameNum={props.gameNum}
      slideNum={i}
    />
  );
}

export default CompressionGame;
