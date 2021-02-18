import React from 'react';

import '../styles/Home.scss';
import Intro12Data from '../LottieAnimations/Intro12Animation';
import LottieControl from '../shared/LottieControl';

function Intro12(): JSX.Element {
  return (
    <div>
      <h2 id={'body-text'}> a request gets sent all the way to your nearest data center </h2>
      <LottieControl animationData={Intro12Data} />
    </div>
  );
}

export default Intro12;