import React from 'react';
import '../../styles/Activity3.scss';
import '../../styles/Activity3Game.scss';

import StarSVG from '../../../assets/activity1/game1/star.svg';
import ClockSVG from '../../../assets/shared/activities/clock.svg';

import Carousel, { CarouselItemComponents } from '../../shared/Carousel';
import Preload from '../../shared/Preload';
import ComputerRecs from './Animations/ComputerRecs';
import Debugging from './Animations/Debugging';
import { ABTestSlide1, ABTestSlide2 } from './Animations/IntroABTestExplanations';
import Lecture from './Animations/Lecture';
import List from './Animations/List';
import ManyEmployees from './Animations/ManyEmployees';
import PlantSprout from './Animations/PlantSprout';
import RecommendCriteria from './Animations/RecommendCriteria';
import Game from './Game';
import { GameIntroSlide1 } from './Game/GameIntroSlides';

// gets all files that end in .jpg .svg or .png from given folder
const activity3Images = require.context('../../../assets/activity3/', true, /\.(svg|jpg|png)$/);
const paths = activity3Images.keys();
const requiredImages = paths.map(path => activity3Images(path).default);

const sharedImages = require.context('../../../assets/shared/', true, /\.(svg|jpg|png)$/);
const sharedImagesPaths = sharedImages.keys();
requiredImages.push(... (sharedImagesPaths.map(path => sharedImages(path).default)));

function Activity3(): JSX.Element {
  const content: CarouselItemComponents[] = [
    {
      child:
        <Preload images={requiredImages} />,
      showNext: false,
    },
    {
      child: <ManyEmployees />,
      bottomText: 'Youtube has around 10,000 employees',
      bottomText2: 'That\'s a lot of people--what are they all doing?',
      animationTime: 2,
      showPrev: false,
    },
    {
      child: <ManyEmployees />,
      bottomText2: 'Different teams work on different ways to improve the product.',
      animationTime: 2,
    },
    {
      child: <ManyEmployees />,
      bottomText: 'Each team comes up with new ideas and makes their ideas into reality.',
      animationTime: 2,
    },
    {
      child: <ManyEmployees />,
      bottomText: 'For example, a development team might ask the question: ',
      animationTime: 2,
    },
    {
      child: <ComputerRecs />,
      bottomText: 'When people are done watching a video,',
      bottomText2: ' what videos should we recommend be watched next?',
      animationTime: 5,
    },
    {
      child: <RecommendCriteria />,
      bottomText: 'We could recommend the most popular videos,',
      animationTime: 2,
    },
    {
      child: <RecommendCriteria />,
      bottomText: 'the most credible videos,',
      animationTime: 2,
    },
    {
      child: <RecommendCriteria />,
      bottomText: 'the most relevant videos...',
      animationTime: 2,
    },
    {
      child: <List />,
      bottomText: '...the list goes on.',
      animationTime: 5,
    },
    {
      child: <PlantSprout />,
      bottomText: 'With so many possibilities, how does an idea get brought to life and end up on your screen?',
      animationTime: 5,
    },
    {
      child: <Debugging phase={0}/>,
      bottomText: 'We do that by writing code.',
      animationTime: 3,
    },
    {
      child: <Debugging phase={1}/>,
      bottomText: 'We also have to debug the code, meaning that we fix errors.',
      animationTime: 10,
    },
    {
      child: <Lecture phase={0} />,
      bottomText: 'First, a team discusses ideas.',
      animationTime: 3.5,
    },
    {
      child: <Lecture phase={1} />,
      bottomText: 'Even though there are a lot of good ideas, we have a limited amount of time and money. ',
      animationTime: 4,
    },
    {
      child: <Lecture phase={2} />,
      bottomText: 'So, we have to decide which ideas we care the most about. These are the ideas we bring to real life.',
      animationTime: 5,
    },
    {
      child: <ABTestSlide1/>,
      bottomText: 'Finally, the idea is AB tested, which means that we give',
      bottomText2: 'both the new and old versions to users.',
    },
    {
      child: <ABTestSlide2/>,
      bottomText: 'These users give their opinions on which version is better',
    },
    {
      child: <GameIntroSlide1/>,
      bottomText: 'Now it’s your turn! Imagine that a YouTube team invited you to',
      bottomText2: 'help improve video recommendations.',
    },
    {
      child: <Game />,
      showPrev: false,
    },
  ];

  return (
    <Carousel title='Mind Reading' hasSound={false}>
      {content}
    </Carousel>
  );
}

export default Activity3;
