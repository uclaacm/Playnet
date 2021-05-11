import React, { useContext } from 'react';
import { GameContext } from '.';
import CatVideos from '../../../../assets/activity3/game/CatVideos.svg';
import WelcomeToTeam from '../../../../assets/activity3/game/WelcomeToTeam.svg';
import BouncingArrow from '../Animations/BouncingArrow';
import { SESSION_SKIP_STATES } from './GameConstants';

export function GameIntroSlide1(): JSX.Element {
  return <img src={WelcomeToTeam} alt='Woman saying welcome to the team!' style={{ maxHeight: '50vh' }} />;
}

interface GameIntroSlide2Props {
  startNewGame: () => void,
}

export function GameIntroSlide2(props: GameIntroSlide2Props): JSX.Element {
  const { goNextState } = useContext(GameContext);
  const storage = window.sessionStorage;
  console.log("session storage: " + storage.getItem(SESSION_SKIP_STATES));
  return (
    <>
      <div className='grid'>
        <section>
          <BouncingArrow />
          <img className={'half'} src={CatVideos} alt='Cat video playing. Next recommended videos are also cat videos.' />
        </section>
        <section className={'half'}>
          <p>When a user finishes watching a video, YouTube recommends videos to watch next.</p>
          <p>Your project is: Can we make better recommendations and make users happier?</p>
          <p>You have 8 weeks to make the improvement. If it’s good, we’ll send your ideas to the public!</p>
        </section>
      </div>

      <div className='intro-btn-container'>
        <button className='playnet-button' onClick={props.startNewGame}>Play Game</button>
        {storage.getItem(SESSION_SKIP_STATES) &&
          <button className='playnet-button playnet-btn-blue'
          //  id='dark-blue'
            onClick={() => {
              storage.removeItem(SESSION_SKIP_STATES);
              props.startNewGame();
            }}
          >
            Replay Tutorial
      </button>
        }
      </div>
    </>
  );
}