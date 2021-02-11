import React, { useState } from 'react';

import '../../styles/Carousel.scss';
import '../../styles/Game.scss';

import AlienSvg from '../../../assets/alien.svg';
import GameSlide from './components/GameSlide';

interface GameProps {
  children?: JSX.Element[];
  title?: string;
  subtitle?: string;
  onNext?: () => void;
  onPrev?: () => void;
  showNext?: boolean;
  showPrev?: boolean;
}

function Game(props: GameProps): JSX.Element {
  const [ slideIdx, setSlideIdx ] = useState(0);

  const slides = [
    {
      correctImg: 0,
      textDefault: 'I saw her duck',
      textIncorrect: 'I meant I saw her crouch to avoid getting hit!',
      img0: AlienSvg,
      img1: AlienSvg,
    },
    {
      correctImg: 1,
      textDefault: '1 + "1"',
      textIncorrect: 'I meant to do addition! (dont use this lol)',
      img0: AlienSvg,
      img1: AlienSvg,
    },
  ];

  return (
    <div id={'carousel-wrapper'}>
      { props.title && <h1 id={'title'}>{props.title}</h1> }
      { props.subtitle && <h2 id={'subtitle'}>{props.subtitle}</h2> }
      <div id={'carousel'}>
        <div id={'carousel-content'}>
          {/* {props.children && props.children.length > 0 && props.children[slideIdx]} */}
          <h2> Try to guess what the alien is talking about</h2>
          <GameSlide
            {...slides[slideIdx]}
            advanceGame={() => setSlideIdx(slideIdx+1)}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
