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
      correctImg: 1,
      imgOption0: Pair1A,
      imgOption1: Pair1B,
      textDefault: 'I saw her duck',
      textIncorrect: 'I meant I saw her crouch to avoid getting hit!',
    },
    {
      correctImg: 1,
      imgOption0: Pair2A,
      imgOption1: Pair2B,
      textDefault: 'Look at the couch potato',
      textIncorrect: 'I meant the potato on the couch!',
    },
    {
      correctImg: 0,
      imgOption0: Pair3A,
      imgOption1: Pair3B,
      textDefault: 'I want to buy 2000 pizza',
      textIncorrect: 'I meant I want to buy 2000 slices of pizza!',
    },
    {
      correctImg: 0,
      imgOption0: Pair4A,
      imgOption1: Pair4B,
      textDefault: 'Show me a toy hoyse',
      textIncorrect: 'I meant show me a toy horse!',
    },
  ];

  const advanceGame = () => {
    if (slideIdx === slides.length-1) {
      context.next();
    }
    setSlideIdx(slideIdx+1);
  };

  return (
    <div id={'game-wrapper'}>
      <h3> Try to guess what the alien is talking about.</h3>
      <GameSlide
        {...slides[slideIdx]}
        advanceGame={advanceGame}
      />
    </div>
  );
}

export default AmbiguousPhrasingGame;
