import React, { useRef, useState } from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../../assets/activity1/game2/oh_no_1.mp3';
import TranslatorSvg from '../../../../../assets/activity1/translator.svg';

import Alien, { ALIEN_STATE } from '../../../../shared/Alien';
import { TextBubbleStyles } from '../../../../shared/PlaynetConstants';
import TextBubble from '../../TextBubble';
import SlideBox from './SlideBox';

interface GameSlideProps {
  correctImg: number;
  advanceGame: () => void;
  textDefault: string;
  textIncorrect: string;
  imgs: string[],
}

function GameSlide(props: GameSlideProps): JSX.Element {
  const [incorrect, setIncorrect] = useState(false);
  const [alienState, setAlienState] = useState(ALIEN_STATE.BASE);
  const alienTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.01});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.01});

  const [img0, img1] = props.imgs;

  const displayText: () => string = () => {
    if (incorrect) return props.textIncorrect ? props.textIncorrect : '';
    return props.textDefault ? props.textDefault : '';
  };

  const handleAlienState = (state: ALIEN_STATE, cb?: () => void) => {
    alienTimeout.current && clearTimeout(alienTimeout.current);
    setAlienState(state);
    alienTimeout.current = setTimeout(() => {
      alienTimeout.current = undefined;
      setAlienState(ALIEN_STATE.BASE);
      cb && cb();
    }, 1000);
  };

  const handleClick = (pos : number) => {
    let newIncorrect = true;

    if (pos === props.correctImg) {
      playCorrect();
      handleAlienState(ALIEN_STATE.HAPPY, props.advanceGame);
      newIncorrect = false;
    } else if (!incorrect) {
      playIncorrect();
      handleAlienState(ALIEN_STATE.ANGER);
    }
    setIncorrect(newIncorrect);
  };

  return (
    <div id={'game-content'}>
      <div className={'gamebox'}>
        <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
        <Alien alienState={alienState} />
        <img id={'translator'} src={TranslatorSvg} alt="a translator device" />
      </div>
      <div className={'gamebox'}>
        <SlideBox handleClick={()=>handleClick(0)} imgSrc={img0} />
        <SlideBox handleClick={()=>handleClick(1)} imgSrc={img1} />
      </div>
    </div>
  );
}

export default GameSlide;
