import React from 'react';

import Carousel from './Carousel';
import Game from './Game';
import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';
import GameSlide from './GameSlide';

function Home(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        <Game
          title={'Deciphering what you search'}
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
          <GameSlide 
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
          />
          <div><h1>Being a computer sure isn't easy...</h1> <p>More information...</p></div>
        </Game>
      </Base>
    </div>
  );
}

export default Home;
