import React, { useEffect } from 'react';
import Soil from '../../assets/activity3/soil.svg';

interface PreloaderProps {
  setIsLoading: (_state : boolean) => void
}

export default function Preloader(props : PreloaderProps) : JSX.Element {
  const cacheImages = (imgs : string[]) => {
    for (const img in imgs) {
      const load = new Image();
      load.src = img;
    }
  };

  useEffect(() => {
    const imgs = [Soil];
    cacheImages(imgs);
  }, []);

  return <div style={{color: 'white'}} onClick={() => props.setIsLoading(false)}>loading...</div>;
}