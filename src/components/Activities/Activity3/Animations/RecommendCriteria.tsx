import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

function RecommendCriteria(): JSX.Element {
  const { slideIdx, reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);

  const fadeInFast = {
    opacity: [0, 1],
    duration: 500,
  };

  const fadeOutFast = {
    opacity: [1, 0],
    duration: 500,
  };

  const addBorder = {
    borderWidth: ['0px', '5px'],
    duration: 500,
  };

  const removeBorder = {
    borderWidth: ['5px', '0px'],
    duration: 500,
  };

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
      targets: '#shark-video',
      borderWidth: ['0px', '5px'],
      duration: 1000,
    }).add({
      targets: '#criteria-hearts',
      opacity: [0, 1],
      duration: 1000,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: '#shark-video',
      ...removeBorder,
    }).add({
      targets: '#criteria-hearts',
      ...fadeOutFast,
    }).add({
      targets: ['#criteria-cross', '#criteria-check'],
      ...fadeInFast,
    }).add({
      targets: '#flu-video',
      ...addBorder,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: '#flu-video',
      ...removeBorder,
    }).add({
      targets: ['#criteria-cross', '#criteria-check'],
      ...fadeOutFast,
    }).add({
      targets: '#criteria-mirror',
      ...fadeInFast,
    }).add({
      targets: '#flat-video',
      ...addBorder,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });
  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek((slideIdx - 5) * 2000);
    const timeout = setTimeout(() => {
      timeline.current?.play();
    }, 250);
    return () => clearTimeout(timeout);
  }, [reloadTime, slideIdx]);

  return <ScalingSlide widthPx={1100} heightPx={386}>
    <>
      <div id='flu-video' className='criteria-video' />
      <div id='shark-video' className='criteria-video' />
      <div id='flat-video' className='criteria-video' />
      <div id='criteria-hearts' />
      <div id='criteria-check' />
      <div id='criteria-cross' />
      <div id='criteria-mirror' />
    </>
  </ScalingSlide>;
}

export default RecommendCriteria;