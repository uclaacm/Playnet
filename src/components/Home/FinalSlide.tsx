import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';
import { CarouselContext } from '../shared/Carousel';

import '../styles/FinalSlide.scss';

interface FinalSlideProps {
  chosenVideo: VideoChoices,
}

function FinalSlide(props: FinalSlideProps): JSX.Element {
  const {reloadTime} = useContext(CarouselContext);

  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const { chosenVideo } = props;

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      delay: 250,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
      targets: '#final-intro-background',
      opacity: [1, 0],
      duration: 1000,
    })
    .add({
      targets: ['#server'],
      translateY: 80,
      duration: 500,
    }, '-=50')
    .add({
      targets: ['#final-rocket', '#video-pulley', '#video'],
      opacity: [0,1],
      duration: 1000,
    }, '-=50')
    .add({
      targets: ['#server', '#computer'],
      translateX: 685,
      easing: 'easeInSine',
      duration: 1000,
    })
    .add({
      targets: ['#final-rocket', '#video'],
      translateX: -264,
      duration: 1000,
      easing: 'easeInSine',
    }, '-=100')
    .add({
      targets: ['#final-rocket'],
      translateX: -1000,
      duration: 1000,
      easing: 'linear',
    }, '-=50')
    .add({
      targets: ['#computer', '#video'],
      scale: [1, 3],
      duration: 1000,
    }, '-=50');
  }, []);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeline.current?.pause();
    timeline.current?.seek(0);
    timeout.current = setTimeout(() => {
      timeline.current?.play();
    }, 250);
  }, [reloadTime]);

  return <div id={'final-intro-container'}>
    <div id={'lottie-mock-container'}>
      <div id={'final-intro-background'} />
      <div id={'server'} />
      <div id={'computer'}/>
      <div id={'final-rocket'}>
      <div id={'rocket-text'}>{VideoInfo[chosenVideo].rocket_word}</div>
        <div id={'rocket-image'}/>
        <div id={'video-pulley'}/>
      </div>
      <div id={'video'} className={chosenVideo.replace('_', '-')}/>
    </div>
  </div>;
}
export default FinalSlide;