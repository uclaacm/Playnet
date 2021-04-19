import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { GameContext } from '.';
import ScalingSlide from '../../../shared/ScalingSlide';

function ABTestDesc(): JSX.Element {
  const { goNextState } = useContext(GameContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const [phase, setPhase] = useState(0);

  const fadeIn = {
    opacity: [0, 1],
    duration: 1000,
  };
  const fadeOut = {
    opacity: [1, 0],
    duration: 1000,
  };

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timeline.current?.add({
      targets: '#abtest-text1',
      ...fadeOut,
    }).add({
      targets: '#love-response',
      ...fadeIn,
      translateY: -20,
    }).add({
      targets: '#dislike-response',
      ...fadeIn,
      translateY: -20,
    }, '-=500').add({
      targets: '#abtest-text2',
      ...fadeIn,
    });

  }, []);

  useEffect(() => {
    if (phase === 0) {
      timeline.current?.pause();
    } else {
      timeline.current?.seek(0);
      const timeout = setTimeout(() => {
        timeline.current?.play();
      }, 250);
      return () => clearTimeout(timeout);
    }
  },[phase]);

  const goNextPhase = () => {
    if (phase !== 0) goNextState && goNextState();
    else setPhase(phase+1);
  };

  return <>
    <ScalingSlide widthPx={1100} heightPx={386}>
      <>
        <div id={'abtest-toptext'}>
          <div id={'abtest-text1'}>
            Finally, we’re going to A/B test our new feature. A/B testing means giving out our
            feature to a small number of real-world users and asking for their opinion.
          </div>
          <div id={'abtest-text2'}>
            We can then make changes based on their feedback before we make the feature available to everyone!
          </div>
        </div>
        <div id={'love-response'} />
        <div id={'abtest-group'} />
        <div id={'dislike-response'} />
        <button id={'abtest-explain-button'} className='playnet-button' onClick={goNextPhase}
          style={{ width: '50%' }}>Continue</button>
      </>
    </ScalingSlide>

  </>;
}
export default ABTestDesc;