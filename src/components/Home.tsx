import React from 'react';

import Carousel from './Carousel';
import Game from './Activity1/Game2';
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
            // console.log('next');
          }}
          onPrev={() => { /* Run function along with transition on previous button press */
            // console.log('prev');
          }}
          /* can use showNext={true|false} to manually show or hide button */
          /*         showPrev={true|false}                                 */
        >
          {/* Each child element of the Carousel is considered as one "slide", like so */}
          <Game
            title={'Deciphering what you search'}
          >
            {/* Each child element of the Carousel is considered as one "slide", like so */}
            {/* <GameSlide
              textDefault='I saw her duck'
              textCorrect='Correct!'
              textIncorrect='I meant I saw her crouch to avoid getting hit!'
            />
            <GameSlide
              textDefault='I saw her duck'
              textCorrect='Correct!'
              textIncorrect='I meant I saw her crouch to avoid getting hit!'
            />
            <GameSlide
              textDefault='I saw her duck'
              textCorrect='Correct!'
              textIncorrect='I meant I saw her crouch to avoid getting hit!'
            /> */}
            {/* <div><h1>Being a computer sure isn`&apos;`t easy...</h1> <p>More information...</p></div> */}
          </Game>
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
