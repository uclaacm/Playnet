import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

function RecommendCriteria() : JSX.Element {
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

    const addBorder = {
     borderWidth: ['0px', '5px'],
     duration: 1000,
    };

    const removeBorder = {
      borderWidth: ['5px', '0px'],
      duration: 1000,
    };

    useEffect(() => {
        timeline.current = anime.timeline({
            autoplay: false,
            easing: 'easeInOutSine',
        });

        timeline.current?.add({
          targets: '.criteria-video',
          ...fadeIn,
        }).add({
          targets: '#shark-video',
          ...addBorder,
          changeComplete: () => {
            timeline.current?.pause();
          },
        });

        timeline.current?.add({
          targets: '#shark-video',
          border
        })

    }, []);

    useEffect(() => {
        timeline.current?.seek(slideIdx  * 2000);
        const timeout = setTimeout(() => {
          timeline.current?.play();
        }, 250);
        return () => clearTimeout(timeout);
      }, [reloadTime, slideIdx]);

    return <ScalingSlide widthPx={1100} heightPx={386}>
        <>
          <div id='flu-video' className='criteria-video' />
          <div id='shark-video' className='criteria-video' />
          <div id='flat-video' className='criteria-video' />
          <div id='flu-select' className='criteria-selector' />
          <div id='shark-select' className='criteria-selector' />
          <div id='flat-select' className='criteria-selector' />
          <div id='criteria-hearts' />
          <div id='criteria-check' />
          <div id='criteria-cross' />
          <div id='criteria-mirror' />


        </>
    </ScalingSlide>;
}

export default RecommendCriteria;