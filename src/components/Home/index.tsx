import React, { useState, forwardRef, RefObject, useRef, useEffect } from 'react';

import Intro10Data from '../LottieAnimations/Intro10Animation';
import Intro11Data from '../LottieAnimations/Intro11Animation';
import Intro12Data from '../LottieAnimations/Intro12Animation';
import Intro8Data from '../LottieAnimations/Intro8Animation';
import Intro9Data from '../LottieAnimations/Intro9Animation';
import Base from '../shared/Base';
import Carousel from '../shared/Carousel';
import LottieControl from '../shared/LottieControl';
import { HeaderSections, VideoChoices } from '../shared/PlaynetConstants';

import '../styles/Home.scss';
import FinalSlide from './FinalSlide';
import Intro from './Intro';
import { FinalYouTube, IntroYouTube } from './Youtube';


function Home(): JSX.Element {
  const [chosenVideo, setChosenVideo] = useState(VideoChoices.NONE_CHOSEN);

  const IntroSlides = forwardRef((_, ref: RefObject) => (
    <Intro ref={ref} />
  ));
  IntroSlides.displayName = 'IntroSlides';
  const ref = useRef(null);
  const storage = window.sessionStorage;

  useEffect(() => { // set chosen video if known; if not, remove saved carousel slide
    const video = storage.getItem('chosenVideo');
    const carouselSlide = storage.getItem('slideIdx');
    if (video && carouselSlide) {
      setChosenVideo(video as VideoChoices);
    } else if (carouselSlide) { // remove slide number if video is not known
      storage.removeItem('slideIdx');
    }
    return () => storage.removeItem('chosenVideo');
  }, []);

  useEffect(() => {
    storage.setItem('chosenVideo', chosenVideo);
  }, [chosenVideo]);

  const content = [
    {
      child: <IntroSlides ref={ref} />,
      topText: 'First, your request gets sent to a server.',
      animationTime: 2.5,
    },
    {
      child: <IntroSlides ref={ref} />,
      topText: 'Servers are like computers. They store information and do math.',
      animationTime: 2.5,
    },
    {
      child: <IntroSlides ref={ref} />,
      topText: 'Your request asks the server for information.',
      animationTime: 2.5,
    },
    {
      child: <IntroSlides ref={ref} />,
      topText: 'It’s like asking a librarian for a book!',
      animationTime: 2.5,
    },
    {
      child: <IntroSlides ref={ref} />,
      topText: 'Servers live in buildings called data centers.',
      animationTime: 5.5,
    },
    {
      child: <LottieControl animationData={Intro8Data} />,
      topText: 'This is a real-life data center at Google!',
      animationTime: 3.14,
    },
    {
      child: <LottieControl animationData={Intro9Data} />,
      topText: 'And this is the outside of the data center.',
      animationTime: 8.04,
    },
    {
      child: <LottieControl animationData={Intro10Data} />,
      topText: 'There are data centers all over the world.',
      animationTime: 13.26,
    },
    {
      child: <LottieControl animationData={Intro11Data} />,
      topText: 'When you search on the web from your house,',
      animationTime: 4.21,
    },
    {
      child: <LottieControl animationData={Intro12Data} />,
      topText: 'a request gets sent all the way to your nearest data center',
      animationTime: 6.21,
    },
    {
      child: <FinalSlide chosenVideo={chosenVideo} />,
      topText: 'and all the way back to your computer!',
      animationTime: 6,
<<<<<<< HEAD
    },
    {
      child: <FinalYouTube chosenVideo={chosenVideo} />,
      showBackground: false,
    },
=======
    }
>>>>>>> 2beed87 (save)
  ];
  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        {(chosenVideo !== VideoChoices.NONE_CHOSEN) ?
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
          </Carousel> :
          <IntroYouTube setChosenVideo={setChosenVideo} />
        }
      </Base>
    </div>
  );
}

export default Home;
