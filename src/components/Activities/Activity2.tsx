import React from 'react';

import Carousel from '../Carousel';

function Activity2(): JSX.Element {
  return (
    <Carousel
      subtitle='Activity 2 (rn quick demo carousel item)'
    >
      {{
        child: <img src='/assets/img_11.svg' />,
        showNext: false,
        topText: 'going next page in 4 sec',
        bottomText: 'bottom :0',
        animationTime: 4, // will go to next page after 4 seconds
      }}
      {{
        child: <img src='/assets/img_8.svg' />,
        topText: ':0 :0 :0',
      }}
    </Carousel>
  );
}

export default Activity2;
