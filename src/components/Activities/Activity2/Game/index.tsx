import React, { useContext, useState } from 'react';

import '../../../styles/CompressionGame.scss';

import { CarouselContext } from '../../../shared/Carousel';

import GamePage from './FillInBlankGamePage';
import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';

interface CompressionGamePageComponents {
  choices: string[];
  correctChoice: number;
  gif: JSX.Element;
  answerDisplayWords: string[];
  answerDisplayStyles: AnswerDisplayStyles[];
  answerSlotIndex: number;
}

interface CompressionGameProps {
  slides: CompressionGamePageComponents[];  //each object should have a list of choices, a gif, and
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
    <GamePage
      {...props.slides[i]}
      setTimeElapsed={props.setTimeElapsed}
      advanceGame={advanceGame}
      gameNum={props.gameNum}
      slideNum={i}
    />
  );
}

export default CompressionGame;
