import React from 'react';

import '../styles/Home.scss';
import Intro11Data from '../LottieAnimations/Intro11Animation';
import LottieControl from '../shared/LottieController';

function Intro11(): JSX.Element {
  return (
    <>
      <h2 id={'body-text'}> When you search on the web from your house, </h2>
      <div><LottieControl animationData={Intro11Data} /></div>
    </>
  );
}

export default Intro11;
