import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { viewportToPixels } from '../../utils/view';
import { CarouselContext } from '../shared/Carousel';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';

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
      opacity: [0,1],
      duration: 1000,
    })
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
    })
    .add({
      targets: ['#final-rocket'],
      translateX: -1000,
      duration: 1000,
      easing: 'linear',
    })
    .add({
      targets: ['#computer', '#video'],
      scale: [1, 3],
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      timeline.current?.play();
    }, 250);
    timeline.current?.pause();
    timeline.current?.seek(0);
    () => clearTimeout(timeout);
  }, [reloadTime]);

  const scale = .9 * (viewportToPixels('100vw') - 152 * 2) / 1000;
  const marginLeft = 1000 / 2 * (scale - 1) + .05 * .9 * (viewportToPixels('100vw') - 152 * 2);
  const marginTop = 390 / 2 * (scale - 1);
  const height = 390 * scale;

  return <div id={'final-intro-container'} style={{transform: `scale(${scale})`, marginLeft: `${marginLeft}px`,
    marginTop: `${marginTop}px`,height: `${height}px`}}>
    <div id={'lottie-mock-container'}>
      <div id={'final-intro-background'} />
      <div id={'server'} />
      <div id={'computer'} />
      <div id={'final-rocket'}>
        <div id={'rocket-text'}>{VideoInfo[chosenVideo].rocket_word}</div>
        <div id={'rocket-image'} />
        <div id={'video-pulley'} />
      </div>
      <div id={'video'} className={chosenVideo.replace('_', '-')} />
    </div>
  </div>;
}
export default FinalSlide;