import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';

interface PreloadProps {
  images: string[],
  onPreloaded: () => void,
}
const PRELOAD_TIMEOUT_IN_SEC = 10;


function Preload(props: PreloadProps): JSX.Element {
  const { images } = props;
  useEffect(() => {
    // void means the promise's result is being ignored.
    // we do this to avoid an eslint rule: @typescript-eslint/no-floating-promises
    void cacheImages(images);
    const timeout = setTimeout(() => props.onPreloaded(), PRELOAD_TIMEOUT_IN_SEC * 1000);
    return () => clearTimeout(timeout);
  }, []);

  const cacheImages = async (srcArray: Array<string>) => {
    const promises = await srcArray.map((src: string) => {
      return new Promise<string>(function (resolve, reject): void {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(`Could not load ${src}. Please try again.`);
      }).catch((error) =>
        // eslint-disable-next-line no-console
        console.warn(error),
      );
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
