import anime, {AnimeTimelineInstance} from 'animejs';
import React, { useEffect, useRef } from 'react';
import { VideoChoices } from '../shared/PlaynetConstants';

interface FinalSlideProps {
  chosenVideo: VideoChoices,
}

function FinalSlide(props: FinalSlideProps): JSX.Element {
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  useEffect(() => { // why useEffect??
    timeline.current = anime.timeline({
      autoplay: false,
      delay: 250,
      easing: 'easeInOutExpo',
    });
    
    timeline.current?.add({
      targets: '#final-intro-background',
      opacity: [1, 0],
      duration: 1000,
    })
    .add({
      targets: ['#rocket', '#video-pulley', '#video'],
      opacity: [0,1],
      duration: 1000,
    })
    .add({
      targets: ['#server', '#computer'],
      translateX: 1000,
    })
    .add({
      targets: ['#rocket', '#video-pulley', '#video'],
      translateX: -1000,
      duration: 1000,
      easing: 'easeInExpo',
    })
    .add({
      targets: ['#rocket', '#video-pulley'],
      translateX: -1000,
      duration: 1000,
      easing: 'none',
    })
    .add({
      targets: ['#computer', '#video'],
      scale: [1, 2],
      duration: 1000,
    });
  })
  return <div id={'intro-container'}>
    <div id={'final-intro-background'}/>
    <div id={'server'}/>
    <div id={'video-pulley'}/>
    <div id={'video'} className={props.video.replace('_', '-')}/>
    <div id={'rocket'}/>
    <div id={'computer'}/>
  </div>
}
export default FinalSlide;