import React, { useEffect, useState } from 'react';

import './styles/Carousel.scss';
import NextSvg from '../assets/next_btn.svg';
import PrevSvg from '../assets/prev_btn.svg';

/* eslint-disable @typescript-eslint/no-empty-function */
export const ChangeSlideContext = React.createContext({next: () => { }, prev: () => { }});

export interface CarouselItemComponents {
  child: JSX.Element;
  showNext?: boolean; // enforce showNext button
  showPrev?: boolean;
  topText?: string;
  bottomText?: string;
}

interface CarouselProps {
  children: CarouselItemComponents[];
  title?: string;
  subtitle?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

function Carousel(props: CarouselProps): JSX.Element {
  const [slideIdx, setSlideIdx] = useState(0);
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

  function goNext(): void {
    setSlideIdx(old => Math.min(old + 1, props.children.length - 1));
    props.onNext && props.onNext();
  }

  function goPrev(): void {
    setSlideIdx(old => Math.max(old - 1, 0));
    props.onPrev && props.onPrev();
  }

  const child = props.children[slideIdx];
  if (!child && props.children.length > 0) {
    const slideInBounds = Math.min(Math.max(0, slideIdx), props.children.length - 1);
    setSlideIdx(slideInBounds);
  }

  return (
    <ChangeSlideContext.Provider value={{next: goNext, prev: goPrev}}>
      <div id={'carousel-wrapper'}>
        {props.title && <h1 id={'title'}>{props.title}</h1>}
        {props.subtitle && <h2 id={'subtitle'}>{props.subtitle}</h2>}
        <div id={'carousel'}>
          <button
            className={'carousel-btn prev'}
            style={{
              visibility: child &&
                ((child.showPrev === undefined && slideIdx > 0) ||
                  (child.showPrev === true))
                ? 'visible'
                : 'hidden',
            }}
            onClick={() => {
              setSlideIdx(old => Math.max(old - 1, 0));
              props.onPrev && props.onPrev();
            }}
          >
            <img src={PrevSvg} />
          </button>
          <div id={'carousel-content'}>
            {
              child &&
              <div id={'carousel-items'}>
                {child.topText && <h2 id={'body-text'}> {child.topText} </h2>}
                {child.child}
                {child.bottomText && <h2 id={'body-text'}> {child.bottomText} </h2>}
              </div>
            }
          </div>
          <button
            className={'carousel-btn next'}
            style={{
              visibility:
                (child &&
                  (child.showNext === undefined && (slideIdx < props.children.length - 1))
                  || (child.showNext === true))
                  ? 'visible'
                  : 'hidden',
            }}
            onClick={() => {
              setSlideIdx(old => Math.min(old + 1, props.children.length - 1));
              props.onNext && props.onNext();
            }}
          >
            <img src={NextSvg} />
          </button>
        </div>
      </div>
    </ChangeSlideContext.Provider>
  );
}

export default Carousel;
