import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

interface ManyEmployeesProps {
  start: boolean,
}

function ManyEmployees(props: ManyEmployeesProps): JSX.Element {
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
      targets: '#plant-sprout',
      translateY: [0, -190],
      duration: 1000,
    }).add({
      targets: '#left-leaf',
      opacity: [0, 1],
      duration: 500,
    }, '-=500').add({
      targets: '#right-leaf',
      opacity: [0, 1],
      duration: 500,
    }, '-=200');
  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek(0);
    if (props.start === true) {
      const timeout = setTimeout(() => {
        timeline.current?.play();
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [reloadTime, props.start]);

  return <ScalingSlide widthPx={1102} heightPx={386}>
    <>
      <div id={'sprout-container'}>
        <div id={'plant-sprout'} />
        <div id={'left-leaf'} />
        <div id={'right-leaf'} />
      </div>
      <div id={'bottom-soil'} />
    </>
  </ScalingSlide>;
}
export default ManyEmployees;