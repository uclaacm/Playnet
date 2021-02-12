import React, { useState } from 'react';

import '../../../styles/Carousel.scss';
import '../../../styles/Game.scss';

import useSound from 'use-sound';

import AlienSvg from '../../../../assets/alien.svg';
import TextBox from '../../../../assets/text.svg';
import Translator from '../../../../assets/translator.svg';

import CorrectSound from '../assets/anime-wow-sound-effect.mp3';
import IncorrectSound from '../assets/oh_no_1.mp3';

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

  const [playCorrect] = useSound(CorrectSound, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSound, { volume: 0.5});

  const defaultError = 'error: missing text';
  // const hoverGreen = '#1CC64B';
  // const incorrectRed = '#FF0000';

  const img0 = props.img0;
  const img1 = props.img1;

  const displayText: () => string = () => {
    if (incorrect) {
      return props.textIncorrect ? props.textIncorrect : defaultError;
    }
    return props.textDefault ? props.textDefault : defaultError;
  };

  const handleClick = (pos : number) => {
    let newIncorrect = true;
    if (pos === props.correctImg) {
      newIncorrect = false;

      props.advanceGame && props.advanceGame();

      playCorrect();
    } else if (!incorrect) {
      playIncorrect();
    }
    setIncorrect(newIncorrect);
  };

  return (
    <div>
      <h2> {displayText()} </h2>
      <div className={'row-container'}>
        <div className={'col-container'}>
          <img src={TextBox} />
          <div>
            <img src={AlienSvg} />
            <img src={Translator} />
          </div>
        </div>
        <div className={'col-container'}>
          <SlideBox handleClick={()=>handleClick(0)} imgSrc={img0} />
          <SlideBox handleClick={()=>handleClick(1)} imgSrc={img1} />
        </div>
      </div>
    </div>
  );
}

export default GameSlide;
