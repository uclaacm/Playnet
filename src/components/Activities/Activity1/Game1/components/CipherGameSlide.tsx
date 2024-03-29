import React from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../../assets/sounds/correct.mp3';
import IncorrectSFX from '../../../../../assets/sounds/oh_no_1.mp3';
import AnswerChoiceBox from '../../../../shared/AnswerChoiceBox';

interface CipherGameSlideProps {
  advanceRound: (correct : boolean) => void;
  setHoverIncorrect: (hover: boolean) => void;
  correctIdx: number;
  cards: string[];
  roundNum: number;
  isGameSoundMuted: boolean;
}

function CipherGameSlide(props: CipherGameSlideProps): JSX.Element {
  const {correctIdx, advanceRound, setHoverIncorrect, roundNum, isGameSoundMuted} = props;
  const [card0, card1] = props.cards;

  const volume = isGameSoundMuted ? 0 : 0.5;
  const [playCorrect] = useSound(CorrectSFX, { volume: volume});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: volume});

  const handleClick = (option : number) => {
    if (option === correctIdx) {
      playCorrect();
      advanceRound(true);
    } else {
      playIncorrect();
      advanceRound(false);
    }
  };

  return (
    <div className={'cipher-game-cards'}>
      <AnswerChoiceBox handleClick={()=>handleClick(0)} imgSrc={''} id={card0.split(' ').join('-')} isCorrect={correctIdx === 0}
        roundId={roundNum} setHover={correctIdx !== 0 ? setHoverIncorrect : undefined}/>
      <AnswerChoiceBox handleClick={()=>handleClick(1)} imgSrc={''} id={card1.split(' ').join('-')} isCorrect={correctIdx === 1}
        roundId={roundNum}  setHover={correctIdx !== 1 ? setHoverIncorrect : undefined}/>
    </div>
  );
}

export default CipherGameSlide;
