import React, { useContext, useState } from 'react';

import '../../../styles/Game.scss';

import useSound from 'use-sound';

import Alien, { ALIEN_STATE } from '../../../shared/Alien';
import Star from '../../../../assets/activity1/game1/star.svg';
import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';

import Pair1A from '../../../../assets/activity1/game1/twoapples.svg';
import Pair1B from '../../../../assets/activity1/apple.svg';
import Pair2A from '../../../../assets/activity1/lemon.svg';
import Pair2B from '../../../../assets/activity1/game2/pair2b.svg';
import Pair3A from '../../../../assets/activity1/game2/pair3a.svg';
import Pair3B from '../../../../assets/activity1/game2/pair3b.svg';
import Pair4A from '../../../../assets/activity1/game2/pair4a.svg';
import Pair4B from '../../../../assets/activity1/game2/pair4b.svg';

import { scramble } from '../../../../utils';
import { CarouselContext } from '../../../shared/Carousel';
import { TextBubbleStyles } from '../../../shared/PlaynetConstants';
import AnswerChoiceBox from '../../../shared/AnswerChoiceBox';
import TextBubble from '../TextBubble';
import ProgressBar from './components/ProgressBar';

function Game1(): JSX.Element {
  const slides = [
    {
      correctImg: 1,
      imgs: [Pair1A, Pair1B],
      cipherText: scramble('GLAEW', 'APPLE'),
    },
    {
      correctImg: 1,
      imgs: [Pair2A, Pair2B],
      cipherText: 'GLAEW',
    },
    {
      correctImg: 0,
      imgs: [Pair3A, Pair3B],
      cipherText: 'GLAEW',
    },
    {
      correctImg: 0,
      imgs: [Pair4A, Pair4B],
      cipherText: 'GLAEW',
    },
  ];

  const [ slideIdx, setSlideIdx ] = useState(0);
  const [ showSuccess, setShowSuccess] = useState(false);
  const [ incorrect, setIncorrect ] = useState(false);
  const context = useContext(CarouselContext);

  const [playCorrect] = useSound(CorrectSFX, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.5});

  const advanceGame = () => {
    if (slideIdx === slides.length-1) {
      context.next();
      return;
    }
    setSlideIdx(slideIdx+1);
  };

  const displayText = () : string => {
    return slides[slideIdx].cipherText;
  };

  const [percent, setPercent] = useState(0);
  const [numStars, setNumStars] = useState(0);

  const handleClick = (option : number) => {
    if (option == 0) {
      if (!incorrect) {
        setIncorrect(true);
        playIncorrect();
        setPercent(percent-10);
      }
      return true;
    }
    setIncorrect(false);
    playCorrect();
    setShowSuccess(true);
    setPercent(percent+20);
    setNumStars(numStars+1);
    advanceGame();

    return false;
  };

  const starCounter = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <img src={Star} alt="star points"/>
        {numStars}
      </div>
    );
  };

  const displaySuccess = () => {
    return (
      <div id="game2-intro">
        <span>You got a star! Let&apos;s keep going.</span>
        <br/>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'}}>
          {/* <Alien alienState={ALIEN_STATE.BASE} /> */}
          {starCounter()}
        </div>
        <br/>
        <button id="game2-intro-button" onClick={()=> setShowSuccess(false)}>
          Next Level
        </button>
      </div>
    );
  };

  const displayGame = () => {
    return showSuccess ? displaySuccess() :
      <div className={'game-1-cards'}>
        <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(0)} imgSrc={Pair1A} />
        <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(1)} imgSrc={Pair1B} />
      </div>;
  };

  return (
    <div id={'game-wrapper'}>
      <h3> Try to guess what image the alien wants.</h3>
      <div>
        <div id={'game-content'}>
          <div className={'gamebox'}>
            <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
            <Alien alienState={ALIEN_STATE.BASE} />
            <div style={{
              width: '75%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'}}>
              <ProgressBar percentComplete={percent}/>
              <img src={Star} alt="star points"/>
            </div>
            Happiness
          </div>
          {displayGame()}
        </div>
        {starCounter()}
      </div>
      {/* {displayGame()} */}
    </div>
  );
}

export default Game1;