import React from 'react';

import LottieControl from '../shared/LottieController';
import '../styles/Home.scss';
import Intro12Data from '../LottieAnimations/Intro12Animation';
import '../styles/Intro.scss';

function Intro12(): JSX.Element {
  return (
    <>
      <h2 id={'body-text'}> a request gets sent all the way to your nearest data center </h2>
      <div><LottieControl animationData={Intro12Data} /></div>
    </>
  );
}

export default Intro12;