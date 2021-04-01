import React, { useRef, useState } from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../../assets/activity1/game2/oh_no_1.mp3';
import TranslatorSvg from '../../../../../assets/activity1/translator.svg';

import Alien, { ALIEN_STATE } from '../../../../shared/Alien';
import AnswerChoiceBox from '../../../../shared/AnswerChoiceBox';
import { TextBubbleStyles } from '../../../../shared/PlaynetConstants';
import TextBubble from '../../TextBubble';

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

  const [playCorrect] = useSound(CorrectSFX, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.5});
  const storage = window.sessionStorage;

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

  const handleClickAndReturnIsCorrect = (pos : number) => { //returns true if the choice is correct
    let newIncorrect = true;

    if (pos === props.correctImg) {
      if(!storage.getItem('isMuted')) {playCorrect();}
      handleAlienState(ALIEN_STATE.HAPPY, props.advanceGame);
      newIncorrect = false;
    } else if (!incorrect) {
      if(!storage.getItem('isMuted')) {playIncorrect();}
      handleAlienState(ALIEN_STATE.ANGER);
    }
    setIncorrect(newIncorrect);
    return !newIncorrect;
  };

  return (
    <div className={'game-content'}>
      <div className={'gamebox'}>
        <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
        <Alien alienState={alienState} />
        <img id={'translator'} src={TranslatorSvg} alt="a translator device" />
      </div>
      <div className={'gamebox'}>
        <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClickAndReturnIsCorrect(0)} imgSrc={img0} />
        <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClickAndReturnIsCorrect(1)} imgSrc={img1} />
      </div>
    </div>
  );
}

export default GameSlide;
