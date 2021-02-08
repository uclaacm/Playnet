import React, { useState } from 'react';

import './styles/Carousel.scss';
import './styles/Game.scss';
import AlienSvg from '../assets/alien.svg';
import Translator from '../assets/translator.svg';
import CorrectFrame from '../assets/frameCorrect.svg';
import IncorrectFrame from '../assets/frameIncorrect.svg';
import BlankFrame from '../assets/blankFrame.svg';

import TextBox from '../assets/frame2.svg';

interface GameSlideProps {
  correctImg ?: number;
  advanceGame ?: () => void;
  textDefault ?: string;
  textCorrect ?: string;
  textIncorrect ?: string;
}

function GameSlide(props: GameSlideProps): JSX.Element {
  const [correct, setCorrect] = useState(false);
  const defaultError = 'error: text missing'

  const [frame, setFrame] = useState(BlankFrame);

  const displayText: () => string = () => {
    if (correct) {
      return props.textIncorrect ? props.textIncorrect : defaultError;
    } 
    return props.textDefault ? props.textDefault : defaultError;
  }

  const handleClick = () => {
    console.log('click');
    setFrame(IncorrectFrame);
    setCorrect(true);
  }

  const handleHover = () => {
    setFrame(CorrectFrame);
  }

  const handleStopHover = () => {
    setFrame(BlankFrame);
  }

  return (
    <div> 
      <h2> Try to guess what the alien is talking about</h2>
      <h2> {displayText()} </h2>
      <div className={'row-container'}>
        <div className={'col-container'}>
          <img src={TextBox} />
          <div>
            <img src={AlienSvg} /> 
            <img src={Translator} />
          </div>
        </div>
        
        <div>
          <div onClick={handleClick} onMouseOver={handleHover} onMouseLeave={handleStopHover}>
            <img src={frame}/>
            <div className={'choice-container'}>
              <img src={AlienSvg}/>
            </div>
          </div>
          <div onClick={handleClick}>
            <img src={BlankFrame}/>
          </div>
        </div>
      </div>
  </div>
  );
}

export default GameSlide;
