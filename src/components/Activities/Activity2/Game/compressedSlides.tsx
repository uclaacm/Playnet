import React from 'react';

import ElephantHatGIF from '../../../../assets/activity2/game/elephant-hat.gif';
import ElephantShoesGIF from '../../../../assets/activity2/game/elephant-shoes.gif';
import ElephantGIF from '../../../../assets/activity2/game/elephant.gif';

import GIFPlayer from '../../../shared/GIFPlayer';
import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';

const elephantGifTime = { path: ElephantGIF, duration: 13000 };
const elephantHatGifTime = { path: ElephantHatGIF, duration: 6000 };
const elephantShoeGifTime = { path: ElephantShoesGIF, duration: 2000 };

const compressedSlides = [
  {
    choices: ['elephant', 'cow', 'sheep'],
    correctIdx: 0,
    gif: <GIFPlayer gifs={[elephantGifTime]} alt="Gif of Elephant being Drawn" id="1-0" />,
    answerDisplayWords: ['blankspot'],
    answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 0,
  },
  {
    choices: ['hat', 'wig', 'bow'],
    correctIdx: 0,
    gif: <GIFPlayer gifs={[elephantHatGifTime]} alt="Gif of Elephant wearing Hat being Drawn" id="1-0" />,
    answerDisplayWords: ['elephant', 'wearing', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 2,
  },
  {
    choices: ['wig', 'bow', 'shoes'],
    correctIdx: 2,
    gif: <GIFPlayer gifs={[elephantShoeGifTime]} alt="Gif of Elephant wearing hat and shoes being Drawn" id="1-0" />,
    answerDisplayWords: ['elephant', 'wearing', 'hat', 'and', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
        AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 4,
  },
];

export default compressedSlides;
