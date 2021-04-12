import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef }from 'react';

import { CarouselContext } from '../../../shared/Carousel';

import ScalingSlide from '../../../shared/ScalingSlide';

function ComputerRecs(): JSX.Element {
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);

  useEffect(()=> {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    }).add({
      targets: '.black-border-video',
      opacity: [1, 0],
      delay: 1000,
      duration: 1000,
    }).add({
      targets: '#video1-red',
      opacity: [0, 1],
      duration: 1000,
    }).add({
      targets: '#video2-red',
      opacity: [0, 1],
      duration: 1000,
    }).add({
      targets: '#video3-red',
      opacity: [0, 1],
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek(0);
    timeline.current?.play();
  }, [reloadTime]);

  return (
    <ScalingSlide widthPx={900} heightPx={333}>
      <div id='computer-rec-screen'>
        <div id='video1' className='rec-video black-border-video'/>
        <div id='video2' className='rec-video black-border-video'/>
        <div id='video3' className='rec-video black-border-video'/>
        <div id='video1-red' className='rec-video red-border-video'/>
        <div id='video2-red' className='rec-video red-border-video'/>
        <div id='video3-red' className='rec-video red-border-video'/>
      </div>
    </ScalingSlide>
  );
}

export default ComputerRecs;
