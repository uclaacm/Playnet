import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../shared/Carousel';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';
import ScalingSlide from '../shared/ScalingSlide';

function FinalSlide(): JSX.Element {
    const { reloadTime } = useContext(CarouselContext);
    const timeline = useRef<AnimeTimelineInstance | null>(null);


    useEffect(() => {
        timeline.current = anime.timeline({
            autoplay: false,
            easing: 'easeInOutSine',
          });

        timeline.current?.add({

        })
    }, []);

    return (
        <>
            <div id = {'loading-anim-rocket'}/>
            <div id = {'loading-anim-planet'}/>
        </>
    );


}
export default FinalSlide;