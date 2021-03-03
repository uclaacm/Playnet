import React, { useRef } from 'react';
import Intro10Data from '../LottieAnimations/Intro10Animation';
import Intro11Data from '../LottieAnimations/Intro11Animation';
import Intro12Data from '../LottieAnimations/Intro12Animation';
import Intro8Data from '../LottieAnimations/Intro8Animation';
import Intro9Data from '../LottieAnimations/Intro9Animation';
import Base from '../shared/Base';
import Carousel from '../shared/Carousel';
import LottieControl from '../shared/LottieControl';
import { HeaderSections } from '../shared/PlaynetConstants';

import '../styles/Home.scss';
import Intro from './Intro';

function Home(): JSX.Element {
  const IntroSlides = useRef(<Intro />);
  const content = [
    {
      child: IntroSlides.current,
      topText: 'First, your request gets sent to a server.',
    },
    {
      child: IntroSlides.current,
      topText: 'Servers are like computers. They store information and do math.'
    },
    {
      child: IntroSlides.current,
      topText: 'Your request asks the server for information.',
    },
    {
      child: IntroSlides.current,
      topText: 'It’s like asking a librarian for a book!'
    },
    {
      child: IntroSlides.current,
      topText: 'Servers live in buildings called data centers.',
    },
    {
      child: <LottieControl animationData={Intro8Data} />,
      topText: 'This is a real-life data center at Google!',
    },
    {
      child: <LottieControl animationData={Intro9Data} />,
      topText: 'And this is the outside of the data center.',
    },
    {
      child: <LottieControl animationData={Intro10Data} />,
      topText: 'There are data centers all over the world.',
    },
    {
      child: <LottieControl animationData={Intro11Data} />,
      topText: 'When you search on the web from your house,',
    },
    {
      child: <LottieControl animationData={Intro12Data} />,
      topText: 'a request gets sent all the way to your nearest data center',
    },
  ];
  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        <Carousel
          onNext={() => { /* Run function along with transition on next button press */
            // console.log('next');
          }}
          onPrev={() => { /* Run function along with transition on previous button press */
            // console.log('prev');
          }}
        /* can use showNext={true|false} to manually show or hide button */
        /*         showPrev={true|false}                                 */
        >
          {/* Each child element of the Carousel is considered as one "slide", like so */}
          {content}
        </Carousel>
      </Base>
    </div>
  );
}

export default Home;
