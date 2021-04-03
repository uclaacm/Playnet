import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../../assets/activity1/game2/oh_no_1.mp3';
import TranslatorSvg from '../../../../../assets/activity1/translator.svg';

import Alien, { ALIEN_STATE } from '../../../../shared/Alien';
import AnswerChoiceBox from '../../../../shared/AnswerChoiceBox';
import { TextBubbleStyles } from '../../../../shared/PlaynetConstants';
import TextBubble from '../../TextBubble';

interface GameSlideProps {
  correctIdx: number;
  advanceGame: () => void;
  textDefault: string;
  textIncorrect: string;
  imgs: string[],
}

function GameSlide(props: GameSlideProps): JSX.Element {
  const [incorrect, setIncorrect] = useState(false);
  const [alienState, setAlienState] = useState(ALIEN_STATE.BASE);
  const alienTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const storage = window.sessionStorage;

  const volume = storage.getItem('isMuted') ? 0 : 0.5;
  const [playCorrect] = useSound(CorrectSFX, { volume: volume});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: volume});


  const {correctIdx, advanceGame, textDefault, textIncorrect, imgs} = props;

  const [img0, img1] = imgs;

  const displayText: () => string = () => {
    if (incorrect) return textIncorrect ? textIncorrect : '';
    return textDefault ? textDefault : '';
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
    if (pos === correctIdx) {
      playCorrect();
      handleAlienState(ALIEN_STATE.HAPPY, ()=>{setIncorrect(false); advanceGame();});
    } else if (!incorrect) {
      playIncorrect();
      setIncorrect(true);
      handleAlienState(ALIEN_STATE.ANGER);
    }
  };

  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(incorrect ? textIncorrect : textDefault);
    speech.lang = 'en-US';
    if (!storage.getItem('isMuted')) {speechSynthesis.speak(speech);}

    return () => speechSynthesis.cancel();
  }, [imgs, incorrect]);

  return (
    <div className={'game-content'}>
      <div className={'gamebox'}>
        <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
        <Alien alienState={alienState} />
        <img id={'translator'} src={TranslatorSvg} alt="a translator device" />
      </div>
      <div className={'gamebox'}>
        <AnswerChoiceBox handleClick={()=>handleClick(0)} imgSrc={img0} isCorrect={correctIdx === 0}/>
        <AnswerChoiceBox handleClick={()=>handleClick(1)} imgSrc={img1} isCorrect={correctIdx === 1}/>
      </div>
    </div>
  );
}

export default GameSlide;
