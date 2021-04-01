import React, { useEffect, useState } from 'react';

import useSound from 'use-sound';

import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';

import '../../../styles/CompressionGame.scss';

import SceneSvg from '../../../../assets/activity2/game/scene.svg';

import AnsweChoiceBox from '../../../shared/AnswerChoiceBox';
import { AnswerChoiceBoxStyles, AnswerDisplayStyles } from '../../../shared/PlaynetConstants';
import { CompressionGamePageComponents } from '../../Activity2/Game/index';

interface FillInBlankGamePageProps {
  setTimeElapsed: (gameNum: number, slideNum: number, time: number) => void;
  advanceGame: () => void;
  pageInfo: CompressionGamePageComponents;
  slideNum: number;
  gameNum: number;
}

function FillInBlankGamePage(props: FillInBlankGamePageProps): JSX.Element {
  const [chosenIncorrectChoices, setIncorrectChoices] = useState<boolean[]>([]);
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.01 });
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.01 });

  const storage = window.sessionStorage;

  const [startTime, setStartTime] = useState(Date.now());

  const answerChoices: string[] = props.pageInfo.choices;

  const [answerDisplayStyles, setAnswerDisplayStyles] = useState<AnswerDisplayStyles[]>
  (props.pageInfo.answerDisplayStyles);
  const [answerDisplayWords, setAnswerDisplayWords] = useState<string[]>(props.pageInfo.answerDisplayWords);

  const updateAnswerDisplaySlot = (style: AnswerDisplayStyles, word: string) => {
    const copyAnswerDisplayStyles = answerDisplayStyles;
    copyAnswerDisplayStyles[props.pageInfo.answerSlotIndex] = style;
    setAnswerDisplayStyles(copyAnswerDisplayStyles);

    const copyAnswerDisplayWords = answerDisplayWords;
    copyAnswerDisplayWords[props.pageInfo.answerSlotIndex] = word;
    setAnswerDisplayWords(copyAnswerDisplayWords);
  };

  const handleClickAndReturnIsCorrect = (pos: number) => {  //returns true if the choice is correct
    let newIncorrect = true;
    if (pos === props.pageInfo.correctChoice) {
      props.setTimeElapsed(props.gameNum, props.slideNum, Date.now() - startTime);
      if(!storage.getItem('isMuted')) {playCorrect();}
      newIncorrect = false;

      updateAnswerDisplaySlot(AnswerDisplayStyles.GREEN_BORDER, props.pageInfo.choices[pos]);
      setTimeout(() => {
        props.advanceGame && props.advanceGame();
        setStartTime(Date.now());
      }, 500);

    } else if (!chosenIncorrectChoices[pos]) {
      updateAnswerDisplaySlot(AnswerDisplayStyles.RED_BORDER, props.pageInfo.choices[pos]);
      if(!storage.getItem('isMuted')) {playIncorrect();}
    }
    const copyChosenIncorrectChoices = chosenIncorrectChoices;
    copyChosenIncorrectChoices[pos] = newIncorrect;
    setIncorrectChoices(copyChosenIncorrectChoices);
    return !newIncorrect;
  };

  useEffect(() => {
    const intialChosenIncorrectChoices: boolean[] = [];
    for (let i = 0; i < props.pageInfo.choices.length; i++) {
      intialChosenIncorrectChoices.push(false);
    }
    setIncorrectChoices(intialChosenIncorrectChoices);
  }, [props.pageInfo.choices]);

  useEffect(() => {
    let differentWords = false;
    if (answerDisplayWords.length !== props.pageInfo.answerDisplayWords.length) {
      differentWords = true;
    }
    for (let i = 0; i < answerDisplayWords.length && !differentWords; i++) {
      if (answerDisplayWords[i] !== props.pageInfo.answerDisplayWords[i]) {
        differentWords = true;
      }
    }
    if (differentWords) {
      setAnswerDisplayWords(props.pageInfo.answerDisplayWords);
      setAnswerDisplayStyles(props.pageInfo.answerDisplayStyles);
    }
  }, [props.pageInfo.answerDisplayWords, props.pageInfo.answerDisplayStyles]);

  return (
    <div className='game-page'>
      <div className='main-content'>
        <div className='gif'>
          {props.pageInfo.gif}
        </div>
        <div className='right-side'>
          <div className='answer-display'>
            <div className='flex-row'>
              {props.pageInfo.answerDisplayWords.map((word, index) => <div className={'individual-answer-display ' + props.pageInfo.answerDisplayStyles[index]} key={props.slideNum + '-' + index}>{word}</div>)}
            </div>
          </div>
          <div className='answer-choices'>
            {answerChoices.map((answerChoice, index) =>
              <AnsweChoiceBox
                key={props.slideNum + '-' + index}
                handleClickAndReturnIsCorrect={() => handleClickAndReturnIsCorrect(index)}
                text={answerChoice} style={AnswerChoiceBoxStyles.SMALL_PX_BASED}
              />,
            )}
          </div>
        </div>
      </div>
      <div className='scene-info'>
        <div className='icon'>
          <img src={SceneSvg} />
        </div>
        <span className='details'>
          Scene {props.slideNum + 1}
        </span>
      </div>
    </div>
  );
}

export default FillInBlankGamePage;
