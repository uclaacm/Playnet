import React from 'react';

import '../styles/Home.scss';
import Intro10Data from '../LottieAnimations/Intro10Animation';
import LottieControl from '../shared/LottieControl';


function Intro10(): JSX.Element {
  return (
    <div>
      <h2 id={'body-text'}> There are data centers all over the world. </h2>
      <LottieControl animationData={Intro10Data} />
    </div>
  );
}

export default Intro10;
