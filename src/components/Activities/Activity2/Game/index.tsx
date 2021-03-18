import React, { useContext, useState } from 'react';

import '../../../styles/CompressionGame.scss';

import { CarouselContext } from '../../../shared/Carousel';

import GamePage from './GamePage';

interface CompressionGameProps {
  slides: Record<string, unknown>[];  //each object should have a list of choices, a gif, and
  addTime: (time: number, index: number) => void;
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
      addTime={props.addTime}
      advanceGame={advanceGame}
      gameNum={props.gameNum}
      slideNum={i}
    />
  );
}

export default CompressionGame;