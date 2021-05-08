import anime from 'animejs';
import React, { useEffect } from 'react';

function BouncingArrow(): JSX.Element {
  useEffect(() => {
    anime.timeline({ autoplay: true, loop: true, duration: 1000 }).add({
      targets: '#arrow',
      easing: 'easeOutSine',
      translateY: -10,
    }).add({
      targets: '#arrow',
      easing: 'easeInOutSine',
      translateY: 10,
    }).add({
      targets: '#arrow',
      easing: 'easeInSine',
      translateY: 0,
    });
  }, []);
  return <div id="arrow-container"><div id="arrow" /></div>;
}

export default BouncingArrow;
