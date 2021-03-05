import React from 'react';

import Base from './shared/Base';
import Carousel from './shared/Carousel';
import { HeaderSections } from './shared/PlaynetConstants';

function Home(): JSX.Element {
  const slides = [
    {
      child:
        <div>
          temporary
        </div>,
    },
  ];

  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        <Carousel
          title={'Test'}
          subtitle={'Lorem ipsum dolor sit amet'}
          onNext={() => { /* Run function along with transition on next button press */
            // console.log('next');
          }}
          onPrev={() => { /* Run function along with transition on previous button press */
            // console.log('prev');
          }}
          /* can use showNext={true|false} to manually show or hide button */
          /*         showPrev={true|false}                                 */
        >
          {slides}
        </Carousel>
      </Base>
    </div>
  );
}


export default Home;
