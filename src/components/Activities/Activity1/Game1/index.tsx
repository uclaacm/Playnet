import React, { useContext, useState, useEffect } from 'react';

import '../../../styles/Game.scss';

import Star from '../../../../assets/activity1/game1/star.svg';
import Alien from '../../../../assets/alien/alien.svg';

import { CarouselContext } from '../../../shared/Carousel';
import CipherGameRound from './components/CipherGameRound';

function CipherGame(): JSX.Element {
  const items = ['APPLE', 'CAR', 'UFO', 'LEMON'];
  const nums = ['ONE', 'TWO', 'THREE'];
  const nums_and_apple : string[] = nums.reduce((n_acc : string[], n_v : string) => {
    return [...n_acc, `${n_v} APPLE`];
  }, []);
  const nums_and_items : string[] = nums.reduce((n_acc : string[], n_v : string) => {
    const num_and_items = items.map((i_v) => `${n_v} ${i_v}`);
    return [...n_acc, ...num_and_items];
  }, []);
  const LEVELS = [items, nums_and_apple, nums_and_items];

  const MAX_STARS = 3;
  const [numStars, setNumStars] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const context = useContext(CarouselContext);

  const [hash, setHash] = useState(5);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('cipher-hash');
    if (state) {
      setHash(parseInt(state));
    } else {
      const HASH_VAL = Math.floor(Math.random()*10)+1;
      storage.setItem('cipher-hash', `${HASH_VAL}`);
      setHash(HASH_VAL);
    }
    return () => storage.removeItem('cipher-hash');
  }, []);

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

  const displayYouGotStar = () => {
    return (
      <div className={'cipher-game-success'}>
        <div>You got a star! Let&apos;s keep going.</div>
        <img src={Alien} alt='friendly alien'/>
        {starCounter()}
        <button className="game-intro-button" onClick={() => setShowSuccess(false)}>
          Next Level
        </button>
      </div>
    );
  };

  return (
    <div id={'game-wrapper'}>
      <h3> Try to guess what image the alien wants.</h3>
      <div id={'cipher-game-content'}>
        {starCounter()}
        {showSuccess ?
          displayYouGotStar() :
          <CipherGameRound advanceGame={advanceGame} round={LEVELS[numStars]} HASH_VAL={hash}/>}
      </div>
    </div>
  );
}

export default CipherGame;