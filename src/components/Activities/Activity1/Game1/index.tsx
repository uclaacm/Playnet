import React, { useContext, useRef, useState } from 'react';

import '../../../styles/Game.scss';

import Apple from '../../../../assets/activity1/apple.svg';
import Car from '../../../../assets/activity1/game1/car.svg';
import Star from '../../../../assets/activity1/game1/star.svg';
import ThreeApples from '../../../../assets/activity1/game1/threeapples.svg';
import ThreeLemons from '../../../../assets/activity1/game1/threelemons.svg';
import TwoApples from '../../../../assets/activity1/game1/twoapples.svg';
import TwoCars from '../../../../assets/activity1/game1/twocars.svg';
import TwoLemons from '../../../../assets/activity1/game1/twolemons.svg';
import TwoUFOs from '../../../../assets/activity1/game1/twoufos.svg';
import UFO from '../../../../assets/activity1/game1/ufo.svg';
import Lemon from '../../../../assets/activity1/lemon.svg';

import { CarouselContext } from '../../../shared/Carousel';

import CipherGameRound from './components/CipherGameRound';
import CipherGameSlide from './components/CipherGameSlide';

function CipherGame(): JSX.Element {
  const rounds = [
    // ROUND 1
    [
      {
        correctImg: 1,
        text: 'CAR',
        imgs: [UFO, Car],
      },
      {
        correctImg: 0,
        text: 'APPLE',
        imgs: [Apple, Lemon],
      },
      {
        correctImg: 1,
        text: 'LEMON',
        imgs: [Apple, Lemon],
      },
    ],
    // ROUND 2
    [
      {
        correctImg: 0,
        text: 'TWO APPLES',
        imgs: [TwoApples, TwoLemons],
      },
      {
        correctImg: 0,
        text: 'TWO UFOS',
        imgs: [TwoUFOs, TwoCars],
      },
    ],
    // ROUND 3
    [
      {
        correctImg: 1,
        text: 'THREE LEMONS',
        imgs: [ThreeApples, ThreeLemons],
      },
    ],
  ];

  const MAX_STARS = 3;
  const [showSuccess, setShowSuccess] = useState(false);
  const [numStars, setNumStars] = useState(0);
  const context = useContext(CarouselContext);

  const advanceGame = () => {
    if (numStars+1 === MAX_STARS) {
      context.next();
      return;
    }
    setShowSuccess(true);
    setNumStars(numStars+1);
  };

  const starCounter = () => {
    return (
      <div className={'star-counter'}>
        <img src={Star} alt="star points"/>
        {numStars}
      </div>
    );
  };

  const displaySuccessScreen = () => {
    return (
      <div className={'cipher-game-success'}>
        <div>You got a star! Let&apos;s keep going.</div>
        {starCounter()}
        <button className="game-intro-button" onClick={() => setShowSuccess(false)}>
          Next Level
        </button>
      </div>
    );
  };

  const displayGame = () => {
    return showSuccess ?
      displaySuccessScreen() :
      <CipherGameRound advanceGame={advanceGame} slides={rounds[numStars]}/>;
  };

  return (
    <div id={'game-wrapper'}>
      <h3> Try to guess what image the alien wants.</h3>
      <div id={'cipher-game-content'}>
        {starCounter()}
        {displayGame()}
      </div>
    </div>
  );
}

export default CipherGame;
