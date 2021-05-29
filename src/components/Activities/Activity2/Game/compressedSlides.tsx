import React from 'react';

import ElephantHatGIF from '../../../../assets/activity2/elephant-hat.gif';
import ElephantShoesGIF from '../../../../assets/activity2/elephant-shoes.gif';
import ElephantGIF from '../../../../assets/activity2/elephant.gif';

import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';

const compressedSlides = [
  {
    choices: ['elephant', 'cow', 'sheep'],
    correctIdx: 0,
    gif: <img src={ElephantGIF + '?'+ String(Date.now())} alt='Gif of Elephant being Drawn'/>,
    answerDisplayWords: ['blankspot'],
    answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 0,
  },
  {
    choices: ['hat', 'wig', 'bow'],
    correctIdx: 0,
    gif: <img src={ElephantHatGIF + '?'+ String(Date.now())} alt='Gif of Elephant wearing Hat being Drawn' />,
    answerDisplayWords: ['elephant', 'wearing', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 2,
  },
  {
    choices: ['wig', 'bow', 'shoes'],
    correctIdx: 2,
    gif: <img src={ElephantShoesGIF + '?'+ String(Date.now())} alt='Gif of Elephant wearing hat and shoes being Drawn' id={'1-0'} />,
    answerDisplayWords: ['elephant', 'wearing', 'hat', 'and', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
        AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 4,
  },
];

export default compressedSlides;