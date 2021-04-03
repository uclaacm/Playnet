import React from 'react';

import * as A2Animation1 from '../../../assets/lottie_animation_data/activity2/1VideosLotsInfo.json';
import * as A2Animation2 from '../../../assets/lottie_animation_data/activity2/2TrySendWholeVideo.json';
import * as A2Animation3 from '../../../assets/lottie_animation_data/activity2/3VerySlow.json';
import * as A2Animation4 from '../../../assets/lottie_animation_data/activity2/4HaveToLightenLoad.json';
import * as A2Animation5 from '../../../assets/lottie_animation_data/activity2/5CompressVideo.json';
import * as A2Animation6 from '../../../assets/lottie_animation_data/activity2/6RocketLighter.json';
import * as A2Animation7 from '../../../assets/lottie_animation_data/activity2/7LikeInstructions.json';
import * as A2Animation8 from '../../../assets/lottie_animation_data/activity2/8FinalVideo.json';

import LottieControl from '../../shared/LottieControl';
import { SoundTrack } from '../../shared/soundtrack';
const IntroSlides = [
  {
    child: <LottieControl animationData={A2Animation1.default} />,
    bottomText: 'Videos contain a lot of information!',
    animationTime: 3.5,
    soundtrack: SoundTrack.Activity2_1,
  },
  {
    child: <LottieControl animationData={A2Animation2.default} />,
    bottomText: 'So if a server tried to send you a whole video,',
    animationTime: 3.5,
    soundtrack: SoundTrack.Activity2_2,
  },
  {
    child: <LottieControl animationData={A2Animation3.default} />,
    bottomText: 'It would be very slow.',
    animationTime: 5.24,
    soundtrack: SoundTrack.Activity2_3,
  },
  {
    child: <LottieControl animationData={A2Animation4.default} />,
    bottomText: 'To give you videos fast, we should go back to lighten the load',
    animationTime: 5.35,
    soundtrack: SoundTrack.Activity2_4,
  },
  {
    child:
      <>
        <LottieControl animationData={A2Animation5.default} />
        <h2 id={'body-text'}>which we do with <b>compression</b>, or packing, before the video is sent</h2>
      </>,
    animationTime: 5.89,
    soundtrack: SoundTrack.Activity2_5,
  },
  {
    child: <LottieControl animationData={A2Animation6.default} />,
    bottomText: 'See how much faster and happier the rocket is?',
    animationTime: 3.5,
    soundtrack: SoundTrack.Activity2_6,
  },
  {
    child:
    <>
      <LottieControl animationData={A2Animation7.default} />
      <h2 id={'body-text'}><b>Decompressiong</b> is when your computer uses these instructions to show you the video.</h2>
    </>,
    animationTime: 10.31,
    soundtrack: SoundTrack.Activity2_7,
  },
  {
    child:
    <>
      <h2 id={'body-text'}>But don’t just take our word for it,</h2>
      <LottieControl animationData={A2Animation8.default} />
      <h2 id={'body-text'}>find out whether <b>you</b> think that <b>compression</b> speeds things up!</h2>
    </>,
    animationTime: 8,
    soundtrack: SoundTrack.Activity2_8,
  },
];

export default IntroSlides;