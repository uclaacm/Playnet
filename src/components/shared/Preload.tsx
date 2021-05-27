import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';

interface PreloadProps {
  images: Array<string>,
}

function Preload(props: PreloadProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const srcArray: Array<string> = props.images;

  useEffect(() => {
    cacheImages(srcArray);
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

    setIsLoading(false);
  };

  return (
    <>{isLoading ? (
      <div className='loading-screen'>
        <div id={'loading-anim-rocket'} />
        <div id={'loading-anim-planet'} />
                Contacting Alien Species...
      </div>) :
      <div className='loading-complete'>
        <button id = 'loading-continue button' />
                Done loading
      </div>}
    </>
  );


}
export default Preload;