import React from 'react';

import Carousel from './Carousel';
import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Home(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        <Carousel
          title={'Test'}
          subtitle={'Lorem ipsum dolor sit amet'}
          onNext={() => { /* Run function along with transition on next button press */
            // eslint-disable-next-line no-console
            console.log('next');
          }}
          onPrev={() => { /* Run function along with transition on previous button press */
            // eslint-disable-next-line no-console
            console.log('prev');
          }}
          /* can use showNext={true|false} to manually show or hide button */
          /*         showPrev={true|false}                                 */
        >
          {/* Each child element of the Carousel is considered as one "slide", like so */}
          <div><h1>First</h1> <p>Lorem ipsum</p></div>
          <div><h1>Second</h1></div>
          <div><h1>Third</h1></div>
          <div><h1>Fourth</h1></div>
        </Carousel>
      </Base>
    </div>
  );
}

export default Home;
