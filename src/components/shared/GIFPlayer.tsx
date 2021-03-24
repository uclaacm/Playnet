import React, { useEffect, useState } from 'react';

interface GifInfoComponent {
  path: string;
  duration: number;
}

interface GIFPlayerProps {
  gifs: GifInfoComponent[];
  alt: string;
}

function GIFPlayer(props: GIFPlayerProps): JSX.Element {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index !== props.gifs.length -1) {
      setTimeout(() => setIndex(index + 1), props.gifs[index].duration);
    }
  });
  
  return (
    <img src={props.gifs[index].path} alt={props.alt}/>
  )
}

export default GIFPlayer;