import React from 'react';

import Carousel from '../Carousel';

function Activity2(): JSX.Element {
  return (
    <Carousel
      subtitle='Activity 2 (rn quick demo carousel item)'
    >
      {{ // TODO: change into array
        child: <img src='/assets/img_11.svg' />,
        bottomText: 'bottom :0',
      }}
      {{ // TODO: add test for going to next and previous slides
        child: <img src='/assets/img_8.svg' />,
        showPrev: false,
        topText: ':0 :0 :0',
        bottomText: 'heh you stuck',
      }}
    </Carousel>
  );
}

export default Activity2;
