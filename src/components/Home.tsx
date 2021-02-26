import React, {useContext} from 'react';

import AmbiguousGame from './Activity1/Game2';
import Carousel, { CarouselContext } from './shared/Carousel';
import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Home(): JSX.Element {
  const slides = [
    {
      child: <div><h1>First</h1> <p>Lorem ipsum</p></div>,
    },
    {
      child: <AmbiguousGame />,
      showNext: false,
      showPrev: false,
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

// function ExitGame(props: {children: JSX.Element}) : JSX.Element {
//   const context = useContext(ChangeSlideContext);
//   useEffect(
//     () => {
//       const timer = setTimeout(() => context.next(), 5000);
//       return () => {
//         clearTimeout(timer);
//       };
//     });
//   return <>{props.children}</>;
// }

export default Home;
