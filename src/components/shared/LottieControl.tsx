import React from 'react';
import Lottie from 'react-lottie';

export interface LottieControlProps {
  animationData: any;
  time?: Date;
}

export default function LottieControl(props: LottieControlProps): JSX.Element {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    isClickToPauseDisabled: true,
    animationData: props.animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  
  return (
    <div key={String(props.time)} style={{ width: '90%', margin: 'auto' }}>
      <Lottie options={defaultOptions} />
    </div>
  );
}