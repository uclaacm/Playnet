import React from 'react';
import * as A2Animation1 from '../../assets/lottie_animation_data/activity2/1VideosLotsInfo.json';
import * as A2Animation2 from '../../assets/lottie_animation_data/activity2/2TrySendWholeVideo.json';
import * as A2Animation3 from '../../assets/lottie_animation_data/activity2/3VerySlow.json';
import * as A2Animation4 from '../../assets/lottie_animation_data/activity2/4HaveToLightenLoad.json';
import * as A2Animation5 from '../../assets/lottie_animation_data/activity2/5CompressVideo.json';
import * as A2Animation6 from '../../assets/lottie_animation_data/activity2/6RocketLighter.json';
import * as A2Animation7 from '../../assets/lottie_animation_data/activity2/7LikeInstructions.json';
import * as A2Animation8 from '../../assets/lottie_animation_data/activity2/8FinalVideo.json';

import Carousel from '../shared/Carousel';
import '../styles/Carousel.scss';
import LottieControl from '../shared/LottieControl';

function Activity2(): JSX.Element {
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
  ];
  return (
    <Carousel title='Sending Videos'>
      {content}
    </Carousel>
  );
}

export default Activity2;