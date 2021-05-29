import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';

interface PreloadProps {
  images: string[],
  onPreloaded: () => void,
}

function Preload(props: PreloadProps): JSX.Element {
  const srcPaths: Array<string> = props.images;

  useEffect(() => {
    // the void doesn't affect the function call, it just says
    // nothing is being done with the response from the function call
    void cacheImages(srcPaths);
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
    props.onPreloaded();
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