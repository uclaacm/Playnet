import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

function ManyEmployees(): JSX.Element {
  const { slideIdx, reloadTime } = useContext(CarouselContext);
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
      targets: '#grouping-teams',
      ...fadeIn,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: ['#grouping-teams', '#many-employees'],
      ...fadeOut,
    }).add({
      targets: ['#two-employees', '#bubble-1', '#bubble-2'],
      ...fadeIn,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: ['#bubble-1', '#bubble-2'],
      ...fadeOut,
    }).add({
      targets: '#bubble-3',
      ...fadeIn,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

  }, []);

  useEffect(() => {
    if (slideIdx === 0) { //As there is no animation for slide 1
      timeline.current?.pause();
    }
    else {
      timeline.current?.seek((slideIdx - 1)  * 2000);
      const timeout = setTimeout(() => {
        timeline.current?.play();
      }, 250);
      return () => clearTimeout(timeout);
    }

  }, [reloadTime, slideIdx]);

  return <ScalingSlide widthPx={1100} heightPx={386}>
    <>
      <div id={'many-employees'} />
      <div id={'grouping-teams'}>
        <div id={'ellipse-1'} />
        <div id={'ellipse-2'} />
        <div id={'ellipse-3'} />
        <div id={'ceo-text'}> <b>CEO</b> </div>
        <div id={'sales-text'}> <b>Sales</b> </div>
        <div id={'dev-text'}>  <b>Development</b>  </div>
      </div>
      <div id={'two-employees'} />
      <div id={'bubble-1'} />
      <div id={'bubble-2'} />
      <div id={'bubble-3'} />
    </>
  </ScalingSlide>;
}
export default ManyEmployees;