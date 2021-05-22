import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CarouselContext } from './Carousel';
import { VideoChoices, VideoInfo } from './PlaynetConstants';
import ScalingSlide from './ScalingSlide';

interface PreloadProps {
    images: Array<string>,
  }

function Preload(props: PreloadProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);

    const srcArray = props;

    const cacheImages = async (srcArray: Array<string>) => {
        const promises = await srcArray.map((src: string) => {
            return new Promise<string>(function (resolve, reject): void {
                const img = new Image();

                img.src = src;
                img.onload = resolve();
                img.onerror = reject();
            });
        });

        await Promise.all(promises)

        setIsLoading(false);
    }

    return (
        <>{isLoading ? (
            <div className='loading-screen'>
                <div id={'loading-anim-rocket'} />
                <div id={'loading-anim-planet'} />
            </div>) : 
            <div className='loading-complete'>
                <button id = 'loading-continue button' />   
                Done loading
            </div>}
        </>
    );


}
export default Preload;