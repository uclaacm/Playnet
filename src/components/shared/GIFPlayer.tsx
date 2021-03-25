import React, { useEffect, useState } from 'react';

interface GifInfoComponent {
  path: string;
  duration: number;
  // id: string;
}

interface GIFPlayerProps {
  gifs: GifInfoComponent[];
  alt: string;
  id: string;
}

function GIFPlayer(props: GIFPlayerProps): JSX.Element {
  const [index, setIndex] = useState(0);
  let lastTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (index === props.gifs.length -1) {
      return;
    }
    lastTimeout = setTimeout(() => {
      setIndex(index + 1);
    }, props.gifs[index].duration);
  });

  useEffect(() => {
    if (lastTimeout !== undefined && index !== 0) {
      clearTimeout(lastTimeout);
    }
    setIndex(0);
  }, [props.id]);

  return (
    <img src={props.gifs[index].path + '?'+ String(Date.now())} alt={props.alt+props.id} key={props.id}/>
  );
}

export default GIFPlayer;