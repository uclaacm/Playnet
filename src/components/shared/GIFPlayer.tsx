import React, { useEffect, useState, useRef } from 'react';

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
  const lastTimeout = useRef(null);

  useEffect(() => {
    if (index === props.gifs.length -1) {
      return;
    }
    lastTimeout.current = setTimeout(() => {
      setIndex(index + 1);
    }, props.gifs[index].duration);
    return () => {
      if (lastTimeout !== undefined) {
        clearTimeout(lastTimeout.current);
      }
    };
  });

  useEffect(() => {
    if (lastTimeout !== undefined && index !== 0) {
      clearTimeout(lastTimeout.current);
    }
    setIndex(0);
  }, [props.id]);

  return (
    <img src={props.gifs[index].path + '?'+ String(Date.now())} alt={props.alt+props.id} key={props.id}/>
  );
}

export default GIFPlayer;