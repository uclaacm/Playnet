import React, { useContext, useState } from 'react';

import '../../styles/Activity1.scss';
import '../../styles/Activity2.scss';
import '../../styles/CompressionGame.scss';

import ElephantGIF from '../../../assets/activity2/game/elephant.gif';
import ElephantHatGIF from '../../../assets/activity2/game/elephant_hat_compressed.gif';
import ElephantShoesGIF from '../../../assets/activity2/game/elephant_shoe_compressed.gif';

import * as A2Animation1 from '../../../assets/lottie_animation_data/activity2/1VideosLotsInfo.json';
import * as A2Animation2 from '../../../assets/lottie_animation_data/activity2/2TrySendWholeVideo.json';
import * as A2Animation3 from '../../../assets/lottie_animation_data/activity2/3VerySlow.json';
import * as A2Animation4 from '../../../assets/lottie_animation_data/activity2/4HaveToLightenLoad.json';
import * as A2Animation5 from '../../../assets/lottie_animation_data/activity2/5CompressVideo.json';
import * as A2Animation6 from '../../../assets/lottie_animation_data/activity2/6RocketLighter.json';
import * as A2Animation7 from '../../../assets/lottie_animation_data/activity2/7LikeInstructions.json';
import * as A2Animation8 from '../../../assets/lottie_animation_data/activity2/8FinalVideo.json';

import Carousel, { CarouselContext } from '../../shared/Carousel';
import GIFPlayer from '../../shared/GIFPlayer';
import LottieControl from '../../shared/LottieControl';
import { AnswerDisplayStyles } from '../../shared/PlaynetConstants';
import CompressionGame from './Game';

function Activity2(): JSX.Element {
  const [gameTimes, setGameTimes] = useState<string[]>(['-1', '-1', '-1', '-1', '-1', '-1']);
  const storage = window.sessionStorage;

  const setTimeElapsed = (gameNum: number, slideNum: number, time: number) => {
    const index = gameNum * 3 + slideNum;
    time = time / 1000; //convert milliseconds to seconds
    storage.setItem('A2MinigameIndex' + String(index), String(time));
  };

  const GameResults = () => {
    const renderTimeGridItem = (time: string, index: number) => {
      let specialClass = '';
      if (index === 3 || index === 4 || index === 5) {
        specialClass += ' right-edge';
      }
      if (storage.getItem('A2MinigameIndex' + String(index)) === null) {
        return <div className={'time-grid-block time-' + index + specialClass} key={index}>No Time</div>;
      }
      return <div className={'time-grid-block time-' + index + specialClass} key={index}>{time} seconds</div>;
    };

    const updateGameTimes = () => {
      for (let i = 0; i < 6; i++) {
        const time = storage.getItem('A2MinigameIndex' + String(i));
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

  const elephantGifTime = { path: ElephantGIF, duration: 13000 };
  const elephantHatGifTime = { path: ElephantHatGIF, duration: 6000 };
  const elephantShoeGifTime = { path: ElephantShoesGIF, duration: 2000 };

  const uncompressedGameSlides = [
    {
      choices: ['elephant', 'cow', 'sheep'],
      correctChoice: 0,
      gif: <GIFPlayer gifs={[elephantGifTime]} alt='Gif of Elephant being Drawn' id={'0-0'} />,
      answerDisplayWords: ['blankspot'],
      answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 0,
    },
    {
      choices: ['hat', 'wig', 'bow'],
      correctChoice: 0,
      gif: <GIFPlayer gifs={[
        elephantGifTime,
        elephantHatGifTime,
      ]} alt='Gif of Elephant with Hat being Drawn' id={'0-1'} />,
      answerDisplayWords: ['elephant', 'wearing', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 2,
    },
    {
      choices: ['wig', 'bow', 'shoes'],
      correctChoice: 2,
      gif: <GIFPlayer gifs={[
        elephantGifTime,
        elephantHatGifTime,
        elephantShoeGifTime,
      ]} alt='Gif of Elephant wearing Hat and Shoes being Drawn' id={'0-2'} />,
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
      gif: <GIFPlayer gifs={[elephantGifTime]} alt='Gif of Elephant being Drawn' id={'1-0'} />,
      answerDisplayWords: ['blankspot'],
      answerDisplayStyles: [AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 0,
    },
    {
      choices: ['hat', 'wig', 'bow'],
      correctChoice: 0,
      gif: <GIFPlayer gifs={[elephantHatGifTime]} alt='Gif of Elephant wearing Hat being Drawn' id={'1-0'} />,
      answerDisplayWords: ['elephant', 'wearing', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 2,
    },
    {
      choices: ['wig', 'bow', 'shoes'],
      correctChoice: 2,
      gif: <GIFPlayer gifs={[elephantShoeGifTime]} alt='Gif of Elephant wearing hat and shoes being Drawn' id={'1-0'} />,
      answerDisplayWords: ['elephant', 'wearing', 'hat', 'and', 'blank'],
      answerDisplayStyles:
        [AnswerDisplayStyles.WHITE_BACKGROUND, AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.WHITE_BACKGROUND,
          AnswerDisplayStyles.NO_BACKGROUND, AnswerDisplayStyles.ANSWER_SPOT],
      answerSlotIndex: 4,
    },
  ];

  const content = [
    {
      child: <LottieControl animationData={A2Animation1.default} />,
      topText: 'Videos contain a lot of information!',
      animationTime: 1.47,
    },
    {
      child: <LottieControl animationData={A2Animation2.default} />,
      topText: 'So if a server tried to send you a whole video,',
      animationTime: 3.45,
    },
    {
      child: <LottieControl animationData={A2Animation3.default} />,
      topText: 'It would be very slow.',
      animationTime: 5.24,
    },
    {
      child: <LottieControl animationData={A2Animation4.default} />,
      topText: 'To give you videos fast, we should go back to lighten the load',
      animationTime: 5.35,
    },
    {
      child:
        <>
          <h2 id={'body-text'}>which we do with <b>compression</b>, or packing, before the video is sent</h2>
          <LottieControl animationData={A2Animation5.default} />
        </>,
      animationTime: 5.89,
    },
    {
      child: <LottieControl animationData={A2Animation6.default} />,
      topText: 'See how much faster and happier the rocket is?',
      animationTime: 3.12,
    },
    {
      child:
      <>
        <h2 id={'body-text'}><b>Decompressing</b> is when your computer uses these instructions to show you the video.</h2>
        <LottieControl animationData={A2Animation7.default} />
      </>,
      animationTime: 10.31,
    },
    {
      child:
      <>
        <h2 id={'body-text'}>But don’t just take our word for it,</h2>
        <LottieControl animationData={A2Animation8.default} />
        <h2 id={'body-text'}>find out whether <b>you</b> think that <b>compression</b> speeds things up!</h2>
      </>,
      animationTime: 8,
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
          <div className='padding-2'>The videos that you watch are only fast because of <span id={'body-text'}><b>compression</b></span>.</div>
        </div>,
    },
  ];

  return (
    <Carousel title='Sending Videos'>
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

export default Activity2;
