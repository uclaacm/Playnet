import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

interface DebuggingProps {
  phase: number;
}

function Debugging(props: DebuggingProps): JSX.Element {
  const { phase } = props;
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);

  const fadeIn = {
    opacity: [0, 1],
    duration: 1000,
  };
  const fadeOut = {
    opacity: [1, 0],
    duration: 1000,
  };

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
      targets: '#debug-slide1',
      ...fadeOut,
    }).add({
      targets: '#debug-slide2',
      ...fadeIn,
    }).add({
      targets: '#speech-hmm',
      ...fadeIn,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: '#debug-slide2',
      ...fadeOut,
    }).add({
      targets: '#debug-slide3',
      ...fadeIn,
    }).add({
      targets: '#speech-aha',
      ...fadeIn,
    }).add({
      targets: '#debug-slide3',
      ...fadeOut,
    }).add({
      targets: '#debug-slide4',
      ...fadeIn,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });
  }, []);

  useEffect(() => {
    if (phase === 0) { // As there is no animation for slide 1
      timeline.current?.pause();
    } else {
      timeline.current?.seek((phase - 1) * 3000);
      const timeout = setTimeout(() => {
        timeline.current?.play();
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [reloadTime, phase]);

  return (
    <ScalingSlide widthPx={1102} heightPx={386}>
      <>
        <div id="debug-computer">
          <div id="debug-slide1">
            &lt;div id=”#search-bar”&gt;&lt;/div&gt;
            <br />
            &lt;img src=”/my-photos”&gt;&lt;/img&gt;
          </div>
          <div id="debug-slide2">
            <div id="search-bar" />
            <div id="debug-slide2-text"> Error! Image link broken! </div>
          </div>
          <div id="debug-slide3">
            &lt;div id=”#search-bar”&gt;&lt;/div&gt;
            <br />
            &lt;img src=”/my-photos”&gt;&lt;/img&gt;
          </div>
          <div id="debug-slide4">
            <div id="search-bar" />
            <div id="yt-logo" />
          </div>
        </div>
        <div id="speech-hmm" />
        <div id="speech-aha" />
        <div id="debug-person" />
      </>
    </ScalingSlide>
  );
}

export default Debugging;
