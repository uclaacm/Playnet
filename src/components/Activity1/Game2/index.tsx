import React, { useContext, useState } from 'react';

import '../../styles/Game.scss';

import Pair1A from '../../../assets/activity1/game2/pair1a.svg';
import Pair1B from '../../../assets/activity1/game2/pair1b.svg';
import Pair2A from '../../../assets/activity1/game2/pair2a.svg';
import Pair2B from '../../../assets/activity1/game2/pair2b.svg';
import Pair3A from '../../../assets/activity1/game2/pair3a.svg';
import Pair3B from '../../../assets/activity1/game2/pair3b.svg';
import Pair4A from '../../../assets/activity1/game2/pair4a.svg';
import Pair4B from '../../../assets/activity1/game2/pair4b.svg';

import { CarouselContext } from '../../shared/Carousel';
import GameSlide from './components/GameSlide';

function AmbiguousGame(): JSX.Element {
  const [ slideIdx, setSlideIdx ] = useState(0);
  const context = useContext(CarouselContext);

  const slides = [
    {
      correctImg: 1,
      img0: Pair1A,
      img1: Pair1B,
      textDefault: 'I saw her duck',
      textIncorrect: 'I meant I saw her crouch to avoid getting hit!',
    },
    {
      correctImg: 0,
      img0: Pair2A,
      img1: Pair2B,
      textDefault: 'There\'s a couch potato over there!',
      textIncorrect: '(dont use this lol)',
    },
    {
      correctImg: 0,
      img0: Pair3A,
      img1: Pair3B,
      textDefault: '1 + "1"',
      textIncorrect: '(dont use this lol)',
    },
    {
      correctImg: 1,
      img0: Pair4A,
      img1: Pair4B,
      textDefault: '1 + "1"',
      textIncorrect: '(dont use this lol)',
    },
  ];

  const advanceGame = () => {
    if (slideIdx && slideIdx === slides.length-1) {
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

export default AmbiguousGame;
