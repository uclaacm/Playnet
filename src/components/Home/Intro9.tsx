import React from 'react';

import LottieControl from '../shared/LottieController';
import '../styles/Home.scss';
import Intro9Data from '../LottieAnimations/Intro9Animation';
import '../styles/Intro.scss';

function Intro9(): JSX.Element {
  return (
    <>
      <h2 id={'body-text'}> And this is the outside of the data center. </h2>
      <div><LottieControl animationData={Intro9Data} /></div>
    </>
  );
}

export default Intro9;
