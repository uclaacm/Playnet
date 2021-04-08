import React, { useContext } from 'react';
import { CarouselContext } from '../shared/Carousel';

// ----Instructions:----
// Place custom text/imgs as children of the TransitionSlide

interface TransitionSlideProps {
  buttonText: string;
  children?: JSX.Element[];
}

function TransitionSlide(props : TransitionSlideProps) : JSX.Element {
  const { buttonText } = props;
  const context = useContext(CarouselContext);
  const children = props.children && props.children;

  return (
    <div className="game-intro">
      {children}
      <button className="playnet-button" onClick={context.next}>
        {buttonText}
      </button>
    </div>
  );
}

export default TransitionSlide;