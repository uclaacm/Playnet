import React, { useState } from 'react';

import './styles/Carousel.scss';
import './styles/Game.scss';

import NextSvg from '../assets/next_btn.svg';


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

  return (
    <div id={'carousel-wrapper'}>
      { props.title && <h1 id={'title'}>{props.title}</h1> }
      { props.subtitle && <h2 id={'subtitle'}>{props.subtitle}</h2> }
      <div id={'carousel'}>
        <div id={'carousel-content'}>
          {props.children && props.children.length > 0 && props.children[slideIdx]}
        </div>
        <button
          className={'carousel-btn next'}
          style = {{
            visibility:
              ((props.showNext !== undefined && props.showNext) ||
               (slideIdx < (props.children ? props.children.length - 1 : 0)))
                ? 'visible'
                : 'hidden',
          }}
          onClick={() => {
            setSlideIdx(old => Math.min(old + 1, props.children ? props.children.length - 1 : 0));
            props.onNext && props.onNext();
          }}
        >
          <img src={NextSvg} />
        </button>
      </div>
    </div>
  );
}

export default Game;
