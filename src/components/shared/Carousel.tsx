import React, { CSSProperties, useEffect, useState } from 'react';

import '../styles/Carousel.scss';
import NextSvg from '../../assets/next_btn.svg';
import PrevSvg from '../../assets/prev_btn.svg';
import Tooltip from './Tooltip';

export const CarouselContext = React.createContext({
  next: (): void => undefined,
  prev: (): void => undefined,
  slideIdx: 0,
  reloadTime: Date.now(),
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
  finalButtonHandleClick?: () => void;
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
  const [isAutoAdvance, setAutoAdvance] = useState(false);
  const [isMuted, setMute] = useState(false);
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
  }, [slideIdx]);

  useEffect(() => {
    if (isAutoAdvance) {autoAdvance(child.animationTime);}
  }, [child]);

  function goNext(): void {
    setSlideIdx(old => Math.min(old + 1, props.children.length - 1));
    props.onNext && props.onNext();
    // console.log(slideIdx + props.children.length)
    // if (isAutoAdvance && slideIdx < props.children.length){autoAdvance(child.animationTime)}
    // console.log(child.animationTime);
  }

  function goPrev(): void {
    setSlideIdx(old => Math.max(old - 1, 0));
    props.onPrev && props.onPrev();
  }

  function autoAdvance(animationLength: number): void {
    setTimeout(() => goNext(),animationLength * 1000);
  }

  return (
    <CarouselContext.Provider value={{ next: goNext, prev: goPrev, slideIdx, reloadTime }}>
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
                {child.animationTime &&
                  <span className='time-bar-container'>
                    <div key={`${reloadTime}-${slideIdx}`} className='timebar'>
                      <div className='time' style={{ '--time': child.animationTime + 's' } as CSSProperties} />
                    </div>
                    <Tooltip text='Mute'>
                      <button className='util-button mute-button' onClick={()=>setMute(true)} />
                    </Tooltip>
                    <Tooltip text='Autoplay'>
                      <button className='util-button autoplay-button' onClick={()=>{setAutoAdvance(true); autoAdvance(child.animationTime);}}  />
                    </Tooltip>
                    <Tooltip text='Replay'>
                      <button className='util-button replay-button' onClick={()=>setReloadTime(Date.now())}  />
                    </Tooltip>
                  </span>}
                {child.child}
                {child.bottomText && <h2 id={'body-text'}> {child.bottomText} </h2>}
              </>
            }
          </div>
          <button
            className={'carousel-btn next'}
            style={{
              visibility: (child?.showNext === false ||
                (!props.finalButtonHandleClick && slideIdx === props.children.length - 1))
                ? 'hidden' : 'visible',
            }}
            onClick={(slideIdx === props.children.length - 1 && props.finalButtonHandleClick)
              ? props.finalButtonHandleClick : () => goNext()}
          >
            <img src={NextSvg} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export default Carousel;
