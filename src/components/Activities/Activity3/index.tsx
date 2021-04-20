import React, { forwardRef, useRef } from 'react';
import '../../styles/Activity3.scss';
import '../../styles/Activity3Game.scss';

import Carousel, { CarouselItemComponents } from '../../shared/Carousel';
import { ABTestSlide1, ABTestSlide2 } from './ABTestExample';
import ComputerRecs from './Animations/ComputerRecs';
import Debugging from './Animations/Debugging';
import Lecture from './Animations/Lecture';
import List from './Animations/List';
import ManyEmployees from './Animations/ManyEmployees';
import PlantSprout from './Animations/PlantSprout';
import RecommendCriteria from './Animations/RecommendCriteria';
import Game from './Game';
import { GameIntroSlide1, GameIntroSlide2 } from './Game/GameIntroSlides';
import Test from './Test';

function Activity3(): JSX.Element {
  const LectureReference = forwardRef((props, ref) => <Lecture ref={ref} {...props}/>);
  LectureReference.displayName = 'LectureReference';
  const lectureRef = useRef(null);

  const content: CarouselItemComponents[] = [
    // {
    //   child: <Test />
    // },
    {
      child: <Game />,
    },
    {
      child: <ManyEmployees />,
      bottomText: 'Youtube has around 10,000 employees',
      bottomText2: 'That\'s a lot of people--what are they all doing?',
      animationTime: 2,
    },
    {
      child: <ManyEmployees />,
      bottomText2: 'Different teams work on different ways to improve the product.',
      animationTime: 2,
    },
    {
      child: <ManyEmployees />,
      topText: 'Each team comes up with new ideas and makes their ideas into reality.',
      animationTime: 2,
    },
    {
      child: <ManyEmployees />,
      topText: 'For example, a development team might ask the question: ',
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
      animationTime: 3,
    },
    {
      child: <Debugging phase={0}/>,
      bottomText: 'We do that by writing code.',
      animationTime: 3,
    },
    {
      child: <Debugging phase={1}/>,
      bottomText: 'We also have to debug the code, meaning that we fix errors.',
      animationTime: 4,
    },
    {
      child: <Debugging phase={2}/>,
      bottomText: 'We also have to debug the code, meaning that we fix errors.',
      animationTime: 6,
    },
    {
      child: <LectureReference ref={lectureRef}/>,
      bottomText: 'First, a team discusses ideas.',
      animationTime: 2,
    },
    {
      child: <LectureReference ref={lectureRef}/>,
      bottomText: 'Even though there are a lot of good ideas, we have a limited amount of time and money. ',
      animationTime: 2,
    },
    {
      child: <LectureReference ref={lectureRef}/>,
      bottomText: 'So, we have to decide which ideas we care the most about. These are the ideas we bring to real life.',
      animationTime: 2,
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
      child: <GameIntroSlide2/>,
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
