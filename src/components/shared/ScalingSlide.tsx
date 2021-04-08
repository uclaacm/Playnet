import React from 'react';
import { viewportToPixels } from '../../utils/viewport';

interface ScalingSlideProps {
  children?: JSX.Element,
  heightPx?: number,
  widthPx?: number,
}

function ScalingSlide(props: ScalingSlideProps): JSX.Element {
  const height = (props.heightPx === undefined) ? 390 : props.heightPx;
  const width = (props.widthPx === undefined) ? 1000 : props.widthPx;

  // very unfortunate hard codings for now
  // scaling [child with set width (1000px) + children w/ absolute locations] to fit carousel same as last animation
  const getCSSStyling = () => {
    const lottieWidthPx = width;
    const lottieHeightPx = height;
    const lottieScaling = .9;

    const carouselPaddingPx = 64;
    const carouselButtonPx = 64;
    const carouselContentMarginPx = 24;

    const totalMarginContentPx = carouselPaddingPx + carouselButtonPx + carouselContentMarginPx;
    const carouselContentPx = viewportToPixels('100vw') - totalMarginContentPx * 2;

    const animationScale = lottieScaling * (carouselContentPx) / lottieWidthPx;

    // these all refer to -> excess/lack of spacing due to animationScaling
    //     ( a bit confusing, might need to draw out)
    const marginTopPx = lottieHeightPx / 2 * (animationScale - 1);
    const marginRightPx = 0;
    const marginBottomPx = marginTopPx;
    const marginLeftPx = lottieWidthPx / 2 * (animationScale - 1) + carouselContentPx * (1 - lottieScaling) / 2;

    return {
      transform: `scale(${animationScale})`,
      margin: `${marginTopPx}px ${marginRightPx}px ${marginBottomPx}px ${marginLeftPx}px`,
    };
  };

  return <div id={'final-intro-container'} style={getCSSStyling()}>
    <div id={'fixed-container'} style={{height: `${height}px`, width: `${width}px`}}>
      {props.children}
    </div>
  </div>;
}
export default ScalingSlide;