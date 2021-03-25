import React, { useContext } from 'react';

import '../../styles/Activity1.scss';

import AppleSvg from '../../../assets/activity1/apple.svg';
import CharacterSvg from '../../../assets/activity1/character3.svg';
import ComputerSvg from '../../../assets/activity1/computer.svg';
import LemonSvg from '../../../assets/activity1/lemon.svg';
import PartyConfettiSvg from '../../../assets/activity1/party_confetti.svg';
import BlankComputer from '../../../assets/blank-computer.svg';

import Carousel, { CarouselContext } from '../../shared/Carousel';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import Convo, { Phrase } from './Convo';
import AmbiguousPhrasingGame from './Game2';
import TextBubble from './TextBubble';

function Activity1(): JSX.Element {
  const timeBtwnWords = 3000;
  const personConvo: Phrase[] = [
    {
      text: 'apple',
      isText: true,
    },
    {
      text: 'no...',
      isText: true,
    },
    {
      text: 'yes!',
      isText: true,
    },
  ];
  const computerGuesses: Phrase[] = [
    {
      text: '',
      isText: true,
      timeOnScreen: timeBtwnWords / 2,
      textBubbleStyle: TextBubbleStyles.NONE,
    },
    {
      image: LemonSvg,
      isText: false,
    },
    {
      image: AppleSvg,
      isText: false,
    },
  ];

  const Slide3 = () => {
    return (
      <div id='slide-3'>
        <div className='left-content content'>
          <div id='cartoon-person-speech'>
            <Convo phrases={personConvo} timeBtwnPhrases={timeBtwnWords} textBubbleStyle={TextBubbleStyles.SMALL_LEFT}
            />
          </div>
          <img src={CharacterSvg} alt='Image of Cartoon Person' />
          <img id='party-confetti' src={PartyConfettiSvg} style={{
            animationDelay: 2 * timeBtwnWords / 1000 + 's',
            animationDuration: timeBtwnWords / 1000 + 's',
          }} />
        </div>
        <div className='right-content content'>
          <div id='computer-speech-bubble'>
            <Convo phrases={computerGuesses} timeBtwnPhrases={timeBtwnWords}
              textBubbleStyle={TextBubbleStyles.SMALL_RIGHT} />
          </div>
          <img id='computer-slide-3' src={ComputerSvg} width='214px' alt='Image of Youtube on Computer' />
        </div>
      </div>
    );
  };

  const AmbiguousPhrasingGameIntro = () => {
    const context = useContext(CarouselContext);
    return (
      <div id="game2-intro">
        <span>But even if we know what the alien is saying...can you figure out what they mean?</span>
        <br/>
        <span>Warning: One sentence can mean two things, so the answer might not be what you expect!</span>
        <br/>
        <button className="game-intro-button" onClick={context.next}>
          Play Game
        </button>
      </div>
    );
  };

  const content = [
    {
      topText: 'How does YouTube bring you the videos you want?',
      child: <img src={ComputerSvg} alt='Image of Youtube on Computer' />,
      bottomText: 'Let\'s dive into what happens in the search bar.',
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
    },
    {
      topText: 'Computers have to learn just like we do: by trial and error!',
      child: <Slide3 />,
    },
    {
      child: <AmbiguousPhrasingGameIntro/>,
      showNext: false,
    },
    {
      child: <AmbiguousPhrasingGame />,
      showNext: false,
    },
    {
      child:
        <div>
          <h2 id={'body-text'}> Being a computer sure isn&apos;t easy... next time you use a search bar, now you know what it has to deal with! </h2>

          <div id='blank-computer'>
            <img id='blank-computer-img' src={BlankComputer} />
            <div id='blank-computer-text'>
              <div id='blank-computer-title-text'> More Information</div> <br/>
              Computers in the real world use artificial intelligence (AI) to remember what they learn
              from trial and error. They can share what they learn with other computers in order to
              give us a better searching experience.
              <br/> <br/>
              When you&apos;re older, you&apos;ll get the chance to learn how to code you that you can
              learn how AI works in more detail!
            </div>
          </div>
        </div>,
    },
  ];
  return (
    <Carousel title={'Lost in Translation'}>
      {content}
    </Carousel>
  );
}

export default Activity1;
