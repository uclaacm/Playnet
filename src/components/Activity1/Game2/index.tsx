import React, { useState } from 'react';

import '../../styles/Game.scss';

import AlienSvg from '../../../assets/activity1/game2/alien.svg';
import Test from '../../../assets/activity1/game2/test1.svg';
import Test2 from '../../../assets/activity1/game2/test2.svg';
import GameSlide from './components/GameSlide';

function AmbiguousGame(): JSX.Element {
  const [ slideIdx, setSlideIdx ] = useState(0);

  const slides = [
    {
      correctImg: 1,
      img0: Test,
      img1: Test2,
      textDefault: 'I saw her duck',
      textIncorrect: 'I meant I saw her crouch to avoid getting hit!',
    },
    {
      correctImg: 0,
      img0: AlienSvg,
      img1: AlienSvg,
      textDefault: '1 + "1"',
      textIncorrect: '(dont use this lol)',
    },
  ];

  const advanceGame = () => {
    if (slideIdx && slideIdx === slides.length-1) {
      // TODO: Implement transition out of game
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
