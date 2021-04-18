import React, { useState, useContext, useEffect} from 'react';
import { GameContext } from '.';

import Clock from '../../../../assets/activity3/game/Clock.svg';
import Debug from '../../../../assets/activity3/game/Debug.svg';
import Graph from '../../../../assets/activity3/game/Graph.svg';
import Hammer from '../../../../assets/activity3/game/Hammer.svg';

import NumberSelection from './NumberSelection';
import { TASKS, LOW_DAY_THRESHOLD, HIGH_DAY_THRESHOLD } from './GameConstants';

interface TimeAllocationProps {
  setTaskSelection: (variables: number[]) => void;
  initialTasks: number[];
}

function TimeAllocation(props: TimeAllocationProps): JSX.Element {
  const {daysLeft, setDaysLeft, goNextState} = useContext(GameContext);
  const { setTaskSelection, initialTasks } = props;
  const { BUILD, DEBUG, ABTEST } = TASKS;

  // initialize allocations based on props
  const initAllocation = (task : number) => {
    return initialTasks[task] ? initialTasks[task] : 0;
  };
  const [buildDays, setBuildDays] = useState(() => initAllocation(BUILD));
  const [debugDays, setDebugDays] = useState(() => initAllocation(DEBUG));
  const [testDays, setTestDays] = useState(() => initAllocation(ABTEST));

  const handleGoNext = () => {
    setTaskSelection([buildDays, debugDays, testDays]);
    setDaysLeft && setDaysLeft(daysLeft ? (daysLeft - buildDays - debugDays - testDays) : 0);
    goNextState && goNextState();
  };

  const displayWarning = () => {
    const daysUsed = buildDays + debugDays + testDays;

    if (daysUsed < LOW_DAY_THRESHOLD) {
      return <div className='playnet-red'>
        If you use too little days in this stage, you might <br/> make something that doesn&#39;t work as you expect!
      </div>;
    } else if (daysUsed > HIGH_DAY_THRESHOLD) {
      return <div className='playnet-red'>
        If you use too many days in this stage, you might <br/> not have enough time to make fixes later!
      </div>;
    }
    return;
  };

  // warning color if below or above threshold
  const showWarning = () => {
    const daysUsed = buildDays + debugDays + testDays;
    return (daysUsed < LOW_DAY_THRESHOLD || daysUsed > HIGH_DAY_THRESHOLD);
  };

  return <>
    Choose how much time to spend on each part of your project.
    <br/>
    (We recommend {LOW_DAY_THRESHOLD} - {HIGH_DAY_THRESHOLD} days total!)

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
          daysUsed={buildDays} setDaysUsed={setBuildDays} showWarning={showWarning()}/> days
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft ? (daysLeft - buildDays - testDays) : 0}
          daysUsed={debugDays} setDaysUsed={setDebugDays} showWarning={showWarning()}/> days
      </div>
      <div className={'centered-box'}>
        <NumberSelection daysLeft={daysLeft ? (daysLeft - buildDays - debugDays) : 0}
          daysUsed={testDays} setDaysUsed={setTestDays} showWarning={showWarning()}/> days
      </div>
    </div>
    <div className={'centered-box'}>
      <img src={Clock}/>
      Days left: {daysLeft ? (daysLeft - buildDays - debugDays - testDays) : 0}
    </div>
    {displayWarning()}

    <button className='playnet-button' onClick={handleGoNext}>Continue</button>
  </>;
}
export default TimeAllocation;