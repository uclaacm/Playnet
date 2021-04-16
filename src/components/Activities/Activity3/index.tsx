import React from 'react';
import '../../styles/Activity3.scss';
import '../../styles/Activity3Game.scss';

import Carousel, { CarouselItemComponents } from '../../shared/Carousel';
import ComputerRecs from './Animations/ComputerRecs';
import List from './Animations/List';
import ManyEmployees from './Animations/ManyEmployees';
import PlantSprout from './Animations/PlantSprout';
import Game from './Game';
import { GameIntroSlide1, GameIntroSlide2 } from './Game/GameIntroSlides';

function Activity3(): JSX.Element {
  const content: CarouselItemComponents[] = [
    {
      child: <ManyEmployees start={false} />,
      bottomText: 'Youtube has around 10,000 employees',
      bottomText2: 'That\'s a lot of people--what are they all doing?',
      animationTime: 2,
    },
    {
      child: <ManyEmployees start={true} />,
      bottomText2: 'Different teams work on different ways to improve the product.',
      animationTime: 2,
    },
    {
      child: <ComputerRecs />,
      bottomText: 'When people are done watching a video,',
      bottomText2: ' what videos should we recommend be watched next?',
      animationTime: 5,
    },
    {
      child: <List />,
      bottomText: '...the list goes on.',
      animationTime: 5,
    },
    {
      child: <PlantSprout />,
      bottomText: 'With so many possibilities, how does an idea get brought to life and end up on your screen?',
      animationTime: 2,
    },
    {
      child: <GameIntroSlide1/>,
      bottomText: 'Now it’s your turn! Imagine that a YouTube team invited you to',
      bottomText2: 'help improve video recommendations.',
    },
    {
      child: <GameIntroSlide2/>,
    },
    {
      child: <Game />,
    },
  ];

  return (
    <Carousel title='Mind Reading'>
      {content}
    </Carousel>
  );
}

export default Activity3;
