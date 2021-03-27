import React, { useContext } from 'react';
import { CarouselContext } from '../shared/Carousel';

// ----Instructions:----
// Place custom intro screen as a child element of IntroScreen

interface IntroScreenProps {
  buttonText: string;
  children?: JSX.Element[];
}

function IntroScreen(props : IntroScreenProps): JSX.Element {
  const { buttonText } = props;
  const context = useContext(CarouselContext);
  const child = props.children && props.children.map((item) => item);

  return (
    <div id="game2-intro">
      {child}
      <button className="game-intro-button" onClick={context.next}>
        {buttonText}
      </button>
    </div>
  );
}

export default IntroScreen;