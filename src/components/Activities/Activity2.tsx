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
import LottieControl from '../shared/LottieControl';

function Activity2(): JSX.Element {
  const content = [
    {
      child: <LottieControl animationData={A2Animation1.default} />,
      topText: 'Videos contain a lot of information!',
      animationTime: 1.19,
    },
    {
      child: <LottieControl animationData={A2Animation2.default} />,
      topText: 'So if a server tried to send you a whole video,',
      animationTime: 1.29,
    },
    {
      child: <LottieControl animationData={A2Animation3.default} />,
      topText: 'It would be very slow.',
      animationTime: 5.24,
    },
    {
      child: <LottieControl animationData={A2Animation4.default} />,
      topText: 'To give you videos fast, we should go back to lighten the load',
      animationTime: 3.27,
    },
    {
      child: <LottieControl animationData={A2Animation5.default} />,
      topText: 'which we do with <b>compression</b>, or packing, before the video is sent', // TODO: bold or something compression
      animationTime: 5.89,
    },
    {
      child: <LottieControl animationData={A2Animation6.default} />,
      topText: 'See how much faster and happier the rocket is?',
      animationTime: 2.99,
    },
    {
      child: <LottieControl animationData={A2Animation7.default} />,
      topText: 'Decompressing is when your computer uses these instructions to show you the video.',// TODO: bold or something decompression
      animationTime: 9.20,
    },
    {
      child: <LottieControl animationData={A2Animation8.default} />,
      topText: 'But don’t just take our word for it, ',// TODO: bold or something decompression
      bottomText: "find out whether you think that compression speeds things up!",
      animationTime: 8,
    },
  ];
  return (
    <Carousel subtitle='Sending Videos'>
      {content}
    </Carousel>
  );
}

export default Activity2;
