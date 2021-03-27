import React from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../../assets/activity1/game2/oh_no_1.mp3';
import AnswerChoiceBox from '../../../../shared/AnswerChoiceBox';

interface CipherGameSlideProps {
  correctImg: number;
  advanceRound: (correct : boolean) => void;
  text: string;
  imgs: string[],
}

function CipherGameSlide(props: CipherGameSlideProps): JSX.Element {
  const {correctImg, advanceRound} = props;
  const [img0, img1] = props.imgs;

  const [playCorrect] = useSound(CorrectSFX, { volume: 0.5});
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.5});

  const handleClick = (option : number) => {
    if (option == correctImg) {
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
      <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(0)} imgSrc={img0} />
      <AnswerChoiceBox handleClickAndReturnIsCorrect={()=>handleClick(1)} imgSrc={img1} />
    </div>
  );
}

export default CipherGameSlide;
