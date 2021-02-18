import React from 'react';

import '../styles/Home.scss';
import Intro9Data from '../LottieAnimations/Intro9Animation';
import LottieControl from '../shared/LottieController';

function Intro9(): JSX.Element {
  return (
    <div>
      <h2 id={'body-text'}> And this is the outside of the data center. </h2>
      <LottieControl animationData={Intro9Data} />
    </div>
  );
}

export default Intro9;
