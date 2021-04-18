import React, { useState, useContext, useEffect} from 'react';
import { GameContext } from '.';

import Clock from '../../../../assets/activity3/game/Clock.svg';
import Debug from '../../../../assets/activity3/game/Debug.svg';
import Graph from '../../../../assets/activity3/game/Graph.svg';
import Hammer from '../../../../assets/activity3/game/Hammer.svg';

import { TASKS, LOW_DAY_THRESHOLD, HIGH_DAY_THRESHOLD } from './GameConstants';
import NumberSelection from './NumberSelection';

interface TimeAllocationProps {
  setTimeAllocation: (variables: number[]) => void;
  initialTimes: number[];
}

function TimeAllocation(props: TimeAllocationProps): JSX.Element {
  const {daysLeft, setDaysLeft, goNextState} = useContext(GameContext);
  const { setTimeAllocation, initialTimes } = props;
  const { BUILD, DEBUG, ABTEST } = TASKS;

  const [buildDays, setBuildDays] = useState(0);
  const [debugDays, setDebugDays] = useState(0);
  const [testDays, setTestDays] = useState(0);

  const OPTIONS = [
    {
      src: Hammer,
      text: 'Build',
    },
    {
      src: Debug,
      text: 'Debug',
    },
    {
      src: Graph,
      text: 'A/B Test',
    },
  ];

  useEffect(() => {
    const initBuildDays = initialTimes[BUILD] ?? 0;
    const initDebugDays = initialTimes[DEBUG] ?? 0;
    const initABTestDays = initialTimes[ABTEST] ?? 0;
    setBuildDays(initBuildDays);
    setDebugDays(initDebugDays);
    setTestDays(initABTestDays);
  }, []);

  useEffect(() =>{
    setDaysLeft && setDaysLeft(daysLeft ? (daysLeft - buildDays - debugDays - testDays) : 0);
    setTimeAllocation([buildDays, debugDays, testDays]);
  }, [buildDays, debugDays, testDays]);

  const handleGoNext = () => {
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
      {OPTIONS.map((option) => {
        return (
          <div key={option.text} className={'centered-box'}>
            <img src={option.src}/>
            {option.text}
          </div>
        );
      })}
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
