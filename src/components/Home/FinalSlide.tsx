import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../shared/Carousel';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';
import ScalingSlide from '../shared/ScalingSlide';

interface FinalSlideProps {
  chosenVideo: VideoChoices,
}

function FinalSlide(props: FinalSlideProps): JSX.Element {
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const { chosenVideo } = props;

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
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
      })
      .add({
        targets: ['#final-rocket', '#video-pulley', '#video'],
        opacity: [0, 1],
        duration: 1000,
      })
      .add({
        targets: ['#server', '#computer'],
        translateX: 706,
        easing: 'easeInSine',
        duration: 1000,
      })
      .add({
        targets: ['#final-rocket', '#video'],
        translateX: -243,
        duration: 1000,
        easing: 'easeInSine',
      })
      .add({
        targets: ['#final-rocket'],
        translateX: -1000,
        duration: 1000,
        easing: 'linear',
      })
      .add({
        targets: ['#computer', '#video'],
        scale: [1, 3.3],
        duration: 1000,
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      timeline.current?.play();
    }, 250);
    timeline.current?.pause();
    timeline.current?.seek(0);
    return () => clearTimeout(timeout);
  }, [reloadTime]);

  return <ScalingSlide>
    <>
      <div id={'final-intro-background'} />
      <div id={'server'} />
      <div id={'computer'} />
      <div id={'final-rocket'}>
        <div id={'rocket-text'}>{VideoInfo[chosenVideo].rocket_word}</div>
        <div id={'rocket-image'} />
        <div id={'video-pulley'} />
      </div>
      <div id={'video'} className={chosenVideo.replace('_', '-')} />
    </>
  </ScalingSlide>;
}
export default FinalSlide;