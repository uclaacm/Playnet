import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../shared/Carousel';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';
import ScalingSlide from '../shared/ScalingSlide';

function FinalSlide(): JSX.Element {

    return (
        <>
            <div className='loading-screen'>
                <div id={'loading-anim-rocket'} />
                <div id={'loading-anim-planet'} />
            </div>
        </>
    );


}
export default FinalSlide;