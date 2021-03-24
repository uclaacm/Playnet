import React, { useEffect, useState } from 'react';

import useSound from 'use-sound';

import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';

import '../../../styles/CompressionGame.scss';

import ClockSvg from '../../../../assets/activity2/game/clock.svg';
import SceneSvg from '../../../../assets/activity2/game/scene.svg';

import { AnswerChoiceBoxStyles, AnswerDisplayStyles } from '../../../shared/PlaynetConstants';
import AnsweChoiceBox from '../../../shared/AnswerChoiceBox';

interface FillInBlankGamePageProps {
  setTimeElapsed: (gameNum: number, slideNum: number, time: number) => void;
  advanceGame: () => void;
  choices: string[];
  correctChoice: number;
  gif: JSX.Element;
  answerDisplayWords: string[];
  answerDisplayStyles: AnswerDisplayStyles[];
  answerSlotIndex: number;
  slideNum: number;
  gameNum: number;
}

function FillInBlankGamePage(props: FillInBlankGamePageProps): JSX.Element {
  const [chosenIncorrectChoices, setIncorrect] = useState<boolean[]>([]);
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.01 });
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.01 });

  const [startTime, setStartTime] = useState(Date.now());
  const [currTime, setCurrTime] = useState(Date.now());

  const answerChoices: string[] = props.choices;

  const [answerDisplayStyles, setAnswerDisplayStyles] = useState<AnswerDisplayStyles[]>(props.answerDisplayStyles);
  const [answerDisplayWords, setAnswerDisplayWords] = useState<string[]>(props.answerDisplayWords);

  const updateTimePassed = () => {
    setCurrTime(Date.now());
  };

  const updateAnswerDisplaySlot = (style: AnswerDisplayStyles, word: string) => {
    const copyAnswerDisplayStyles = answerDisplayStyles;
    copyAnswerDisplayStyles[props.answerSlotIndex] = style;
    setAnswerDisplayStyles(copyAnswerDisplayStyles);

    const copyAnswerDisplayWords = answerDisplayWords;
    copyAnswerDisplayWords[props.answerSlotIndex] = word;
    setAnswerDisplayWords(copyAnswerDisplayWords);
  };

  const handleClickAndReturnIsCorrect = (pos: number) => {  //returns true if the choice is correct
    let newIncorrect = true;
    if (pos === props.correctChoice) {
      props.setTimeElapsed(props.gameNum, props.slideNum, currTime - startTime);
      playCorrect();
      newIncorrect = false;

      updateAnswerDisplaySlot(AnswerDisplayStyles.GREEN_BORDER, props.choices[pos]);
      setTimeout(() => {
        props.advanceGame && props.advanceGame();
        setStartTime(Date.now());
        setCurrTime(Date.now());
      }, 500);

    } else if (!chosenIncorrectChoices[pos]) {
      updateAnswerDisplaySlot(AnswerDisplayStyles.RED_BORDER, props.choices[pos]);
      playIncorrect();
    }
    const copyChosenIncorrectChoices = chosenIncorrectChoices;
    copyChosenIncorrectChoices[pos] = newIncorrect;
    setIncorrect(copyChosenIncorrectChoices);
    return !newIncorrect;
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

  useEffect(() => {
    let differentWords = false;
    if (answerDisplayWords.length !== props.answerDisplayWords.length) {
      differentWords = true;
    }
    for (let i = 0; i < answerDisplayWords.length && !differentWords; i++) {
      if (answerDisplayWords[i] !== props.answerDisplayWords[i]) {
        differentWords = true;
      }
    }
    if (differentWords) {
      setAnswerDisplayWords(props.answerDisplayWords);
      setAnswerDisplayStyles(props.answerDisplayStyles);
    }
  }, [props.answerDisplayWords, props.answerDisplayStyles]);

  return (
    <div className='game-page'>
      <div className='main-content'>
        <div className='gif'>
          {props.gif}
        </div>
        <div className='right-side'>
          <div className='answer-display'>
            <div className='flex-row'>
              {props.answerDisplayWords.map((word, index) => <div className={'individual-answer-display ' + props.answerDisplayStyles[index]} key={index}>{word}</div>)}
            </div>
          </div>
          <div className='answer-choices'>
            {answerChoices.map((answerChoice, index) =>
              <AnsweChoiceBox
                key={index}
                handleClickAndReturnIsCorrect={() => handleClickAndReturnIsCorrect(index)}
                text={answerChoice} style={AnswerChoiceBoxStyles.SMALL_PX_BASED}
              />,
            )}
          </div>
        </div>
      </div>
      <div className='scene-info'>
        <div className='icon'>
          <img src={ClockSvg} />
          <span className='details'>
            {((currTime - startTime) / 1000).toFixed(2)} seconds
          </span>
        </div>
        <div className='icon'>
          <img src={SceneSvg} />
          <span className='details'>
            Scene {props.slideNum + 1}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FillInBlankGamePage;
