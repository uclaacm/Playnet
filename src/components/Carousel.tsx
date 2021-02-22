import React, { useEffect, useState } from 'react';

import './styles/Carousel.scss';
import NextSvg from '../assets/next_btn.svg';
import PrevSvg from '../assets/prev_btn.svg';
import CarouselItem, { CarouselItemComponents } from './CarouselItem';

interface CarouselProps {
  children: CarouselItemComponents[];
  title?: string;
  subtitle?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

function Carousel(props: CarouselProps): JSX.Element {
  const [ slideIdx, setSlideIdx ] = useState(0);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('slideIdx');
    if (state) {
      setSlideIdx(+state);
    }
  }, []);

  useEffect(() => {
    storage.setItem('slideIdx', slideIdx.toString());
  }, [slideIdx]);

  function goNextSlide(curSlide?: number): void {
    // if curSlide is null, or curSlide is the current slide, then go to next slide
    if (!curSlide || curSlide === slideIdx) {
      setSlideIdx(old => Math.min(old + 1, props.children ? props.children.length - 1 : 0));
      props.onNext && props.onNext();
    }
  }

  function goPrevSlide(curSlide?: number): void {
    if (!curSlide || curSlide === slideIdx) {
      setSlideIdx(old => Math.max(old - 1, 0));
      props.onPrev && props.onPrev();
    }
  }

  function isCurSlideValid(): boolean {
    return props.children.length > 0 && props.children[slideIdx] !== undefined;
  }

  return (
    <div id={'carousel-wrapper'}>
      { props.title && <h1 id={'title'}>{props.title}</h1> }
      { props.subtitle && <h2 id={'subtitle'}>{props.subtitle}</h2> }
      <div id={'carousel'}>
        <button
          className={'carousel-btn prev'}
          style = {{
            visibility: ((isCurSlideValid() &&
              (props.children[slideIdx].showPrev === undefined && (slideIdx > 0)) || props.children[slideIdx].showPrev))
              ? 'visible'
              : 'hidden',
          }}
          onClick={() => {
            goPrevSlide();
          }}
        >
          <img src={PrevSvg} />
        </button>
        <div id={'carousel-content'}>
          {
            isCurSlideValid() &&
            <div>
              {props.children[slideIdx].topText && <h2 id={'body-text'}> {props.children[slideIdx].topText} </h2>}
              <CarouselItem goNextSlide={function () { return goNextSlide(slideIdx); }}
                goPrevSlide={function () { return goPrevSlide(slideIdx); }}
                timeout={props.children[slideIdx].animationTime}>
                {props.children[slideIdx].child}
              </CarouselItem>
              {props.children[slideIdx].bottomText && <h2 id={'body-text'}> {props.children[slideIdx].bottomText} </h2>}
            </div>
          }
        </div>
        <button
          className={'carousel-btn next'}
          style={{
            visibility:
              ((isCurSlideValid() &&
                (props.children[slideIdx].showNext === undefined &&
                (slideIdx < (props.children ? props.children.length - 1 : 0))) || props.children[slideIdx].showNext))
                ? 'visible'
                : 'hidden',
          }}
          onClick={() => {
            goNextSlide();
          }}
        >
          <img src={NextSvg} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
