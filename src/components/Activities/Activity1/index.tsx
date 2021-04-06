import React, { forwardRef, useRef } from 'react';

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

  const SplitCipherGame = forwardRef((_, ref: RefObject) => (
    <CipherGame ref={ref}/>
  ));
  SplitCipherGame.displayName = 'SplitCipherGame';
  const ref = useRef(null);

  const content = [
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
      child: <CipherGame ref={ref} numStars={0} showSuccess={false}/>,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      child: <CipherGame ref={ref} numStars={1} showSuccess={true}/>,
      showNext: false,
      hasSound: true,
      animationTime: 2.5,
      soundtrack: SoundTrack.Activity1_G1_Center,
    },
    {
      child: <CipherGame ref={ref} numStars={1} showSuccess={false}/>,
      showNext: false,
      hasSound: true,
      hasGameSound: true,
    },
    {
      child: <CipherGame ref={ref} numStars={2} showSuccess={true}/>,
      showNext: false,
      hasSound: true,
      animationTime: 2.5,
      soundtrack: SoundTrack.Activity1_G1_Center,
    },
    {
      child: <CipherGame ref={ref} numStars={2} showSuccess={false}/>,
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
      // animationTime: 6,
      // soundtrack: SoundTrack.Activity1_End,
    },
  ];
  return (
    <Carousel title={'Lost in Translation'}>
      {content}
    </Carousel>
  );
}

export default Activity1;
