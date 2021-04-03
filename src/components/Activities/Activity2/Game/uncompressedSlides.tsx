import React from 'react';

import AlienFlowerGif from '../../../../assets/activity2/game/alien-flower.gif';
import AlienWigGif from '../../../../assets/activity2/game/alien-wig.gif';
import AlienGif from '../../../../assets/activity2/game/alien.gif';

import GIFPlayer from '../../../shared/GIFPlayer';
import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';

const alienGifTime = { path: AlienGif, duration: 8200 };
const alienFlowerGifTime = { path: AlienFlowerGif, duration: 4000 };
const alienWigGifTime = { path: AlienWigGif, duration: 3500 };

const uncompressedSlides = [
  {
    choices: ['frog', 'alien', 'pig'],
    correctIdx: 1,
    gif: <GIFPlayer gifs={[alienGifTime]} alt='Gif of Alien being Drawn' id={'0-0'} />,
    answerDisplayWords: ['blankspot'],
    answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 0,
  },
  {
    choices: ['shoes', 'wig', 'flower'],
    correctIdx: 2,
    gif: <GIFPlayer gifs={[
      alienGifTime,
      alienFlowerGifTime,
    ]} alt='Gif of Alien with Flower being Drawn' id={'0-1'} />,
    answerDisplayWords: ['alien', 'with', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 2,
  },
  {
    choices: ['wig', 'dress', 'shoes'],
    correctIdx: 0,
    gif: <GIFPlayer gifs={[
      alienGifTime,
      alienFlowerGifTime,
      alienWigGifTime,
    ]} alt='Gif of Alien with Flower and Wig being Drawn' id={'0-2'} />,
    answerDisplayWords: ['alien', 'with', 'flower', 'and', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
        AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 4,
  },
];

export default uncompressedSlides;