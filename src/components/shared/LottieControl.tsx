import React, { useContext} from 'react';
import Lottie from 'react-lottie';
import { CarouselContext } from './Carousel';
import '../styles/LottieControl.scss';

export interface LottieControlProps {
  animationData: any;
}

export default function LottieControl(props: LottieControlProps): JSX.Element {
  const {reloadTime} = useContext(CarouselContext);

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
    <div className='lottie-control' key={`${reloadTime}`}>
      <Lottie options={defaultOptions} />
    </div>
  );
}