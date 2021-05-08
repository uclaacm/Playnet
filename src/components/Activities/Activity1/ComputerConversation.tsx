import React, { useContext } from 'react';

import AppleSvg from '../../../assets/activity1/apple.svg';
import CharacterSvg from '../../../assets/activity1/character3.svg';
import LemonSvg from '../../../assets/activity1/lemon.svg';
import PartyConfettiSvg from '../../../assets/activity1/party_confetti.svg';
import ComputerSvg from '../../../assets/activity1/search-highlighted-computer.svg';

import { CarouselContext } from '../../shared/Carousel';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import Convo, { Phrase } from './Convo';

interface ComputerConversationProps {
  timeBtwnWords: number;
}

const ComputerConversation = (props: ComputerConversationProps): JSX.Element => {
  const { reloadTime } = useContext(CarouselContext);
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
      timeOnScreen: props.timeBtwnWords / 2,
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

  return (
    <div id="slide-3">
      <div className="left-content content">
        <div id="cartoon-person-speech">
          <Convo
            key={`left-${reloadTime}`}
            phrases={personConvo}
            timeBtwnPhrases={props.timeBtwnWords}
            textBubbleStyle={TextBubbleStyles.SMALL_LEFT}
          />
        </div>
        <img src={CharacterSvg} alt="Image of Cartoon Person" />
        <img
          key={`confetti-${reloadTime}`}
          id="party-confetti"
          src={PartyConfettiSvg}
          style={{
            animationDelay: `${2 * props.timeBtwnWords / 1000}s`,
            animationDuration: `${props.timeBtwnWords / 1000}s`,
          }}
        />
      </div>
      <div className="right-content content">
        <div id="computer-speech-bubble">
          <Convo
            key={`right-${reloadTime}`}
            phrases={computerGuesses}
            timeBtwnPhrases={props.timeBtwnWords}
            textBubbleStyle={TextBubbleStyles.SMALL_RIGHT}
          />
        </div>
        <img id="computer-slide-3" src={ComputerSvg} width="214px" alt="Image of Youtube on Computer" />
      </div>
    </div>
  );
};

export default ComputerConversation;
