import React, { useEffect, useState } from 'react';

import useSound from 'use-sound';

import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';

import '../../../styles/CompressionGame.scss';

import ClockSvg from '../../../../assets/activity2/game/clock.svg';
import { SlideBoxStyles } from '../../../shared/PlaynetConstants';
import SlideBox from '../../Activity1/Game2/components/SlideBox';

interface GamePageProps {
  advanceGame: () => void;
  choices: string[];
  correctChoice: number;
  gif: any;
  answer: JSX.Element;
}

function GamePage(props: GamePageProps): JSX.Element {
  const [incorrect, setIncorrect] = useState(false);
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.01 });
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.01 });

  const [startTime, setStartTime] = useState(Date.now());
  const [currTime, setCurrTime] = useState(Date.now());

  const answerChoices: string[] = props.choices;

  const updateTimePassed = () => {
    setCurrTime(Date.now());
  };

  const handleClick = (pos: number) => {
    let newIncorrect = true;
    if (pos === props.correctChoice) {
      playCorrect();
      newIncorrect = false;
      props.advanceGame && props.advanceGame();
      setStartTime(Date.now());
    } else if (!incorrect) {
      playIncorrect();
    }
    setIncorrect(newIncorrect);
  };

  useEffect(() => {
    setTimeout(updateTimePassed, 50);
  });

  return (
    <div className='game-page'>
      <div className='main-content'>
        <div className='gif'>
          {props.gif}
        </div>
        <div className='right-side'>
          <div className='answer-display'>
            {props.answer}
          </div>
          <div className='answer-choices'>
            {answerChoices.map((answerChoice, index) =>
              <SlideBox
                key={index}
                handleClick={() => handleClick(index)}
                text={answerChoice} style={SlideBoxStyles.SMALL_PX_BASED}
              />,
            )}
          </div>
        </div>
      </div>
      <div className='time-display'>
        <img src={ClockSvg} />
        <span className='seconds-passed'>
          {((currTime - startTime) / 1000).toFixed(2)} seconds
        </span>
      </div>
    </div>
  );
}

export default GamePage;