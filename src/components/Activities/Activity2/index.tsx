import React, { useContext, useEffect, useState } from 'react';

import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import ElephantGIF from '../../../assets/activity2/game/elephant.gif';
import ElephantHatCompressedGIF from '../../../assets/activity2/game/elephant_hat_compressed.gif';
import ElephantHatUncompressedGIF from '../../../assets/activity2/game/elephant_hat_uncompressed.gif';
import ElephantShoesCompressedGIF from '../../../assets/activity2/game/elephant_shoe_compressed.gif';
import ElephantShoesUncompressedGIF from '../../../assets/activity2/game/elephant_shoe_uncompressed.gif';

import Carousel, { CarouselContext } from '../../shared/Carousel';

import CompressionGame from './Game';
import { AnswerDisplayStyles } from '../../shared/PlaynetConstants';

function Activity2(): JSX.Element {
  const [gameTimes, setGameTimes] = useState<string[]>(['-1', '-1', '-1', '-1', '-1', '-1']);
  const storage = window.sessionStorage;

  const addTime = (time: number, index: number) => {
    time = time / 1000; //convert milliseconds to seconds
    storage.setItem("A2MinigameIndex" + String(index), String(time));
  };

  const GameResults = () => {
    const renderTimeGridItem = (time: string, index: number) => {
      let specialClass = '';
      if (index === 3 || index === 4 || index === 5) {
        specialClass += ' right-edge';
      }
      if (storage.getItem("A2MinigameIndex" + String(index)) === null) {
        return <div className={'time-grid-block time-' + index + specialClass} key={index}>No Time</div>;
      }
      return <div className={'time-grid-block time-' + index + specialClass} key={index}>{time} seconds</div>;
    };

    const updateGameTimes = () => {
      for (let i = 0; i < 6; i++) {
        const time = storage.getItem("A2MinigameIndex" + String(i));
        const copyGameTimes = gameTimes;
        if (time !== null) {
          copyGameTimes[i] = time;
        } else {
          copyGameTimes[i] = '-1';
        }
        setGameTimes(copyGameTimes);
      }
    };

    updateGameTimes();
    return (
      <div className='grid-container'>
        <div className='top-edge top-row top-left-corner grid-label'></div>
        <div className='top-edge top-row grid-label'
          style={{ gridRowStart: 1, gridColumnStart: 2 }}
        >Without Compression</div>
        <div className='top-right-corner top-row grid-label'
          style={{ gridRowStart: 1, gridColumnStart: 3 }}
        >With Compression</div>
        <div className='grid-label'
          style={{ gridRowStart: 2, gridColumnStart: 1 }}
        >Elephant</div>
        <div className='grid-label'
          style={{ gridRowStart: 3, gridColumnStart: 1 }}
        >Elephant Wearing Hat</div>
        <div className='grid-label bottom-left-corner'
          style={{ gridRowStart: 4, gridColumnStart: 1 }}
        >Elephant Wearing Hat and Shoes</div>
        {gameTimes.map((time, index) => renderTimeGridItem(time, index))}
      </div>
    );
  };

  const uncompressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <img src={ElephantGIF} alt='Gif of Elephant being Drawn' />,
      answerDisplayWords: ['blankspot'],
      answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 0,
    },
    {
      choices: ['hat', 'wig', 'bow'],
      correctChoice: 0,
      gif: <img src={ElephantHatUncompressedGIF} alt='Gif of Elephant with Hat being Drawn' />,
      answerDisplayWords: ['elephant', 'wearing', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 2,
    },
    {
      choices: ['wig', 'bow', 'shoes'],
      correctChoice: 2,
      gif: <img src={ElephantShoesUncompressedGIF} alt='Gif of Elephant wearing Hat and Shoes being Drawn' />,
      answerDisplayWords: ['elephant', 'wearing', 'hat', 'and', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
          AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 4,
    },
  ];

  const compressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <img src={ElephantGIF} alt='Gif of Elephant being Drawn' />,
      answerDisplayWords: ['blankspot'],
      answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 0,
    },
    {
      choices: ['hat', 'wig', 'bow'],
      correctChoice: 0,
      gif: <img src={ElephantHatCompressedGIF} alt='Gif of Elephant with Hat being Drawn' />,
      answerDisplayWords: ['elephant', 'wearing', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 2,
    },
    {
      choices: ['wig', 'bow', 'shoes'],
      correctChoice: 2,
      gif: <img src={ElephantShoesCompressedGIF} alt='Gif of Elephant wearing Hat and Shoes being Drawn' />,
      answerDisplayWords: ['elephant', 'wearing', 'hat', 'and', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
          AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 4,
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
      child: <CompressionGame slides={uncompressedGameSlides} setTimeElapsed={setTimeElapsed} gameNum={0} />,
      showNext: false,
    },
    {
      child: <CompressionGameIntro text={'Now let\'s see what it\'s like when we compress a video!'} buttonText={'Compress Video'} />,
      showNext: false,
    },
    {
      child: <CompressionGame slides={compressedGameSlides} setTimeElapsed={setTimeElapsed} gameNum={1} />,
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
