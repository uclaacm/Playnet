import React, { CSSProperties, useEffect, useState, useRef } from 'react';

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
  showBackground?: boolean;
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
  const lastTimeout = useRef(null);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('slideIdx');
    if (state) {
      setSlideIdx(+state);
    }
    return () => storage.removeItem('slideIdx');
  }, []);

  useEffect(() => {
    const isMutedStorage = storage.getItem('isMuted');
    if (!isMutedStorage) return;
    setMute(true);
  }, [])

  useEffect(() => {
    if (!storage.getItem('isAutoAdvance')) return;
    setAutoAdvance(true);
    setTimeout(() => goNext(), child.animationTime * 1000);
  }, [])

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
  }

  function goPrev(): void {
    setSlideIdx(old => Math.max(old - 1, 0));
    props.onPrev && props.onPrev();
    stopAutoAdvance();
  }

  function autoAdvance(animationLength: number): void {
    lastTimeout.current = setTimeout(() => goNext(), animationLength * 1000);
  }

  function startAutoAdvance(): void {
    setReloadTime(Date.now());
    setAutoAdvance(true);
    setTimeout(() => goNext(), child.animationTime * 1000);
    storage.setItem('isAutoAdvance', 'true');
  }

  function stopAutoAdvance(): void {
    if (!isAutoAdvance) return
    if (lastTimeout !== undefined) {clearTimeout(lastTimeout.current);}
    setAutoAdvance(false);
    storage.removeItem('isAutoAdvance');
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
          <div id={'carousel-content'} style={{backgroundColor: `${(child?.showBackground === false) ? 'transparent' : 'white'}`}}>
            {child &&
              <>
                {child.topText && <h2 id={'body-text'}> {child.topText} </h2>}
                {child.animationTime &&
                  <span className='time-bar-container'>
                    <div key={`${reloadTime}-${slideIdx}`} className='timebar'>
                      <div className='time' style={{ '--time': child.animationTime + 's' } as CSSProperties} />
                    </div>
                    <Tooltip text= {isMuted ? 'Unmute' : 'Mute'}>
                      { isMuted ? <button className='util-button unmute-button' onClick={()=>{setMute(false); storage.removeItem('isMuted')}} />:
                      <button className='util-button mute-button' onClick={()=>{setMute(true); storage.setItem('isMuted', 'true');}} />}
                    </Tooltip>
                    <Tooltip text='Autoplay'>
                      { isAutoAdvance ? <div className='util-button autoplay-button-inactive'></div> :
                      <button className='util-button autoplay-button' onClick={()=>startAutoAdvance()} /> }
                    </Tooltip>
                    <Tooltip text='Replay'>
                      <button className='util-button replay-button' onClick={()=>{setReloadTime(Date.now()); stopAutoAdvance();}}  />
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
              ? props.finalButtonHandleClick : () => {goNext(); stopAutoAdvance();}}
          >
            <img src={NextSvg} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export default Carousel;
