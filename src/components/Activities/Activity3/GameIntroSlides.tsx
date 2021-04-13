import React from 'react';
import CatVideos from '../../../assets/activity3/game/CatVideos.svg';
import WelcomeToTeam from '../../../assets/activity3/game/WelcomeToTeam.svg';
import BouncingArrow from './Animations/BouncingArrow';


export function GameIntroSlide1(): JSX.Element {
  return <img src={WelcomeToTeam} alt='Woman saying welcome to the team!' style={{ maxHeight: '50vh' }} />;
}

export function GameIntroSlide2(): JSX.Element {
  return <div className='grid'>
    <section>
      <BouncingArrow />
      <img className={'half'} src={CatVideos} alt='Cat video playing. Next recommended videos are also cat videos.' />
    </section>
    <section className={'half'}>
      <p>When a user finishes watching a video, YouTube recommends videos to watch next.</p>
      <p>Your project is: Can we make better recommendations and make users happier?</p>
      <p>You have 8 weeks to make the improvement. If it’s good, we’ll send your ideas to the public!</p>
    </section>
  </div>;
}