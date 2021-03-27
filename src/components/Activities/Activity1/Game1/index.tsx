import React, { useContext, useRef, useState } from 'react';

import '../../../styles/Game.scss';

import useSound from 'use-sound';

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
import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';
import Lemon from '../../../../assets/activity1/lemon.svg';

import { scramble } from '../../../../utils';
import Alien, { ALIEN_STATE } from '../../../shared/Alien';
import AnswerChoiceBox from '../../../shared/AnswerChoiceBox';
import { CarouselContext } from '../../../shared/Carousel';
import { TextBubbleStyles } from '../../../shared/PlaynetConstants';
import TextBubble from '../TextBubble';
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

  const [ slideIdx, setSlideIdx ] = useState(0);
  const [ showSuccess, setShowSuccess] = useState(false);
  const context = useContext(CarouselContext);

  const [playCorrect] = useSound(CorrectSFX, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.5});

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

  const advanceGame = () => {
    if (happiness === 3) {
      context.next();
      return;
    }
    setShowSuccess(false);
  };

  const displayText = () : string => {
    return scramble(5, slides[slideIdx].text);
  };

  const [happiness, setHappiness] = useState(0);

  const handleClick = (option : number) => {
    if (option == slides[slideIdx].correctImg) {
      playCorrect();
      handleAlienState(ALIEN_STATE.HAPPY, nextSlide);
      setShowSuccess(true);
      setHappiness(happiness+1);
    } else {
      playIncorrect();
      handleAlienState(ALIEN_STATE.ANGER, nextSlide);
      setShowSuccess(false);
    }
    return true;
  };

  const nextSlide = () => {
    let newSlideIdx = slideIdx+1;
    if (newSlideIdx === slides.length) {
      newSlideIdx = Math.floor(Math.random()*(slides.length-1));
    }
    setSlideIdx(newSlideIdx);
  };

  const starCounter = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <img src={Star} alt="star points"/>
        {happiness}
      </div>
    );
  };

  const displaySuccess = () => {
    return (
      <div>
        <span>You got a star! Let&apos;s keep going.</span>
        <br/>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'}}>
          {starCounter()}
        </div>
        <br/>
        <button className="game-intro-button" onClick={advanceGame}>
          Next Level
        </button>
      </div>
    );
  };

  const displayGame = () => {
    return showSuccess ? displaySuccess() :
      <div className={'game-1-cards'}>
        <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(0)} imgSrc={slides[slideIdx].imgs[0]} />
        <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(1)} imgSrc={slides[slideIdx].imgs[1]} />
      </div>;
  };

  return (
    <div id={'game-wrapper'}>
      <h3> Try to guess what image the alien wants.</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 'inherit',
        width: '75%'}}>
        {starCounter()}
        <div id={'game-content'}>
          <div className={'gamebox'}>
            <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
            <Alien alienState={alienState} />
            <div style={{
              width: '75%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'}}>
              <ProgressBar percentComplete={happiness*34}/>
              <img src={Star} alt="star points"/>
            </div>
            Happiness
          </div>
          {displayGame()}
        </div>
      </div>
    </div>
  );
}

export default CipherGame;
