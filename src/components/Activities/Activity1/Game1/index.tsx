import React, { useContext, useState, useEffect } from 'react';

import '../../../styles/Game.scss';

import Star from '../../../../assets/activity1/game1/star.svg';
import Alien from '../../../../assets/alien/alien.svg';

import { CarouselContext } from '../../../shared/Carousel';
import CipherGameRound from './components/CipherGameRound';

interface CipherGameProps {
  numStars: number,
  showSuccess: boolean,
}

function CipherGame(props: CipherGameProps): JSX.Element {
  const {numStars, showSuccess} = props;

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
    context.next();
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
        <button className="playnet-button" onClick={context.next}>
          Next Level
        </button>
      </div>
    );
  };

  return (
    <div id={'game-wrapper'}>
      {/* <div id={'fixed-star-counter'}> {starCounter()} </div> */}
      <div id={'fixed-star-counter'}>
        {!showSuccess &&
        <button className="playnet-button" onClick={context.next}>
          Skip
        </button> }
      </div>
      <div id={'cipher-game-content'}>
        {showSuccess ?
          displayYouGotStar() :
          <CipherGameRound
            advanceGame={advanceGame}
            round={LEVELS[numStars]}
            HASH_VAL={hash}
            isGameSoundMuted={context.isGameSoundMuted}/>}
      </div>
    </div>
  );
}

export default CipherGame;
