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
      targets: '#grouping-teams',
      opacity: [0, 1],
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    if (props.start === true) {
      const timeout = setTimeout(() => {
        timeline.current?.play();
      }, 250);
      timeline.current?.pause();
      timeline.current?.seek(0);
      return () => clearTimeout(timeout);
    }
  }, [reloadTime, props.start]);

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
    </>
  </ScalingSlide>;
}
export default ManyEmployees;