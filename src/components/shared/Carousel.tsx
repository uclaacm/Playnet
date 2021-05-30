import React, { CSSProperties, useEffect, useState, useRef } from 'react';

import '../styles/Carousel.scss';
import useSound from 'use-sound';
import NextSvg from '../../assets/shared/carousel/next_btn.svg';
import PrevSvg from '../../assets/shared/carousel/prev_btn.svg';
import { clamp } from '../../utils';
import { DEFAULT_CONFIGS } from './PlaynetConstants';
import Preload from './Preload';
import { SoundTrack, SoundTrackMapping } from './soundtrack';
import Tooltip from './Tooltip';

export const CarouselContext = React.createContext({
  next: (): void => undefined,
  prev: (): void => undefined,
  jumpNumSlides: (_number: number): void => undefined,
  slideIdx: 0,
  reloadTime: Date.now(),
  isVoiceMuted: DEFAULT_CONFIGS.VOICEOVER_MUTED,
  isGameSoundMuted: DEFAULT_CONFIGS.GAME_SOUNDS_MUTED,
});

export interface CarouselItemComponents {
  child: JSX.Element;
  showNext?: boolean; // enforce showNext button
  showPrev?: boolean;
  topText?: string;
  bottomText?: string;
  bottomText2?: string;
  animationTime?: number;
  showBackground?: boolean;
  hasSound?: boolean;
  hasGameSound?: boolean;
  soundtrack?: SoundTrack;
}

interface CarouselProps {
  children: CarouselItemComponents[];
  title?: string;
  subtitle?: string;
  hasSound: boolean;
  imagesToPreload?: string[],
}

