import React, { useState } from 'react';

import '../../../styles/Game.scss';

// import Anime from 'react-anime';
import useSound from 'use-sound';

import AlienSvg from '../../../../assets/activity1/game2/alien.svg';
import CorrectSFX from '../../../../assets/activity1/game2/anime-wow-sound-effect.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';

import SlideBox from './SlideBox';

interface GameSlideProps {
  correctImg ?: number;
  advanceGame ?: () => void;
  textDefault ?: string;
  textIncorrect ?: string;
  img0 ?: string;
  img1 ?: string;
}

function GameSlide(props: GameSlideProps): JSX.Element {
  const [incorrect, setIncorrect] = useState(false);
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.5});

  const defaultError = 'error: missing text';

  const img0 = props.img0;
  const img1 = props.img1;

  const displayText: () => string = () => {
    if (incorrect) return props.textIncorrect ? props.textIncorrect : defaultError;
    return props.textDefault ? props.textDefault : defaultError;
  };

  const handleClick = (pos : number) => {
    let newIncorrect = true;

    if (pos === props.correctImg) {
      // playCorrect();
      newIncorrect = false;
      props.advanceGame && props.advanceGame();
    } else if (!incorrect) {
      // playIncorrect();
    }
    setIncorrect(newIncorrect);
  };

  return (
    <div id={'game-content'}>
      <div className={'gamebox'}>
        <h3> {displayText()} </h3>
        <img src={AlienSvg} />
      </div>
      <div className={'gamebox'}>
        <SlideBox handleClick={()=>handleClick(0)} imgSrc={img0} />
        <SlideBox handleClick={()=>handleClick(1)} imgSrc={img1} />
      </div>
    </div>
  );
}

export default GameSlide;
