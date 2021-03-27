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

import { scramble } from '../../../../utils';
import Alien, { ALIEN_STATE } from '../../../shared/Alien';
import { CarouselContext } from '../../../shared/Carousel';
import { TextBubbleStyles } from '../../../shared/PlaynetConstants';

import TextBubble from '../TextBubble';
import CipherGameSlide from './components/CipherGameSlide';
import ProgressBar from './components/ProgressBar';

function CipherGame(): JSX.Element {
  const slides = [
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
      correctImg: 0,
      text: 'TWO APPLES',
      imgs: [TwoApples, TwoLemons],
    },
    {
      correctImg: 0,
      text: 'TWO UFOS',
      imgs: [TwoUFOs, TwoCars],
    },
    {
      correctImg: 1,
      text: 'THREE LEMONS',
      imgs: [ThreeApples, ThreeLemons],
    },
  ];

  const MAX_HAPPINESS = 3;
  const [slideIdx, setSlideIdx] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [happiness, setHappiness] = useState(0);
  // const [stars, setStars] = useState(0);
  const context = useContext(CarouselContext);

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

  const hash = 5;
  const displayText = () : string => {
    return scramblePhrase(slides[slideIdx].text);
  };

  const scramblePhrase = (phrase : string) => { // split phrase into words and scramble individually
    const reducer = (acc : string, cur : string) => acc + ' ' + scramble(hash,cur);
    return phrase.split(' ').reduce(reducer, '');
  };

  const advanceGame = (correct : boolean) => {
    if (correct) {
      if (happiness+1 === MAX_HAPPINESS) {
        context.next();
        return;
      }
      setHappiness(happiness+1);
      handleAlienState(ALIEN_STATE.HAPPY, nextSlide);
      setShowSuccess(true);
    } else {
      handleAlienState(ALIEN_STATE.ANGER, nextSlide);
      setShowSuccess(false);
    }
  };

  const nextSlide = () => {
    if (slideIdx === slides.length-1) { // randomly loop to a previous slide
      setSlideIdx(Math.floor(Math.random()*(slides.length-1)));
      return;
    }
    setSlideIdx(slideIdx+1);
  };

  const starCounter = () => {
    return (
      <div className={'star-counter'}>
        <img src={Star} alt="star points"/>
        {happiness}
      </div>
    );
  };

  const displaySuccessScreen = () => {
    return (
      <div>
        <div>You got a star! Let&apos;s keep going.</div>
        {starCounter()}
        <button className="game-intro-button" onClick={() => setShowSuccess(false)}>
          Next Level
        </button>
      </div>
    );
  };

  const displayGame = () => {
    return showSuccess ? displaySuccessScreen() : <CipherGameSlide {...slides[slideIdx]} advanceGame={advanceGame} />;
  };

  return (
    <div id={'game-wrapper'}>
      <h3> Try to guess what image the alien wants.</h3>
      <div id={'cipher-game-content'}>
        {starCounter()}
        <div className={'game-content'}>
          <div className={'gamebox'}>
            <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
            <Alien alienState={alienState} />
            <div className={'happiness-bar'}>
              <ProgressBar percentComplete={happiness*(100/MAX_HAPPINESS)}/>
              <img src={Star} alt="star points"/>
            </div>
            Happiness
          </div>
          {displayGame()}
        </div>;
      </div>
    </div>
  );
}

export default CipherGame;
