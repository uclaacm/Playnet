import React, { CSSProperties, useEffect, useState, useRef } from 'react';

import '../styles/Carousel.scss';
import useSound from 'use-sound';
import NextSvg from '../../assets/next_btn.svg';
import PrevSvg from '../../assets/prev_btn.svg';
import { DEFAULT_CONFIGS } from './PlaynetConstants';
import { SoundTrack, SoundTrackMapping } from './soundtrack';
import Tooltip from './Tooltip';

export const CarouselContext = React.createContext({
  next: (): void => undefined,
  prev: (): void => undefined,
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
  const [isAutoAdvance, setIsAutoAdvance] = useState(DEFAULT_CONFIGS.AUTOPLAY);
  const [isVoiceMuted, setIsVoiceMuted] = useState(DEFAULT_CONFIGS.VOICEOVER_MUTED);
  const [isGameSoundMuted, setIsGameSoundMuted] = useState(DEFAULT_CONFIGS.GAME_SOUNDS_MUTED);
  const [soundtrack, setSoundtrack] = useState((child.soundtrack !== undefined) ? child.soundtrack : SoundTrack.NONE);
  const [play, { stop, sound }] = useSound(SoundTrackMapping[soundtrack], { volume: 0.4, interrupt: true });
  const lastTimeout = useRef(null);
  const storage = window.sessionStorage;

  useEffect(() => {
    const state = storage.getItem('slideIdx');
    const voiceMuted = storage.getItem('isVoiceMuted');
    const gameSoundMuted = storage.getItem('isGameSoundMuted');
    const autoAdvancing = storage.getItem('isAutoAdvance');

    if (voiceMuted) setIsVoiceMuted(true); //set voice over to muted
    if (gameSoundMuted) setIsGameSoundMuted(true);  //set game sounds to muted

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

  function handleMuteVoiceoverBtnClick(): void {
    if (isVoiceMuted) {
      setIsVoiceMuted(false);
      storage.removeItem('isVoiceMuted');
    }
    else {
      setIsVoiceMuted(true);
      storage.setItem('isVoiceMuted', 'true');
    }
  }

  function handleMuteGameSoundsBtnClick(): void {
    if (isGameSoundMuted) {
      setIsGameSoundMuted(false);
      storage.removeItem('isGameSoundMuted');
    } else {
      setIsGameSoundMuted(true);
      storage.setItem('isGameSoundMuted', 'true');
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
    <CarouselContext.Provider value={{ next: goNext, prev: goPrev, slideIdx, reloadTime, isVoiceMuted, isGameSoundMuted }}>
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
              </span>
            }
            {child &&
              <>
                <div className='util-button-container'>
                  {child.animationTime &&
                    <div className='util-left-btn-container'>
                      <Tooltip text={isAutoAdvance ? 'Stop Autoplay' : 'Autoplay'}>
                        <button className={'util-button ' +  (isAutoAdvance ? 'stop-' : '') + 'autoplay-button'} onClick={handleAutoplayButtonClick} />
                      </Tooltip>
                      <Tooltip text='Replay'>
                        <button className='util-button replay-button' onClick={handleReplayButtonClick} />
                      </Tooltip>
                    </div>
                  }
                  <div className='util-right-btn-container'>
                    <Tooltip text={(isVoiceMuted ? 'Unmute' : 'Mute') + ' Voiceover'}>
                      <button className={'util-button voiceover-' + (isVoiceMuted ? 'unmute' : 'mute') + '-button'} onClick={handleMuteVoiceoverBtnClick} />
                    </Tooltip>
                    <Tooltip text={(isGameSoundMuted ? 'Unmute' : 'Mute') + ' Game'}>
                      <button className={'util-button game-' + (isGameSoundMuted ? 'unmute' : 'mute') + '-button'} onClick={handleMuteGameSoundsBtnClick} />
                    </Tooltip>
                  </div>
                </div>

                {child.topText && <h2 id={'body-text'}> {child.topText} </h2>}
                {child.child}
                {child.bottomText && <h2 id={'body-text'}> {child.bottomText} </h2>}
                {child.bottomText2 && <h2 id={'body-text'}> {child.bottomText2} </h2>}
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
