import React, { useContext, useEffect, useState } from 'react';

import '../../../styles/CompressionGame.scss';

import { CarouselContext } from '../../../shared/Carousel';
import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';
import FillInBlankGamePage from './FillInBlankGamePage';

export interface CompressionGamePageComponents {
  choices: string[];
  correctIdx: number;
  gif: JSX.Element;
  answerDisplayWords: string[];
  answerDisplayStyles: AnswerDisplayStyles[];
  answerSlotIndex: number;
}

interface CompressionGameProps {
  slides: CompressionGamePageComponents[];
  tag: string;
}

function CompressionGame(props: CompressionGameProps): JSX.Element {
  const {slides, tag} = props;
  const sessionStorage = window.sessionStorage;
  const context = useContext(CarouselContext);
  const [time, setTime] = useState(0);
  const [slide, setSlide] = useState(0);
  const addTimeElapsed = (t: number) => setTime(prev => prev + t);

  useEffect(() => {
    if (!time) return;
    sessionStorage.setItem(`${tag}Time`, `${time}`);
  }, [time]);

  const advanceGame = () => {
    if (slide === slides.length - 1) {
      context.next();
      return;
    }
    setSlide(slide + 1);
  };

  return (
    <FillInBlankGamePage
      pageInfo={slides[slide]}
      addTimeElapsed={addTimeElapsed}
      advanceGame={advanceGame}
      slideNum={slide}
    />
  );
}

export default CompressionGame;
