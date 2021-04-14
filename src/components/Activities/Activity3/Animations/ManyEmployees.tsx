import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

interface ManyEmployeesProps {
  start: boolean,
}

function ManyEmployees(props: ManyEmployeesProps): JSX.Element {
  const { slideIdx, reloadTime } = useContext(CarouselContext);
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
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: ['#grouping-teams', '#many-employees'],
      opacity: [1,0],
      duration: 1000,
    }).add({
      targets: ['#two-employees', '#bubble-1', '#bubble-2'],
      opacity: [0, 1],
      duration: 1000,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    timeline.current?.add({
      targets: ['#bubble-1', '#bubble-2'],
      opacity: [1, 0],
      duration: 1000,
    }).add({
      targets: '#bubble-3',
      opacity: [0, 1],
      duration: 1000,
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek((slideIdx - 1) * 2000);
    if (props.start === true) {
      const timeout = setTimeout(() => {
        timeline.current?.play();
      }, 250);
      
      return () => clearTimeout(timeout);
    }
  }, [reloadTime, props.start, slideIdx]);

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