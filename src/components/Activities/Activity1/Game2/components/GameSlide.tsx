import React, { useState } from 'react';

import useSound from 'use-sound';

import AlienSvg from '../../../../../assets/activity1/game2/alien.svg';
import CorrectSFX from '../../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../../assets/activity1/game2/oh_no_1.mp3';

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
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.01});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.01});

  const [img0, img1] = props.imgs;

  const displayText: () => string = () => {
    if (incorrect) return props.textIncorrect ? props.textIncorrect : '';
    return props.textDefault ? props.textDefault : '';
  };

  const handleClick = (pos : number) => { //returns true if the choice was incorrect
    let newIncorrect = true;

    if (pos === props.correctImg) {
      playCorrect();
      newIncorrect = false;
      props.advanceGame && props.advanceGame();
    } else if (!incorrect) {
      playIncorrect();
    }
    setIncorrect(newIncorrect);
    return newIncorrect;
  };

  return (
    <div id={'game-content'}>
      <div className={'gamebox'}>
        <TextBubble textBubbleStyle={TextBubbleStyles.EXTRA_LARGE} text={displayText()} />
        <img src={AlienSvg} alt="friendly alien with translator device"/>
      </div>
      <div className={'gamebox'}>
        <SlideBox handleClick={()=>handleClick(0)} imgSrc={img0} />
        <SlideBox handleClick={()=>handleClick(1)} imgSrc={img1} />
      </div>
    </div>
  );
}

export default GameSlide;
