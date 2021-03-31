import React, { useState } from 'react';

import Clock from '../../../assets/clock.svg';
import Carousel from '../../shared/Carousel';
import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import CompressionGame from './Game';
import compressedSlides from './Game/compressedSlides';
import Intro from './Game/Intro';
import Outro from './Game/Outro';
import uncompressedSlides from './Game/uncompressedSlides';
import IntroSlides from './IntroSlides';

function Activity2(): JSX.Element {
  const [uncompressedTime, setUncompressedTime] = useState(0);
  const [compressedTime, setCompressedTime] = useState(0);
  const setUncompressedTimeElapsed = (time: number) => setUncompressedTime(uncompressedTime + time);
  const setCompressedTimeElapsed = (time: number) => setCompressedTime(compressedTime + time);

  interface ResultsProps {
    header: string,
    time: number,
  }
  const Results = (props: ResultsProps) => {
    const {header, time} = props;
    return (
      <div className='results-container'>
        <h3>{header}:</h3>
        <div>
          <img src={Clock} alt={'A timer'}/>
          {time/1000} seconds
        </div>
      </div>
    );
  };

  const GameResults = () => {
    const results = [
      {header: 'Uncompressed', time: uncompressedTime},
      {header: 'Compressed', time: compressedTime},
    ];
    return (
      <div id='game-results-container'>
        <div id='game-results'>
          {results.map(({header, time}, i) => <Results key={i} header={header} time={time}/>)}
        </div>
        <p>Wow! When you played the second time, it was a lot faster!</p>
        <p>That’s why YouTube videos are compressed: it makes your computer play videos faster.</p>
      </div>
    );
  };

  const content = [
    ...IntroSlides,
    {
      child: <Intro text={'If you were a computer, how long would it take you to understand the instructions without compression?'} buttonText={'Play Game'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={uncompressedSlides} setTimeElapsed={setUncompressedTimeElapsed} gameNum={0} />,
      showNext: false,
    },
    {
      child: <Intro text={'Now let\'s see what it\'s like when we compress a video!'} buttonText={'Compress Video'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={compressedSlides} setTimeElapsed={setCompressedTimeElapsed} gameNum={1} />,
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