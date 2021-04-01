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
  setTimeElapsed: (time: number) => void;
}

function CompressionGame(props: CompressionGameProps): JSX.Element {
  const context = useContext(CarouselContext);
  const [slide, setSlide] = useState(0);

  const advanceGame = () => {
    if (slide === props.slides.length - 1) {
      context.next();
      return;
    }
    setSlide(slide + 1);
  };

  return (
    <FillInBlankGamePage
      pageInfo={props.slides[slide]}
      addTimeElapsed={props.setTimeElapsed}
      advanceGame={advanceGame}
      slideNum={slide}
    />
  );
}

export default CompressionGame;
