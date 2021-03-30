import React, { useRef, useState} from 'react';

import Star from '../../../../../assets/activity1/game1/star.svg';

import { scramble } from '../../../../../utils';
import Alien, { ALIEN_STATE } from '../../../../shared/Alien';
import { TextBubbleStyles, Activity1Game1Values } from '../../../../shared/PlaynetConstants';

import TextBubble from '../../TextBubble';
import CipherGameSlide from './../components/CipherGameSlide';
import ProgressBar from './../components/ProgressBar';

export interface SlideComponents {
  correctIdx: number,
  cards: string[],
}

interface CipherGameRoundProps {
  round: string[];
  advanceGame: () => void;
}

function CipherGameRound(props : CipherGameRoundProps): JSX.Element {
  const {MAX_HAPPINESS, CORRECT_PTS, INCORRECT_PTS} = Activity1Game1Values;
  const HASH_VAL = 5;

  const {round, advanceGame} = props;

  const getShuffledCards = () => {
    let cards = [...round];
    const newSlides = [];
    for (let i = 0; i < 3; i++) {
      if (cards.length === 1) cards = [...round];
      const card0 = cards[Math.floor(Math.random()*cards.length)]; // get card #1
      cards = cards.filter(item => item !== card0);
      const card1 = cards[Math.floor(Math.random()*cards.length)]; // get a non duplicate card

      if (Math.floor(Math.random()*2)) { // want correct img to be card #1
        newSlides.push(
          {
            correctIdx: 0,
            cards: [card0, card1],
          },
        );
      } else {
        newSlides.push(
          {
            correctIdx: 1,
            cards: [card1, card0],
          },
        );
      }
    }
    return newSlides;
  };

  const [slides, setSlides] = useState<SlideComponents[]>(getShuffledCards());
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
    const slide = slides[slideIdx];
    const words = slide.cards[slide.correctIdx].split(' ');
    const reducer = (acc : string, cur : string) => `${acc} ${scramble(HASH_VAL, cur)}`;
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
    if (slideIdx+1 === slides.length) {
      setSlides(getShuffledCards);
      setSlideIdx(0);
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
