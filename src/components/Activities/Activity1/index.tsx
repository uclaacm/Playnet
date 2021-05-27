import React from 'react';

import '../../styles/Activity1.scss';

import Game1EndScreen from '../../../assets/activity1/game1-endscreen.svg';
import BlankComputerSVG from '../../../assets/blank-computer.svg';
import ComputerSvg from '../../../assets/activity1/search-highlighted-computer.svg';

import Carousel from '../../shared/Carousel';
import Computer from '../../shared/Computer';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import Preload from '../../shared/Preload';
import { SoundTrack } from '../../shared/soundtrack';
import TransitionSlide from '../../shared/TransitionSlide';
import ComputerConversation from './ComputerConversation';
import CipherGame, { SuccessCipherGameState } from './Game1';
import AmbiguousPhrasingGame from './Game2';
import TextBubble from './TextBubble';

const reqSvgs = require.context('../../../assets/activity1/', true, /\.(svg|jpg|png)$/);    //should get all the files in assets/activity1/ and its subdirectories that end ins .jpg .svg or .png
const paths = reqSvgs.keys();
const svgs = paths.map(path => reqSvgs(path).default);

const alienSvgs = require.context('../../../assets/alien/', true, /\.(svg|jpg|png)$/);  //get all files in assets/alien
const alienPaths = alienSvgs.keys();
svgs.push(... (alienPaths.map(path => alienSvgs(path).default)));
svgs.push(BlankComputerSVG);

function Activity1(): JSX.Element {
  const timeBtwnWords = 3000;

  const content = [
    {
      child:
        <Preload images={svgs} />,
    },
    {
      child: <img src={ComputerSvg} width='40%' alt='Image of Youtube on Computer' />,
      bottomText: 'How does YouTube bring you the videos you want?',
      bottomText2: 'Let\'s dive into what happens in the search bar.',
      animationTime: 5.5,
      soundtrack: SoundTrack.Activity1_1,
    },
    {
      child:
        <div className='content'>
          <div id='binary-text-bubble'>
            <TextBubble textBubbleStyle={TextBubbleStyles.LARGE} text='1101010100' />
          </div>
          <img src={ComputerSvg} width='214px' alt='Image of Youtube on Computer' />
        </div>,
      bottomText: 'Computers don\'t know English...',
      bottomText2: 'So how does it know what you are saying?',
      animationTime: 4.5,
      soundtrack: SoundTrack.Activity1_2,
    },
    {
      bottomText: 'Computers have to learn just like how we do: by trial and error!',
      child: <ComputerConversation timeBtwnWords={timeBtwnWords} />,
      animationTime: Math.max(3 * timeBtwnWords / 1000, 4.5),
      soundtrack: SoundTrack.Activity1_3,
    },
    {
      child:
        <TransitionSlide buttonText={'Play Game'}>
          <div>Imagine that you are a computer trying to learn what the alien wants.</div>
          <div>Can you figure out what the alien wants and keep it happy?</div>
        </TransitionSlide>,
      showNext: false,
      animationTime: 5.3,
      soundtrack: SoundTrack.Activity1_4,
    },
    {
      topText: 'Try to guess what image the alien wants.',
      child: <CipherGame numStars={0} skips={5} />,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      topText: 'Try to guess what image the alien wants.',
      child: <SuccessCipherGameState numStars={1} />,
      showNext: false,
      hasSound: true,
      animationTime: 2.5,
      soundtrack: SoundTrack.Activity1_G1_Center,
    },
    {
      topText: 'Try to guess what image the alien wants.',
      child: <CipherGame numStars={1} skips={3} />,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      topText: 'Try to guess what image the alien wants.',
      child: <SuccessCipherGameState numStars={2} />,
      showNext: false,
      hasSound: true,
      animationTime: 2.5,
      soundtrack: SoundTrack.Activity1_G1_Center,
    },
    {
      topText: 'Try to guess what image the alien wants.',
      child: <CipherGame numStars={2} skips={1} />,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      bottomText: 'Good news, we just found a translator that can help us understand the alien!',
      child:
        <div>
          <img src={Game1EndScreen} />
        </div>,
      animationTime: 4.5,
      soundtrack: SoundTrack.Activity1_G1_G2,
    },
    {
      child:
        <TransitionSlide buttonText={'Play Game'}>
          <div>But even if we know what the alien is saying... can you figure out what they mean?</div>
          <div>Warning: One sentence can mean two things, so the answer might not be what you expect!</div>
        </TransitionSlide>,
      showNext: false,
      animationTime: 9.5,
      soundtrack: SoundTrack.Activity1_G2_Intro,
    },
    {
      topText: 'Try to guess what the alien is talking about.',
      child: <AmbiguousPhrasingGame />,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      child:
        <>
          <h2 id={'body-text'}> Being a computer sure isn&apos;t easy... next time you use a search bar, </h2>
          <h2 id={'body-text'}> now you know what it has to deal with! </h2>
          <Computer>
            <>
              <p>
                Computers in the real world use artificial intelligence (AI) to remember what they learn
                from trial and error. They can share what they learn with other computers to
                give us a better searching experience.
              </p>

              When you&apos;re older, you&apos;ll get the chance to learn how to code so that you can
              learn how AI works in more detail!
            </>
          </Computer>
        </>,
      hasSound: false,
      // animationTime: 6,
      // soundtrack: SoundTrack.Activity1_End,
    },
  ];
  return (
    <Carousel title={'Lost in Translation'} hasSound={true}>
      {content}
    </Carousel>
  );
}

export default Activity1;
