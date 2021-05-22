import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';

interface PreloadProps {
    images: Array<string>,
  }

function Preload(props: PreloadProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);

    const srcArray: Array<string> = props['images'];

    useEffect(() => {
        cacheImages(srcArray);
    })

    const cacheImages = async (srcArray: Array<string>) => {
        console.log("In cache images")
        const promises = await srcArray.map((src: string) => {
            return new Promise<string>(function (resolve, reject): void {
                const img = new Image();
                console.log(src)
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