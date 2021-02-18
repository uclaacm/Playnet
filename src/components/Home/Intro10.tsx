import React from 'react';

import LottieControl from '../shared/LottieController';
import '../styles/Home.scss';
import Intro10Data from '../LottieAnimations/Intro10Animation';
import '../styles/Intro.scss';

function Intro10(): JSX.Element {
  return (
    <>
      <h2 id={'body-text'}> There are data centers all over the world. </h2>
      <div><LottieControl animationData={Intro10Data} /></div>
    </>
  );
}

export default Intro10;
