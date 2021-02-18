import React from 'react';

import Carousel from '../Carousel';
import Base from '../shared/Base';
import { HeaderSections } from '../shared/PlaynetConstants';
import Intro10 from './Intro10';
import Intro11 from './Intro11';
import Intro12 from './Intro12';
import Intro8 from './Intro8';
import Intro9 from './Intro9';

function Home(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        <Carousel
          onNext={() => { /* Run function along with transition on next button press */
            // console.log('next');
          }}
          onPrev={() => { /* Run function along with transition on previous button press */
            // console.log('prev');
          }}
        /* can use showNext={true|false} to manually show or hide button */
        /*         showPrev={true|false}                                 */
        >
          {/* Each child element of the Carousel is considered as one "slide", like so */}
          <><Intro8 /></>
          <><Intro9 /></>
          <><Intro10 /></>
          <><Intro11 /></>
          <><Intro12 /></>
        </Carousel>
      </Base>
    </div>
  );
}

export default Home;
