import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

function Lecture(): JSX.Element {
  const { slideIdx, reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const fadeIn = {
    opacity: [0, 1],
    duration: 750,
  };
  const fadeOut = {
    opacity: [1, 0],
    duration: 750,
  };
  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
      delay: 250,
    });
    timeline.current?.add({
      targets: ['#arm-1', '.disagree'],
      ...fadeIn,
      changeComplete: () => { timeline.current?.pause()},
    });
    timeline.current?.add({
      targets: ['#arm-1', '.disagree'],
      ...fadeOut,
      changeComplete: () => { timeline.current?.pause()},
    });

    timeline.current?.add({
      targets: ['#bad-content'],
      ...fadeOut,
    });
    timeline.current?.add({
      targets: ['.question'],
      ...fadeIn,
    });
    timeline.current?.add({
      targets: ['#arm-1', '#arm-2', '#arm-3', '#arm-4', '#arm-5'],
      ...fadeIn,
    });
  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek((slideIdx - 6) * 1000);
    const timeout = setTimeout(() => {
      timeline.current?.play();
    }, 250);
    return () => clearTimeout(timeout);
  }, [slideIdx, reloadTime]);

  return <ScalingSlide widthPx={1102} heightPx={386}>
    <>
      <div id={'lecture-container'}>
        <div id={'lecturer'}/>
        <div className={'lecture-content'}>
          <div id={'bad-content'}/>
          <div id={'better-content'}/>
        </div>
      </div>
      <div className={'disagree'}/>
      <div className={'question'}/>
      <div id={'arm-1'} className={'arm'}/>
      <div id={'arm-2'} className={'arm'}/>
      <div id={'arm-3'} className={'arm'}/>
      <div id={'arm-4'} className={'arm'}/>
      <div id={'arm-5'} className={'arm'}/>
      <div id={'audience'}/>
    </>
  </ScalingSlide>;
}

export default Lecture;