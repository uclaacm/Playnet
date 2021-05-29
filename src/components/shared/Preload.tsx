import React, { useContext, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import { CarouselContext } from '../shared/Carousel';


interface PreloadProps {
  images: Array<string>,
}

function Preload(props: PreloadProps): JSX.Element {
  const carouselContext = useContext(CarouselContext);
  const srcPaths: Array<string> = props.images;

  useEffect(() => {
    void cacheImages(srcPaths); //the void doesn't affect the function call, it just says nothing is being done with the response from cacheImages function call
  }, []);

  const cacheImages = async (srcArray: Array<string>) => {
    const promises = await srcArray.map((src: string) => {
      return new Promise<string>(function (resolve, reject): void {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });
    });

    await Promise.all(promises);
    carouselContext.next();
  };

  return (
    <>
      <div className='loading-screen'>
        <div id={'loading-anim-rocket'} />
        <div id={'loading-anim-planet'} />
                Contacting Alien Species...
      </div>
    </>
  );


}
export default Preload;