import React from 'react';

import '../styles/Home.scss';
import Intro11Data from '../LottieAnimations/Intro11Animation';
import LottieControl from '../shared/LottieControl';

function Intro11(): JSX.Element {
  return (
    <div>
      <h2 id={'body-text'}> When you search on the web from your house, </h2>
      <LottieControl animationData={Intro11Data} />
    </div>
  );
}

export default Intro11;
