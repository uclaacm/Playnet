import React, { useEffect, useRef, useState} from 'react';

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
  HASH_VAL: number;
}

function CipherGameRound(props : CipherGameRoundProps): JSX.Element {
  const {MAX_HAPPINESS, CORRECT_PTS, INCORRECT_PTS, THRESHOLD_TO_HELP_PER_GAME} = Activity1Game1Values;
  const {round, advanceGame, HASH_VAL} = props;

  const getShuffledCards = () => {
    let cards = [...round];
    const newSlides = [];
    for (let i = 0; i < 3; i++) {
      if (cards.length === 1) cards = [...round];
      const correct_card = cards.splice(Math.floor(Math.random()*cards.length), 1)[0]; // get correct card & remove
      const incorrect_card = cards[Math.floor(Math.random()*cards.length)]; // get a non duplicate card

      if (Math.floor(Math.random()*2)) {
        newSlides.push(
          {
            correctIdx: 0,
            cards: [correct_card, incorrect_card],
          },
        );
      } else {
        newSlides.push(
          {
            correctIdx: 1,
            cards: [incorrect_card, correct_card],
          },
        );
      }
    }
    return newSlides;
  };

  const [slides, setSlides] = useState<SlideComponents[]>(getShuffledCards());
  const [slideIdx, setSlideIdx] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [hoverIncorrect, setHoverIncorrect] = useState(false);
  const [roundNum, setRoundNum] = useState(0);

  useEffect(()=>{
    console.log(roundNum)
    if (roundNum >   THRESHOLD_TO_HELP_PER_GAME ) {
      console.log(roundNum)

      hoverIncorrect ? handleAlienState(ALIEN_STATE.SAD) : handleAlienState(ALIEN_STATE.BASE);
    }
  }, [hoverIncorrect]);

  // -----ALIEN HANDLERS------
  const [alienState, setAlienState] = useState(ALIEN_STATE.BASE);
  const alienTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleAlienState = (state: ALIEN_STATE, timeout?: boolean, cb?: () => void) => {
    setAlienState(state);
    if(timeout === true) {
      alienTimeout.current && clearTimeout(alienTimeout.current);
      alienTimeout.current = setTimeout(() => {
        alienTimeout.current = undefined;
        setAlienState(ALIEN_STATE.BASE);
        cb && cb();
      }, 1000);
    } else {
      setAlienState(state);
    }
  };
  // ------------------------
  const displayScrambledText = () : string => { // split phrase into words and scramble individually
    const slide = slides[slideIdx];
    const correctWord = slide.cards[slide.correctIdx].split(' ');
    const reducer = (acc : string, cur : string) => `${acc} ${scramble(HASH_VAL, cur)}`;
    return correctWord.reduce(reducer, '');
  };

  const advanceRound = (correct : boolean) => {
    if (clickDisabled) return;
    setClickDisabled(true); // block repeated clicks during alien animation
    if (correct) {
      const newHappiness = Math.min(happiness+CORRECT_PTS, 100); // no overflow
      const handler = newHappiness === MAX_HAPPINESS ? advanceGame : nextSlide; // prevent no-op by finishing animation before scene change
      setHappiness(newHappiness);
      handleAlienState(ALIEN_STATE.HAPPY, true, handler);
    } else {
      setHappiness(Math.max(happiness-INCORRECT_PTS,0)); // no underflow
      handleAlienState(ALIEN_STATE.ANGER, true, nextSlide);
    }
  };

  const nextSlide = () => {
    setClickDisabled(false);
    if (slideIdx+1 === slides.length) {
      setSlides(getShuffledCards);
      setSlideIdx(0);
      return;
    }
    setSlideIdx(slideIdx+1);
    setRoundNum(prev=>prev+1);
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
      <CipherGameSlide {...slides[slideIdx]} advanceRound={advanceRound} 
        setHoverIncorrect={setHoverIncorrect} roundNum={slideIdx}/>
    </div>
  );
}

export default CipherGameRound;
