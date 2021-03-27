import React, { useRef, useState } from 'react';

import Star from '../../../../../assets/activity1/game1/star.svg';

import { scramble } from '../../../../../utils';
import Alien, { ALIEN_STATE } from '../../../../shared/Alien';
import { TextBubbleStyles } from '../../../../shared/PlaynetConstants';

import TextBubble from '../../TextBubble';
import CipherGameSlide from './../components/CipherGameSlide';
import ProgressBar from './../components/ProgressBar';

export interface SlideComponents {
  correctImg: number,
  text: string,
  imgs: string[],
}

interface CipherGameRoundProps {
  slides: SlideComponents[];
  advanceGame: () => void;
}

function CipherGameRound(props : CipherGameRoundProps): JSX.Element {
  const {slides, advanceGame} = props;

  const [MAX_HAPPINESS, CORRECT_PTS, INCORRECT_PTS] = [100, 20, 10];
  const HASH_VAL = 5;
  const [slideIdx, setSlideIdx] = useState(0);
  const [happiness, setHappiness] = useState(0);

  // -----ALIEN HANDLERS------
  const [alienState, setAlienState] = useState(ALIEN_STATE.BASE);
  const alienTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleAlienState = (state: ALIEN_STATE, cb?: () => void) => {
    alienTimeout.current && clearTimeout(alienTimeout.current);
    setAlienState(state);
    alienTimeout.current = setTimeout(() => {
      alienTimeout.current = undefined;
      setAlienState(ALIEN_STATE.BASE);
      cb && cb();
    }, 1000);
  };
  // ------------------------
  const displayScrambledText = () : string => { // split phrase into words and scramble individually
    const words = slides[slideIdx].text.split(' ');
    const reducer = (acc : string, cur : string) => acc + ' ' + scramble(HASH_VAL, cur);
    return words.reduce(reducer, '');
  };

  const advanceRound = (correct : boolean) => {
    if (correct) {
      const newHappiness = Math.min(happiness+CORRECT_PTS, 100); // no overflow
      if (newHappiness === MAX_HAPPINESS) {
        advanceGame();
        return;
      }
      setHappiness(newHappiness);
      handleAlienState(ALIEN_STATE.HAPPY);
    } else {
      setHappiness(Math.max(happiness-INCORRECT_PTS,0)); // no underflow
      handleAlienState(ALIEN_STATE.ANGER);
    }
    nextSlide();
  };

  const nextSlide = () => {
    if (slideIdx === slides.length-1) { // randomly loop to a previous slide
      setSlideIdx(Math.floor(Math.random()*(slides.length-1)));
      return;
    }
    setSlideIdx(slideIdx+1);
  };

  return (
    <div className={'game-content'}>
      <div className={'gamebox'}>
        <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayScrambledText()} />
        <Alien alienState={alienState} />
        <div className={'happiness-bar'}>
          <ProgressBar percentComplete={happiness}/>
          <img src={Star} alt="star points"/>
        </div>
        Happiness
      </div>
      <CipherGameSlide {...slides[slideIdx]} advanceRound={advanceRound} />
    </div>
  );
}

export default CipherGameRound;
