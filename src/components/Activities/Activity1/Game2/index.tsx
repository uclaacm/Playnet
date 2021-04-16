import React, { useContext, useState } from 'react';

import '../../../styles/Game.scss';

import Pair1A from '../../../../assets/activity1/game2/pair1a.svg';
import Pair1B from '../../../../assets/activity1/game2/pair1b.svg';
import Pair2A from '../../../../assets/activity1/game2/pair2a.svg';
import Pair2B from '../../../../assets/activity1/game2/pair2b.svg';
import Pair3A from '../../../../assets/activity1/game2/pair3a.svg';
import Pair3B from '../../../../assets/activity1/game2/pair3b.svg';
import Pair4A from '../../../../assets/activity1/game2/pair4a.svg';
import Pair4B from '../../../../assets/activity1/game2/pair4b.svg';

import { CarouselContext } from '../../../shared/Carousel';
import GameSlide from './components/GameSlide';

function AmbiguousPhrasingGame(): JSX.Element {
  const [ slideIdx, setSlideIdx ] = useState(0);
  const context = useContext(CarouselContext);

  const slides = [
    {
      correctIdx: 1,
      imgs: [Pair1A, Pair1B],
      textDefault: 'I saw her duck',
      textIncorrect: 'I meant I saw her crouch to avoid getting hit!',
    },
    {
      correctIdx: 1,
      imgs: [Pair2A, Pair2B],
      textDefault: 'Look at the couch potato',
      textIncorrect: 'I meant the potato on the couch!',
    },
    {
      correctIdx: 0,
      imgs: [Pair3A, Pair3B],
      textDefault: 'I want to buy 2000 pizza',
      textIncorrect: 'I meant I want to buy 2000 slices of pizza!',
    },
    {
      correctIdx: 0,
      imgs: [Pair4A, Pair4B],
      textDefault: 'Show me a toy hoyse',
      textIncorrect: 'I meant show me a toy horse!',
    },
  ];

  const advanceGame = () => {
    if (slideIdx === slides.length-1) {
      context.next();
      return;
    }
    setSlideIdx(slideIdx+1);
  };

  return (
    <div id={'game-wrapper'}>
      <GameSlide
        {...slides[slideIdx]}
        advanceGame={advanceGame}
        isGameSoundMuted={context.isGameSoundMuted}
      />
    </div>
  );
}

export default AmbiguousPhrasingGame;
