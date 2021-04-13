import React from 'react';
import Carousel, { CarouselItemComponents } from '../../shared/Carousel';
import ComputerRecs from './Animations/ComputerRecs';
import ManyEmployees from './Animations/ManyEmployees';
import PlantSprout from './Animations/PlantSprout';

import '../../styles/Activity3.scss';
import GameWrapper from './GameWrapper';

function Activity3(): JSX.Element {
  const content: CarouselItemComponents[] = [
    {
      child: <ManyEmployees start={false} />,
      topText: 'Youtube has around 10,000 employees',
      bottomText: 'That\'s a lot of people--what are they all doing?',
    },
    {
      child: <ManyEmployees start={true} />,
      topText: 'Different teams work on different ways to improve the product.',
      animationTime: 2,
    },
    {
      child: <ComputerRecs />,
      bottomText: 'When people are done watching a video, what kinds of videos should we recommend to watch next?',
      animationTime: 5,
    },
    {
      child: <PlantSprout />,
      bottomText: 'With so many possibilities, how does an idea get brought to life and end up on your screen?',
      animationTime: 2,
    },
    {
      topText: 'First, let’s decide what to prioritize, or what we care about most.',
      child: <GameWrapper />,
    },
  ];

  return (
    <Carousel title='Mind Reading'>
      {content}
    </Carousel>
  );
}

export default Activity3;
