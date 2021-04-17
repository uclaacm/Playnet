import React, { useState, useContext} from 'react';
import { GameContext } from '.';

import Clock from '../../../../assets/activity3/game/Clock.svg';
import Debug from '../../../../assets/activity3/game/Debug.svg';
import Graph from '../../../../assets/activity3/game/Graph.svg';
import Hammer from '../../../../assets/activity3/game/Hammer.svg';

import NumberSelection from './NumberSelection';

function TimeAllocation(): JSX.Element {
  const {daysLeft, setDaysLeft} = useContext(GameContext);
  const [buildDays, setBuildDays] = useState<number>(0);
  const [debugDays, setDebugDays] = useState<number>(0);
  const [testDays, setTestDays] = useState<number>(0);

  return <>
    Choose how much time to spend on each part of your project.
    <br/>
    (We recommend 14 - 21 days total!)

    <div id={'options-grid'}>
      <div className={'centered-box'}>
        <img src={Hammer}/>
        Build
      </div>
      <div className={'centered-box'}>
        <img src={Debug}/>
        Debug
      </div>
      <div className={'centered-box'}>
        <img src={Graph}/>
        A/B Test
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft - debugDays - testDays}
          daysUsed={buildDays} setDaysUsed={setBuildDays}/> days
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft - buildDays - testDays}
          daysUsed={debugDays} setDaysUsed={setDebugDays}/> days
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft - buildDays - debugDays}
          daysUsed={testDays} setDaysUsed={setTestDays}/> days
      </div>
    </div>
    <div className={'centered-box'}>
      <img src={Clock}/>
      Days left: {daysLeft - buildDays - debugDays - testDays}
    </div>
    <div className='playnet-red'>
      If you use too little days in this stage, you might <br/> make something that doesn&#39;t work as you expect!
    </div>

    <button className='playnet-button' onClick={() => setDaysLeft(daysLeft - buildDays - debugDays - testDays)}>Continue</button>
  </>;
}
export default TimeAllocation;