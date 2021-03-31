import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';
import SceneSvg from '../../../../assets/activity2/game/scene.svg';
import {insert} from '../../../../utils';

import AnsweChoiceBox from '../../../shared/AnswerChoiceBox';
import { AnswerChoiceBoxStyles, AnswerDisplayStyles } from '../../../shared/PlaynetConstants';
import '../../../styles/CompressionGame.scss';

import { CompressionGamePageComponents } from '../../Activity2/Game/index';

interface FillInBlankGamePageProps {
  setTimeElapsed: (time: number) => void;
  advanceGame: () => void;
  pageInfo: CompressionGamePageComponents;
  slideNum: number;
  gameNum: number;
}

function FillInBlankGamePage(props: FillInBlankGamePageProps): JSX.Element {
  const {pageInfo, slideNum, setTimeElapsed, advanceGame} = props;
  const {choices, correctChoice, gif, answerSlotIndex, answerDisplayStyles, answerDisplayWords} = pageInfo;
  const [playCorrect] = useSound(CorrectSFX, { volume: 0.01 });
  const [playIncorrect] = useSound(IncorrectSFX, { volume: 0.01 });

  const [incorrectChoices, setIncorrectChoices] = useState<boolean[]>([]);
  const startTime = useRef(Date.now());
  const [styles, setStyles] = useState<AnswerDisplayStyles[]>(answerDisplayStyles);
  const [words, setWords] = useState<string[]>(answerDisplayWords);

  const updateDisplay = (style: AnswerDisplayStyles, word: string) => {
    setStyles(insert(styles, answerSlotIndex, style));
    setWords(insert(words, answerSlotIndex, word));
  };

  const handleClickAndReturnIsCorrect = (pos: number) => {  //returns true if the choice is correct
    const isIncorrect = pos !== correctChoice;
    if (!isIncorrect) {
      setTimeElapsed(Date.now() - startTime.current);
      setTimeout(() => {
        advanceGame && advanceGame();
      }, 500);
    }
    const style = isIncorrect ? AnswerDisplayStyles.RED_BORDER : AnswerDisplayStyles.GREEN_BORDER;
    updateDisplay(style, choices[pos]);
    isIncorrect ? playIncorrect() : playCorrect();

    setIncorrectChoices(insert(incorrectChoices, pos, isIncorrect));
    return !isIncorrect;
  };

  useEffect(() => {
    setIncorrectChoices((new Array(choices.length).fill(false)));
  }, [choices]);

  useEffect(() => {
    const areDifferentWords = words.length === answerDisplayWords.length
      && words.every((v, i) => v === answerDisplayWords[i]);
    if (areDifferentWords) {
      setWords(answerDisplayWords);
      setStyles(answerDisplayStyles);
    }
    startTime.current = Date.now();
  }, [answerDisplayWords, answerDisplayStyles]);

  return (
    <div className='game-page'>
      <div className='main-content'>
        <div className='gif'>
          {gif}
        </div>
        <div className='right-side'>
          <div className='answer-display'>
            <div className='flex-row'>
              {answerDisplayWords.map((word, index) =>
                <div
                  className={`individual-answer-display ${answerDisplayStyles[index]}`}
                  key={`${slideNum}-${index}`}>
                  {word}
                </div>,
              )}
            </div>
          </div>
          <div className='answer-choices'>
            {choices.map((answerChoice, index) =>
              <AnsweChoiceBox
                key={slideNum + '-' + index}
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
          Scene {slideNum + 1}
        </span>
      </div>
    </div>
  );
}

export default FillInBlankGamePage;
