import React, { useState, useContext} from 'react';
import { GameContext } from '.';

import Clock from '../../../../assets/activity3/game/Clock.svg';
import Debug from '../../../../assets/activity3/game/Debug.svg';
import Graph from '../../../../assets/activity3/game/Graph.svg';
import Hammer from '../../../../assets/activity3/game/Hammer.svg';

import NumberSelection from './NumberSelection';
import { TASKS } from './GameConstants';

interface TimeAllocationProps {
  setTaskSelection: (variables: number[]) => void;
  initialTasks: number[];
}

function TimeAllocation(props: TimeAllocationProps): JSX.Element {
  const {daysLeft, setDaysLeft, goNextState} = useContext(GameContext);
  const { setTaskSelection, initialTasks } = props;
  const { BUILD, DEBUG, ABTEST } = TASKS;
  const [buildDays, setBuildDays] = useState(initialTasks[BUILD] ?  initialTasks[BUILD] : 0);
  const [debugDays, setDebugDays] = useState(initialTasks[DEBUG] ?  initialTasks[DEBUG] : 0);
  const [testDays, setTestDays] = useState(initialTasks[ABTEST] ?  initialTasks[ABTEST] : 0);

  const handleGoNext = () => {
    setDaysLeft && setDaysLeft(daysLeft ? (daysLeft - buildDays - debugDays - testDays) : 0);
    setTaskSelection([buildDays, debugDays, testDays]);
    goNextState && goNextState();
  };

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
        <NumberSelection daysLeft={daysLeft ? (daysLeft - debugDays - testDays) : 0}
          daysUsed={buildDays} setDaysUsed={setBuildDays}/> days
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft ? (daysLeft - buildDays - testDays) : 0}
          daysUsed={debugDays} setDaysUsed={setDebugDays}/> days
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft ? (daysLeft - buildDays - debugDays) : 0}
          daysUsed={testDays} setDaysUsed={setTestDays}/> days
      </div>
    </div>
    <div className={'centered-box'}>
      <img src={Clock}/>
      Days left: {daysLeft ? (daysLeft - buildDays - debugDays - testDays) : 0}
    </div>
    <div className='playnet-red'>
      If you use too little days in this stage, you might <br/> make something that doesn&#39;t work as you expect!
    </div>

    <button className='playnet-button' onClick={handleGoNext}>Continue</button>
  </>;
}
export default TimeAllocation;