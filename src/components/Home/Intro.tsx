import anime, {AnimeTimelineInstance} from 'animejs';
import React, { useContext, useEffect, useRef} from 'react';
import { CarouselContext } from '../shared/Carousel';

function Intro(): JSX.Element {
  const {slideIdx, reloadTime} = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      delay: 250,
    });

    const path1 = anime.path('#bg-trajectory #path-1');
    const path2 = anime.path('#bg-trajectory #path-2');
    const path3 = anime.path('#bg-trajectory #path-3');

    // First Intro Animation
    timeline.current?.add({
      targets: '#rocket',
      translateX: path1('x'),
      translateY: path1('y'),
      duration: 1750,
      easing: 'easeInOutExpo',
      changeComplete: () => {
        timeline.current?.pause();
      },
    }).add({
      targets: '#rocket-path',
      width: ['0px', '343px'],
      duration: 1750,
      easing: 'easeInOutExpo',
    }, '-=2000');

    // Second Intro Animation
    timeline.current?.add({
      targets: '#intro-container',
      translateX: ['-300px', '-800px'],
      duration: 1750,
      easing: 'easeInOutExpo',
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    // Third Intro Animation
    timeline.current?.add({
      targets: '#rocket-path',
      width: ['343px', '857px'],
      duration: 1750,
      easing: 'easeInOutExpo',
      changeComplete: () => {
        timeline.current?.pause();
      },
    }).add({
      targets: '#rocket',
      translateX: path2('x'),
      translateY: path2('y'),
      rotate: {
        value: '-45deg',
        delay: 750,
        duration: 1000,
      },
      duration: 1750,
      easing: 'easeInOutExpo',
    }, '-=2000');

    // Fourth Intro Animation
    timeline.current?.add({
      targets: '#library',
      opacity: [0, 1],
      duration: 1750,
      easing: 'easeOutExpo',
      changeComplete: () => {
        timeline.current?.pause();
      },
    });

    // Fifth Intro Animation
    timeline.current?.add({
      targets: '#library',
      opacity: [1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    })
    .add({
      targets: '#rocket',
      rotate: '0deg',
      duration: 1000,
    })
    .add({
      targets: '#rocket',
      translateX: path3('x'),
      translateY: path3('y'),
      duration: 2500,
      easing: 'easeInOutExpo',
    })
    .add({
      targets: '#intro-container',
      translateX: ['-800px', '-2050px'],
      duration: 2500,
      easing: 'easeInOutExpo',
    }, '-=2500')
    .add({
      targets: '#rocket-path',
      width: ['857px', '1606px'],
      duration: 2500,
      easing: 'easeInOutExpo',
    }, '-=3000');
  }, []);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeline.current?.pause();
    timeline.current?.seek(slideIdx * 2000);
    timeout.current = setTimeout(() => {
      timeline.current?.play();
    }, 250);
  }, [slideIdx, reloadTime]);

  return (
    <div id={'intro-container'}>
      <div id={'computer'}/>
      <div id={'rocket-container'}>
        <div id={'rocket-path'}/>
        <svg id={'bg-trajectory'} width="1606" height="128" viewBox="0 0 1606 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id={'path-1'} d="M4 4C4 4 81 4 339.5 4" stroke="black" strokeWidth="8" strokeLinecap="round" strokeDasharray="20 30"/>
          <path id={'path-2'} d="M329 4C447 4 511 18.5 511 61.5C511 104.5 594 123.5 852.5 123.5" stroke="black" strokeWidth="8" strokeLinecap="round" strokeDasharray="20 30"/>
          <path id={'path-3'} d="M843 124C843 124 1309.38 124 1602 124" stroke="black" strokeWidth="8" strokeLinecap="round" strokeDasharray="20 30"/>
        </svg>
        <div id={'rocket'}/>
      </div>
      <div id={'server-container'}>
        <div id={'library'}/>
        <div id={'server'}/>
      </div>
      <div id={'servers'}/>
    </div>
  );
}

export default Intro;