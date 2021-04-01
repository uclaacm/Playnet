import React from 'react';

import Carousel from '../../shared/Carousel';
import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import CompressionGame from './Game';
import compressedSlides from './Game/compressedSlides';
import Intro from './Game/Intro';
import GameResults from './Game/GameResults';
import Outro from './Game/Outro';
import uncompressedSlides from './Game/uncompressedSlides';
import IntroSlides from './IntroSlides';

function Activity2(): JSX.Element {
  const content = [
    ...IntroSlides,
    {
      child: <Intro text={'If you were a computer, how long would it take you to understand the instructions without compression?'} buttonText={'Play Game'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={uncompressedSlides} tag={'uncompressed'}/>,
      showNext: false,
    },
    {
      child: <Intro text={'Now let\'s see what it\'s like when we compress a video!'} buttonText={'Compress Video'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={compressedSlides} tag={'compressed'}/>,
      showNext: false,
    },
    { child: <GameResults /> },
    { child: <Outro /> },
  ];

  return (
    <Carousel title='Sending Videos'>
      {content}
    </Carousel>
  );
}

export default Activity2;