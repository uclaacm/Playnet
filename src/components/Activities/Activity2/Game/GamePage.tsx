import React, { useEffect, useState } from 'react';

import useSound from 'use-sound';

import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';

import '../../../styles/CompressionGame.scss';

import ClockSvg from '../../../../assets/activity2/game/clock.svg';
import { SlideBoxStyles } from '../../../shared/PlaynetConstants';
import SlideBox from '../../Activity1/Game2/components/SlideBox';

interface GamePageProps {
  addTime: (time: number, index: number) => void;
  advanceGame: () => void;
  choices: string[];
  correctChoice: number;
  gif: any;
  answer: JSX.Element;
  slideNum: number;
  gameNum: number;
}

function GamePage(props: GamePageProps): JSX.Element {
  // let intialChosenIncorrectChoices: boolean[] = [];
  // for (let i = 0; i < props.choices.length; i++) {
  //   intialChosenIncorrectChoices.push(false);
  // }
  const [chosenIncorrectChoices, setIncorrect] = useState<boolean[]>([]);
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
      props.addTime(currTime - startTime, 2 * props.gameNum + props.slideNum);
      playCorrect();
      newIncorrect = false;
      props.advanceGame && props.advanceGame();

      setStartTime(Date.now());
      setCurrTime(Date.now());
    } else if (!chosenIncorrectChoices[pos]) {
      playIncorrect();
    }
    const copyChosenIncorrectChoices = chosenIncorrectChoices;
    copyChosenIncorrectChoices[pos] = newIncorrect;
    setIncorrect(copyChosenIncorrectChoices);
  };

  useEffect(() => {
    setTimeout(updateTimePassed, 50);
  });

  useEffect(() => {
    const intialChosenIncorrectChoices: boolean[] = [];
    for (let i = 0; i < props.choices.length; i++) {
      intialChosenIncorrectChoices.push(false);
    }
    setIncorrect(intialChosenIncorrectChoices);
  }, [props.choices]);

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