import React, { useContext } from 'react';
import { CarouselContext } from '../../../shared/Carousel';

interface CompressionGameIntroProps {
  text: string;
  buttonText: string;
}

export default function Intro(props: CompressionGameIntroProps): JSX.Element {
  const context = useContext(CarouselContext);
  return (
    <div className='game-intro-content'>
      <div className='center-text'>{props.text}</div>
      <button className='game-intro-button' onClick={context.next}>{props.buttonText}</button>
    </div>
  );
}