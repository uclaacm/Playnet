import React from 'react';
import { percentToFloat, stripUnits, viewportToPixels } from '../../utils';
import variables from '../styles/_variables.scss';
import '../styles/ScalingSlide.scss';

interface ScalingSlideProps {
  children?: JSX.Element,
  heightPx?: number,
  widthPx?: number,
}

function ScalingSlide(props: ScalingSlideProps): JSX.Element {
  const animationHeight = (props.heightPx === undefined) ? 390 : props.heightPx;
  const animationWidth = (props.widthPx === undefined) ? 1000 : props.widthPx;

  const { carouselPaddingPx, carouselButtonPx, carouselContentMarginPx, fitCarouselWidthPercentage } = variables;
  const [pad1, pad2, pad3, scaling] = [stripUnits(carouselPaddingPx), stripUnits(carouselButtonPx),
    stripUnits(carouselContentMarginPx), percentToFloat(fitCarouselWidthPercentage)];

  const getCSSStyling = () => {
    const margin = pad1 + pad2 + pad3;
    const contentSize = viewportToPixels('100vw') - margin * 2;
    const animationScale = scaling * (contentSize / animationWidth);

    const cssProperties: any = {};
    cssProperties['--animation-scale'] = animationScale;
    cssProperties['--widthPx'] = animationWidth;
    cssProperties['--heightPx'] = animationHeight;
    return cssProperties;
  };

  return <div id={'scaling-container'} style={getCSSStyling()}>
    <div id={'fixed-container'} style={{ height: `${animationHeight}px`, width: `${animationWidth}px` }}>
      {props.children}
    </div>
  </div>;
}
export default ScalingSlide;