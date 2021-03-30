import React from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../../assets/activity1/game2/oh_no_1.mp3';
import AnswerChoiceBox from '../../../../shared/AnswerChoiceBox';

interface CipherGameSlideProps {
  advanceRound: (correct : boolean) => void;
  correctIdx: number;
  cards: string[];
}

function CipherGameSlide(props: CipherGameSlideProps): JSX.Element {
  const {correctIdx, advanceRound} = props;
  const [card0, card1] = props.cards;

  const [playCorrect] = useSound(CorrectSFX, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.5});

  const handleClick = (option : number) => {
    if (option == correctIdx) {
      playCorrect();
      advanceRound(true);
    } else {
      playIncorrect();
      advanceRound(false);
    }
    return true;
  };

  return (
    <div className={'cipher-game-cards'}>
      <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(0)} imgSrc={''} backgroundImg={card0.split(' ').join('-')}/>
      <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(1)} id={card1.split(' ').join('-')}/>
    </div>
  );
}

export default CipherGameSlide;
