import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef }from 'react';

import { CarouselContext } from '../../../shared/Carousel';
// import ComputerRecsSvg from '../../../../assets/activity3/computer-recs.svg';
// import VideoRec1Svg from '../../../../assets/activity3/video-rec1.svg';
// import VideoRec2Svg from '../../../../assets/activity3/video-rec2.svg';
// import VideoRec3Svg from '../../../../assets/activity3/video-rec3.svg';
// import Video3Image from '../../../../assets/activity3/video3-image.svg';

import ScalingSlide from '../../../shared/ScalingSlide';

function ComputerRecs(): JSX.Element {
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);

  useEffect(()=> {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
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
    timeline.current?.play();
  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek(0);
    timeline.current?.play();
  }, [reloadTime]);

  return (
    <ScalingSlide widthPx={498} heightPx={333}>
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