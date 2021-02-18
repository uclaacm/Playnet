import React from 'react';

import '../styles/Home.scss';
import Intro8Data from '../LottieAnimations/Intro8Animation';
import LottieControl from '../shared/LottieController';

function Intro8(): JSX.Element {
  return (
    <>
      <h2 id={'body-text'}> This is a real-life data center at Google! </h2>
      <div><LottieControl animationData={Intro8Data} /></div>
    </>
  );
}

export default Intro8;
