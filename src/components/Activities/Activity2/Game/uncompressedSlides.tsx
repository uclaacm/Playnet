import React from 'react';

// import AlienFlowerGif from '../../../../assets/activity2/game/alien-flower.gif';
// import AlienWigGif from '../../../../assets/activity2/game/alien-wig.gif';
import AlienFlowerUncompressedGif from '../../../../assets/activity2/game/alien-flower-uncompressed.gif';
import AlienWigUncompressedGif from '../../../../assets/activity2/game/alien-wig-uncompressed.gif';
import AlienGif from '../../../../assets/activity2/game/alien.gif';

import { AnswerDisplayStyles } from '../../../shared/PlaynetConstants';


const uncompressedSlides = [
  {
    choices: ['frog', 'alien', 'pig'],
    correctIdx: 1,
    gif: <img src={AlienGif + '?'+ String(Date.now())} alt='Gif of Alien being Drawn' />,
    answerDisplayWords: ['blankspot'],
    answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 0,
  },
  {
    choices: ['shoes', 'wig', 'flower'],
    correctIdx: 2,
    gif: <img src={AlienFlowerUncompressedGif + '?'+ String(Date.now())} alt='Gif of Alien with Flower being Drawn' />,
    answerDisplayWords: ['alien', 'with', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 2,
  },
  {
    choices: ['wig', 'dress', 'shoes'],
    correctIdx: 0,
    gif: <img src={AlienWigUncompressedGif + '?'+ String(Date.now())} alt='Gif of Alien with Flower and Wig being Drawn' />,
    answerDisplayWords: ['alien', 'with', 'flower', 'and', 'blank'],
    answerDisplayStyles:
      [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
        AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
    answerSlotIndex: 4,
  },
];

export default uncompressedSlides;