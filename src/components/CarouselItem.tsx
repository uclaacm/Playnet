import React from 'react';

export interface CarouselItemComponents {
  child: JSX.Element;
  showNext?: boolean; // shows next button if not last, overriden by showNext (showNext will veto anything)
  showPrev?: boolean;
  topText?: string;
  bottomText?: string;
  animationTime?: number; // in seconds
}

interface CarouselItemProps {
  goNextSlide: () => void; // can pass this function into child of CarouselItem
  goPrevSlide: () => void;
  children: JSX.Element;
  timeout?: number; // in seconds
}

function CarouselItem(props: CarouselItemProps): JSX.Element {
  if (props.timeout !== undefined) {
    setTimeout(() => {
      props.goNextSlide();
    }, props.timeout * 1000);
  }
  return <div id={'carousel-items'}>{props.children}</div>;
}

export default CarouselItem;
