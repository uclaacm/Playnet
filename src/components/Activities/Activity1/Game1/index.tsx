import React, { useContext, useState, useEffect } from 'react';

import '../../../styles/Game.scss';

import Star from '../../../../assets/activity1/game1/star.svg';
import Alien from '../../../../assets/alien/alien.svg';

import { CarouselContext } from '../../../shared/Carousel';
import CipherGameRound from './components/CipherGameRound';

interface CipherGameProps {
  numStars: number,
  skips: number;
}

function CipherGame(props: CipherGameProps): JSX.Element {
  const items = ['APPLE', 'CAR', 'UFO', 'LEMON'];
  const nums = ['ONE', 'TWO', 'THREE'];
  const nums_and_apple: string[] = nums.reduce((n_acc: string[], n_v: string) => {
    return [...n_acc, `${n_v} APPLE`];
  }, []);
  const nums_and_items: string[] = nums.reduce((n_acc: string[], n_v: string) => {
    const num_and_items = items.map((i_v) => `${n_v} ${i_v}`);
    return [...n_acc, ...num_and_items];
  }, []);
  const LEVELS = [items, nums_and_apple, nums_and_items];
  const { next, jumpNumSlides, isGameSoundMuted } = useContext(CarouselContext);
  const { numStars, skips } = props;

  const [hash, setHash] = useState(5);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('cipher-hash');
    if (state) {
      setHash(parseInt(state));
    } else {
      const HASH_VAL = Math.floor(Math.random() * 10) + 1;
      storage.setItem('cipher-hash', `${HASH_VAL}`);
      setHash(HASH_VAL);
    }
    return () => storage.removeItem('cipher-hash');
  }, []);

  return (
    <div id={'game-wrapper'}>
      <div id={'fixed-star-counter'}>
        <button className="playnet-button playnet-btn-grey" onClick={() => jumpNumSlides(skips)}>
          Skip Game :(
        </button>
      </div>
      <div id={'cipher-game-content'}>
        <CipherGameRound
          advanceGame={next}
          round={LEVELS[numStars]}
          HASH_VAL={hash}
          isGameSoundMuted={isGameSoundMuted} />
      </div>
    </div>
  );
}

interface SuccessCipherGameStateProps {
  numStars: number;
}
function SuccessCipherGameState(props: SuccessCipherGameStateProps): JSX.Element {
  const { next } = useContext(CarouselContext);
  return (
    <div id={'game-wrapper'}>
      <div id={'cipher-game-content'}>
        <div className={'cipher-game-success'}>
          <div>You got a star! Let&apos;s keep going.</div>
          <img src={Alien} alt='friendly alien' />
          <div className={'star-counter'}>
            <img src={Star} alt="star points" />
            {props.numStars}
          </div>
          <button className="playnet-button" onClick={next}>
            Next Level
          </button>
        </div>
      </div>
    </div>
  );
}

export default CipherGame;
export {SuccessCipherGameState};