import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { viewportToPixels } from '../../utils/viewport';
import { CarouselContext } from '../shared/Carousel';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';

interface FinalSlideProps {
  chosenVideo: VideoChoices,
}

function FinalSlide(props: FinalSlideProps): JSX.Element {
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const { chosenVideo } = props;

  // very unfortunate hard codings for now
  // scaling [child with set width (1000px) + children w/ absolute locations] to fit carousel same as last animation
  const getCSSStyling = () => {
    const lottieWidthPx = 1000;
    const lottieHeightPx = 390;
    const lottieScaling = .9;

    const carouselPaddingPx = 64;
    const carouselButtonPx = 64;
    const carouselContentMarginPx = 24;

    const utilButtonsOffsetPx = 56;

    const totalMarginContentPx = carouselPaddingPx + carouselButtonPx + carouselContentMarginPx;
    const carouselContentPx = viewportToPixels('100vw') - totalMarginContentPx * 2;

    const animationScale = lottieScaling * (carouselContentPx) / lottieWidthPx;

    // these all refer to -> excess/lack of spacing due to animationScaling
    //     ( a bit confusing, might need to draw out)
    const marginBottomPx = lottieHeightPx / 2 * (animationScale - 1);
    const marginTopPx = marginBottomPx + utilButtonsOffsetPx ;
    const marginRightPx = 0;
    const marginLeftPx = lottieWidthPx / 2 * (animationScale - 1) + carouselContentPx * (1 - lottieScaling) / 2;

    return {
      transform: `scale(${animationScale})`,
      margin: `${marginTopPx}px ${marginRightPx}px ${marginBottomPx}px ${marginLeftPx}px`,
    };
  };

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
      targets: '#final-intro-background',
      opacity: [1, 0],
      duration: 1000,
    })
      .add({
        targets: ['#server'],
        translateY: 80,
        duration: 500,
      })
      .add({
        targets: ['#final-rocket', '#video-pulley', '#video'],
        opacity: [0, 1],
        duration: 1000,
      })
      .add({
        targets: ['#server', '#computer'],
        translateX: 706,
        easing: 'easeInSine',
        duration: 1000,
      })
      .add({
        targets: ['#final-rocket', '#video'],
        translateX: -243,
        duration: 1000,
        easing: 'easeInSine',
      })
      .add({
        targets: ['#final-rocket'],
        translateX: -1000,
        duration: 1000,
        easing: 'linear',
      })
      .add({
        targets: ['#computer', '#video'],
        scale: [1, 3.3],
        duration: 1000,
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      timeline.current?.play();
    }, 250);
    timeline.current?.pause();
    timeline.current?.seek(0);
    return () => clearTimeout(timeout);
  }, [reloadTime]);

  return <div id={'final-intro-container'} style={getCSSStyling()}>
    <div id={'lottie-mock-container'}>
      <div id={'final-intro-background'} />
      <div id={'server'} />
      <div id={'computer'} />
      <div id={'final-rocket'}>
        <div id={'rocket-text'}>{VideoInfo[chosenVideo].rocket_word}</div>
        <div id={'rocket-image'} />
        <div id={'video-pulley'} />
      </div>
      <div id={'video'} className={chosenVideo.replace('_', '-')} />
    </div>
  </div>;
}
export default FinalSlide;