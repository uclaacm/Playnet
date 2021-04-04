import React from 'react';

import Carousel from '../../shared/Carousel';
import { SoundTrack } from '../../shared/soundtrack';
import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import CompressionGame from './Game';
import compressedSlides from './Game/compressedSlides';
import GameResults from './Game/GameResults';
import Intro from './Game/Intro';
import Outro from './Game/Outro';
import uncompressedSlides from './Game/uncompressedSlides';
import IntroSlides from './IntroSlides';

function Activity2(): JSX.Element {
  const content = [
    ...IntroSlides,
    {
      child: <Intro text={'If you were a computer, how long would it take you to understand the instructions without compression?'} buttonText={'Play Game'} />,
      showNext: false,
      animationTime: 5,
      soundtrack: SoundTrack.Activity2_9,
    },
    {
      child: <CompressionGame slides={uncompressedSlides} tag={'uncompressed'}/>,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      child: <Intro text={'Now let\'s see what it\'s like when we compress the instructions!'} buttonText={'Play Game'} />,
      showNext: false,
      animationTime: 3.5,
      soundtrack: SoundTrack.Activity2_10,
    },
    {
      child: <CompressionGame slides={compressedSlides} tag={'compressed'}/>,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    { child: <GameResults />,
      animationTime: 8.5,
      soundtrack: SoundTrack.Activity2_Game_End,
    },
    { child: <Outro /> },
  ];

  return (
    <Carousel title='Sending Videos'>
      {content}
    </Carousel>
  );
}

export default Activity2;