function Carousel(props: CarouselProps): JSX.Element {
  const [slideIdx, setSlideIdx] = useState(0);
  const [child, setChild] = useState(props.children[slideIdx]);
  const [isPreloading, setIsPreloading] = useState(props.imagesToPreload !== undefined);
  const [reloadTime, setReloadTime] = useState(Date.now());
  const [isAutoAdvance, setIsAutoAdvance] = useState(DEFAULT_CONFIGS.AUTOPLAY);
  const [isVoiceMuted, setIsVoiceMuted] = useState(DEFAULT_CONFIGS.VOICEOVER_MUTED);
  const [isGameSoundMuted, setIsGameSoundMuted] = useState(DEFAULT_CONFIGS.GAME_SOUNDS_MUTED);
  const [soundtrack, setSoundtrack] = useState((child.soundtrack !== undefined) ? child.soundtrack : SoundTrack.NONE);
  const [hasSound, setHasSound] = useState(props.hasSound);
  const [play, { stop, sound }] = useSound(SoundTrackMapping[soundtrack], { volume: 0.4, interrupt: true });
  const lastTimeout = useRef(null);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('slideIdx');
    const voiceMuted = storage.getItem('isVoiceMuted');
    const gameSoundMuted = storage.getItem('isGameSoundMuted');
    const autoAdvancing = storage.getItem('isAutoAdvance');

    if (voiceMuted) setIsVoiceMuted(true); // set voice over to muted
    if (gameSoundMuted) setIsGameSoundMuted(true);  // set game sounds to muted

    if (autoAdvancing) { // set autoAdvance
      setIsAutoAdvance(true);
      if (child.animationTime) { autoAdvance(child.animationTime); }
    }

    if (state) { // set slideIdx
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
    if (child.hasSound !== undefined) {
      setHasSound(child.hasSound);
    } else {
      setHasSound(props.hasSound);
    }
  }, [child]);

  useEffect(() => {
    stop();
    if (isVoiceMuted || child.soundtrack === undefined) {
      setSoundtrack(SoundTrack.NONE);
    } else {
      setSoundtrack(child.soundtrack);
    }
  }, [child, isVoiceMuted]);

  useEffect(() => {
    stop();
    if (!isVoiceMuted)
      play && play();
  }, [play, reloadTime]);

  useEffect(() => {
    return () => sound?.unload();
  }, [sound]);

  function goNext(): void {
    setSlideIdx(old => Math.min(old + 1, props.children.length - 1));
  }

  function goPrev(): void {
    setSlideIdx(old => Math.max(old - 1, 0));
  }

  function jumpNumSlides(number: number) {
    const newSlide = clamp(0, slideIdx + number, props.children.length - 1).num;
    setSlideIdx(newSlide);
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

  function handleMuteVoiceoverClick(): void {
    if (isVoiceMuted) {
      setIsVoiceMuted(false);
      storage.removeItem('isVoiceMuted');
    } else {
      setIsVoiceMuted(true);
      storage.setItem('isVoiceMuted', 'true');
    }
  }

  function handleMuteGameSoundsClick(): void {
    if (isGameSoundMuted) {
      setIsGameSoundMuted(false);
      storage.removeItem('isGameSoundMuted');
    } else {
      setIsGameSoundMuted(true);
      storage.setItem('isGameSoundMuted', 'true');
    }
  }

  function handleAutoplayClick(): void {
    if (isAutoAdvance) {
      disableAutoAdvance();
    } else {
      enableAutoAdvance();
    }
  }

  function handleReplayClick(): void {
    setReloadTime(Date.now());
    disableAutoAdvance();
  }

  return (
    <CarouselContext.Provider value={{
      next: goNext, prev: goPrev, slideIdx, reloadTime,
      isVoiceMuted, isGameSoundMuted,
      jumpNumSlides: jumpNumSlides,
    }}>
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
            {child.animationTime && !isPreloading &&
              <span className='time-bar-container'>
                <div key={`${reloadTime}-${slideIdx}`} className='timebar'>
                  <div className='time' style={{ '--time': child.animationTime + 's' } as CSSProperties} />
                </div>
              </span>
            }
            {child &&
              <>
                {
                  !isPreloading && // whether to show buttons container
                  <div className='util-button-container'>
                    {child.animationTime &&
                      <div className='util-left-btn-container'>
                        <Tooltip text={isAutoAdvance ? 'Stop Autoplay' : 'Autoplay'}>
                          <button className={'util-button ' + (isAutoAdvance ? 'stop-' : '') + 'autoplay-button'} onClick={handleAutoplayClick} />
                        </Tooltip>
                        <Tooltip text='Replay'>
                          <button className='util-button replay-button' onClick={handleReplayClick} />
                        </Tooltip>
                      </div>
                    }
                    {
                      hasSound && <div className='util-right-btn-container'>
                        <Tooltip text={(isVoiceMuted ? 'Unmute' : 'Mute') + ' Voiceover'}>
                          <button className={'util-button voiceover-' + (isVoiceMuted ? 'unmute' : 'mute') + '-button'} onClick={handleMuteVoiceoverClick} />
                        </Tooltip>
                        <Tooltip text={(isGameSoundMuted ? 'Unmute' : 'Mute') + ' Game'}>
                          <button className={'util-button game-' + (isGameSoundMuted ? 'unmute' : 'mute') + '-button'} onClick={handleMuteGameSoundsClick} />
                        </Tooltip>
                      </div>
                    }
                  </div>
                }
                {
                  isPreloading ? <Preload images={props.imagesToPreload!} onPreloaded={() => setIsPreloading(false)} />
                    : // show child info
                    <>
                      {child.topText && <h2 id={'body-text'}> {child.topText} </h2>}
                      {child.child}
                      {(child.bottomText || child.bottomText2) && <h2 id={'body-text'}> {child.bottomText} </h2>}
                      {child.bottomText2 && <h2 id={'body-text'}> {child.bottomText2} </h2>}
                    </>
                }
              </>
            }
          </div>
          <button
            className={'carousel-btn next'}
            style={{
              visibility: (child?.showNext === false ||
                (slideIdx === props.children.length - 1) || isPreloading)
                ? 'hidden' : 'visible',
            }}
            onClick={() => { goNext(); disableAutoAdvance(); }}
          >
            <img src={NextSvg} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export default Carousel;
