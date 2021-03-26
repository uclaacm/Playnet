import React, { CSSProperties, useEffect, useState } from 'react';

import '../styles/Carousel.scss';
import NextSvg from '../../assets/next_btn.svg';
import PrevSvg from '../../assets/prev_btn.svg';
import Tooltip from './Tooltip';

export const CarouselContext = React.createContext({
  next: (): void => undefined,
  prev: (): void => undefined,
});

export interface CarouselItemComponents {
  child: JSX.Element;
  showNext?: boolean; // enforce showNext button
  showPrev?: boolean;
  topText?: string;
  bottomText?: string;
  animationTime?: number;
}

interface CarouselProps {
  redirect: any;
  children: CarouselItemComponents[];
  title?: string;
  subtitle?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

function Carousel(props: CarouselProps): JSX.Element {
  const [slideIdx, setSlideIdx] = useState(0);
  const [child, setChild] = useState(props.children[slideIdx]);
  const [reloadTime, setReloadTime] = useState(Date.now());
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('slideIdx');
    if (state) {
      setSlideIdx(+state);
    }
    return () => storage.removeItem('slideIdx');
  }, []);

  useEffect(() => {
    storage.setItem('slideIdx', slideIdx.toString());
    setChild(props.children[slideIdx]);
    setReloadTime(Date.now());
  }, [slideIdx]);

  useEffect(() => {
    child.child = React.cloneElement(child.child, { time: reloadTime });
  }, [reloadTime]);

  function goNext(): void {
    setSlideIdx(old => Math.min(old + 1, props.children.length - 1));
    props.onNext && props.onNext();
  }

  function goPrev(): void {
    setSlideIdx(old => Math.max(old - 1, 0));
    props.onPrev && props.onPrev();
  }

  return (
    <CarouselContext.Provider value={{ next: goNext, prev: goPrev }}>
      <div id={'carousel-wrapper'}>
        {props.title && <h1 id={'title'}>{props.title}</h1>}
        {props.subtitle && <h2 id={'subtitle'}>{props.subtitle}</h2>}
        <div id={'carousel'}>
          <button
            className={'carousel-btn prev'}
            style={{
              visibility: (child?.showPrev === false || slideIdx === 0) ? 'hidden' : 'visible',
            }}
            onClick={() => goPrev()}
          >
            <img src={PrevSvg} />
          </button>
          <div id={'carousel-content'}>
            {child &&
              <>
                {child.topText && <h2 id={'body-text'}> {child.topText} </h2>}
                {child.child}
                {child.bottomText && <h2 id={'body-text'}> {child.bottomText} </h2>}
                {child.animationTime &&
                  <span className='time-bar-container'>
                    <div key={String(reloadTime)} className='timebar'>
                      <div className='time' style={{ '--time': child.animationTime + 's' } as CSSProperties} />
                    </div>
                    <Tooltip text='Replay'>
                      <button className='replay-button' onClick={()=>setReloadTime(Date.now())} />
                    </Tooltip>
                  </span>}
              </>
            }
          </div>
          <button
            className={'carousel-btn next'}
            style={{
              visibility: (child?.showNext === false || (props.redirect == false && slideIdx === props.children.length - 1))
                ? 'hidden' : 'visible',
            }}
            onClick={(slideIdx === props.children.length - 1 && props.redirect) ? () => props.redirect(false) : () => goNext()}
          >
            <img src={NextSvg} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export default Carousel;
