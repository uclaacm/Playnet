import React from 'react';
import Lottie from 'react-lottie';

export interface LottieControlProps {
  animationData: any;
}

export default function LottieControl(props: LottieControlProps): JSX.Element {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: props.animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <div>
    <Lottie options={defaultOptions} />
  </div>;
}