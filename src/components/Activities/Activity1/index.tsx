import React from 'react';

import '../../styles/Activity1.scss';

import ComputerSvg from '../../../assets/activity1/computer.svg';
import Game1EndScreen from '../../../assets/activity1/game1-endscreen.svg';

import Carousel from '../../shared/Carousel';
import Computer from '../../shared/Computer';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import { SoundTrack } from '../../shared/soundtrack';
import TransitionSlide from '../../shared/TransitionSlide';
import ComputerConversation from './ComputerConversation';
import CipherGame from './Game1';
import AmbiguousPhrasingGame from './Game2';
import TextBubble from './TextBubble';

function Activity1(): JSX.Element {
  const timeBtwnWords = 3000;

  const content = [
    {
      topText: 'How does YouTube bring you the videos you want?',
      child: <img src={ComputerSvg} width='40%' alt='Image of Youtube on Computer' />,
      bottomText: 'Let\'s dive into what happens in the search bar.',
      animationTime: 5.5,
      soundtrack: SoundTrack.Activity1_1,
    },
    {
      topText: 'Computers don\'t know English...',
      child:
        <div className='content'>
          <div id='binary-text-bubble'>
            <TextBubble textBubbleStyle={TextBubbleStyles.LARGE} text='1101010100' />
          </div>
          <img src={ComputerSvg} width='214px' alt='Image of Youtube on Computer' />
        </div>,
      bottomText: 'So how does it know what you are saying?',
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
          <div>What if you were a computer?</div>
          <div>Can you figure out what the alien wants and keep it happy?</div>
        </TransitionSlide>,
      showNext: false,
      animationTime: 5.3,
      soundtrack: SoundTrack.Activity1_4,
    },
    {
      child: <CipherGame />,
      showNext: false,
      hasSound: true,
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
      child: <AmbiguousPhrasingGame />,
      showNext: false,
      hasSound: true,
    },
    {
      child:
        <div>
          <h2 id={'body-text'}> Being a computer sure isn&apos;t easy... next time you use a search bar, now you know what it has to deal with! </h2>
          <Computer>
            <>
              <br />
              Computers in the real world use artificial intelligence (AI) to remember what they learn
              from trial and error. They can share what they learn with other computers in order to
              give us a better searching experience.
              <br /> <br />
              When you&apos;re older, you&apos;ll get the chance to learn how to code you so that you can
              learn how AI works in more detail!
            </>
          </Computer>
        </div>,
      animationTime: 6,
      soundtrack: SoundTrack.Activity1_End,
    },
  ];
  return (
    <Carousel title={'Lost in Translation'}>
      {content}
    </Carousel>
  );
}

export default Activity1;
