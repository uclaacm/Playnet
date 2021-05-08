import React, { useEffect } from 'react';

import AngerAlienSvg from '../../assets/alien/alien-anger.svg';
import HappyAlienSvg from '../../assets/alien/alien-happy.svg';
import SadAlienSvg from '../../assets/alien/alien-sad.svg';
import AlienSvg from '../../assets/alien/alien.svg';
import { animate_happy_alien } from '../../utils/animations/alien';

import '../styles/Alien.scss';

export enum ALIEN_STATE {
  ANGER,
  BASE,
  HAPPY,
  SAD,
}

const ALIEN_STATES: {[key in ALIEN_STATE]: {src: string, alt: string}} = {
  [ALIEN_STATE.ANGER]: {
    alt: 'an angry, but still friendly, alien',
    src: AngerAlienSvg,
  },
  [ALIEN_STATE.BASE]: {
    alt: 'a friendly alien',
    src: AlienSvg,
  },
  [ALIEN_STATE.HAPPY]: {
    alt: 'a happy and friendly alien',
    src: HappyAlienSvg,
  },
  [ALIEN_STATE.SAD]: {
    alt: 'a sad alien',
    src: SadAlienSvg,
  },
};

export interface AlienProps {
  alienState: ALIEN_STATE,
}

export default function Alien(props: AlienProps): JSX.Element {
  const { alienState } = props;
  const { src, alt } = ALIEN_STATES[alienState];

  useEffect(() => {
    if (alienState === ALIEN_STATE.HAPPY) {
      animate_happy_alien();
    }
  }, [alienState]);

  return (
    <>
      <img id="alien" src={src} alt={alt} />
      <svg id="sparks" width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="130" cy="130" r="115" stroke="#FFBA09" strokeLinejoin="round" strokeDasharray="7 100" />
      </svg>
    </>
  );
}
