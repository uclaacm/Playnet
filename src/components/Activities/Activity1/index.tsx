import React from 'react';

import '../../styles/Activity1.scss';

import AppleSvg from '../../../assets/activity1/apple.svg';
import CharacterSvg from '../../../assets/activity1/character3.svg';
import ComputerSvg from '../../../assets/activity1/computer.svg';
import LemonSvg from '../../../assets/activity1/lemon.svg';
import PartyConfettiSvg from '../../../assets/activity1/party_confetti.svg';

import Carousel from '../../shared/Carousel';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import Convo from './Convo';
import TextBubble from './TextBubble';

function Activity1(): JSX.Element {
  const personConvo: string[] = ['apple', 'no...', 'yes!'];
  const computerGuesses: string[] = [LemonSvg, AppleSvg];
  const timeBtwnWords = 3000;

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
      child:
        <div id='slide-3'>
          <div className='left-content content'>
            <div id='cartoon-person-speech'>
              <Convo phrases={personConvo} timeBtwnPhrases={timeBtwnWords} textBubbleStyle={TextBubbleStyles.SMALL_LEFT} />
            </div>
            <img src={CharacterSvg} alt='Image of Cartoon Person' />
            <img id='party-confetti' src={PartyConfettiSvg} style={{
              animationDelay: 2 * timeBtwnWords / 1000 + 's',
              animationDuration: timeBtwnWords / 1000 + 's',
            }} />
          </div>
          <div className='right-content content'>
            <div id='computer-speech-bubble'>
              <Convo phrases={computerGuesses} timeBtwnPhrases={timeBtwnWords} waitTimeBeforeStart={timeBtwnWords / 2}
                textBubbleStyle={TextBubbleStyles.SMALL_RIGHT} />
            </div>
            <img id='computer-slide-3' src={ComputerSvg} width='214px' alt='Image of Youtube on Computer' />
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