import React, { useContext, useEffect } from 'react';

import Carousel, { CarouselContext } from '../shared/Carousel';

function Activity2(): JSX.Element {
  const content = [
    {
      child: <img src='/assets/img_11.svg' />,
      bottomText: 'go next page to demo somes go back and forth without buttons :)',
    },
    {
      child: <div><DemoMovePrevPage><img src='/assets/img_8.svg' /></DemoMovePrevPage></div>,
      showPrev: false,
      topText: ':0 :0 :0',
      bottomText: 'ill go backwards for you in a few sec',
    },
    {
      child: <div><DemoMoveNextPage><img src='/assets/img_8.svg' /></DemoMoveNextPage></div>,
      showNext: false,
      topText: ':0 :0 :0',
      bottomText: 'ill go forward for you in a few sec',
    },
    {
      child: <div></div>,
      topText: 'dats the whole demo cyaa',
    },
  ];
  return (
    <Carousel subtitle='Activity 2 (rn quick demo carousel item)'>
      {content}
    </Carousel>
  );
}

function DemoMoveNextPage(props: {children: JSX.Element}) : JSX.Element {
  const context = useContext(CarouselContext);
  useEffect(
    () => {
      const timer = setTimeout(() => context.next(), 5000);
      return () => {
        clearTimeout(timer);
      };
    });
  return <>{props.children}</>;
}

function DemoMovePrevPage(props: {children: JSX.Element}) : JSX.Element {
  const context = useContext(CarouselContext);
  useEffect(
    () => {
      const timer = setTimeout(() => context.prev(), 5000);
      return () => {
        clearTimeout(timer);
      };
    });
  return <>{props.children}</>;
}

export default Activity2;
