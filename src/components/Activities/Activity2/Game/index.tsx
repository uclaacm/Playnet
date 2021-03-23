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
  addTime: (time: number, index: number) => void;
  gameNum: number;
}

function CompressionGame(props: CompressionGameProps): JSX.Element {
  const context = useContext(CarouselContext);
  const [i, setSlide] = useState(0);
  // const [gif, setGif] = useState(props.slides[i].gif);

  const advanceGame = () => {
    if (i === props.slides.length - 1) {
      context.next();
      // setGif('');
      return;
    }
    // setGif(props.slides[i+1].gif);
    setSlide(i + 1);
  };

  return (
    <GamePage
      {...props.slides[i]}
      addTime={props.addTime}
      advanceGame={advanceGame}
      gameNum={props.gameNum}
      slideNum={i}
    />
  );
}

export default CompressionGame;