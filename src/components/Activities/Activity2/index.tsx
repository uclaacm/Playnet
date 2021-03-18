import React, { useContext, useEffect } from 'react';

import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import Carousel, { CarouselContext } from '../../shared/Carousel';

import CompressionGame from  './Game';

function Activity2(): JSX.Element {
  const AnswerDisplay = ()=> {
    return (
      <div className='flex-row'>
        <div className='individual-answer-display white-background'>elephant</div>
        <div className='individual-answer-display'>wearing</div>
        <div className='individual-answer-display red-outline white-background white-text'>empty</div>
      </div>
    );
  };

  const uncompressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <div>gif of elephant being drawn</div>,
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
      correctChoice: 1,
      gif: <div>gif of elephant with wig</div>,
      answer: <AnswerDisplay />,
    },
  ];

  const compressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <div>compressed gif of elephant being drawn</div>,
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
      correctChoice: 1,
      gif: <div>compressed gif of elephant with wig</div>,
      answer: <AnswerDisplay />,
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
      child: <CompressionGameIntro text={'If you were a computer, how long would it take you to understand the instructions without compression?'} buttonText={'Play Game'}/>,
      showNext: false,
    },
    {
      child: <CompressionGame slides={uncompressedGameSlides}/>,
      showNext: false,
    },
    {
      child: <CompressionGameIntro text={'Now let\'s see what it\'s like when we compress a video!'} buttonText={'Compress Video'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={compressedGameSlides} />,
      showNext: false,
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

function DemoMoveNextPage(props: {children: JSX.Element}) : JSX.Element {
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

function DemoMovePrevPage(props: {children: JSX.Element}) : JSX.Element {
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
