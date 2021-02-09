import React, { useState } from 'react';

import './styles/Carousel.scss';
import './styles/Game.scss';
import AlienSvg from '../assets/alien.svg';
import Translator from '../assets/translator.svg';

import TextBox from '../assets/frame2.svg';

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

  const defaultError = 'error: text missing';
  const img0 = props.img0;
  const img1 = props.img1;

  const displayText: () => string = () => {
    if (incorrect) {
      return props.textIncorrect ? props.textIncorrect : defaultError;
    }
    return props.textDefault ? props.textDefault : defaultError;
  };

  const handleClick = () => {
    setIncorrect(true);

    props.advanceGame && props.advanceGame();
  }

  const handleHover = () => {
    console.log('hover');
  }

  const handleStopHover = () => {
    console.log('stop hover');
  }

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
        <div>
          <div onClick={handleClick} onMouseOver={handleHover} onMouseLeave={handleStopHover}>
            <div
              style={{borderColor: 'black'}}
              className={'choice-container'}
            >
              <img src={img0 ? img0 : 'error! missing image'}/>
            </div>
          </div>
          <div onClick={handleClick}>
            <div
              style={{borderColor: 'black'}}
              className={'choice-container'}
            >
              <img src={img1 ? img1 : 'error! missing image'}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSlide;
