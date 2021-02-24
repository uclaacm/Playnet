import React from 'react';

export interface CarouselItemComponents {
  child: JSX.Element;
  showNext?: boolean; // enforce showNext button 
  showPrev?: boolean;
  topText?: string;
  bottomText?: string;
}

interface CarouselItemProps {
  goNextSlide: () => void; // can pass this function into child of CarouselItem
  goPrevSlide: () => void;
  child: JSX.Element;
  timeout?: number; // in seconds
}

function CarouselItem(props: CarouselItemProps): JSX.Element {
  if (props.timeout !== undefined) {
    setTimeout(() => {
      props.goNextSlide();
    }, props.timeout * 1000);
  }
  return <div id={'carousel-items'}>{props.child}</div>;
}

export default CarouselItem;
