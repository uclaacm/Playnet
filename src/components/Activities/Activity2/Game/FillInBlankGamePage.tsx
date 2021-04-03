import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';

import CorrectSFX from '../../../../assets/activity1/game2/correct.mp3';
import IncorrectSFX from '../../../../assets/activity1/game2/oh_no_1.mp3';
import SceneSvg from '../../../../assets/activity2/game/scene.svg';
import {replace} from '../../../../utils';

import AnsweChoiceBox from '../../../shared/AnswerChoiceBox';
import { AnswerChoiceBoxStyles, AnswerDisplayStyles } from '../../../shared/PlaynetConstants';
import '../../../styles/CompressionGame.scss';

import { CompressionGamePageComponents } from '../../Activity2/Game/index';

interface FillInBlankGamePageProps {
  addTimeElapsed: (time: number) => void;
  advanceGame: () => void;
  pageInfo: CompressionGamePageComponents;
  slideNum: number;
}

function FillInBlankGamePage(props: FillInBlankGamePageProps): JSX.Element {
  const {pageInfo, slideNum, addTimeElapsed, advanceGame} = props;
  const {choices, correctIdx, gif, answerSlotIndex, answerDisplayStyles, answerDisplayWords} = pageInfo;
  const storage = window.sessionStorage;

  const volume = storage.getItem('isMuted') ? 0 : 0.1;
  const [playCorrect] = useSound(CorrectSFX, { volume: volume });
  const [playIncorrect] = useSound(IncorrectSFX, { volume: volume });

  const [incorrectChoices, setIncorrectChoices] = useState<boolean[]>([]);
  const startTime = useRef(Date.now());
  const [styles, setStyles] = useState<AnswerDisplayStyles[]>(answerDisplayStyles);
  const [words, setWords] = useState<string[]>(answerDisplayWords);

  const updateDisplay = (style: AnswerDisplayStyles, word: string) => {
    setStyles(replace(styles, answerSlotIndex, style));
    setWords(replace(words, answerSlotIndex, word));
  };

  const handleClick = (pos: number) => {
    const isCorrect = pos === correctIdx;
    if (isCorrect) {
      addTimeElapsed(Date.now() - startTime.current);
      setTimeout(() => {
        advanceGame && advanceGame();
      }, 500);
    }
    const style = isCorrect ? AnswerDisplayStyles.GREEN_BORDER : AnswerDisplayStyles.RED_BORDER;
    updateDisplay(style, choices[pos]);
    isCorrect ? playCorrect() : playIncorrect();

    setIncorrectChoices(replace(incorrectChoices, pos, isCorrect));
  };

  useEffect(() => {
    setIncorrectChoices((new Array(choices.length).fill(false)));
  }, [choices]);

  useEffect(() => {
    const areDifferentWords = words.length !== answerDisplayWords.length
      || words.some((v, i) => v !== answerDisplayWords[i]);
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
              {words.map((word, index) =>
                <div
                  className={`individual-answer-display ${styles[index]}`}
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
                handleClick={() => handleClick(index)}
                text={answerChoice} style={AnswerChoiceBoxStyles.SMALL_PX_BASED}
                isCorrect={index === correctIdx}
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
