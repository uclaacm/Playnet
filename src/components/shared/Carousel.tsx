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
  hasSound?: boolean;
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
  const [isAutoAdvance, setIsAutoAdvance] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lastTimeout = useRef(null);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('slideIdx');
    const muted = storage.getItem('isMuted');
    const autoAdvancing = storage.getItem('isAutoAdvance');

    if (muted) setIsMuted(true); //set muted

    if (autoAdvancing) { //set autoAdvance
      setIsAutoAdvance(true);
      if (child.animationTime) { autoAdvance(child.animationTime); }
    }

    if (state) { //set slideIdx
      setSlideIdx(+state);
    }
    return () => storage.removeItem('slideIdx');
  }, []);

  useEffect(() => {
    storage.setItem('slideIdx', slideIdx.toString());
    setChild(props.children[slideIdx]);
  }, [slideIdx]);

  useEffect(() => {
    if (isAutoAdvance && child.animationTime) { autoAdvance(child.animationTime); }
  }, [child]);

  function goNext(): void {
    setSlideIdx(old => Math.min(old + 1, props.children.length - 1));
    props.onNext && props.onNext();
  }

  function goPrev(): void {
    setSlideIdx(old => Math.max(old - 1, 0));
    props.onPrev && props.onPrev();
  }

  function autoAdvance(animationLength: number): void {
    lastTimeout.current = setTimeout(() => goNext(), animationLength * 1000);
  }

  function enableAutoAdvance(): void {
    setReloadTime(Date.now());
    setIsAutoAdvance(true);
    if (child.animationTime) { autoAdvance(child.animationTime); }
    storage.setItem('isAutoAdvance', 'true');
  }

  function disableAutoAdvance(): void {
    if (!isAutoAdvance) return;
    if (lastTimeout !== undefined) { clearTimeout(lastTimeout.current); }
    setIsAutoAdvance(false);
    storage.removeItem('isAutoAdvance');
  }

  function handleMuteButtonClick(): void {
    if (isMuted) {
      setIsMuted(false);
      storage.removeItem('isMuted');
    }
    else {
      setIsMuted(true);
      storage.setItem('isMuted', 'true');
    }
  }

  function handleAutoplayButtonClick(): void {
    if (isAutoAdvance) {
      disableAutoAdvance();
    }
    else {
      enableAutoAdvance();
    }
  }

  function handleReplayButtonClick(): void {
    setReloadTime(Date.now());
    disableAutoAdvance();
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
            onClick={() => { goPrev(); disableAutoAdvance(); }}>
            <img src={PrevSvg} />
          </button>
          <div id={'carousel-content'} style={{ backgroundColor: `${(child?.showBackground === false) ? 'transparent' : 'white'}` }}>
            {child.animationTime &&
                  <span className='time-bar-container'>
                    <div key={`${reloadTime}-${slideIdx}`} className='timebar'>
                      <div className='time' style={{ '--time': child.animationTime + 's' } as CSSProperties} />
                    </div>
                  </span>}
            {child.hasSound && !child.animationTime &&
              <div className='universal-button'>
                <Tooltip text={isMuted ? 'Unmute' : 'Mute'}>
                  <button className={'util-button ' + (isMuted ? 'unmute' : 'mute') + '-button'} onClick={handleMuteButtonClick} />
                </Tooltip>
              </div>}
            {child &&
              <>
                {child.topText && child.bottomText && <h2 id={'body-text'}> {child.topText} </h2>}
                {child.animationTime &&
                  <div className='util-button-container'>
                    <Tooltip text={isAutoAdvance ? 'Stop Autoplay' : 'Autoplay'}>
                      <button className={'util-button autoplay-button-' + (isAutoAdvance ? 'autoplaying' : 'not-autoplaying')} onClick={handleAutoplayButtonClick} />
                    </Tooltip>
                    <Tooltip text='Replay'>
                      <button className='util-button replay-button' onClick={handleReplayButtonClick} />
                    </Tooltip>
                    {child.hasSound &&
                      <Tooltip text={isMuted ? 'Unmute' : 'Mute'}>
                        <button className={'util-button ' + (isMuted ? 'unmute' : 'mute') + '-button'} onClick={handleMuteButtonClick} />
                      </Tooltip>}
                  </div>}

                {child.child}
                {child.bottomText && <h2 id={'body-text'}> {child.bottomText} </h2>}
                {child.topText && !child.bottomText && <h2 id={'body-text'}> {child.topText} </h2>}

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
              ? props.finalButtonHandleClick : () => { goNext(); disableAutoAdvance(); }}
          >
            <img src={NextSvg} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export default Carousel;
