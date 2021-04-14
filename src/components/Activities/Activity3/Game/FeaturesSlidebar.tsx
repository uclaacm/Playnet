import React, { useEffect } from 'react';
import { VARIABLES } from './GameWrapperConstants';
import '../../../styles/Activity3Game.scss';
import ScalingSlide from '../../../shared/ScalingSlide';

interface FeatureSlidebarProps {
  choices: VARIABLES[]
}

function FeatureSlidebar(props: FeatureSlidebarProps): JSX.Element {
  return (
    <>
      <p>
        Now that we&apos;ve decided which priorities to use, are any of these priorities more important than the others?
      </p>
      <p>
        Adjust the slider so that the most important variables take up the most space.
      </p>
      <ScalingSlide widthPx={1000} heightPx={113}>
        <>
          <div className='feature-slidebar'>
          </div>
          <div className='slider' id='slider1' />
          <div className='slider' id='slider2' />
        </>
      </ScalingSlide>
    </>
  );
}

export default FeatureSlidebar;