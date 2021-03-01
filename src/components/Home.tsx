import React from 'react';

import Computer from '../assets/computer.svg';
import AmbiguousGame from './Activity1/Game2';
import Base from './shared/Base';
import Carousel from './shared/Carousel';
import { HeaderSections } from './shared/PlaynetConstants';

function Home(): JSX.Element {
  const slides = [
    {
      child:
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexFlow: 'column wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <span>But even if we know what the alien is saying...can you figure out what they mean?</span>
          <br/>
          <span>Warning: One sentence can mean two things, so the answer might not be what you expect!</span>

          <button
            style={{
              width: '300px',
              height: '50px',
              backgroundColor: '#ff5c41',
              color: 'white',
              fontSize: '1vw',
              fontFamily: 'inherit',
              borderRadius: '5px',
              border: 'none',
            }}
            onClick={() => {return;}}
          >
            Play Game
          </button>
        </div>,
      showNext: true,
    },
    {
      child: <AmbiguousGame />,
      showNext: false,
      showPrev: false,
    },
    {
      child:
        <div>
          <h2 id={'body-text'}> Being a computer sure isn&apos;t easy... next time you use a search bar, now you know what it has to deal with! </h2>

          <div style={{display: 'inline-block', position: 'relative', width: '50%' }}>
            <img style={{width: '80%'}} src={Computer} />
            <span style={{position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1vw',
              textAlign: 'left'}}>
              <div style={{textAlign: 'center', color: 'red'}}> More Information</div> <br/>
              Computers in the real world use artificial intelligence (AI) to remember what they learn
              from trial and error. They can share what they learn with other computers in order to
              give us a better searching experience.
              <br/> <br/>
              When you&apos;re older, you&apos;ll get the chance to learn how to code you that you can
              learn how AI works in more detail!
            </span>
          </div>
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
