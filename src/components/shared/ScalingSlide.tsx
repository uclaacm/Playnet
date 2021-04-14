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

  const { carousel_padding_px, carousel_button_px, carousel_content_margin_px, fit_carousel_width_percent } = variables;
  const [pad1, pad2, pad3, scaling] = [stripUnits(carousel_padding_px), stripUnits(carousel_button_px),
    stripUnits(carousel_content_margin_px), percentToFloat(fit_carousel_width_percent)];

  const getCSSStyling = () => {
    const margin = pad1 + pad2 + pad3;
    const contentSize = viewportToPixels('100vw') - margin * 2;
    const animationScale = scaling * (contentSize / animationWidth);

    const cssProperties: any = {};
    cssProperties['--animation-scale'] = animationScale;
    cssProperties['--widthPx'] = animationWidth;
    cssProperties['--heightPx'] = animationHeight;
    cssProperties['--carousel-content-px'] = contentSize;
    return cssProperties;
  };

  return <div id={'scaling-container'} style={getCSSStyling()}>
    <div id={'fixed-container'} style={{ height: `${animationHeight}px`, width: `${animationWidth}px` }}>
      {props.children}
    </div>
  </div>;
}
export default ScalingSlide;