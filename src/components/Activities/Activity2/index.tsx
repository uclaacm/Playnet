import React, { useContext, useEffect, useState } from 'react';

import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import ElephantGIF from '../../../assets/activity2/game/elephant1.gif';
import ElephantHatGIF from '../../../assets/activity2/game/elephant2.gif';
import ElephantHatShoesGIF from '../../../assets/activity2/game/elephant3.gif';

import Carousel, { CarouselContext } from '../../shared/Carousel';

import CompressionGame from './Game';
import { AnswerDisplayStyles } from '../../shared/PlaynetConstants';

function Activity2(): JSX.Element {
  const [gameTimes, setGameTimes] = useState<number[]>([-1, -1, -1, -1,-1,-1]);

  const addTime = (time: number, index: number) => {
    const newGameTimes = gameTimes;
    newGameTimes[index] = time;
    setGameTimes(newGameTimes);
  };

  const GameResults = () => {
    const renderTimeGridItem = (time: number, index: number) => {
      let specialClass = '';
      if (index === 3 || index === 4 || index === 5) {
        specialClass += ' right-edge';
      }
      if (time === -1) {
        return <div className={'time-grid-block time-' + index + specialClass} key={index}>No Time</div>;
      }
      return <div className={'time-grid-block time-' + index + specialClass} key={index}>{time / 1000} seconds</div>;

    };

    return (
      <div className='grid-container'>
        <div className='top-edge top-row top-left-corner grid-label'></div>
        <div className='row1-col2 top-edge top-row grid-label'>Without Compression</div>
        <div className='row1-col3 top-right-corner top-row grid-label'>With Compression</div>
        <div className='row2-col1 grid-label'>Elephant</div>
        <div className='row3-col1 grid-label'>Elephant Wearing Hat</div>
        <div className='row4-col1 grid-label bottom-left-corner'>Elephant Wearing Hat and Shoes</div>
        {gameTimes.map((time, index) => renderTimeGridItem(time, index))}
      </div>
    );
  };

  interface AnswerDisplayProps {
    words: string[];
    styles: AnswerDisplayStyles[];
  }
  const AnswerDisplay = (props: AnswerDisplayProps) => {
    return (
      <div className='flex-row'>
        {props.words.map((word, index) => <div className={'individual-answer-display '+props.styles[index]}>{word}</div>)}
      </div>
    );
  };

  const uncompressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <img src={ElephantGIF} alt='Gif of Elephant being Drawn' />,
      answer: <div
        className='px-choice-container'
        style={{
          backgroundColor: 'lightgray',
          borderStyle: 'none',
        }}
      >
      </div>,
    },
    {
      choices: ['hat', 'wig', 'bow'],
      correctChoice: 0,
      gif: <img src={ElephantHatGIF} alt='Gif of Elephant with Hat being Drawn' />,
      answer: <AnswerDisplay words={['elephant', 'wearing', 'blank']} styles={[AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.RED_SELECTED]}/>,
    },
    {
      choices: ['wig', 'shoes', 'bow'],
      correctChoice: 1,
      gif: <img src={ElephantHatShoesGIF} alt='Gif of Elephant wearing Hat and Shoes being Drawn' />,
      answer: <AnswerDisplay words={['elephant', 'wearing', 'hat', 'and', 'blank']} styles={[AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.RED_SELECTED]}/>,
    },
  ];

  const compressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <img src={ElephantGIF} alt='Gif of Elephant being Drawn' />,
      answer: <div
        className='px-choice-container'
        style={{
          backgroundColor: 'lightgray',
          borderStyle: 'none',
        }}
      >
      </div>,
    },
    {
      choices: ['hat', 'wig', 'bow'],
      correctChoice: 0,
      gif: <img src={ElephantHatGIF} alt='Gif of Elephant with Hat being Drawn' />,
      answer: <AnswerDisplay words={['elephant', 'wearing', 'blank']} styles={[AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.RED_SELECTED]}/>,
    },
    {
      choices: ['wig', 'shoes', 'bow'],
      correctChoice: 1,
      gif: <img src={ElephantHatShoesGIF} alt='Gif of Elephant wearing Hat and Shoes being Drawn' />,
      answer: <AnswerDisplay words={['elephant', 'wearing', 'hat', 'and', 'blank']} styles={[AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.RED_SELECTED]}/>,
    },
  ];

  const content = [
    {
      child: <img src='/assets/img_11.svg' />,
      bottomText: 'go next page to demo somes go back and forth without buttons :)',
    },
    {
      child: <div><DemoMovePrevPage><img src='/assets/img_8.svg' /></DemoMovePrevPage></div>,
      showPrev: false,
      topText: ':0 :0 :0',
      bottomText: 'ill go backwards for you in a few sec',
    },
    {
      child: <div><DemoMoveNextPage><img src='/assets/img_8.svg' /></DemoMoveNextPage></div>,
      showNext: false,
      topText: ':0 :0 :0',
      bottomText: 'ill go forward for you in a few sec',
    },
    {
      child: <div></div>,
      topText: 'dats the whole demo cyaa',
    },
    {
      child: <CompressionGameIntro text={'If you were a computer, how long would it take you to understand the instructions without compression?'} buttonText={'Play Game'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={uncompressedGameSlides} addTime={addTime} gameNum={0} />,
      showNext: false,
    },
    {
      child: <CompressionGameIntro text={'Now let\'s see what it\'s like when we compress a video!'} buttonText={'Compress Video'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={compressedGameSlides} addTime={addTime} gameNum={1} />,
      showNext: false,
    },
    {
      child: <GameResults />,
    },
    {
      child:
        <div className='center-text'>
          <div className='padding-2'>We ended up with the same result, but the uncompressed was a lot faster!</div>
          <div className='padding-2'>This is because compression takes out unhelpful information.</div>
          <div className='padding-2'>The videos that you watch are only fast because of <span className='orange-text'>compression</span>.</div>
        </div>,
    },
  ];

  return (
    <Carousel subtitle='Activity 2 (rn quick demo carousel item)'>
      {content}
    </Carousel>
  );
}

interface CompressionGameIntroProps {
  text: string;
  buttonText: string;
}
function CompressionGameIntro(props: CompressionGameIntroProps): JSX.Element {
  const context = useContext(CarouselContext);
  return (
    <div className='game-intro-content'>
      <div className='center-text'>{props.text}</div>
      <button className='game-intro-button' onClick={context.next}>{props.buttonText}</button>
    </div>
  );
}

function DemoMoveNextPage(props: { children: JSX.Element }): JSX.Element {
  const context = useContext(CarouselContext);
  useEffect(
    () => {
      const timer = setTimeout(() => context.next(), 1000);
      return () => {
        clearTimeout(timer);
      };
    });
  return <>{props.children}</>;
}

function DemoMovePrevPage(props: { children: JSX.Element }): JSX.Element {
  const context = useContext(CarouselContext);
  useEffect(
    () => {
      const timer = setTimeout(() => context.prev(), 5000);
      return () => {
        clearTimeout(timer);
      };
    });
  return <>{props.children}</>;
}

export default Activity2;
